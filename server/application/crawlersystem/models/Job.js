var GlobalActiveRecord = require('../../../core/global_activerecord');
const GlobalFunction = require('../../../core/global_function');
var GlobalExcel = require('../../../core/global_excel');
var GlobalFile = require('../../../core/global_file');
var GlobalRequest = require('../../../core/global_request');
var CONFIG = require('../../../config/config');
var JobDetail = require('../models/JobDetail');
var ApiServer = require('../models/ApiServer');
var MONGODB = require('../../../core/global_mongo');
var Q = require('q');
var Promise = require('promise');
var request = require('request');
Job = GlobalFunction.cloneFunc(GlobalActiveRecord);
Job.prototype._table_name = 'job';
Job.prototype.tableName = function () {
    return this._table_name;
}

Job.STATUS_ENUM = {
    NEW: 'new',
    INITIALING: 'initialing',
    PENDING: 'pending',
    RUNNING: 'running',
    PAUSED: 'paused',
    WAITING: 'waiting',
    CANCELED: 'canceled',
    FINISHED: 'finished',
};
Job.prototype.db_key = CONFIG.SERVER['db2_f9_app_crawler'];
Job.prototype.LABEL = {
    "id": "Id",
    "NAME": "Name",
    "SOURCE_TYPE": "Source Type",
    "GROUP": "Group",
    "BATCH_LIMIT": "Batch Limit",
    "MULTI_LIMIT": "Multi Limit",
    "START_TIME": "Started Time",
    "FINISH_TIME": "Finished Time",
    "STATUS": "Status",
    "PRIORITY": "Priority",
    "IS_DELETE": "Is Delete",
    "JOB_JOB_TYPE_MUL": "JOB JOB TYPE MUL",
    "SQL": "Sql",
    "FILE_EXCEL": "Excel",
    "TEXTAREA": "Textarea",
    "CREATED_BY": "CREATED_BY",
    "MODIFIED_BY": "MODIFIED_BY"
};
Job.prototype.RULE = {
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
    "SOURCE_TYPE": {
        "type": "varchar",
        "require": {
            "empty": true,
            "size": 20
        },
        "size": 20
    },
    "GROUP": {
        "type": "varchar",
        "size": 255
    },
    "BATCH_LIMIT": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },
    "MULTI_LIMIT": {
        "type": "int",
        "require": {
            "empty": true
        },
        "size": 11
    },
    "START_TIME": {
        "type": "int",
        "size": 11
    },
    "FINISH_TIME": {
        "type": "int",
        "size": 11
    },
    "STATUS": {
        "type": "varchar",
        "require": {
            "size": 20
        },
        "size": 20
    },
    "PRIORITY": {
        "default": "1",
        "type": "int",
        "size": 11
    },

    "JOB_JOB_TYPE_MUL": {
        "type": "array",
        "size": 11,
        "require": {
            "empty": true
        },
        "attr_sort": "ID ASC",
        "mul_id": "JOB_ID",
        "mul_id_fk": "JOB_TYPE_ID",
        "defaultValues": {
            "STATUS": Job.STATUS_ENUM.NEW,
            "CREATED_TIME": parseInt(GlobalFunction.newDate() / 1000),
            "MODIFIED_TIME": parseInt(GlobalFunction.newDate() / 1000),
        },
        "fk": {
            "table": "job_type",
            "ref_id": "ID",
            "order_by": "name asc",
            
        },
    },
    "fk_table_JOB_JOB_TYPE_MUL": {
        "type": "any"
    },
    "IS_DELETE": {
        "default": "0",
        "type": "tinyint",
        "size": 1
    },
    "SQL": {
        "type": "varchar",
        "size": 32000
    },
    "TEXTAREA": {
        "type": "varchar",
        "size": 32000
    },
    "FILE_EXCEL": {
        "type": "varchar",
        "size": 32000
    },
    "CREATED_BY": {
        "default": "NULL",
        "type": "int",
        "size": 11,
        "fk": {
            "table": "user",
            "ref_id": "id",
        }
    },
    "MODIFIED_BY": {
        "default": "NULL",
        "type": "int",
        "size": 11,
        "fk": {
            "table": "user",
            "ref_id": "id",
        }
    },
};

Job.prototype.beforeSave = function (validate) {
    if (!this.STATUS) {
        this.STATUS = Job.STATUS_ENUM.NEW;
    }
    if (this.TEXTAREA) {
        this.TEXTAREA = this.TEXTAREA.replace(/\\n/gi, "\n");
    }
    if (this.SQL) {
        this.SQL = this.SQL.replace(/\\n/gi, "\n");
    }
    if (!this.PRIORITY) {
        this.PRIORITY = 1;
    }

    return GlobalActiveRecord.prototype.beforeSave.apply(this, arguments);
}

Job.prototype.afterSave = async function (isNewRecord) {
    if (isNewRecord) {
        var c = await this.queryUpdate(`INSERT INTO LOG
        (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
        VALUES('`+ this.ID + `', 'CREATE_JOB', 'chuyển sang trạng thái ` + Job.STATUS_ENUM.NEW + `',` + GlobalFunction.getTimestamp() + `)`);
        if (c) { };
    }
    return GlobalActiveRecord.prototype.afterSave.apply(this, arguments);
}

Job.prototype.afterUpdate = async function (attributes_change, attributes_old, attributes_new) {
    if (attributes_change.STATUS) {
        var c = await this.queryUpdate(`INSERT INTO LOG
        (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
        VALUES('`+ this.ID + `', 'UPDATE_JOB_STATUS', 'chuyển sang trạng thái ` + attributes_change.STATUS + `',` + GlobalFunction.getTimestamp() + `)`);
        if (c) { };
    }
    if (attributes_change.PRIORITY) {
        var c = await this.queryUpdate(`INSERT INTO LOG
        (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
        VALUES('`+ this.ID + `', 'UPDATE_JOB_PRIORITY', 'PRIORITY chuyển sang ` + attributes_change.PRIORITY + `',` + GlobalFunction.getTimestamp() + `)`);
        if (c) { };
    }
    return GlobalActiveRecord.prototype.afterUpdate.apply(this, arguments);
}

Job.model_instance = false;
Job.get_model_instance = function () {
    if (!Job.model_instance) {
        Job.model_instance = new Job();
    }
    return Job.model_instance;
}

Job.run_initial = async function () {
    var md = Job.get_model_instance();
    var list = await md.findAll({ STATUS: Job.STATUS_ENUM.INITIALING, IS_DELETE: 0 });
    if (!list || !list.length) {
        return Promise.resolve({ hihi: true });
    }
    return GlobalFunction.runMultiRequest(list, async function (data, index) {
        var item = data[index];
        var model = new Job();
        return model.findOne(item.ID).then(r => {
            return model.run_initial();
        })
    })
}

Job.prototype.run_initial = async function () {
    if (this.STATUS == Job.STATUS_ENUM.INITIALING) {
        var rs = false;
        if (this.SOURCE_TYPE == 'excel') {
            rs = await this.exec_excel();
        } else if (this.SOURCE_TYPE == 'textarea') {
            rs = await this.exec_textarea();
        } else if (this.SOURCE_TYPE == 'sql') {
            rs = await this.exec_sql();
        }
        if (rs) {
            var rs_job_job_type_mul = await this.update_job_job_type_mul_by_status(Job.STATUS_ENUM.PENDING);
            if (rs_job_job_type_mul) {
                this.STATUS = Job.STATUS_ENUM.PENDING;
                return this.save(false);
            } else {
                return Promise.resolve(true);
            }
        } else {
            return Promise.resolve(true);
        }
    } else {
        return Promise.resolve(true);
    }
}

Job.run_finish_date = async function () {
    var md = Job.get_model_instance();
    var list_finish = await md.query(`
    SELECT m.FINISH_TIME, d.ID, t.DB_COLLECTION FROM JOB_DETAIL d 
    LEFT JOIN JOB_JOB_TYPE_MUL m ON m.ID = d.JOB_JOB_TYPE_MUL_ID 
    LEFT JOIN JOB_TYPE t ON t.ID = m.JOB_TYPE_ID 
    `);
    var listcollection = [];
    var listcollectionordered = {};
    for (var a of list_finish) {
        if (!listcollection.includes(a.DB_COLLECTION)) {
            listcollection.push(a.DB_COLLECTION);
            listcollectionordered[a.DB_COLLECTION] = [];
        }
        var col = { ID: a.ID, FINISH_TIME: a.FINISH_TIME };
        listcollectionordered[a.DB_COLLECTION].push(col);
    }

    var db = Job.get_list_obj_instance_db_mongo(`mongodb://admin:5baotDrnioux1gka@192.168.106.72:27017/facebook?authSource=admin`);

    for (var collection in listcollectionordered) {
        var updatelist = [];
        for (var row of listcollectionordered[collection]) {
            if (row.ID == 177586) {
                console.log(row.FINISH_TIME);
            }
            updatelist.push({
                updateOne: {
                    filter: { job_detail_id: row.ID },
                    update: {
                        $set: {
                            "finished_date": row.FINISH_TIME
                        }
                    },
                    upsert: false,
                }
            });
            if (updatelist.length == 10000) {
                console.log(updatelist.length);
                db.bulkWrite(collection, updatelist);
                updatelist = [];
            }
        }
        db.bulkWrite(collection, updatelist);
        updatelist = [];
        // propertyName is what you want
        // you can get the value like this: myObject[propertyName]
    }
    /*
   db.bulkWrite(DB_COLLECTION, [{
       updateOne: {
           filter: { job_detail_id:  },
           update: {
               $set: {
                   "finished_date": 
               }
           },
           upsert: true,
       }
   }]);
   */
}

Job.get_list_multi_job = async function () {
    var md = Job.get_model_instance();
    var list_setting = await md.query(`
    select OPTION_VALUE FROM system_setting where option_key = 'job_crawler'
    `);
    return list_setting && list_setting.length ? parseInt(list_setting[0].OPTION_VALUE) : 0;
}

Job.update_job_to_waiting = async function (list_job_ids, list_job_job_type_mul_id) {
    var md = Job.get_model_instance();
    var d = await md.queryUpdate(`INSERT INTO LOG (JOB_ID, "ACTION", MESSAGE, CREATED_TIME) 
        SELECT ID, 'UPDATE_JOB_STATUS', 'chuyển sang trạng thái running',` + GlobalFunction.getTimestamp() + ` FROM F9_APP_CRAWLER.JOB 
            WHERE ID not in (`+ (list_job_ids.join(',')) + `) AND STATUS ='` + Job.STATUS_ENUM.RUNNING + `'`);
    if (d) { }
    var b = await md.queryUpdate(`UPDATE JOB SET STATUS = '` + Job.STATUS_ENUM.WAITING + `' 
        WHERE ID not in (`+ (list_job_ids.join(',')) + `) AND STATUS ='` + Job.STATUS_ENUM.RUNNING + `' `);
    if (b) { }
    var c = await md.queryUpdate(`UPDATE JOB_JOB_TYPE_MUL SET STATUS = '` + Job.STATUS_ENUM.WAITING + `' 
        WHERE ID not in (`+ (list_job_job_type_mul_id.join(',')) + `) AND STATUS ='` + Job.STATUS_ENUM.RUNNING + `' `);
    if (c) { }
    return c;
}

Job.update_job_to_running = async function (job) {
    var md = Job.get_model_instance();
    if (job.STATUS != Job.STATUS_ENUM.RUNNING) {
        var a = await md.queryUpdate(`UPDATE JOB SET STATUS = '` + Job.STATUS_ENUM.RUNNING + `' ` + (!job.START_TIME ? ',START_TIME = ' + GlobalFunction.getTimestamp() : '') + `
            WHERE ID = `+ job.ID + ` AND STATUS IN ('` + Job.STATUS_ENUM.PENDING + `','` + Job.STATUS_ENUM.WAITING + `') `);
        //LOG
        var c = await md.queryUpdate(`INSERT INTO LOG (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
        VALUES('`+ job.ID + `', 'UPDATE_JOB_STATUS', 'chuyển sang trạng thái running',` + GlobalFunction.getTimestamp() + `)`);
        if (a) { }
        if (c) { }
        return c;
    } else {
        return Promise.resolve(true);
    }

}

Job.update_job_to_finish = async function() {
    var md = Job.get_model_instance();
    return md.queryUpdate(`
    UPDATE JOB SET STATUS = 'finished', FINISH_TIME = ` + GlobalFunction.getTimestamp() + ` WHERE ID IN (
        SELECT ID FROM (
        SELECT a.ID,count(CASE WHEN b.STATUS = 'finished' THEN 1 ELSE NULL END) TOTAL_FINISHED,count(*) TOTAL FROM JOB a INNER JOIN JOB_JOB_TYPE_MUL b ON a.ID = b.JOB_ID 
        WHERE a.STATUS IN ('waiting','running')
        GROUP BY a.ID
        ) a WHERE TOTAL_FINISHED = TOTAL
        );
    `);
}

Job.run_crawler_job = async function (offset = 1) {
    offset -= 1;
    var md = Job.get_model_instance();
    var limit = await Job.get_list_multi_job();
    if (!limit) {
        return Promise.resolve(10000);
    }
    var aaa = await Job.update_job_to_finish();
    if(aaa){}
    var jobtobecrawler = await md.query(`
    SELECT a.*,b.ID JOB_JOB_TYPE_MUL_ID,b.JOB_TYPE_ID FROM F9_APP_CRAWLER.JOB a 
	INNER JOIN F9_APP_CRAWLER.JOB_JOB_TYPE_MUL b ON a.ID = b.JOB_ID
	INNER JOIN F9_APP_CRAWLER.JOB_TYPE c ON b.JOB_TYPE_ID = c.ID
WHERE a.STATUS  IN ('pending','waiting','running') AND b.STATUS IN ('pending','waiting','running')
ORDER BY a.PRIORITY,a.ID, c.PRIORITY LIMIT ` + limit + `
    `);
    if (jobtobecrawler && jobtobecrawler.length && offset < jobtobecrawler.length && offset >= 0) {
        var list_job_ids = [];
        var list_job_job_type_mul_id = [];
        for (var item of jobtobecrawler) {
            if (!GlobalFunction.contains(item.ID, list_job_ids)) {
                list_job_ids.push(item.ID);
            }
            list_job_job_type_mul_id.push(item.JOB_JOB_TYPE_MUL_ID);
        }
        var a = await Job.update_job_to_waiting(list_job_ids, list_job_job_type_mul_id);
        if (a) { }
        var end_request = false;
        var rs_job = await GlobalFunction.runMultiRequest([jobtobecrawler[offset]], async function (data, index) {
            var job = data[index];
            var a = await Job.update_job_to_running(job);
            if (a) { }
            var list_jobtype = await md.query(`
                SELECT a.ID,a.STATUS,a.JOB_TYPE_ID,b.NAME TYPE_NAME,b.IS_PAGE,b.DB_MONGO,b.DB_COLLECTION,b.CRAWLER_TYPE,x.LINK,x.NAME,x.TYPE,x.HEADER,x.INPUT FROM JOB_JOB_TYPE_MUL a 
                INNER JOIN JOB_TYPE b ON a.JOB_TYPE_ID = b.ID 
                LEFT JOIN API x on x.ID = b.CRAWLER_TYPE 
                WHERE a.ID = '`+ job.JOB_JOB_TYPE_MUL_ID + `' AND a.STATUS IN ('` + Job.STATUS_ENUM.PENDING + `','` + Job.STATUS_ENUM.RUNNING + `','` + Job.STATUS_ENUM.WAITING + `') ORDER BY b.PRIORITY DESC LIMIT 1
                `);
                console.log('list_jobtype',list_jobtype.length);
            if (list_jobtype.length > 0) {
                var jobtype = list_jobtype[0];
                if (jobtype.STATUS != Job.STATUS_ENUM.RUNNING) {
                    var a1 = await md.queryUpdate(`UPDATE JOB_JOB_TYPE_MUL SET STATUS = '` + Job.STATUS_ENUM.RUNNING + `' 
                            WHERE ID = `+ jobtype.ID + ` AND STATUS IN ('` + Job.STATUS_ENUM.PENDING + `','` + Job.STATUS_ENUM.WAITING + `') `);
                    var a3 = await md.queryUpdate(`INSERT INTO LOG
                        (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
                        VALUES('`+ job.ID + `', 'UPDATE_JOB_TYPE', '` + jobtype.TYPE_NAME + ` chuyển sang trạng thái running',` + GlobalFunction.getTimestamp() + `)`);
                    if (a1) { }
                    if (a3) { }
                }
                var c = await Job.run_batch(job, jobtype, jobtype.NAME);
                if (c == 2 * 60 * 1000) {
                    end_request = true;
                }
                return c;
            } else {
                var r = await md.queryUpdate(`UPDATE JOB SET STATUS = '` + Job.STATUS_ENUM.FINISHED + `' , FINISH_TIME = ` + GlobalFunction.getTimestamp() + `
                    WHERE ID = `+ job.ID + ` AND STATUS IN ('` + Job.STATUS_ENUM.PENDING + `','` + Job.STATUS_ENUM.RUNNING + `','` + Job.STATUS_ENUM.WAITING + `') `);
                var c = await md.queryUpdate(`INSERT INTO LOG
                (JOB_ID, "ACTION", MESSAGE, CREATED_TIME)
                VALUES('`+ job.ID + `', 'UPDATE_JOB_STATUS', 'chuyển sang trạng thái ` + Job.STATUS_ENUM.FINISHED + `',` + GlobalFunction.getTimestamp() + `)`);
                if (c) { }
                return r;
            }
        })
        if (rs_job) { }
        return end_request ? 2 * 60 * 1000 : 10;
    } else {
        return Promise.resolve(10000);
    }
}

Job.run_batch = async function (job, type, typename) {
    var md = Job.get_model_instance();
    var jobdetails = await md.query(`
    SELECT a.ID,a.OBJECT_ID,a.JOB_JOB_TYPE_MUL_ID FROM JOB_DETAIL a 
        WHERE a.JOB_JOB_TYPE_MUL_ID = `+ type.ID + ` AND a.STATUS = 0 
        ORDER BY a.JOB_JOB_TYPE_MUL_ID LIMIT `+ job.BATCH_LIMIT);
    if (jobdetails.length > 0) {
        return Job.crawl(type.JOB_TYPE_ID, type.LINK, type.TYPE, JSON.parse(type.HEADER.replace(/\\/gi, '')), type.INPUT, job.MULTI_LIMIT, jobdetails, md, type.DB_MONGO, type.DB_COLLECTION, job.ID, type.ID, typename, type.IS_PAGE);
    } else {
        var b = await md.queryUpdate(`UPDATE JOB_JOB_TYPE_MUL SET STATUS = '` + Job.STATUS_ENUM.FINISHED + `', FINISH_TIME = ` + GlobalFunction.getTimestamp() + `
        WHERE ID = `+ type.ID + ` AND STATUS IN ('` + Job.STATUS_ENUM.PENDING + `','` + Job.STATUS_ENUM.RUNNING + `','` + Job.STATUS_ENUM.WAITING + `') `);
        if (b) { }
        return 10;
    }
}

Job.crawl = async function (type_id, link, type, header, input, multi, jobdetails, md, DB_MONGO, DB_COLLECTION, JOB_ID, JOB_TYPE_ID, typename, IS_PAGE) {
    var list_job_detail_count = await md.query(`SELECT count(*) C FROM JOB_DETAIL a INNER JOIN JOB_JOB_TYPE_MUL b ON a.JOB_JOB_TYPE_MUL_ID = b.ID WHERE a.STATUS = 1 AND JOB_JOB_TYPE_MUL_ID = ` + JOB_TYPE_ID);
    var list_job_detail_count_error = await md.query(`SELECT count(*) C FROM JOB_DETAIL a INNER JOIN JOB_JOB_TYPE_MUL b ON a.JOB_JOB_TYPE_MUL_ID = b.ID WHERE a.STATUS = 2 AND JOB_JOB_TYPE_MUL_ID = ` + JOB_TYPE_ID);
    var list_job_detail_count_all = await md.query(`SELECT count(*) C FROM JOB_DETAIL a INNER JOIN JOB_JOB_TYPE_MUL b ON a.JOB_JOB_TYPE_MUL_ID = b.ID  WHERE  JOB_JOB_TYPE_MUL_ID = ` + JOB_TYPE_ID);
    var count_valid = list_job_detail_count.length ? list_job_detail_count[0].C : 0;
    var count_error = list_job_detail_count_error.length ? list_job_detail_count_error[0].C : 0;
    var count_all = list_job_detail_count_all.length ? list_job_detail_count_all[0].C : 0;
    var params = [];
    var inputs = input.split(",");
    var params_obj = {};
    for (var i of inputs) {
        var kv = i.split(":");
        if (kv.length == 2) {
            params_obj[kv[0]] = kv[1];
        }
    }
    for (var jdetail of jobdetails) {
        var param = {
            ID: jdetail.ID,
            OBJECT_ID: jdetail.OBJECT_ID,
        };
        for (var k in params_obj) {
            param[k] = params_obj[k] == 'ids' ? jdetail.OBJECT_ID : params_obj[k];
        }
        params.push(param);
    }
    var end_request = false;

    console.log('chay batch', params.length);
    var list_ids_valid = [];
    var list_ids_err = [];
    var list_ids_err_obj = {};
    var con_i = 0;

    async function process_multi(list_ids_valid, list_ids_err, list_ids_err_obj) {
        if (list_ids_valid.length > 0) {
            var today = new Date();
            var date = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var a1 = await md.queryUpdate(`
                    UPDATE JOB_DETAIL SET STATUS = 1, FINISH_TIME=` + GlobalFunction.getTimestamp() + `, FILTER_DATE = DATE('` + year + `-` + month + `-` + date + `') 
                        WHERE ID IN (`+ list_ids_valid.join(",") + `) `);
            if(a1){}
            count_valid += list_ids_valid.length;
        }
        if (list_ids_err.length > 0) {
            var a2 = await Job.update_list_error(list_ids_err_obj);
            if(a2){}
            count_error += list_ids_err.length;
        }

        //LOG
        if (list_ids_valid.length || list_ids_err.length) {
            var a3 = await md.queryUpdate(`INSERT INTO LOG
            (JOB_ID, ACTION, MESSAGE, CREATED_TIME)
            VALUES('`+ JOB_ID + `', 'INSERT_BATCH', 'crawl: valid ` + count_valid + `/error ` + count_error + `/total ` + count_all + ` batch - Loai job: ` + typename + `',` + GlobalFunction.getTimestamp() + `)
            `);
            if(a3){}
        }
        return Promise.resolve(true);
    }
    var start_time = new Date().getTime();
    // if(multi > 500) {multi = 500;}
    var a = await GlobalFunction.runMultiRequest(params, async function (data, index) {
        if (end_request) {
            con_i++;
            return Promise.resolve(true);
        }
        var val = data[index];
        var valID = val.ID;
        var objID = val.OBJECT_ID;
        delete val.ID;
        delete val.OBJECT_ID;
        var a = await Job.callApi(link, type, header, val, md, DB_MONGO, DB_COLLECTION, JOB_ID, JOB_TYPE_ID, valID, objID, IS_PAGE);
        if (a.status == 0) {
            list_ids_valid.push(valID);
        } else if (a.status == 2) {
            list_ids_err.push(valID);
            if(a.data && a.data.error && a.data.error.message) {
                if(!list_ids_err_obj[a.data.error.message]) {
                    list_ids_err_obj[a.data.error.message] = [];
                }
                list_ids_err_obj[a.data.error.message].push(valID);
            }
        } else if (a.status == 10) {
            console.log('dung lai');
            end_request = true;
        }
        con_i++;
        if (con_i == multi) {
            con_i = 0;
            console.log('index', index, new Date().getTime() - start_time);
            process_multi(list_ids_valid, list_ids_err, list_ids_err_obj);
            list_ids_valid = [];
            list_ids_err = [];
            list_ids_err_obj = {};
        }
        return Promise.resolve(true);



    }, multi);
    if (a) { }
    if (con_i) {
        var a22 = await process_multi(list_ids_valid, list_ids_err, list_ids_err_obj);
        if (a22) { }
    }
    if (end_request) {
        return 2 * 60 * 1000;
    } else {
        return 10;
    }
}

Job.list_obj_instance_db_mongo = {};
Job.get_list_obj_instance_db_mongo = function (DB_MONGO) {
    if (!Job.list_obj_instance_db_mongo[DB_MONGO]) {
        Job.list_obj_instance_db_mongo[DB_MONGO] = new MONGODB({ url: DB_MONGO });
    }
    return Job.list_obj_instance_db_mongo[DB_MONGO];
}

function get_date() {
    var d = new Date();
    var mm = d.getMonth() + 1;
    if (mm < 10) { mm = '0' + mm; }
    var dd = d.getDate();
    if (dd < 10) { dd = '0' + dd; }
    return d.getFullYear() + '' + mm + '' + dd;
}
Job.callApi = async function (link, type, header, val, md, DB_MONGO, DB_COLLECTION, JOB_ID, JOB_TYPE_ID, valID, objID, IS_PAGE) {
    var headerdata = header;
    var db = Job.get_list_obj_instance_db_mongo(DB_MONGO);
    var def = Q.defer();
    var rs = await Job.callApiDetail(link, type, headerdata, val, objID);
    if (rs.status == 10 || rs.status == 1) {
        return rs;
    }
    db.bulkWrite(DB_COLLECTION, [{
        updateOne: {
            filter: { _id: valID + "_0" },
            update: {
                $set: {
                    "_id": valID + "_0",
                    "status": -1, // dữ liệu chưa xử lí
                    "job_detail_id": valID,
                    "object_id": objID,
                    "job_id": JOB_ID,
                    "job_type": JOB_TYPE_ID,
                    "finished_date": GlobalFunction.getTimestamp(),
                    "date": get_date(),
                    "data": rs.data, // data crawler
                    "error": rs.data.error ? true : false
                }
            },
            upsert: true,
        }
    }]);
    var paging_token = IS_PAGE && rs.data.paging_token ? rs.data.paging_token : false;
    if (!paging_token) {
        def.resolve(rs);
    } else {
        var list_obj_paging_token = {};
        while (paging_token) {
            if (!list_obj_paging_token[paging_token]) {
                list_obj_paging_token[paging_token] = 1;
            } else {
                def.resolve(rs);
                break;
            }
            var val_new = Object.assign({ paging_token: paging_token }, val);
            var rs_new = await Job.callApiDetail(link, type, headerdata, val_new, objID);
            if (rs_new.status == 10) {
                def.resolve(rs);
                break;
            }
            if (rs_new.status != 1) {
                if (rs_new.data.data && rs_new.data.data.length) {
                    db.bulkWrite(DB_COLLECTION, [{
                        updateOne: {
                            filter: { _id: valID + "_" + paging_token },
                            update: {
                                $set: {
                                    "_id": valID + "_" + paging_token,
                                    "status": -1, // dữ liệu chưa xử lí
                                    "job_detail_id": valID,
                                    "object_id": objID,
                                    "job_id": JOB_ID,
                                    "job_type": JOB_TYPE_ID,
                                    "page": paging_token,
                                    "finished_date": GlobalFunction.getTimestamp(),
                                    "date": get_date(),
                                    "data": rs_new.data, // data crawler
                                    "error": false
                                }
                            },
                            upsert: true,
                        }
                    }]);
                }
                paging_token = rs_new.data.paging_token ? rs_new.data.paging_token : false;
                if (!paging_token) {
                    def.resolve(rs);
                }
            }
        }
        delete list_obj_paging_token;
    }
    return def.promise;

}

var run_limit = 100;
var run_current = 0;
var count_err = 0;

Job.callApiDetail = async function (link, type, headerdata, val, objID) {
    var defer = Q.defer();
    if (type == 'POST') {
        link = ApiServer.get_server() + link;
        request.post(link, { json: val, headers: headerdata, timeout: 30000 }, async function (c_req, c_res) {
            let params = false;
            var status = 1;
            if (c_res && c_res.body) {
                params = c_res.body;
                if (params['error']) {
                    params['error']['message'] = params['error']['message'].replace(new RegExp('' + objID,'gi'), '{object_id}');
                    if (params['error']['message'].match(/ limit | validating access token| user changed their password | OAuth /gi)) {
                        run_current++;
                        status = run_current >= run_limit ? 10 : 1;
                        // console.log('loi dung data 1', run_current, link, type, headerdata, val, objID);
                    } else {
                        run_current = 0;
                        status = 2;
                    }
                } else {
                    run_current = 0;
                    status = 0;
                }
            } else {
                // run_current++;
                status = run_current == run_limit ? 10 : 1;
                // console.log('loi dung data 2',run_current, link, type, headerdata, val, objID, c_req);
                count_err++;
                console.log('count_err', count_err, c_req);
            }
            defer.resolve({
                data: params,
                status: status
            });
        });
    } else {
        console.log('loi dung data full', link, type, headerdata, val, objID);
        defer.resolve({
            data: false,
            status: 10
        });
    }
    return defer.promise;
}

Job.model_facebook_error_instance = false;
Job.get_model_facebook_error_instance = function () {
    if (!Job.model_facebook_error_instance) {
        Job.model_facebook_error_instance = new Job();
        Job.model_facebook_error_instance._table_name = 'FACEBOOK_ERROR';
    }
    return Job.model_facebook_error_instance;
}

Job.update_list_error = async function (list_error_obj) {

    var list_error = [];
    for(var k in list_error_obj) {
        list_error.push({
            ERROR_NAME  : k,
            list_ids    : [].concat(list_error_obj[k])
        });
    }

    if (list_error.length) {
        var md = Job.get_model_instance();
        var today = GlobalFunction.newDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var list_error_full_obj = await Job.get_list_error();
        var list_data_insert = [];
        for (var message of list_error) {
            if (!list_error_full_obj[message.ERROR_NAME]) {
                list_data_insert.push({
                    NAME: message.ERROR_NAME,
                })
            }
        }
        if (list_data_insert.length) {
            var r = await Job.model_facebook_error_instance.insertMany(list_data_insert);
            if (r) { }
            Job.list_error_obj = false;
            list_error_full_obj = await Job.get_list_error();
        }

        return GlobalFunction.runMultiRequest(list_error, async function(data,index){
            var item = data[index];
            var ERROR_ID = list_error_full_obj[item.ERROR_NAME];
            var list_ids_err = item.list_ids;
            return md.queryUpdate(`
                UPDATE JOB_DETAIL SET STATUS = 2, ERROR_ID = ` + ERROR_ID + `, FINISH_TIME=` + GlobalFunction.getTimestamp() + `, FILTER_DATE = DATE('` + date + `') 
                    WHERE ID IN (`+ list_ids_err.join(",") + `) `);
        },1)
    }
    return Promise.resolve(true);
}


Job.update_list_error_test = async function (list_error_obj) {

    var list_error = [];
    for(var k in list_error_obj) {
        list_error.push({
            ERROR_NAME  : k,
            list_ids    : [].concat(list_error_obj[k])
        });
    }

    if (list_error.length) {
        var md = Job.get_model_instance();

        var list_error_full_obj = await Job.get_list_error();
        var list_data_insert = [];
        for (var message of list_error) {
            if (!list_error_full_obj[message.ERROR_NAME]) {
                list_data_insert.push({
                    NAME: message.ERROR_NAME,
                })
            }
        }
        if (list_data_insert.length) {
            var r = await Job.model_facebook_error_instance.insertMany(list_data_insert);
            if (r) { }
            Job.list_error_obj = false;
            list_error_full_obj = await Job.get_list_error();
        }

        return GlobalFunction.runMultiRequest(list_error, async function(data,index){
            var item = data[index];
            var ERROR_ID = list_error_full_obj[item.ERROR_NAME];
            var list_ids_err = item.list_ids;
            return md.queryUpdate(`
                UPDATE JOB_DETAIL SET ERROR_ID = ` + ERROR_ID + `
                    WHERE ID IN (`+ list_ids_err.join(",") + `)  `);
        })
    }
    return Promise.resolve(true);
}



Job.list_error_obj = false;
Job.get_list_error = async function () {
    if (!Job.list_error_obj) {
        Job.list_error_obj = {};
        var model = Job.get_model_facebook_error_instance();
        var list = await model.query(`select * from f9_app_crawler.facebook_error`);
        if (list && list.length) {
            for (var item of list) {
                Job.list_error_obj[item.NAME] = item.ID;
            }
        }
    }
    return Job.list_error_obj;
}

Job.prototype.update_job_job_type_mul_by_status = async function (status) {
    return this.queryUpdate(`UPDATE F9_APP_CRAWLER.JOB_JOB_TYPE_MUL SET STATUS = '` + status + `', MODIFIED_TIME = ` + (GlobalFunction.newDate().getTime() / 1000) + ` WHERE JOB_ID = ` + this.ID);
}

Job.prototype.get_list_job_job_type_mul = async function () {
    return this.query(`SELECT * FROM F9_APP_CRAWLER.JOB_JOB_TYPE_MUL WHERE JOB_ID = ` + this.ID);
}

Job.prototype.exec_textarea = async function () {
    console.log('bat dau insert job detail by textarea', this.ID, this.NAME, this.TEXTAREA);
    if (!this.TEXTAREA || !this.TEXTAREA.trim()) {
        return Promise.resolve(true);
    }
    var list_rows_str = this.TEXTAREA.trim().replace(/,/gi, '\\n');
    var list_rows = list_rows_str.split('\\n');
    var rows = [];
    var rows_obj = [];
    var list_job_job_type_mul = await this.get_list_job_job_type_mul();
    var date_now = GlobalFunction.newDate();
    var created_time = parseInt(date_now.getTime() / 1000);
    var filter_date_create = GlobalFunction.getDateNow();
    for (var item of list_rows) {
        if (item) {
            item = item.trim();
            if (item.length < 41) {
                for (var it of list_job_job_type_mul) {
                    var key = it.ID + '_' + item;
                    if (!rows_obj[key]) {
                        rows_obj[key] = 1;
                        rows.push({
                            JOB_JOB_TYPE_MUL_ID: it.ID,
                            OBJECT_ID: item,
                            STATUS: 0,
                            CREATED_TIME: created_time,
                            FILTER_DATE_CREATE: filter_date_create,
                            JOB_ID: it.JOB_ID,
                            JOB_TYPE_ID: it.JOB_TYPE_ID,
                        });
                    }
                }
            }
        }
    }
    var md_detail = new Job();
    md_detail._table_name = 'JOB_DETAIL';
    var start_time = new Date().getTime();

    var rs = await md_detail.insertManyByLimit(rows, 5000);
    if (rs) { }
    console.log('ket thuc insert job detail by textarea', this.ID, this.NAME);
    return rs;
}

Job.test_excel = async function () {
    var j = new Job();
    return j.findOne(104).then(r => {
        return j.exec_excel();
    })
}


Job.prototype.exec_excel = async function () {
    console.log('bat dau insert job detail by excel', this.ID, this.NAME);
    var link_file = CONFIG.LINK_IMAGE + this.FILE_EXCEL;
    if (CONFIG.APPLiCATION_PATH.indexOf('/var/www') == -1) {
        var link_file = 'C:/project/db/crawlersystem/' + this.FILE_EXCEL;
        GlobalFile.rmkdir('C:/project/db/crawlersystem/');
        var content = await GlobalRequest.file(CONFIG.LINK_IMAGE_URL + encodeURIComponent(this.FILE_EXCEL), link_file);
        if (content) { }
    }
    var model_excel = new GlobalExcel(link_file);

    var list_rows = model_excel.getData();
    var rows = [];
    var rows_obj = [];
    var list_job_job_type_mul = await this.get_list_job_job_type_mul();
    var date_now = GlobalFunction.newDate();
    var created_time = parseInt(date_now.getTime() / 1000);
    var filter_date_create = GlobalFunction.getDateNow();
    for (var row of list_rows) {
        var item = row['object_id'] || row['objectid'] || row['facebook_id'] || row['facebookid'];
        if (item) {
            item = item.trim();
            if (item.length < 41) {
                for (var it of list_job_job_type_mul) {
                    var key = it.ID + '_' + item;
                    if (!rows_obj[key]) {
                        rows_obj[key] = 1;
                        rows.push({
                            JOB_JOB_TYPE_MUL_ID: it.ID,
                            OBJECT_ID: item,
                            STATUS: 0,
                            CREATED_TIME: created_time,
                            FILTER_DATE_CREATE: filter_date_create,
                            JOB_ID: it.JOB_ID,
                            JOB_TYPE_ID: it.JOB_TYPE_ID,
                        });
                    }
                }
            }
        }
    }
    var md_detail = new Job();
    md_detail._table_name = 'JOB_DETAIL';
    var rs = await md_detail.insertManyByLimit(rows, 5000);
    if (rs) { }
    console.log('ket thuc insert job detail by excel', this.ID, this.NAME);
    return rs;
}
Job.model_read_only = false;
Job.get_model_read_only = function () {
    if (!Job.model_read_only) {
        Job.model_read_only = new Job();
        Job.model_read_only.setDb(CONFIG.SERVER['db2_f9_dm_user']);
    }
    return Job.model_read_only;
}

Job.prototype.exec_sql = async function () {
    console.log('bat dau insert job detail by sql', this.ID, this.NAME, this.SQL);
    var model_read_only = Job.get_model_read_only();
    var md_detail = new Job();
    md_detail._table_name = 'JOB_DETAIL';

    var rs_cursor = await model_read_only.queryCursor(this.SQL);
    if (!rs_cursor) {
        console.log('cursor chet');
        return Promise.resolve(false);
    }
    var list_job_job_type_mul = await this.get_list_job_job_type_mul();
    var date_now = GlobalFunction.newDate();
    var created_time = parseInt(date_now.getTime() / 1000);
    var filter_date_create = GlobalFunction.getDateNow();
    var rows = [];
    var row = rs_cursor.next();
    var i = 0;
    while (!row || !row.done) {
        var rw = row.value;
        var item = rw['OBJECT_ID'] || rw['FACEBOOK_ID'];
        if (item) {
            item = item.trim();
            if (item.length < 41) {
                for (var it of list_job_job_type_mul) {
                    rows.push({
                        JOB_JOB_TYPE_MUL_ID: it.ID,
                        OBJECT_ID: item,
                        STATUS: 0,
                        CREATED_TIME: created_time,
                        FILTER_DATE_CREATE: filter_date_create,
                        JOB_ID: it.JOB_ID,
                        JOB_TYPE_ID: it.JOB_TYPE_ID,
                    });
                }
            }
        }

        row = rs_cursor.next();
        if (rows.length == 100000) {
            var a = await md_detail.insertManyByLimit(rows, 8000);
            if (a) { }
            rows = [];
            console.log('insert job detail by sql', this.ID, this.NAME, this.SQL, i);
            i++;
        }
    }
    if (rows && rows.length) {
        var a = await md_detail.insertManyByLimit(rows, 8000);
        if (a) { }
        console.log('ket thuc insert job detail by sql', this.ID, this.NAME, this.SQL);
        return a;
    } else {
        return Promise.resolve(true);
    }

}

Job.prototype.clone_from_schedule = async function (schedule) {
    var job = new Job();
    job.NAME = schedule.JOB_NAME + "_" + new Date();
    job.SOURCE_TYPE = schedule.JOB_SOURCE_TYPE;
    job.GROUP = schedule.JOB_GROUP;
    job.BATCH_LIMIT = schedule.JOB_BATCH_LIMIT;
    job.MULTI_LIMIT = schedule.JOB_MULTI_LIMIT;
    job.STATUS = Job.STATUS_ENUM.INITIALING;
    job.PRIORITY = schedule.JOB_PRIORITY;
    job.IS_DELETE = 0;
    job.JOB_JOB_TYPE_MUL = schedule.JOB_SCHEDULE_JOB_TYPE_MUL;
    job.SQL = schedule.JOB_SQL;
    job.FILE_EXCEL = schedule.JOB_FILE_EXCEL;
    job.TEXTAREA = schedule.JOB_TEXTAREA;
    job.CREATED_BY = schedule.CREATED_BY;

    return job.save();
}

Job.build_query_update_job_type_job_id = async function () {
    var job = new Job();
    var list = await job.query(`select * from job_job_type_mul`);
    var list_query = [];
    for (var item of list) {
        list_query.push(`update job_detail set job_type_id = ` + item.JOB_TYPE_ID + ', job_id = ' + item.JOB_ID + ` WHERE JOB_JOB_TYPE_MUL_ID = ` + item.ID);
    }
    return GlobalFunction.runMultiRequest(list_query, async function (data, index) {
        var r = await job.queryUpdate(data[index]);
        console.log(r, index);
        return r;
    }, 1)
}

exports = module.exports = Job;