var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
JobType = GlobalFunction.cloneFunc(GlobalActiveRecord);
JobType.prototype.tableName = function() {
    return 'job_type';
}
JobType.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
JobType.prototype.LABEL = {
    "id": "Id",
    "NAME": "Name",
    "DB_MONGO": "Db Mongo",
    "DB_COLLECTION": "Db Collection",
    "CRAWLER_TYPE": "Crawler Type",
    "IS_PAGE": "Is Page",
    "PRIORITY": "Priority",
    "IS_DELETE": "Is Delete"
};
JobType.prototype.RULE = {
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
    "DB_MONGO": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "DB_COLLECTION": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "CRAWLER_TYPE": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "fk":{
            "table":"api",
            "ref_id":"ID"
        },
        "size": 255
    },
    "IS_PAGE": {
        "default": "0",
        "type": "tinyint",
        "require": {
            "empty": true
        },
        "size": 1
    },
    "PRIORITY": {
        "default": "1",
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },
    "IS_DELETE": {
        "default": "0",
        "type": "int",
        "size": 1
    }
};

exports = module.exports = JobType;