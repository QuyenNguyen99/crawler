var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobScheduleDetail = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobScheduleDetail.prototype.tableName = function() {
    return 'job_schedule_detail';
}
JobScheduleDetail.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobScheduleDetail.prototype.LABEL = {
    "id": "Id",
    "job_schedule_job_type_mul_id": "Job Schedule Job Type Mul Id",
    "object_id": "Object Id",
    "status": "Status"
};
JobScheduleDetail.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "job_schedule_job_type_mul_id": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11,
        "fk": {
            "table": "job_schedule_job_type_mul",
            "ref_id": "id"
        }
    },
    "object_id": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 20
        },
        "size": 20
    },
    "status": {
        "default": "0",
        "type": "tinyint",
        "require": {
            "empty": true
        },
        "size": 1
    },
    "fk_table_job_schedule_job_type_mul_id": {
        "type": "any"
    }
};

exports = module.exports = JobScheduleDetail;