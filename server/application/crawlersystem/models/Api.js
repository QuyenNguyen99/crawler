var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
Api = GlobalFunction.cloneFunc(GlobalActiveRecord);
Api.prototype.tableName = function() {
    return 'api';
}
Api.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
Api.prototype.LABEL = {
    "id": "Id",
    "NAME": "Name",
    "LINK": "Link",
    "TYPE": "Type",
    "HEADER": "Header",
    "INPUT": "Input",
    "IS_DELETE": "Is Delete"
};
Api.prototype.RULE = {
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
    "LINK": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "TYPE": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "HEADER": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "INPUT": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "IS_DELETE": {
        "default": "0",
        "type": "tinyint",
        "size": 1
    }
};

exports = module.exports = Api;