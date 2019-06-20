const express = require('express');
var app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.on('uncaughtException', function (err) {
    console.error("Node NOT Exiting...", err);
});
console.log('runschedulejob khoi tao');
var CronJobController = require('./application/crawlersystem/controller/CronJobController');
var cron_job = new CronJobController();
cron_job.run();