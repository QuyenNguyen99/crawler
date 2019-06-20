var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var GlobalExcel = require('../../../core/global_excel');
var GlobalFile = require('../../../core/global_file');
var GlobalRequest = require('../../../core/global_request');
var CONFIG = require('../../../config/config');
var MONGODB = require('../../../core/global_mongo');
var Q = require('q');
var Promise = require('promise');
var request = require('request');
Log = GlobalFunction.cloneFunc(GlobalActiveRecord);
Log.prototype._table_name = 'log';
Log.prototype.tableName = function () {
    return this._table_name;
}
Log.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
Log.prototype.LABEL = {
    "id": "Id",
    "JOB_ID":"Job id",
    "ACTION":"Action",
    "MESSAGE":"Message"
};
Log.prototype.RULE = {
    "id": {
        "type": "int",
        "auto_increment": true,
        "primary_key": true,
        "size": 11
    },
    "JOB_ID": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },
    "ACTION": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 50
        },
        "size": 50
    },
    "MESSAGE": {
        "default": "NULL",
        "type": "varchar",
        "require": {
            "size": 255
        },
        "size": 255
    }
};


exports = module.exports = Log;