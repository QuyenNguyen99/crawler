var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var GlobalRequest = require('../../../core/global_request');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobSchedule = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobSchedule.prototype.tableName = function() {
    return 'job_schedule';
}
JobSchedule.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobSchedule.prototype.LABEL = {
    "id": "Id",
    "NAME": "Name",
    "JOB_NAME": "Job Name",
    "JOB_SOURCE_TYPE": "Source Type",
    "JOB_GROUP": "Group",
    "JOB_BATCH_LIMIT": "Batch Limit",
    "JOB_MULTI_LIMIT": "Multi Limit",
    "JOB_PRIORITY": "Priority",
    "JOB_SCHEDULE_JOB_TYPE_MUL": "JOB JOB TYPE MUL",
    "JOB_SQL": "Sql",
    "JOB_FILE_EXCEL": "Excel",
    "JOB_TEXTAREA": "Textarea",
    "PATTERN_SEC": "Pattern sec",
    "PATTERN_MIN": "Pattern min",
    "PATTERN_HOUR": "Pattern hour",
    "PATTERN_DAY": "Pattern day",
    "PATTERN_MON": "Pattern mon",
    "PATTERN_WEEK": "Pattern week",
    "START_TIME": "Start time",
    "END_TIMAE": "End time",
    "IS_DELETE": "Is Delete"
};
JobSchedule.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "NAME": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "JOB_NAME": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "JOB_SOURCE_TYPE": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 20
        },
        "size": 20
    },
    "JOB_GROUP": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "JOB_BATCH_LIMIT": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },"JOB_MULTI_LIMIT": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },
    "JOB_PRIORITY": {
        "default": "1",
        "type": "int",
        "size": 11
    },
    
    "JOB_SCHEDULE_JOB_TYPE_MUL": {
        "type": "array",
        "size": 11,
        "require": {
            "empty": true
        },
        "mul_id": "JOB_SCHEDULE_ID",
        "mul_id_fk": "JOB_TYPE_ID",
        "fk":{
            "table":"job_type",
            "ref_id":"ID",
            "order_by": "name asc",
        },
    },
    "fk_table_JOB_SCHEDULE_JOB_TYPE_MUL": {
        "type": "any"
    },
    "JOB_SQL": {
        "type": "varchar",
        "size": 32000
    },
    "JOB_TEXTAREA": {
        "type": "varchar",
        "size": 32000
    },
    "JOB_FILE_EXCEL": {
        "type": "varchar",
        "size": 32000
    },
    "PATTERN_SEC": {
        "type": "varchar",
        "size": 2
    },
    "PATTERN_MIN": {
        "type": "varchar",
        "size": 2
    },
    "PATTERN_HOUR": {
        "type": "varchar",
        "size": 2
    },
    "PATTERN_DAY": {
        "type": "varchar",
        "size": 2
    },
    "PATTERN_MON": {
        "type": "varchar",
        "size": 2
    },
    "PATTERN_WEEK": {
        "type": "varchar",
        "size": 1
    },
    "START_TIME": {
        "type": "varchar",
        "size": 20
    },
    "END_TIME": {
        "type": "varchar",
        "size": 20
    },
    "IS_DELETE": {
        "default": "0",
        "type": "tinyint",
        "size": 1
    }
};

JobSchedule.prototype.beforeSave = async function (insert) {
    this.PATTERN_SEC = (this.PATTERN_SEC==''?'*':this.PATTERN_SEC);
    this.PATTERN_MIN = (this.PATTERN_MIN==''?'*':this.PATTERN_MIN);
    this.PATTERN_HOUR = (this.PATTERN_HOUR==''?'*':this.PATTERN_HOUR);
    this.PATTERN_DAY = (this.PATTERN_DAY==''?'*':this.PATTERN_DAY);
    this.PATTERN_MON = (this.PATTERN_MON==''?'*':this.PATTERN_MON);
    this.PATTERN_WEEK = (this.PATTERN_WEEK==''?'*':this.PATTERN_WEEK);
    return Promise.resolve({});
}

JobSchedule.prototype.afterSave = async function (insert) {
    GlobalRequest.get(CONFIG.LINK_REFRESH_SCHEDULE_JOB);
    return Promise.resolve({});
}

JobSchedule.prototype.afterDelete = async function () {
    GlobalRequest.get(CONFIG.LINK_REFRESH_SCHEDULE_JOB);
    return GlobalActiveRecord.prototype.afterDelete.apply(this,arguments);
}

exports = module.exports = JobSchedule;