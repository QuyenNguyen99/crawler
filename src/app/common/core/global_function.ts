import { CONFIG } from 'app/config/config';
declare var EXIF: any;
declare var $: any;

export class Deferred<T> {
    promise: Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export class GlobalFunction {
    static LIST_TABLE_CORE: any = [];
    static ROLE: any = {};
    static ngay_nghi = {
        '2017-12-30': true,
        '2017-12-31': true,
        '2018-01-01': true,
        '2018-02-14': true,
        '2018-02-15': true,
        '2018-02-16': true,
        '2018-02-19': true,
        '2018-02-20': true,
        '2018-04-25': true,
        '2018-04-30': true,
        '2018-05-01': true,
        '2018-09-03': true,
    };
    static DEFER = new Deferred();
    static TIMESTAMPNOW: any = new Date().getTime();
    static FILTER = {
        LIST_FILTER: [],
    };
    static contains(s, a) {
        return GlobalFunction.is_array(a) && a.filter(e => { return e == s }).length ? true : false;
    }



    static number_format(so1) {
        so1 = $.trim(so1);
        var so = (so1 != '0' && so1 != '') ? String(so1.replace(/([^0-9.])+|^(0)+/gi, '')) : so1;
        var sotp = so.split('.');
        so = sotp[0];
        var xau2 = '';
        if (sotp.length > 1) {
            sotp[0] = '';
            xau2 = sotp.join('');
        }
        var mangso = so.split("");
        var count = mangso.length;
        var xau = "";
        var j = 1;
        for (var i = count - 1; i >= 0; i--) {
            xau = String(mangso[i]) + xau;
            if (j % 3 == 0 && j != count)
                xau = "," + xau;
            j++;

        }
        if (sotp.length > 1) {
            xau += '.' + xau2;
        }
        return xau;
    }

    static encodeQuote(str) {
        return str.replace(/"/gi, '&quot;').replace(/'/gi, '&#039;');
    }

    static stripUnicode(str, doi) {
        if (!str || str === undefined) {
            return '';
        }
        if (typeof (str) != 'string') {
            return str;
        }
        str = str.trim();
        if (doi === undefined) { doi = '_'; }
        var arrayPregReplace = {
            'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|A|ầ|à': 'a',
            'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|E': 'e',
            'ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ|I': 'i',
            'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|O': 'o',
            'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|U': 'u',
            'ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Y': 'y',
            'đ|Đ|D': 'd',
            '[^a-zA-Z0-9 ]+': ' ',
            '[ ]+': ' ',
        };
        for (var key in arrayPregReplace) {
            var re = new RegExp(key, 'gi');
            str = str.replace(re, arrayPregReplace[key]);
        }
        str = str.toLowerCase().trim();
        str = str.replace(/ /gi, doi);
        return str;
    }

    static validateEmail(val) {
        if (val && !val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi)) {
            return false;
        }
        return true;
    }

    static validatePhone(val) {
        if (val) {
            let phone = val.replace(/ |\(|\)/gi, '');
            if (phone && !phone.match(/^(0|\+84)[0-9]{6,11}$/gi)) {
                return false;
            }
        }
        return true;
    }

    static validateSize(val, size) {
        if (val && val.length > size) {
            return false;
        }
        return true;
    }

    static validateMin(val, min) {
        if (val && val.length < min) {
            return false;
        }
        return true;
    }

    static validateMinnumber(val, min) {
        if (val && val < min) {
            return false;
        }
        return true;
    }

    static validateMaxnumber(val, min) {
        if (val && val > min) {
            return false;
        }
        return true;
    }

    static validateRegex(vl, regex) {
        if (vl && typeof(vl) == 'string') {
            var r = new RegExp(regex, 'gi');
            if (!vl.match(r)) {
                console.log('validateRegex',vl,r,vl.match(r));
                return false;
            }
        }
        return true;
    }

    static validateVat(val) {
        if (val && typeof(val) == 'string' && !val.match(/^[0-9]{1,25}$/gi)) {
            return false;
        }
        return true;
    }

    static validateDate(val) {
        if (val && (val !== undefined) && (val != '0000-00-00')) {
            if (typeof (val) == 'string') {
                val = val.replace(/T.*/gi, '');
                var date = GlobalFunction.newDate(val);
                if (date) {
                    var d = GlobalFunction.formatDateTime(date, 'y-m-d');
                    return d != val ? false : true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        return true;
    }

    static cloneFunc(that) {
        var temp = function temporary() { return that.apply(this, arguments); };
        temp.prototype = Object.assign({}, that.prototype);
        return temp;
    };

    static getDateNow() {
        let d = GlobalFunction.newDate();
        return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? ('0' + (d.getMonth() + 1)) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
    }

    static validateDatePast(val) {
        if (val && GlobalFunction.newDate(val).getTime() > GlobalFunction.newDate(GlobalFunction.getDateNow()).getTime()) {
            return false;
        }
        return true;
    }

    static validateInteger(val) {
        if (val && !isNaN(val) && Number.isInteger(parseFloat(val))) {
            return true;
        }
        return false;
    }

    static validateMinmax(val, range) {
        if (this.validateInteger(val)) {
            if (range && 0 < range.length && range[0] <= val && range[1] > val) {
                return true;
            }
            return false;
        }
        return false;
    }

    static is_array(a) {
        if (a instanceof Array) {
            return true;
        } else {
            return false;
        }
    }

    static validatePositiveNumber(val) {
        if (val <= 0) {
            return false;
        }
        return true;
    }

    static validateFacebookid(val) {
        return val.match(/^[0-9]{7,16}/gi) && val[0] != '0';
    }

    static validatePassword(val) {
        if (val && val.length < 6) {
            return false;
        }
        return true;
    }

    static subString(str, charNum) {
        if (str && charNum) {
            var cn = parseInt(charNum);
            if (str.length > cn) {
                var firstStr = str.substring(0, cn),
                    secondStr = str.substring(cn, str.length),
                    tempStr = secondStr.split(/[.?!,; ]/)[0];
                return firstStr.concat(tempStr);
            }
            else {
                return str;
            }
        }
        return "";
    }

    static addZeroPrefix(number) {
        return 10 > number ? '0' + number : + number;
    }

    static formatTime(timeStr) {
        if (timeStr) {
            let timeArr = timeStr.split(/[^0-9]/),
                y = timeArr[2].length < 4 ? timeArr[0] : timeArr[2],
                m = timeArr[1],
                d = timeArr[0].length < 4 ? timeArr[0] : timeArr[2],
                h = timeArr[3],
                mi = timeArr[4],
                s = timeArr[5]
            return {
                'hhmmss': h + ':' + mi + ':' + s,
                'ddmmyyyy': d + '/' + m + '/' + y,
                'ddmm': d + '/' + m,
                'ddmmyyHHMM': d + '/' + m + '/' + y + ' ' + h + ':' + mi + ':' + s + (parseInt(h) > 12 ? 'PM' : 'AM')
            };
        }
    }

    static formatDateTime(date, format_date = 'd-t-y H:i') {
        function prettyDateMonth(m_d) {
            if (m_d < 10) { m_d = '0' + m_d };
            return m_d;
        }
        if (!date || (typeof (date) == 'object' && !date.getFullYear)) {
            return '';
        }
        if (typeof (date) == 'number') {
            if (('' + date).length == 10) {
                date = date * 1000;
            }
        }
        switch (typeof (date)) {
            case 'string': date = GlobalFunction.newDate(date); break;
            case 'number': date = GlobalFunction.newDate(date); break;
        }
        var rs = format_date.toLowerCase();
        var attr = {
            'd': prettyDateMonth(date.getDate()),
            'm': prettyDateMonth(date.getMonth() + 1),
            'y': date.getFullYear(),
            'h': prettyDateMonth(date.getHours()),
            'i': prettyDateMonth(date.getMinutes()),
            's': prettyDateMonth(date.getSeconds()),
            't': 'thg ' + prettyDateMonth(date.getMonth() + 1),
        };
        for (var i in attr) {
            rs = rs.replace(i, attr[i]);
        }
        if (-1 != rs.indexOf('NaN')) {
            return '';
        }
        return rs;
    }
    static timeToStr(timeObj, strFormat) {
        if (timeObj && Object.prototype.toString.call(timeObj) === "[object Date]") {
            let y = timeObj.getFullYear(),
                m = timeObj.getMonth() + 1,
                d = timeObj.getDate(),
                h = timeObj.getHours(),
                mi = timeObj.getMinutes(),
                s = timeObj.getSeconds();
            let addZero = (t) => { return t < 10 ? '0' + t : t; }

            return {
                'hm': addZero(h) + ':' + addZero(mi),
                'dmy': addZero(d) + '/' + addZero(m) + '/' + y,
                'full': y + '-' + addZero(m) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(mi) + ':' + addZero(s)
            }[strFormat];
        } else {
            return '--:--';
        }
    }

    static replaceBreakLine(str: string) {
        return str.replace(/[\r\n]/g, "<br>");
    }

    static validateNameFacebook(val: string) {
        return val.match(/^[a-zA-Z0-9\._-]+$/gi);
    }

    static get_url_param_by_object(obj) {
        var rs = [];
        for (var i in obj) {
            rs.push(i + '=' + encodeURIComponent(typeof (obj[i]) == 'object' ? JSON.stringify(obj[i]) : obj[i]));
        }
        return rs.join('&');
    }

    static newDate(date = undefined) {
        var dd = undefined;
        if (typeof (date) == 'string') {
            date = date.replace('thg ', '');
            dd = new Date(date);
        } else if (typeof (date) == 'number') {
            if (('' + date).length == 10) {
                date *= 1000;
            }
            dd = new Date(date);
        } else if (!date || date === undefined) {
            dd = new Date(GlobalFunction.TIMESTAMPNOW);
        }

        if (dd === undefined) {
            dd = new Date(date.getTime());
        }
        dd.setMinutes(dd.getMinutes() + dd.getTimezoneOffset() + 420);
        return dd;
    }

    static cloneObj(obj) {
        var o = Object.assign({}, obj);
        if (obj['__proto__'] && obj['__proto__'] !== undefined) {
            o['__proto__'] = Object.assign({}, obj['__proto__']);
        }
        if (obj['__proto__']['__proto__'] && obj['__proto__']['__proto__'] !== undefined) {
            o['__proto__']['__proto__'] = Object.assign({}, obj['__proto__']['__proto__']);
        }
        return o;
    }

    static getTimestampnow(d = undefined) {
        var d = GlobalFunction.newDate(d);
        return Math.floor(d.getTime() / 1000);
    }

    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static searchToObject() {
        if (!window.location.search) {
            return {};
        }
        var pairs = window.location.search.substring(1).split("&"), obj = {}, pair, i;

        for (i in pairs) {
            if (pairs[i] === "") continue;

            pair = pairs[i].split("=");
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        return obj;
    }

    static createCookie(name, value, days = 0) {
        // if(sessionStorage && !days) {
        //     sessionStorage[name] = value;
        //     return;
        // }
        var expires = ";expires=0";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        } else if (document['documentMode'] > 0) {
            expires = ";";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        return value;
    }

    static readCookie(name) {
        // if (sessionStorage[name]) {
        //     return sessionStorage[name];
        // }
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        var value = null;
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                value = c.substring(nameEQ.length, c.length);
                break;
            }
        }
        return value;
    }

    static removeCookie(name) {
        // delete sessionStorage[name];
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    static setTimeout(time) {
        var def = new Deferred();
        setTimeout(function () {
            def.resolve(true);
        }, time);
        return def.promise;
    }

    static index(rs, key) {
        var list = {};
        if (rs) {
            for (var i in rs) {
                if (rs[i] && typeof (rs[i]) == 'object') {
                    list[rs[i][key]] = rs[i];
                }
            }
        }
        return list;
    }

    static indexArray(rs, key) {
        var list = [];
        if (rs) {
            for (var i in rs) {
                list.push(rs[i][key]);
            }
        }
        return list;
    }

    static indexObj(rs, key, value) {
        var list = {};
        if (rs) {
            for (var i in rs) {
                list[rs[i][key]] = rs[i][value];
            }
        }
        return list;
    }

    static time_minute_second(time) {
        if (!time) {
            return '00:00';
        }
        var d = Math.floor(time / (60 * 60 * 24));
        var a = time % (60 * 60 * 24);
        var h = Math.floor(a / (60 * 60));
        h += d * 24;
        a = a % (60 * 60);
        var temp = Math.floor(a / 60);
        var m = '' + temp;
        if (temp < 10) {
            m = '0' + temp;
        }
        var temp = a % 60;
        var s = '' + temp;
        if (temp < 10) {
            s = '0' + s;
        }
        // var dd = d ? d + 'd ' : '';
        var hh = h ? (h < 10 ? '0' + h : h) + ':' : '00:';
        var ms = m;
        // ms += ":" + s + '';
        return hh + ms;
    }

    static upperFristWord(str) {
        var array_str = str.split('_');
        var str_new = '';
        for (var i in array_str) {
            str_new += GlobalFunction.capitalizeFirstLetter(array_str[i]);
        }
        return str_new;
    }

    static getDateExpected(date_expected) {
        var date = GlobalFunction.newDate(date_expected);
        var count = 0;
        for (var i = 1; i < 14; i++) {
            if (date.getDay() == 0 || date.getDay() == 6 || GlobalFunction.ngay_nghi[GlobalFunction.formatDateTime(date, 'y-m-d')]) {
                date.setDate(date.getDate() + 1);
                if (i == 0) {
                    date.setHours(7);
                    date.setMinutes(59);
                    date.setSeconds(0);
                }
                continue;
            }
            count++;
            if ((date.getHours() >= 8 && count == 3) || (date.getHours() < 8 && count == 2)) {
                break;
            }
            date.setDate(date.getDate() + 1);
        }
        if (date.getHours() >= 17 || date.getHours() < 8) {
            date.setHours(17);
            date.setMinutes(0);
            date.setSeconds(0);
        }
        return GlobalFunction.formatDateTime(date, 'd-t-y h:i');
    }

    static get_date_process_time(value) {
        var date_value = GlobalFunction.newDate(value);
        if (date_value.toString() == 'Invalid Date') {
            return false;
        }
        if (date_value.getDay() == 0 || date_value.getDay() == 6 || GlobalFunction.ngay_nghi[GlobalFunction.formatDateTime(date_value, 'y-m-d')]) {
            date_value.setHours(17);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        }
        if (date_value.getHours() >= 17) {
            date_value.setHours(17);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        } else if (date_value.getHours() < 8) {
            date_value.setHours(8);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        } else if (date_value.getHours() == 12) {
            date_value.setHours(12);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        }
        return date_value;
    }

    static get_process_date_now(date_now = undefined) {
        var date_value = GlobalFunction.newDate(date_now);
        if (date_value.toString() == 'Invalid Date') {
            return false;
        }
        if (date_value.getDay() == 0 || date_value.getDay() == 6 || GlobalFunction.ngay_nghi[GlobalFunction.formatDateTime(date_value, 'y-m-d')]) {
            date_value.setHours(8);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        }
        if (date_value.getHours() >= 17) {
            date_value.setHours(17);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        } else if (date_value.getHours() < 8) {
            date_value.setHours(8);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        } else if (date_value.getHours() == 12) {
            date_value.setHours(12);
            date_value.setMinutes(0);
            date_value.setSeconds(0);
        }
        return date_value;
    }
    static compare_date_str(val1, val2) {
        if (val1 && val2) {
            try {
                var d1 = new Date(val1);
                var d2 = new Date(val2);
                if (d1.getFullYear() == d2.getFullYear() &&
                    d1.getMonth() == d2.getMonth() &&
                    d1.getDate() == d2.getDate()) {
                    return true;
                }
                return false;
            } catch (e) {
                console.log('error parse date');
                return false;
            }
        }
        return false;
    }
    static get_process_time(value, date_now = undefined) {
        var value_date = GlobalFunction.get_date_process_time(value);
        if (value_date === false) {
            return '';
        }
        var value_date_new = GlobalFunction.newDate(GlobalFunction.formatDateTime(value, 'y-m-d'));

        var date = GlobalFunction.get_process_date_now(date_now);
        if (date === false) {
            return '';
        }
        var date_new = GlobalFunction.newDate(GlobalFunction.formatDateTime(date, 'y-m-d'));

        var count_ngay_nghi = 0;
        var count_ngay_thuong = 0;

        var timestamp_value_date_new = Math.floor(value_date_new.getTime() / 1000);
        var timestamp_date_new = Math.floor(date_new.getTime() / 1000);

        if (value_date.getTime() > date.getTime()) {
            return '';
        }
        var total = 0;
        if (timestamp_date_new == timestamp_value_date_new) {
            total = Math.floor(date.getTime() / 1000) - Math.floor(value_date.getTime() / 1000);
            if (date.getHours() >= 13 && value_date.getHours() <= 12) {
                total -= 3600;
            }
        } else {
            while (timestamp_date_new >= timestamp_value_date_new) {

                if (value_date_new.getDay() != 0 && value_date_new.getDay() != 6 && !GlobalFunction.ngay_nghi[GlobalFunction.formatDateTime(value_date_new, 'y-m-d')]) {
                    if (timestamp_value_date_new == timestamp_date_new) {
                        total += Math.floor(date.getTime() / 1000) - Math.floor(value_date.getTime() / 1000);
                        if (date.getHours() >= 13 && value_date.getHours() <= 12) {
                            total -= 3600;
                        }
                    } else {
                        var date_new_2 = GlobalFunction.newDate(value_date);
                        date_new_2.setHours(17);
                        date_new_2.setMinutes(0);
                        date_new_2.setSeconds(0);
                        total += Math.floor(GlobalFunction.newDate(date_new_2).getTime() / 1000) - Math.floor(value_date.getTime() / 1000);
                        if (date_new_2.getHours() >= 13 && value_date.getHours() <= 12) {
                            total -= 3600;
                        }
                    }
                }
                value_date.setDate(value_date.getDate() + 1);
                value_date.setHours(8);
                value_date.setMinutes(0);
                value_date.setSeconds(0);
                value_date_new.setDate(value_date_new.getDate() + 1);
                timestamp_value_date_new = Math.floor(value_date_new.getTime() / 1000);
            }
        }

        return GlobalFunction.time_minute_second(total);
    }

    static getNamePrintCard(name) {
        var name = GlobalFunction.stripUnicode(name, ' ').toUpperCase();
        if (name.length > 19) {
            var a = name.split(' ');
            if (a.length >= 3) {
                var rs = [a[0]];
                var i = 0;
                do {
                    i++;
                    a[i] = a[i][0];
                    name = a.join(' ');
                } while (name.length > 19 && i < a.length - 2);
            }
        }
        name = name.substr(0, 19);
        return name;
    }

    static check_file(file) {
        var a = file.type.split('/');
        var name = file.name.toLowerCase();
        var flag = false;
        if (name.match(/\.(rar|zip)$/gi)) {
            flag = true;
        } else {
            if (a.length == 2 && GlobalFunction.contains(a[1], ['plain', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'msword', 'pdf', 'vnd.ms-excel', 'x-zip-compressed', 'vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
                flag = true;
            }
        }
        return flag;
    }

    static check_image(file) {
        var a = file.type.split('/');
        return a[0] == 'image';
    }

    static get_model_service_by_table_name(table_name) {
        return table_name.replace(/(^[a-z])|_([a-z])/gi, function (match) {
            return match.replace('_', '').toUpperCase();
        }) + 'Service';

    }

    static searchInArrayObject(search, array, attribute) {
        var results = [];
        var labelTemp = '';
        if (search) {
            for (var i in array) {
                labelTemp = GlobalFunction.stripUnicode(array[i][attribute], ' ');
                search = GlobalFunction.stripUnicode(search, ' ');
                if (labelTemp.includes(search)) {
                    results.push(array[i]);
                }
            }
            return results;
        } else {
            return array;
        }
    }

    static cloneArray(obj) {
        var output, value, key;
        output = Array.isArray(obj) ? [] : {};
        for (key in obj) {
            value = obj[key];
            output[key] = (typeof value === "object") ? this.cloneArray(value) : value;
        }
        return output;
    }
    /**
     * get distance between 2 point theo duong chim bay
     * @param p1 , p2 Point
     * @return distance 2 poin in meter
     */
    static getDistance = function (p1, p2) {
        if (p1 && p2) {
            var rad = function (x) {
                return x * Math.PI / 180;
            };
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in meter
        }
        return null;
    };

    /**
     * get link url map in google
     */
    static glinkMap(type, params) {
        var link = "";
        var parameters = "";
        if (typeof (params) == "object") {
            parameters = GlobalFunction.serialize(params, null);
        }
        type = type.toUpperCase();
        switch (type) {
            case "SEARCH": link = CONFIG.GMAP.SEARCH; break;
            case "DIRECTIONS": link = CONFIG.GMAP.DIRECTIONS; break;
            case "DISPLAY.MAP": link = CONFIG.GMAP.DISPLAY.MAP; break;
            case "DISPLAY.PANO": link = CONFIG.GMAP.DISPLAY.PANO; break;
            default: link = CONFIG.GMAP.SEARCH;
        }
        if (parameters) {
            return link.replace("parameters", parameters.toString());
        }
        return link.replace("&parameters", "");
    }

    static serialize = function (obj, prefix) {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    GlobalFunction.serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    static processTimeRange(mode = 2) {
        var start: any = this.formatChartTime(GlobalFunction.newDate());
        var end: any = this.formatChartTime(GlobalFunction.newDate());
        var now: any = this.formatChartTime(GlobalFunction.newDate());
        /**
         *  mode 0 : today
         *       1 : yesterday
         *       2 : last week
         *       3 : last month
         *       4 :  last 7 days
         *       5 :  last 30 days
         */
        switch (mode.toString()) {
            case '0':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                break;
            case '1':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
                break;
            case '3':
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case '4':
                start.setDate(now.getDate() - 6);

                break;
            case '5':
                start.setDate(now.getDate() - 29);

                break;
            case '2':
            default:
                start.setDate(now.getDate() - now.getDay() - 6);
                end.setDate(now.getDate() - now.getDay());
                break;
        }
        return { start: start, end: end }
    }

    static calculateTimeRange(first, second) {
        var oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs(first.getTime() - second.getTime()) / oneDay);
    }

    /**
     * get number of day by mode
     * @return number
     */
    static totalTimeRange(mode = 2) {
        switch (mode) {
            case 0:
            case 1: return 1;
            case 2:
            case 4: return 7;
            case 5: return 30;
            case 3: return GlobalFunction.daysInMonth(new Date().getMonth(), new Date().getFullYear());
        }
        return 1;
    }
    static daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    static chosenDateRange() {
        return [
            { id: 0, text: 'Today' },
            { id: 1, text: 'Yesterday' },
            { id: 2, text: 'Last week' },
            { id: 3, text: 'Last month' },
            { id: 4, text: 'Last 7 days' },
            { id: 5, text: 'Last 30 days' }
        ];
    }
    static calc_score_image(val: number) {
        return 1 / (1 + Math.pow(Math.E, -(-167.4 + 180 * val)));
    }

    static formatChartTime(date) {
        var dateTime = GlobalFunction.newDate(date);
        let year = parseInt(dateTime.getFullYear());
        let month = parseInt(dateTime.getMonth());
        let day = parseInt(dateTime.getDate());

        return new Date(year, month, day);
    }
    /**
     * add space after string
     */
    static addSpace(origin, leng, space = " ") {
        var origin_leng = origin.length;
        if (origin_leng < leng) {
            for (var i = origin_leng; i < leng; i++) {
                origin += space;
            }
        }
        return origin;
    }

    /**
     * check if arr1 is child of arr2
     */
    static inArray(arr1 = [], arr2 = []) {
        for (var i = 0; i < arr1.length; i++) {
            if (!GlobalFunction.contains(arr1[i], arr2)) {
                return false;
            }
        }
        return true;
    }

    /**
     * check if Object is empty
     */
    static isEmptyObject(obj) {
        if (obj == null) {
            return true;
        }
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

    static fix_auto_rotate(img, orientation) {
        var md = {};
        if (orientation) {
            md['orientation'] = orientation;
            GlobalFunction.loadImg(img, md, md['orientation']);
        } else {
            EXIF.getData(img, function () {
                var data = EXIF.getAllTags(img);
                md['orientation'] = data.Orientation ? data.Orientation : 1;
                GlobalFunction.loadImg(img, md, md['orientation']);
            });
        }

    }
    /**
     * change phone number to submask phone number
     * @example 12345678 => xxxxxxx678
     * @param phone_number string
     * @param mask string 
     * @param length length of last number phone want to show
     */
    static phone_mask(phone_number, mask = "x", length = 2) {
        let rs = "";
        if (phone_number) {
            let phone_leng = phone_number.length;
            let tail = phone_number.substring(phone_leng - length, phone_leng);
            for (let i = 0; i < phone_leng - length; i++) {
                rs += 'x';
            }
            rs += tail;
        }
        return rs;
    }

    static loadImg(img, md, orientation) {
        var width, height, naturalWidth, naturalHeight, offsetTop, offsetLeft;
        var parent_obj = $(img).parent();
        var parent_width = parent_obj.width();
        var parent_height = parent_obj.height();
        $(img).hide();
        var naturalHeight = img.naturalHeight;
        var naturalWidth = img.naturalWidth;
        var old_src = $(img).attr('src');
        md['style_img'] = {};
        if (orientation == 1) {
            if (naturalWidth > naturalHeight) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            } else {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (height > parent_height) {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (width > parent_width) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            }
            offsetLeft = (parent_width - width) / 2;
            offsetTop = (parent_height - height) / 2;
            md['style_img']['top'] = offsetTop + 'px';
            md['style_img']['left'] = offsetLeft + 'px';
            var width_percent = width / naturalWidth;
            var height_percent = height / naturalHeight;
            md['style_img']['transform'] = 'rotate(0deg)';
            md['style_img']['-webkit-transform'] = 'rotate(0deg)';
            md['style_img']['-ms-transform'] = 'rotate(0deg)';
        } else if (orientation == 3) {
            if (naturalWidth > naturalHeight) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            } else {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (height > parent_height) {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (width > parent_width) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            }
            offsetLeft = (parent_width - width) / 2;
            offsetTop = (parent_height - height) / 2;
            md['style_img']['top'] = offsetTop + 'px';
            md['style_img']['left'] = offsetLeft + 'px';
            var width_percent = width / naturalWidth;
            var height_percent = height / naturalHeight;
            md['style_img']['transform'] = 'rotate(180deg)';
            md['style_img']['-webkit-transform'] = 'rotate(180deg)';
            md['style_img']['-ms-transform'] = 'rotate(180deg)';
        } else if (orientation == 6) {
            if (naturalWidth > naturalHeight) {
                width = parent_height;
                height = width * naturalHeight / naturalWidth;
            } else {
                height = parent_width;
                width = height * naturalWidth / naturalHeight;
            }
            if (height > parent_height) {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (width > parent_width) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            }
            md['style_img']['transform'] = 'rotate(90deg)';
            md['style_img']['-webkit-transform'] = 'rotate(90deg)';
            md['style_img']['-ms-transform'] = 'rotate(90deg)';
            offsetLeft = (parent_width - width) / 2;
            offsetTop = (parent_height - height) / 2;
            md['style_img']['top'] = offsetTop + 'px';
            md['style_img']['left'] = offsetLeft + 'px';
            var width_percent = height / naturalWidth;
            var height_percent = width / naturalHeight;
        } else if (orientation == 8) {
            if (img.naturalWidth > naturalHeight) {
                width = parent_height;
                height = width * naturalHeight / naturalWidth;
            } else {
                height = parent_width;
                width = height * naturalWidth / naturalHeight;
            }
            if (height > parent_height) {
                height = parent_height;
                width = height * naturalWidth / naturalHeight;
            }
            if (width > parent_width) {
                width = parent_width;
                height = width * naturalHeight / naturalWidth;
            }
            md['style_img']['transform'] = 'rotate(-90deg)';
            md['style_img']['-webkit-transform'] = 'rotate(-90deg)';
            md['style_img']['-ms-transform'] = 'rotate(-90deg)';
            offsetLeft = (parent_width - width) / 2;
            offsetTop = (parent_height - height) / 2;
            md['style_img']['top'] = offsetTop + 'px';
            md['style_img']['left'] = offsetLeft + 'px';
            var width_percent = height / naturalWidth;
            var height_percent = width / naturalHeight;
        }
        md['style_img']['width'] = width + 'px';
        md['style_img']['height'] = height + 'px';
        md['style_img']['margin'] = '0px';
        $(img).attr('style', "");
        for (var k in md['style_img']) {
            var v = md['style_img'][k];
            $(img).css(k, v);
        }
    }

    static titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            if (splitStr[i].toLowerCase() == "thpt" || splitStr[i].toLowerCase() == "ptth") {
                splitStr[i] = splitStr[i].toUpperCase()
            }
            else {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    static dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    static dynamicSortDesc(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    static setcolormass(item, color_, colorcat, index) {
        item["color"] = color_;
        if (item.children) {
            index++;
            var color = this.materialColor(colorcat, index);
            for (var i of item.children) {
                i = this.setcolormass(i, color, colorcat, index);
            }
        }
        console.log(item.name);
        return item;
    }

    static countTree(item, sum) {
        sum += item.count;
        if (item.children) {
            for (var i of item.children) {
                sum += this.countTree(i, 0);
            }
        }
        return sum;
    }

    static pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1 / ++count)
                result = prop;
        return result;
    }

    static randomListColor() {
        var textArray = [
            'red',
            'pink',
            'purple',
            'blue',
            'teal',
            'green',
            'teal',
            'lime',
            'yellow',
            'orange',
        ];
        var randomNumber = Math.floor(Math.random() * textArray.length);

        return textArray[randomNumber];
    }

    static materialColor(category, index) {
        var colors = {
            "red": [
                "#ffebee",
                "#ffcdd2",
                "#e57373",
                "#f44336",
                "#d32f2f",
                "#b71c1c",
            ],
            "pink": [
                "#fce4ec",
                "#f8bbd0",
                "#f06292",
                "#e91e63",
                "#c2185b",
                "#880e4f",
            ],
            "purple": [
                "#f3e5f5",
                "#e1bee7",
                "#ba68c8",
                "#9c27b0",
                "#7b1fa2",
                "#4a148c",
            ],
            "deepPurple": [
                "#ede7f6",
                "#d1c4e9",
                "#9575cd",
                "#673ab7",
                "#512da8",
                "#311b92",
            ],
            "indigo": [
                "#e8eaf6",
                "#c5cae9",
                "#7986cb",
                "#3f51b5",
                "#303f9f",
                "#1a237e",
            ],
            "blue": [
                "#e3f2fd",
                "#bbdefb",
                "#64b5f6",
                "#2196f3",
                "#1976d2",
                "#0d47a1",
            ],
            "lightBlue": [
                "#e1f5fe",
                "#b3e5fc",
                "#4fc3f7",
                "#03a9f4",
                "#0288d1",
                "#01579b",
            ],
            "cyan": [
                "#e0f7fa",
                "#b2ebf2",
                "#4dd0e1",
                "#00bcd4",
                "#0097a7",
                "#006064",
            ],
            "teal": [
                "#e0f2f1",
                "#b2dfdb",
                "#4db6ac",
                "#009688",
                "#00796b",
                "#004d40",
            ],
            "green": [
                "#e8f5e9",
                "#c8e6c9",
                "#81c784",
                "#4caf50",
                "#388e3c",
                "#1b5e20",
            ],
            "lightGreen": [
                "#f1f8e9",
                "#dcedc8",
                "#aed581",
                "#8bc34a",
                "#689f38",
                "#33691e",
            ],
            "lime": [
                "#f9fbe7",
                "#f0f4c3",
                "#dce775",
                "#cddc39",
                "#afb42b",
                "#827717",
            ],
            "yellow": [
                "#fffde7",
                "#fff9c4",
                "#fff176",
                "#ffeb3b",
                "#fbc02d",
                "#f57f17",
            ],
            "amber": [
                "#fff8e1",
                "#ffecb3",
                "#ffd54f",
                "#ffc107",
                "#ffa000",
                "#ff6f00",
            ],
            "orange": [
                "#fff3e0",
                "#ffe0b2",
                "#ffb74d",
                "#ff9800",
                "#f57c00",
                "#e65100",
            ],
            "deepOrange": [
                "#fbe9e7",
                "#ffccbc",
                "#ff8a65",
                "#ff5722",
                "#e64a19",
                "#bf360c",
            ],
            "brown": [
                "#efebe9",
                "#d7ccc8",
                "#a1887f",
                "#795548",
                "#5d4037",
                "#3e2723"
            ],
            "grey": [
                "#fafafa",
                "#eeeeee",
                "#bdbdbd",
                "#757575",
                "#424242",
                "#9e9e9e"
            ],
            "blueGrey": [
                "#eceff1",
                "#cfd8dc",
                "#90a4ae",
                "#607d8b",
                "#455a64",
                "#263238"
            ]
        }
        var colorList = colors[category];
        var newColor = colorList[colorList.length - 1 - index];
        return newColor;
    }
    /*
    static xwwwfurlenc(srcjson){
      if(typeof srcjson !== "object") if(typeof console !== "undefined"){ console.log("\"srcjson\" is not a JSON object"); return null; }
      var urljson = "";
      var keys = Object.keys(srcjson);
      for(var i=0; i <keys.length; i++){
          urljson += encodeURI(keys[i]) + "=" + encodeURI(srcjson[keys[i]]);
          if(i < (keys.length-1))urljson+="&";
      }
      return urljson;
  }
  */

    static xwwwfurlenc(srcjson, parent = "") {
        if (typeof srcjson !== "object")
            if (typeof console !== "undefined") {
                console.log("\"srcjson\" is not a JSON object");
                return null;
            }

        let u = encodeURIComponent;
        let urljson = "";
        let keys = Object.keys(srcjson);

        for (let i = 0; i < keys.length; i++) {
            let k = parent ? parent + "[" + keys[i] + "]" : keys[i];

            if (typeof srcjson[keys[i]] !== "object") {
                urljson += u(k) + "=" + u(srcjson[keys[i]]);
            } else {
                urljson += this.xwwwfurlenc(srcjson[keys[i]], k)
            }
            if (i < (keys.length - 1)) urljson += "&";
        }

        return urljson;
    }

    //Will only decode as strings
    //Without embedding extra information, there is no clean way to know what type of variable it was.
    static dexwwwfurlenc(urljson) {
        var dstjson = {};
        var ret;
        var reg = /(?:^|&)(\w+)=(\w+)/g;
        while ((ret = reg.exec(urljson)) !== null) {
            dstjson[ret[1]] = ret[2];
        }
        return dstjson;
    }
    static formatMoney(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c;
        var d = d == undefined ? "." : d;
        var t = t == undefined ? "," : t;
        var s = n < 0 ? "-" : "";
        var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
        var j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : "");
    };
}

setInterval(function () {
    GlobalFunction.TIMESTAMPNOW += 1000;
}, 1000);