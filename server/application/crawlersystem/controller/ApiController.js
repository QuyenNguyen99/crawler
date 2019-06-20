var GlobalController = require('../../../core/global_controller');
const GlobalFunction = require('../../../core/global_function');
const Global_Oracledb = require('../../../core/global_oracledb');
const Q = require('q');
ApiController = GlobalFunction.cloneFunc(GlobalController);
const config = require('../../../config/config');

ApiController.prototype.init = async function () {
    GlobalController.prototype.init.apply(this, arguments);
}

ApiController.prototype.get_actionInitial = async function () {
    var id = this.req.query.id;
    var that = this;
    var table_name = that.req.query.table_name;
    if (that.req.role[table_name + '_update']) {
        return that.model.findOne(id, true).then(r => {
            that.model.setAttributes({ STATUS: 'initialing' });
            return that.model.save(false).then(r => {
                return Promise.resolve({
                    code: 200,
                });
            })
        })
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionPaused = async function () {
    var id = this.req.query.id;
    var that = this;
    var table_name = that.req.query.table_name;
    if (that.req.role[table_name + '_update']) {
        return that.model.findOne(id, true).then(r => {
            that.model.setAttributes({ STATUS: 'paused' });
            return that.model.save(false).then(r => {
                return Promise.resolve({
                    code: 200,
                });
            })
        })
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionCanceled = async function () {
    var id = this.req.query.id;
    var that = this;
    var table_name = that.req.query.table_name;
    if (that.req.role[table_name + '_update']) {
        return that.model.findOne(id, true).then(r => {
            that.model.setAttributes({ STATUS: 'canceled' });
            return that.model.save(false).then(r => {
                return Promise.resolve({
                    code: 200,
                });
            })
        })
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionWaiting = async function () {
    var id = this.req.query.id;
    var that = this;
    var table_name = that.req.query.table_name;
    if (that.req.role[table_name + '_update']) {
        return that.model.findOne(id, true).then(r => {
            if (that.model.STATUS == 'paused') {
                that.model.setAttributes({ STATUS: 'waiting' });
                return that.model.save(false).then(r => {
                    return Promise.resolve({
                        code: 200,
                    });
                })
            } else {
                return Promise.resolve({
                    code: 200,
                });
            }
        })
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJobresult = async function () {
    var id = this.req.query.id;
    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID,
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
	            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL
	            WHERE JOB_ID = `+id+`
	            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID`);
        if(rs && rs.length) {
            for (var item of rs) {
                item.NOT_RUNNING = GlobalFunction.number_format(item.NOT_RUNNING.toString());
                item.VALID = GlobalFunction.number_format(item.VALID.toString());
                item.ERROR = GlobalFunction.number_format(item.ERROR.toString());
                item.TOTAL = GlobalFunction.number_format(item.TOTAL.toString());
            }
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJobtotalresult = async function () {
    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID, 
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL 
            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID`);
        if (rs && rs.length) {
            for (var r of rs) {
                r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
                r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
                r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
                r.VALID = GlobalFunction.number_format(r.VALID.toString());
                r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
            }
        } else {
            rs = [];
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.post_actionJobupdatesort = async function () {
    var that = this;
    if (that.req.role['job_sort']) {
        var list_update = this.req.body.list_update;

        var rs = await GlobalFunction.runMultiRequest(list_update, async function (data, index) {
            var item = data[index];
            var j = new Job();
            var r = await j.findOne(item.id);
            if (r && r.ID) {
                j.PRIORITY = item.PRIORITY;
                return j.save(false);
            } else {
                return Promise.resolve(true);
            }
        })
        if (rs) { }
        return Promise.resolve({
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}


ApiController.prototype.get_actionJobdailyresult = async function () {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID, 
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL 
            WHERE FILTER_DATE_CREATE = '` + GlobalFunction.getDateNow() + `' OR FILTER_DATE = '` + GlobalFunction.getDateNow() + `'
            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID`);
        if (rs && rs.length) {
            for (var r of rs) {
                r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
                r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
                r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
                r.VALID = GlobalFunction.number_format(r.VALID.toString());
                r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
            }
        } else {
            rs = [];
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJobmonthlyresult = async function () {
    var firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID, 
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL 
            WHERE (FILTER_DATE_CREATE >= '`+ GlobalFunction.getDateNow(firstDay) + `' AND  FILTER_DATE_CREATE <= '` + GlobalFunction.getDateNow(lastDay) + `') OR
            (FILTER_DATE >= '`+ GlobalFunction.getDateNow(firstDay) + `' AND  FILTER_DATE <= '` + GlobalFunction.getDateNow(lastDay) + `') 
            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID
        `);
        if (rs && rs.length) {
            for (var r of rs) {
                r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
                r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
                r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
                r.VALID = GlobalFunction.number_format(r.VALID.toString());
                r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
            }
        } else {
            rs = [];
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJobyearlyresult = async function () {
    var start = new Date(new Date().getFullYear(), 0, 1);

    var end = new Date(new Date().getFullYear(), 11, 31);

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID, 
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL 
            WHERE (FILTER_DATE_CREATE >= '`+ GlobalFunction.getDateNow(start) + `' AND  FILTER_DATE_CREATE <= '` + GlobalFunction.getDateNow(end) + `' ) OR
            (FILTER_DATE >= '`+ GlobalFunction.getDateNow(start) + `' AND  FILTER_DATE <= '` + GlobalFunction.getDateNow(end) + `' )
            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID
        `);
        if (rs && rs.length) {
            for (var r of rs) {
                r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
                r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
                r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
                r.VALID = GlobalFunction.number_format(r.VALID.toString());
                r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
            }
        } else {
            rs = [];
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJobfromdatetodateresult = async function () {

    var start = Date.parse(this.req.query.start);

    var end = Date.parse(this.req.query.end);

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT b.NAME,a.* FROM (
            SELECT JOB_TYPE_ID ID, 
            sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
            sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
            sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
            sum(a.TOTAL) TOTAL
            FROM (
            SELECT JOB_TYPE_ID,STATUS,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL 
            WHERE (FILTER_DATE_CREATE >= '`+ GlobalFunction.getDateNow(start) + `' AND  FILTER_DATE_CREATE <= '` + GlobalFunction.getDateNow(end) + `' ) OR
            (FILTER_DATE >= '`+ GlobalFunction.getDateNow(start) + `' AND  FILTER_DATE <= '` + GlobalFunction.getDateNow(end) + `' )
            GROUP BY JOB_TYPE_ID,STATUS
            ) a
            GROUP BY JOB_TYPE_ID
        ) a INNER JOIN F9_APP_CRAWLER.JOB_TYPE b ON a.ID = b.ID ORDER BY b.ID`);
        for (var r of rs) {
            r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
            r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
            r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
            r.VALID = GlobalFunction.number_format(r.VALID.toString());
            r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}


ApiController.prototype.get_actionExactlydate = async function () {


    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT a.NAME,a.ID,
                sum(CASE WHEN a.STATUS = 0 THEN a.TOTAL ELSE NULL END) NOT_RUNNING,
                sum(CASE WHEN a.STATUS = 2 THEN a.TOTAL ELSE NULL END) ERROR,
                sum(CASE WHEN a.STATUS = 1 THEN a.TOTAL ELSE NULL END) VALID,
                sum(a.TOTAL) TOTAL 
                FROM (
        SELECT c.NAME,a.STATUS,c.ID, 
            count(*) TOTAL 
                FROM JOB_DETAIL a
                    INNER JOIN JOB_JOB_TYPE_MUL b ON a.JOB_JOB_TYPE_MUL_ID = b.ID
                    INNER JOIN JOB_TYPE c ON b.JOB_TYPE_ID = c.ID WHERE a.FILTER_DATE =DATE('`+ this.req.query.data + `')  
                    GROUP BY c.NAME,a.STATUS,c.ID
        ) a GROUP BY a.NAME,a.ID;`);
        for (var r of rs) {
            r.PERCENT = (r.VALID / r.TOTAL * 100).toFixed(2).toString() + "%";
            r.NOT_RUNNING = GlobalFunction.number_format(r.NOT_RUNNING.toString());
            r.ERROR = GlobalFunction.number_format(r.ERROR.toString());
            r.VALID = GlobalFunction.number_format(r.VALID.toString());
            r.TOTAL = GlobalFunction.number_format(r.TOTAL.toString());
        }
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionHeatchartdata = async function () {
    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT FILTER_DATE,COUNT(*) AS CNT FROM JOB_DETAIL WHERE FILTER_DATE IS NOT NULL GROUP BY FILTER_DATE`);

        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJoberrortotally = async function () {

    var type = this.req.query.typeid;

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT NAME,TOTAL FROM (
            SELECT ERROR_ID,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL WHERE JOB_TYPE_ID = ` + type + ` GROUP BY ERROR_ID
            ) a 
            INNER JOIN F9_APP_CRAWLER.FACEBOOK_ERROR b ON a.ERROR_ID = b.ID ORDER BY b.ID`);
        return Promise.resolve({
            data: rs,
            code: 200,
        });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionJoberroryearly = async function () {
    var date_now = GlobalFunction.newDate();
    var firstDay = new Date(date_now.getFullYear(), 0, 1);
    var lastDay = new Date(date_now.getFullYear(), 11, 31);

    var date_start = GlobalFunction.getDateNow(firstDay);
    var date_end = GlobalFunction.getDateNow(lastDay);

    var type = this.req.query.typeid;

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT NAME,TOTAL FROM (
            SELECT ERROR_ID,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL WHERE JOB_TYPE_ID = ` + type + ` AND FILTER_DATE >= '` + date_start + `' AND FILTER_DATE <= '` + date_end + `' GROUP BY ERROR_ID
            ) a 
            INNER JOIN F9_APP_CRAWLER.FACEBOOK_ERROR b ON a.ERROR_ID = b.ID ORDER BY b.ID`);

            return Promise.resolve({
                data: rs,
                code: 200,
            });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}


ApiController.prototype.get_actionJoberrormonthly = async function () {
    var date_now = GlobalFunction.newDate();
    var firstDay = new Date(date_now.getFullYear(), date_now.getMonth(), 1);
    var lastDay = new Date(date_now.getFullYear(), date_now.getMonth() + 1, 0);

    var date_start = GlobalFunction.getDateNow(firstDay);
    var date_end = GlobalFunction.getDateNow(lastDay);

    var type = this.req.query.typeid;

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT NAME,TOTAL FROM (
            SELECT ERROR_ID,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL WHERE JOB_TYPE_ID = ` + type + ` AND FILTER_DATE >= '` + date_start + `' AND FILTER_DATE <= '` + date_end + `' GROUP BY ERROR_ID
            ) a 
            INNER JOIN F9_APP_CRAWLER.FACEBOOK_ERROR b ON a.ERROR_ID = b.ID ORDER BY b.ID`);
            return Promise.resolve({
                data: rs,
                code: 200,
            });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}



ApiController.prototype.get_actionJoberrordaily = async function () {
    var type = this.req.query.typeid;

    var that = this;
    if (that.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT NAME,TOTAL FROM (
            SELECT ERROR_ID,count(*) TOTAL FROM F9_APP_CRAWLER.JOB_DETAIL WHERE JOB_TYPE_ID = ` + type + ` AND FILTER_DATE = '` + GlobalFunction.getDateNow() + `' GROUP BY ERROR_ID
            ) a 
            INNER JOIN F9_APP_CRAWLER.FACEBOOK_ERROR b ON a.ERROR_ID = b.ID ORDER BY b.ID`);
            return Promise.resolve({
                data: rs,
                code: 200,
            });
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}


ApiController.prototype.get_actionOptionkey = async function () {
    if (this.req.role['job_read']) {
        var j = new Job();
        var rs = await j.query(`SELECT OPTION_VALUE FROM SYSTEM_SETTING WHERE OPTION_KEY = 'job_crawler'`);

        if (rs.length) {
            return Promise.resolve({
                data: rs[0]['OPTION_VALUE'],
                code: 200,
            });
        }
        else {
            return Promise.resolve({
                code: 400,
                error: 'Không có dữ liệu'
            });
        }
    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

ApiController.prototype.get_actionUpdateoptionkey = async function () {
    if (this.req.role['job_read']) {
        var j = new Job();
        if (this.req.query.optionkey && parseInt(this.req.query.optionkey)) {
            var rs = await j.queryUpdate(`UPDATE SYSTEM_SETTING SET OPTION_VALUE = ` + this.req.query.optionkey + ` WHERE OPTION_KEY = 'job_crawler'`);
            if (rs) {
                return Promise.resolve({
                    code: 200
                });
            }
            else {
                return Promise.resolve({
                    code: 400,
                    error: 'Không có dữ liệu'
                });
            }
        }
        else {
            return Promise.resolve({
                code: 400,
                error: 'Sai dữ liệu đầu vào'
            });
        }

    } else {
        return Promise.resolve({
            code: 400,
            error: 'Bạn không có quyền truy cập api này'
        });
    }
}

exports = module.exports = ApiController; 