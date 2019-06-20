
var GlobalController = require('../../../core/global_controller');
const GlobalFunction = require('../../../core/global_function');

var JobSchedule = require('../models/JobSchedule');
var Job = require('../models/Job');
var JobType = require('../models/JobType');
var JobDetail = require('../models/JobDetail');
var Api = require('../models/Api');
var cron = require('node-cron');

CronJobController = GlobalFunction.cloneFunc(GlobalController);
CronJobController.prototype.init = async function () {
  GlobalController.prototype.init.apply(this, arguments);
}

CronJobController.prototype.run = async function () {
  var jobSchedule = new JobSchedule();
  var ls = await jobSchedule.searchAdvance({});
  var objs = [];
  if (ls) {
    for (var jschedule of ls.list) {
      var pattern = jschedule.PATTERN_SEC + " "
        + jschedule.PATTERN_MIN + " "
        + jschedule.PATTERN_HOUR + " "
        + jschedule.PATTERN_DAY + " "
        + jschedule.PATTERN_MON + " "
        + jschedule.PATTERN_WEEK;
      var valid = cron.validate(pattern);
      if (valid) {
        objs.push({
          regex: pattern,
          data: jschedule
        });
      }
    }
    for (var obj of objs) {
      this.scheduleJob(obj.regex, obj.data);
    }
  }
}

CronJobController.prototype.scheduleJob = async function (pattern, data) {
  var task = cron.schedule(pattern, async function () {
    var job = new Job();
    var date = GlobalFunction.newDate();
    var flag = true;
    if (data.START_TIME && date.getTime() < GlobalFunction.newDate(data.START_TIME).getTime()) {
      flag = false;
    }
    if (data.END_TIME && date.getTime() > GlobalFunction.newDate(data.END_TIME).getTime()) {
      flag = false;
    }
    if(flag) {
      return job.clone_from_schedule(data);
    } else {
      return Promise.resolve(true);
    }
    

  }, {
      scheduled: false
    });
  task.start();
}

CronJobController.prototype.validate = async function (schedule) {
  return cron.validate(schedule);
}

exports = module.exports = CronJobController; 