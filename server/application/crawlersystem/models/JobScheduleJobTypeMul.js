var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobScheduleJobTypeMul = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobScheduleJobTypeMul.prototype.tableName = function() {
    return 'job_schedule_job_type_mul';
}
JobScheduleJobTypeMul.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobScheduleJobTypeMul.prototype.LABEL = {
    "id": "Id",
    "job_schedule_id": "Job Schedule Id",
    "job_type_id": "Job Type Id",
    "status": "Status"
};
JobScheduleJobTypeMul.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "job_schedule_id": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11,
        "fk": {
            "table": "job_schedule",
            "ref_id": "id"
        }
    },
    "job_type_id": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11,
        "fk": {
            "table": "job_type",
            "ref_id": "id"
        }
    },
    "status": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 20
        },
        "size": 20
    },
    "fk_table_job_type_id": {
        "type": "any"
    },
    "fk_table_job_schedule_id": {
        "type": "any"
    }
};

exports = module.exports = JobScheduleJobTypeMul;