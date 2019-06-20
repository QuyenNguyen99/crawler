var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobJobTypeMul = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobJobTypeMul.prototype.tableName = function() {
    return 'job_job_type_mul';
}
JobJobTypeMul.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobJobTypeMul.prototype.LABEL = {
    "id": "Id",
    "job_id": "Job Id",
    "job_type_id": "Job Type Id",
    "status": "Status",
    "started_time": "Started Time",
    "finished_time": "Finished Time"
};
JobJobTypeMul.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "job_id": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11,
        "fk": {
            "table": "job",
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
    "started_time": {
        "type": "int",
        "size": 11
    },
    "finished_time": {
        "type": "int",
        "size": 11
    },
    "fk_table_job_type_id": {
        "type": "any"
    },
    "fk_table_job_id": {
        "type": "any"
    }
};

exports = module.exports = JobJobTypeMul;