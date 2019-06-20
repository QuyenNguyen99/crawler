var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var GlobalRequest = require('../../../core/global_request');
var CONFIG = require('../../../config/config');
var Q = require('q');
var Promise = require('promise');
ApiServer = GlobalFunction.cloneFunc(GlobalActiveRecord);
ApiServer.prototype.tableName = function () {
    return 'api_server';
}
ApiServer.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
ApiServer.prototype.LABEL = {
    "id": "Id",
    "NAME": "Name",
    "TYPE": "Type",
    "STATUS": "Status",
    "IS_DELETE": "Is Delete"
};
ApiServer.prototype.RULE = {
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
    "TYPE": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 255
        },
        "size": 255
    },
    "STATUS": {
        "type": "int",
        "require": {
            "size": 11
        },
        "size": 11
    },
    "IS_DELETE": {
        "default": "0",
        "type": "tinyint",
        "size": 1
    }
};

ApiServer.get_model_instance = false;
ApiServer.get_model = function () {
    if (!ApiServer.get_model_instance) {
        ApiServer.get_model_instance = new ApiServer();
    }
    return ApiServer.get_model_instance;
}

ApiServer.index_server = 0;
ApiServer.limit_server = 0;
ApiServer.get_list_app_instance = {};
ApiServer.get_list_app_instance_full = {};
ApiServer.get_list_app_instance_obj = {};
ApiServer.get_list_app_instance_list_full = [];
ApiServer.get_list_server = async function () {
    var list = await ApiServer.get_model().findAll({ TYPE: 'facebook',STATUS:1 });
    if (list && list.length) {
        ApiServer.index_server = 0;
        ApiServer.limit_server = 0;
        ApiServer.get_list_app_instance = {};
        ApiServer.get_list_app_instance_full = {};
        ApiServer.get_list_app_instance_obj = {};
        for (var item of list) {
            ApiServer.get_list_app_instance_list_full.push(item.NAME);
            ApiServer.get_list_app_instance[ApiServer.limit_server] = item.NAME;
            ApiServer.get_list_app_instance_full[ApiServer.limit_server] = item.NAME;
            ApiServer.get_list_app_instance_obj[item.NAME] = ApiServer.limit_server;
            ApiServer.limit_server++;
        }
    }
    return list;
}

ApiServer.get_server = function () {
    var i = 0;
    do {
        ApiServer.index_server = ApiServer.index_server >= ApiServer.limit_server ? 0 : (ApiServer.index_server + 1);
        i++;
    } while (!ApiServer.get_list_app_instance[ApiServer.index_server] && i < ApiServer.limit_server);
    if (!ApiServer.get_list_app_instance[ApiServer.index_server]) {
        return ApiServer.get_list_app_instance_full[GlobalFunction.rand(0, ApiServer.limit_server - 1)];
    }
    return ApiServer.get_list_app_instance[ApiServer.index_server];
}

ApiServer.init_server = async function () {
    ApiServer.get_list_server();
    setInterval(function () {
        ApiServer.get_list_server();
    }, 5 * 60 * 1000);

    setInterval(() => {
        GlobalFunction.runMultiRequest(ApiServer.get_list_app_instance_list_full).then(async function (data, index) {
            var item = data[index];
            var link = item + '/ping';
            return GlobalRequest.get(link, { timeout: 2000,headers:{"X-Authorized":"Five9Dung198574" } }).then(r => {
                if (!r) {
                    delete ApiServer.get_list_app_instance[ApiServer.get_list_app_instance_obj[item]];
                } else {
                    ApiServer.get_list_app_instance[ApiServer.get_list_app_instance_obj[item]] = item;
                }
            })
        })
    }, 30 * 1000);
}

exports = module.exports = ApiServer;