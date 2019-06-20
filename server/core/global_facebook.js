var Promise = require('promise');
exports = module.exports = GlobalFacebook;
var Q = require('q');
var config = require('../config/config');
var GlobalFunction = require('../core/global_function');
var md5 = require('md5');
var request = require('request');
function GlobalFacebook(type) {
    this.setType = function (type) {
        this.type = type;
        if (this.type == 'dung') {
            this.API_FUNC = 'getDungApi';
            this.PARAM_FUNC = 'DUNG_API';
        } else {
            this.API_FUNC = 'getCuongApi';
            this.PARAM_FUNC = 'CUONG_API';
        }
    }
    this.setType(type);
}

GlobalFacebook.prototype.getDungApi = async function (link, facebook_id, flag = false) {
    var defer = Q.defer();
    var token = config.ACCESS_TOKEN;
    var link_old = link;
    link = link.replace('{id}', facebook_id).replace('{access_token}', token);
    if (link_old.match(/\{access_token\}/gi)) {
        if (config.LIST_ACCESS_TOKEN.length > 1) {
            config.ACCESS_TOKEN_INDEX++;
            if (config.ACCESS_TOKEN_INDEX >= config.LIST_ACCESS_TOKEN.length) {
                config.ACCESS_TOKEN_INDEX = 0;
            }
            config.ACCESS_TOKEN = config.LIST_ACCESS_TOKEN[config.ACCESS_TOKEN_INDEX];
        }
    }
    request.get(link, {
        json: {},
        timeout: 60000,
    }, async function (c_req, c_res) {
        let params = false;
        if (c_res && c_res.body) {
            params = c_res.body;
        }
        if (typeof (params) == 'string') {
            params = false;

        }
        var r = params;
        if (r && r['error'] && r['error']['message'] && r['error']['message'].indexOf(facebook_id) == -1) {
            if (link_old.match(/\{access_token\}/gi)) {
                var list_new = [];
                for (var item of config.LIST_ACCESS_TOKEN) {
                    if (item != token) {
                        list_new.push(item);
                    }
                }
                config.LIST_ACCESS_TOKEN = list_new;
                if (config.ACCESS_TOKEN_INDEX >= config.LIST_ACCESS_TOKEN.length) {
                    config.ACCESS_TOKEN_INDEX = 0;
                }
                console.log('loi roi', facebook_id, config.LIST_ACCESS_TOKEN.length, config.ACCESS_TOKEN_INDEX);
                config.ACCESS_TOKEN = config.LIST_ACCESS_TOKEN[config.ACCESS_TOKEN_INDEX];
            }
        }
        if (params['error'] && params['error']['message'].match(/ limit | validating access token | user changed their password /gi)) {
            if (!flag) {
                params = await that.getDungApi(link, facebook_id, true);
            }
            defer.resolve(params);
        } else {
            defer.resolve(params);
        }
    });
    return defer.promise;
}

GlobalFacebook.prototype.getCuongApi = function (link, facebook_id) {
    var defer = Q.defer();
    var sti = setTimeout(function () {
        defer.resolve(false);
    }, 10000);
    var attributes = { user_id: facebook_id };
    if (link.match(/\/members/gi)) {
        attributes[limit] = 10000;
    }
    var that = this;
    request.post(link, { json: attributes, timeout: 30000, headers: { 'X-Authorized': 'Five9Dung198574' } }, async function (c_req, c_res) {
        let params = false;
        clearTimeout(sti);
        if (c_res && c_res.body) {
            params = c_res.body;
            if (params['error'] && params['error']['message'].match(/ limit | validating access token | user changed their password /gi)) {
                params = await that.getCuongApi(link, facebook_id);
                defer.resolve(params);
            } else {
                defer.resolve(params);
            }
        } else {
            defer.resolve(params);
        }

    });
    return defer.promise;
}

GlobalFacebook.prototype.getApiCommon = async function (type, facebook_id) {
    return this[this.API_FUNC](config[this.PARAM_FUNC][type], facebook_id);
}

GlobalFacebook.prototype.getProfile = async function (facebook_id) {
    return this.getApiCommon('PROFILE', facebook_id).then(r => {
        if (r && r['error'] && r['error']['message'] && r['error']['message'].indexOf(facebook_id) >= 0) {
            r['id'] = facebook_id;
        }
        return Promise.resolve(r);
    });
}

GlobalFacebook.prototype.getFriends = async function (facebook_id) {
    return this.getApiCommon('FRIENDS', facebook_id).then(r => {
        var regex = new RegExp(facebook_id, 'gi');
        if (r && r['error'] && r['error']['message'] && r['error']['message'].match(regex)) {
            r['data'] = [];
        }
        return Promise.resolve(r ? r['data'] : false);
    });
}

GlobalFacebook.prototype.getFamily = async function (facebook_id) {
    return this.getApiCommon('FAMILY', facebook_id).then(r => {
        var regex = new RegExp(facebook_id, 'gi');
        if (r && r['error'] && r['error']['message'] && r['error']['message'].match(regex)) {
            r['data'] = [];
        }
        return Promise.resolve(r ? r['data'] : false);
    });
}

GlobalFacebook.prototype.getLikes = async function (facebook_id) {
    return this.getApiCommon('LIKES', facebook_id).then(r => {
        if (r && r['error'] && r['error']['message']) {
            if (r['error']['message'].indexOf(facebook_id) >= 0) {
                r['data'] = [];
            } else {
                console.log('loi roi', facebook_id);
            }

        }
        return Promise.resolve(r ? r['data'] : false);
    });
}

GlobalFacebook.prototype.getLikesCuongNewPaging = async function (link_paging, facebook_id) {
    r = await this.getCuongApi(link_paging, facebook_id);
    if (r && r['error'] && r['error']['message']) {
        if (r['error']['message'].indexOf(facebook_id) >= 0) {
            r['data'] = [];
        } else {
            if (r['error']['message'].match(/ limit | validating access token/gi)) {
                console.log('loi token in paging');
                return this.getLikesCuongNewPaging(link_paging, facebook_id);
            }
        }
    }
    return {
        data: r && r['data'] ? r['data'] : [],
    }
}

GlobalFacebook.prototype.getLikesCuongNew = async function (facebook_id) {
    var r = await this.getApiCommon('LIKES', facebook_id);
    if (r == false || r == 'error') {
        r = await this.getApiCommon('LIKES', facebook_id);
        if (r == false || r == 'error') {
            r = await this.getApiCommon('LIKES', facebook_id);
        }
    }
    if (r && r['error'] && r['error']['message']) {
        if (r['error']['message'].indexOf(facebook_id) >= 0) {
            r['data'] = [];
        } else {
            if (r['error']['message'].match(/ limit | validating access token/gi)) {
                console.log('loi token');
                return this.getLikesCuongNew(facebook_id);
            }
        }
    }
    var rs = r ? r['data'] : false;
    while (r && r['data'] && r['data'].length == 100 && r['paging']) {
        var link_paging = config.CUONG_API.LIKES + '?paging=' + r['paging'];
        r = await this.getLikesCuongNewPaging(link_paging, facebook_id);
        if (r == false || r == 'error') {
            r = await this.getLikesCuongNewPaging(link_paging, facebook_id);
            if (r == false || r == 'error') {
                r = await this.getLikesCuongNewPaging(link_paging, facebook_id);
            }
        }
        if (r && r['data'] && r['data'].length) {
            rs = rs.concat(r['data']);
        }
    }
    return Promise.resolve(rs);
}

GlobalFacebook.prototype.getLikesNew = async function (facebook_id) {
    var r = await this.getApiCommon('LIKES', facebook_id);
    if (r && r['error'] && r['error']['message']) {
        if (r['error']['message'].indexOf(facebook_id) >= 0) {
            r['data'] = [];
        } else {
            console.log('loi roi', facebook_id);
        }
    }
    var rs = r ? r['data'] : false;
    while (r && r['data'] && r['data'].length == 100 && r['paging'] && r['paging']['next']) {
        r = await this.getDungApi(r['paging']['next']);
        if (r && r['data'] && r['data'].length) {
            rs = rs.concat(r['data']);
        }
    }
    return Promise.resolve(rs);
}

GlobalFacebook.prototype.getGroups = async function (facebook_id) {
    return this.getApiCommon('GROUPS', facebook_id);
}

GlobalFacebook.prototype.getFeed = async function (facebook_id, paging_token = false, until = false, limit = 100) {
    var link = config.DUNG_API.FEED;
    if (paging_token && paging_token !== undefined) {
        link += "&__paging_token=" + paging_token;
    }
    if (until && until !== undefined) {
        link += "&until=" + until;
    }
    link = link.replace('{limit}', limit);
    var rs = await this.getDungApi(link, facebook_id);
    var data = rs && rs.data && rs.data.length ? { data: rs.data } : { data: [] };
    if (Object.keys(data).length) {
        if (rs.paging && rs.paging.next) {
            data['paging_token'] = rs.paging.next.replace(/.*?(\&__paging_token=)/gi, '').replace(/\&.*/gi, '');
            data['until'] = rs.paging.next.replace(/.*?(\&until=)/gi, '').replace(/\&.*/gi, '');
        }
    }
    return data;
}

GlobalFacebook.prototype.getCover = async function (facebook_id) {
    return this.getApiCommon('COVER', facebook_id);
}

GlobalFacebook.prototype.getSearch = async function (facebook_id) {
    return this.getApiCommon('SEARCH', facebook_id);
}

GlobalFacebook.prototype.getSubscribers = async function (facebook_id) {
    return this.getApiCommon('SUBSCRIBERS', facebook_id);
}

GlobalFacebook.prototype.getSubscribedTo = async function (facebook_id) {
    return this.getApiCommon('SUBSCRIBEDTO', facebook_id);
}

GlobalFacebook.prototype.getTokenFacebook = function () {
    var defer = Q.defer();
    request.post(config.CRAWLERTOKEN.LINK, {
        headers: {
            'Content-Type': 'application/json;'
        },
        json: {
            username: config.CRAWLERTOKEN.username,
            password: config.CRAWLERTOKEN.password,
        }
    }, function (err, res) {
        let body = {};
        try { body = res.body; } catch (e) { }
        if (body && body.access_token) {
            config.ACCESS_TOKEN = body.access_token.replace(/"/gi, '');
            defer.resolve(body);
        } else {
            defer.resolve(false);
        }
    });
    return defer.promise;
}

GlobalFacebook.prototype.getMemberGroup = async function (group_id) {
    var rs = [];
    var data = [];
    var link = config.DUNG_API.MEMBERS;
    do {
        var data = await this.getDungApi(link, group_id);
        if (data && data.data && data.data.length) {
            rs = rs.concat(data.data);
        }
        link = (data && typeof (data) == 'object' && data.paging !== undefined && typeof (data.paging) == 'object' && data.paging.next) ? data.paging.next : '';
        console.log('group_id', group_id, rs.length);
    } while (link);
    return rs;
}

GlobalFacebook.prototype.getSubscribersAll = async function (facebook_id) {
    var rs = [];
    var data = [];
    var link = config.DUNG_API.SUBSCRIBERS;
    do {
        var data = await this.getDungApi(link, facebook_id);
        if (data === false) {
            return Promise.resolve(false);
        }
        if (data && data.data && data.data.length) {
            rs = rs.concat(data.data);
        }
        link = (data && typeof (data) == 'object' && data.paging !== undefined && typeof (data.paging) == 'object' && data.paging.next) ? data.paging.next : '';
        console.log('facebook_id', facebook_id, rs.length);
    } while (link);
    return rs;
}

GlobalFacebook.prototype.getLinkImage = async function (facebook_id) {
    if (!GlobalFunction.validateFacebookid(facebook_id)) {
        return false;
    }
    var def = Q.defer();
    var link = config.AVATAR.replace('{id}', facebook_id);
    request.get(link, function (c_req, c_res) {
        def.resolve(c_res.request.href);
    });
    return def.promise;
}

GlobalFacebook.prototype.test_api = function (token, facebook_id) {
    var defer = Q.defer();
    link = "https://graph.facebook.com/v1.0/{id}?access_token={access_token}".replace('{id}', facebook_id).replace('{access_token}', token);
    request.get(link, {
        json: {},
    }, function (c_req, c_res) {
        let params = false;
        if (c_res && c_res.body) {
            params = c_res.body;
        }
        if (typeof (params) == 'string') {
            params = false;

        }
        var r = params;
        if (r && r['error'] && r['error']['message'] && r['error']['message'].indexOf(facebook_id) == -1) {

        } else {
            console.log(token);
        }
        defer.resolve(params);
    });
    return defer.promise;
}


GlobalFacebook.get_link_refresh_token = function (email, password) {
    var API_SECRET = '62f8ce9f74b12f84c123cc23437a4a32';
    var BASE_URL = 'https://api.facebook.com/restserver.php';
    var BODY = {
        "api_key": "882a8490361da98702bf97a021ddc14d",
        "email": email,
        "format": "JSON",
        "locale": "vi_vn",
        "method": "auth.login",
        "password": password,
        // "credentials_type": "password",
        // "generate_machine_id": "1",
        // "generate_session_cookies": "1",
        "return_ssl_resources": "0",
        "v": "1.0",
    };

    var sig = '';
    var list_query = [];
    for (var k in BODY) {
        sig += k + '=' + BODY[k];
        list_query.push(k + '=' + BODY[k]);
    }
    BODY['sig'] = md5(sig + API_SECRET);
    list_query.push('sig=' + md5(sig + API_SECRET));
    return BASE_URL + '?' + list_query.join('&');
}

GlobalFacebook.refresh_token = async function (email, password, cookie = false) {
    var HEADERS = {
        "Origin": "https://facebook.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36",
        "authority": "www.facebook.com",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://www.facebook.com",
        "referer": "https://www.facebook.com",
    };
    if(cookie) {
        HEADERS['cookie'] = cookie;
    }
    var def = Q.defer();
    var link = GlobalFacebook.get_link_refresh_token(email, password);
    console.log(link);
    request.get(link, HEADERS, async function (c_req, c_res) {
        console.log(c_res.body);
    }, async function (r1, r2) {
        console.log(r1, r2);
    });
    return def.promise;
}

GlobalFacebook.refresh_token_new = async function (email, password) {

    var BASE_URL = "https://api.facebook.com/restserver.php";
    var API_SECRET = "62f8ce9f74b12f84c123cc23437a4a32";
    var md5 = function (d) { result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ };

    var data = {
        "api_key": "882a8490361da98702bf97a021ddc14d",
        "email": email,
        "format": "JSON",
        "locale": "vi_vn",
        "method": "auth.login",
        "password": password,
        "return_ssl_resources": 0,
        "v": "1.0"
    };

    var str = "";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            str += key + "=" + data[key];
        }
    }
    str += API_SECRET;
    var sig = md5(str);
    data["sig"] = sig;
    var params = "";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            params += "&" + key + "=" + data[key];
        }
    }

    var url = BASE_URL + "?" + params;
    var win = window.open(url, '_blank');
    win.focus();
}