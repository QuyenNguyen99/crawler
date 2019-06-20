var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobDetail = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobDetail.prototype._table_name = 'job_detail';
JobDetail.prototype.tableName = function() {
    return this._table_name;
}
JobDetail.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobDetail.prototype.LABEL = {
    "id": "Id",
    "JOB_JOB_TYPE_MUL_ID": "Job Job Type Mul Id",
    "OBJECT_ID": "Object Id",
    "STATUS": "Status",
    "FINISHED_TIME": "Finished Time"
};
JobDetail.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "JOB_JOB_TYPE_MUL_ID": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11,
        "fk": {
            "table": "job_job_type_mul",
            "ref_id": "id"
        }
    },
    "OBJECT_ID": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 20
        },
        "size": 20
    },
    "STATUS": {
        "default": "0",
        "type": "tinyint",
        "require": {
            "empty": true
        },
        "size": 1
    },
    "FINISHED_TIME": {
        "type": "int",
        "size": 11
    }
};

JobDetail.update_error_id_by_facebook_profile = async function() {
    var def = Q.defer();
    var Job = require('./Job');
    var model_insert_db2 = new JobDetail();
    model_insert_db2._table_name = 'JOB_DETAIL';
    model_insert_db2.setDb(CONFIG.SERVER['db2_f9_app_crawler']);

    var model_insert_mongo = new JobDetail();
    model_insert_mongo._table_name = 'facebook_crawler_facebook_profile';
    model_insert_mongo.setDb(CONFIG.SERVER['mongo_facebook_10672']);

    var a = await model_insert_mongo.db.connectionDB();
    if (a) { }
    var list = [];
    var list_obj = {};
    var i = 0, limit = 1000;
    console.log('thanh cong');
    model_insert_mongo.db.db.collection('facebook_crawler_facebook_profile').find().forEach(function (item) {
        if(item.job_detail_id && typeof(item.job_detail_id) == 'number' && item.data && item.data.error && item.data.error.message) {
            var message = item.data.error.message.replace(/'[0-9]+'/gi,"'{object_id}'");
            if(!list_obj[message]) {
                list_obj[message] = [];
            }
            list_obj[message].push(item.job_detail_id);
            list.push(item.job_detail_id);
            if (list.length >= limit) {
                Job.update_list_error_test(list_obj);
                list = [];
                list_obj = {};
                i++;
                console.log(i);
            }
        }
    }, function (err) {
        console.log('err',err);
        if (list.length) {
            Job.update_list_error_test(list_obj);
            list = [];
            list_obj = {};
            i++;
            console.log(i);
        }
        def.resolve(true);
        console.log('done');
    })
    return def.promise;
}

exports = module.exports = JobDetail;