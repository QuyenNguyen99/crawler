exports = module.exports = GlobalMongo;
var MongoClient = require('mongodb').MongoClient;
var config = require('../config/config');
const Q = require('q');
var index_trust = 0;
const exec = require('child_process').exec;
function GlobalMongo(settings) {
    var that = this;
    this.settings = settings;
    if(settings.url) {
        this.url = settings.url;
    } else {
        var user_pass = settings.username && settings.password ? (encodeURIComponent(settings.username) + ':' + encodeURIComponent(settings.password) + '@') : '';
        this.url = 'mongodb://' + user_pass + settings.server + ':' + settings.port + '/' + settings.database;
        if (user_pass) {
            this.url += '?authSource=admin';
        }
    }
    this.condition = null;
    this.collection = null;
    this._limit = null;
    this._offset = null;
    this._select = null;
    this._sort = null;
    this.db = null;
    this.connect_defer = null;
    this.connectionDB = function () {
        var defer = Q.defer();
        this.connect_defer = Q.defer();
        // console.log(this.url);
        MongoClient.connect(this.url, { socketTimeoutMS: 36000000, connectTimeoutMS: 30000000 }, function (err, db) {
            if (err) {
                console.log('err', err);
                // setTimeout(function () {
                //     that.connectionDB();
                // }, 2000);
                that.db = null;
                defer.resolve(true);
                that.connect_defer.resolve(null);
                // console.log('hihi');
            } else {
                db.mongo_instance = that;
                that.db = db;
                // console.log('lai ket noi lai');
                that.connect_defer.resolve(db);
                defer.resolve(db);
            }
        });
        return defer.promise;
    }
    this.resetAttributes = function () {
        this.condition = null;
        this.collection = null;
        this._limit = null;
        this._select = null;
        this._sort = null;
        this._offset = null;
    }

    this.resetQuery = function() {
        this.condition = null;
        this.collection = null;
        this._limit = null;
        this._select = null;
        this._sort = null;
        this._offset = null;
    }
    this.setCollection = async function (table_name) {
        if (!this.collection) {
            this.collection = this.collection(table_name);
        }
    }
    this.where = function (condition) {
        this.condition = condition;
        return this;
    }
    this.limit = function (number, offset) {
        this._limit = number;
        if (offset && offset !== undefined) {
            this._offset = offset;
        }
        return this;
    }
    this.select = function (select) {
        this._select = select;
        return this;
    }
    this.sort = function (sort) {
        this._sort = sort;
        return this;
    }
    this.order_by = function (sort) {
        this._sort = sort;
        return this;
    }
    this.loading = false;
    this.loadding_connection = false;
    this.list_connection = [];
    this.limit_connection = 1;
    this.index_connection = 0;
    this.connection_done = function () {
        if (!this.loadding_connection) {
            if (!this.db && !that.connect_defer
                && !this.loading
            ) {
                this.loading = true;
                this.connectionDB();
            }
            // console.log('hihih');
            this.loadding_connection = true;
            return that.connect_defer.promise;
        } else {
            for (var item of this.list_connection) {
                if (!item.loadding_connection) {
                    // console.log('connection_done 2');
                    return item.connection_done();
                }
            }
            if (this.index_connection == this.limit_connection) {
                // console.log('connection_done 3');
                return that.connect_defer.promise;
            } else {
                index_trust++;
                //  console.log('hihi',index_trust);
                var index_now = this.index_connection;
                this.list_connection[this.index_connection] = new GlobalMongo(settings);
                this.index_connection++;
                //  console.log('connection_done 4');
                return this.list_connection[index_now].connection_done();
            }
        }
    }

    this.get_db_mongo_not_process = async function () {

    }
    this.createIndex = function (table_name, index_obj) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).createIndex(index_obj, { background: true }, function (err, rows) {
                    // that.reverseError(err, rows, db);
                    def.resolve(rows);
                });
            } else {
                def.resolve(true);
            }
            return def.promise;
        })
    }
    this.dropCollection = async function (table_name) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.dropCollection(table_name, function (err, rows) {
                    // that.reverseError(err, rows, db);
                    def.resolve(rows);
                });
            } else {
                def.resolve(true);
            }
            return def.promise;
        })
    }
    this.createCollection = async function (table_name) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.createCollection(table_name, function (err, rows) {
                    // that.reverseError(err, rows, db);
                    def.resolve(rows);
                });
            } else {
                def.resolve(true);
            }
            return def.promise;
        })
    }
    this.delete = async function (table_name, func_callback) {
        var that = this;
        var condition = that.condition;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).deleteMany(condition, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }
    
    this.deleteAll = async function (table_name, condition, func_callback) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).deleteMany(condition, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }

    this.call_func = async function (func_name, argv_str = '', func_callback) {
        var that = this;
        if (!argv_str || argv_str === undefined) {
            argv_str = '';
        }
        if (typeof (argv_str) == 'string') {
            argv_str = argv_str.split('||');
        }
        var str = "";
        if (Array.isArray(argv_str) && argv_str.length) {
            var a_str = [];
            for (var item of argv_str) {
                if(typeof (item) == 'object') {
                    a_str.push(JSON.stringify(item));
                } else if(typeof(item) == 'number') {
                    a_str.push(item);
                } else if(typeof(item) == 'string') {
                    a_str.push("'" + item + "'");
                } else {
                    a_str.push(item);
                }
            }
            str = a_str.join(",");
        } else {
            if(typeof (argv_str) == 'object') {
                argv_str = JSON.stringify(argv_str);
            } else if(typeof(argv_str) == 'string') {
                a_str= "'" + argv_str + "'";
            }
            str = argv_str;
        }
        // lưu ý khi mongodb báo db.eval is deprecated hoawcj name has to be a string
        // thì dùng lệnh db.getCollection('system.js').remove({_id:{$type:7}})
        var eval = func_name + '(' + str + ');';
        var command = 'mongo ' + this.url.replace('mongodb://','') + ' --eval ' + '"db.loadServerScripts();' + eval + '"';
        var def = Q.defer();
        console.log('command', command);
        exec(command, function (errors, stdout, stderr) {
            def.resolve({
                errors: errors, stdout: stdout, stderr: stderr
            });
        })
        return def.promise;
    }

    this.query = async function(query, params = []) {
        var command = 'mongo ' + this.url.replace('mongodb://','') + ' --eval ' + '"' + query + '"';
        var def = Q.defer();
        console.log('command', command);
        exec(command, function (errors, stdout, stderr) {
            def.resolve({errors: errors, stdout: stdout, stderr: stderr});
        });
        return def.promise;
    }

    this.insert = async function (table_name, attributes, func_callback) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).insertOne(attributes, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }
    this.insertMany = async function (table_name, attributes, func_callback) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                if (attributes && attributes.length) {
                    db.collection(table_name).insertMany(attributes, function (err, rows) {
                        that.reverseError(err, rows, db);
                        if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                        def.resolve(rows);
                    });
                } else {
                    if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                    def.resolve(true);
                }
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }

    this.update = async function (table_name, attributes, func_callback) {
        var that = this;
        var condition = that.condition;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).updateOne(condition, attributes, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }

    this.updateAll = async function (table_name, attributes, condition, func_callback) {
        var that = this;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                var update_attributes;
                if (attributes['$push'] || attributes['$unset'] || attributes['$set']) {
                    update_attributes = attributes;
                } else {
                    update_attributes = {
                        '$set': attributes
                    }
                }
                db.collection(table_name).updateMany(condition, update_attributes, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }
    this.updateMany = async function (table_name, attributes, func_callback) {
        var that = this;
        var condition = that.condition;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                var update_attributes;
                if (attributes['$push'] || attributes['$unset'] || attributes['$set']) {
                    update_attributes = attributes;
                } else {
                    update_attributes = {
                        '$set': attributes
                    }
                }
                db.collection(table_name).updateMany(condition, update_attributes, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }
    this.updateCommon = async function (table_name, attributes, func_callback) {
        var that = this;
        var condition = that.condition;
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).updateMany(condition, attributes, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            that.resetAttributes();
            return def.promise;
        })
    }

    this.reverseError = function (err, rows, db) {
        // db.mongo_instance.loadding_connection = false;
        // this.loadding_connection = false;
        if (err) {
            console.log('reverseError', err);
            // this.db.close();
            // this.loading = false;
            // this.db = null;
            // this.connect_defer = false;
            // this.connectionDB();
        }
    }

    this.bulkWrite = async function (table_name, list_bulk_write, func_callback) {
        that.resetAttributes();
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).bulkWrite(list_bulk_write, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);

                })
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            return def.promise;
        });

    }

    this.count = async function (table_name, func_callback) {
        var that = this;
        var condition = that.condition ? that.condition : {};
        that.resetAttributes();
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).count(condition, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            return def.promise;
        })
    }

    this.get = async function (table_name, func_callback) {
        var that = this;
        var condition = that.condition ? Object.assign({}, that.condition) : {};
        var limit = that._limit || false;
        var offset = that._offset || false;
        var sort = that._sort || false;
        var select = that._select || false;
        that.resetAttributes();
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                var db2 = db.collection(table_name).find(condition);
                // if(select) {
                //     db2.select(select);
                // }
                if (limit) {
                    db2.limit(limit);
                }
                if (sort) {
                    db2.sort(sort);
                }
                if (offset) {
                    console.log('offset', offset);
                    db2.skip(offset);
                }
                db2.toArray(function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            return def.promise;
        })
    }

    this.find = async function(table_name, condition = {}, func_callback) {
        var that = this;
        var limit = 0,skip = 0;
        if(condition.limit_db) {
            limit = condition.limit_db;
            delete condition.limit_db;
        }
        if(condition.offset_db) {
            skip = condition.offset_db;
            delete condition.offset_db;
        }
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db2 = db.collection(table_name).find(condition);
                if(limit) {db2 = db2.limit(limit);}
                if(skip) {db2 = db2.skip(skip);}
                db2.toArray(function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            return def.promise;
        })

    }

    this.aggregate = async function (table_name, condition, func_callback) {
        var that = this;
        that.resetAttributes();
        return that.connection_done().then(db => {
            var def = Q.defer();
            if (db) {
                db.collection(table_name).aggregate(condition, { allowDiskUse: true, slaveOk: false }, function (err, rows) {
                    that.reverseError(err, rows, db);
                    if (typeof (func_callback) == 'function') { func_callback(err, rows); }
                    def.resolve(rows);
                });
            } else {
                if (typeof (func_callback) == 'function') { func_callback('bug not connection', false); }
                def.resolve(true);
            }
            return def.promise;
        })
    }

}

// var list = [];
// var i = 0;
// var ii = 0;
// var limit = 100000;
// db.getCollection('facebook_education_all').find().forEach(function(item){
//     list.push(item._id);
//     i++;
//     if(i % limit == 0) {
//         db.getCollection('facebook_education_all').update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
//         list = [];
//         ii++;
//     }
// })
// if(list.length) {
//     db.getCollection('facebook_education_all').update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
// }