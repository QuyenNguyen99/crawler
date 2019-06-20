exports = module.exports = GlobalDB;
var MYSQLDB = require('./global_mysql');
var DB2 = require('./global_db2');
var MONGODB = require('./global_mongo');
var config = require('../config/config');
var CACHE_DB = {};
function GlobalDB() {

}

GlobalDB.getDB = function(params, index = 0) {
    let k = params ? params : config.SERVER['cyberinsights'];
    var key = k + '' + index;
    key = k;
    if(!CACHE_DB[key]) {
        if(config.MYSQL[k]) {
            CACHE_DB[key] = new MYSQLDB(config.MYSQL[k]);
        } else if(config.MONGO[k]) {
            CACHE_DB[key] = new MONGODB(config.MONGO[k]);
        } else if(config.DB2[k]) {
            CACHE_DB[key] = new DB2(config.DB2[k]);
        } else {
            CACHE_DB[key] = false;
        }
    }
    return CACHE_DB[key];
}