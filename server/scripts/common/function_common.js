// function 1
db.system.js.save(
    {
        _id: "stripUnicode",
        value: function (str, doi = ' ') {
            if (str === undefined || str === null) {
                return '';
            } else if (typeof (str) != 'string') {
                str = str.toString();
            }
            str = str.toLowerCase().trim();
            var str_new = "";
            var list_oprator = { '768': 768, '769': 769, '771': 771, '777': 777, '803': 803 };
            var length = str.length;
            for (var i = 0; i < length; i++) {
                if (!list_oprator[str.charCodeAt(i)]) {
                    str_new += str[i];
                }
            }
            str = str_new;


            var arrayPregReplace = {
                'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|ầ|à|å|å': 'a',
                'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ë': 'e',
                'ì|í|ị|ỉ|ĩ|ï': 'i',
                'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ỡ|ơ|ờ|ớ|ợ|ở|ò|Ö|ö|ø|ö|ö|ő|œ|ô': 'o',
                'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ü|ü|ů|ū|û|µ': 'u',
                'ỳ|ý|ỵ|ỷ|ỹ|Ÿ': 'y',
                'đ': 'd',
                'Ç': 'c',
                'ñ': 'n',
                '[^a-zA-Z0-9 ]+': ' ',
                '[ ]+': ' ',
            };
            for (var key in arrayPregReplace) {
                var re = new RegExp(key, 'gi');
                str = str.replace(re, arrayPregReplace[key]);
            }
            str = str.trim();
            str = str.replace(/ /gi, doi);
            return str;
        }
    }
)
// function 2
db.system.js.save(
    {
        _id: "array_to_object",
        value: function (array) {
            var rs = {};
            if (array && array.length) {
                for (var it of array) {
                    rs[it] = it;
                }
            }
            return rs;
        }
    }
)
// function 3
db.system.js.save(
    {
        _id: "get_value_object",
        value: function (obj) {
            var rs = [];
            for (var it in obj) {
                rs.push(obj[it]);
            }
            return rs;
        }
    }
)
// function get_list_keyword_by_sentence
db.system.js.save(
    {
        _id: "get_list_keyword_by_sentence",
        value: function (alias, min = 0, max = 100) {
            var list = [];
            if (alias.trim()) {
                var a = alias.trim().split(' ');
                var length = a.length;
                if (length == 1) {
                    list.push(alias);
                } else if (length > 1) {
                    for (var i = 0; i < length - 1; i++) {
                        list.push(a[i]);
                        for (var j = i + 1; j < length; j++) {
                            var b = list[list.length - 1] + ' ' + a[j];
                            var count = b.split(' ').length;
                            if (count <= max && count >= min) {
                                list.push(b);
                            }
                        }
                        if (i == length - 2) {
                            list.push(a[length - 1]);
                        }
                    }
                }
            }
            return list;
        }
    }
)
// function get_data_insert_by_list_data_and_collection_name
db.system.js.save(
    {
        _id: "get_data_insert_by_list_data_and_collection_name",
        value: function (list_data, collection_name) {
            var list_id = indexArray(list_data, '_id');
            var rs_objs = {};
            db.getCollection(collection_name).aggregate([
                { $match: { _id: { $in: list_id } } },
                { $project: { _id: 1 } }
            ]).forEach(function (item) {
                rs_objs[item._id] = 1;
            })
            var data_insert = [];
            for (var item_child of list_data) {
                if (!rs_objs[item_child._id]) {
                    data_insert.push(item_child);
                }
            }
            return data_insert;
        }
    }
)
// function insert_data_ignore
db.system.js.save(
    {
        _id: "insert_data_ignore",
        value: function (list_data, collection_name) {
            var data_insert_update = [];

            for (var it of list_data) {
                data_insert_update.push({
                    updateOne: {
                        filter: { _id: it._id },
                        update: {$set: it},
                        upsert: true,
                    }
                });
            }
            db.getCollection(collection_name).bulkWrite(data_insert_update);
        }
    }
)
// function indexArray
db.system.js.save(
    {
        _id: "indexArray",
        value: function (rs, key) {
            var list = [];
            if (rs) {
                for (var i in rs) {
                    list.push(rs[i][key]);
                }
            }
            return list;
        }
    }
)
// function index
db.system.js.save(
    {
        _id: "index",
        value: function (rs, key) {
            var list = {};
            if (rs) {
                for (var i in rs) {
                    list[rs[i][key]] = rs[i];
                }
            }
            return list;
        }
    }
)

// function pretty_str_new

db.system.js.save(
    {
        _id: "pretty_str_new",
        value: function (str) {
            if (!str || str === undefined) {
                return str;
            }
            var list_obj_keyword = {
                'a': { 803: 'ạ', 771: 'ã', 769: 'á', 777: 'ả', 768: 'à' },
                'ă': { 803: 'ặ', 771: 'ẵ', 769: 'ắ', 777: 'ẳ', 768: 'ằ' },
                'â': { 803: 'ậ', 771: 'ẫ', 769: 'ấ', 777: 'ẩ', 768: 'ầ' },
                'A': { 768: 'À', 769: 'Á', 771: 'Ã', 777: 'Ả', 803: 'Ạ', },
                'Ă': { 768: 'Ằ', 769: 'Ắ', 771: 'Ẵ', 777: 'Ẳ', 803: 'Ặ', },
                'Â': { 768: 'Ầ', 769: 'Ấ', 771: 'Ẫ', 777: 'Ẩ', 803: 'Ậ', },

                'e': { 803: 'ẹ', 771: 'ẽ', 769: 'é', 777: 'ẻ', 768: 'è' },
                'ê': { 803: 'ệ', 771: 'ễ', 769: 'ế', 777: 'ể', 768: 'ề' },
                'E': { 768: 'È', 769: 'É', 771: 'Ẽ', 777: 'Ẻ', 803: 'Ẹ', },
                'Ê': { 768: 'Ề', 769: 'Ế', 771: 'Ễ', 777: 'Ể', 803: 'Ệ', },

                'i': { 803: 'ị', 771: 'ĩ', 769: 'í', 777: 'ỉ', 768: 'ì' },
                'I': { 768: 'Ì', 769: 'Í', 771: 'Ĩ', 777: 'Ỉ', 803: 'Ị', },

                'o': { 803: 'ọ', 771: 'õ', 769: 'ó', 777: 'ỏ', 768: 'ò' },
                'ơ': { 803: 'ợ', 771: 'ỡ', 769: 'ớ', 777: 'ở', 768: 'ờ' },
                'ô': { 803: 'ộ', 771: 'ỗ', 769: 'ố', 777: 'ổ', 768: 'ồ' },
                'O': { 768: 'Ò', 769: 'Ó', 771: 'Õ', 777: 'Ỏ', 803: 'Ọ', },
                'Ơ': { 768: 'Ờ', 769: 'Ớ', 771: 'Ỡ', 777: 'Ở', 803: 'Ợ', },
                'Ô': { 768: 'Ồ', 769: 'Ố', 771: 'Ỗ', 777: 'Ổ', 803: 'Ộ', },

                'u': { 803: 'ụ', 771: 'ũ', 769: 'ú', 777: 'ủ', 768: 'ù' },
                'ư': { 803: 'ự', 771: 'ữ', 769: 'ứ', 777: 'ử', 768: 'ừ' },
                'U': { 768: 'Ù', 769: 'Ú', 771: 'Ũ', 777: 'Ủ', 803: 'Ụ', },
                'Ư': { 768: 'Ừ', 769: 'Ứ', 771: 'Ữ', 777: 'Ử', 803: 'Ự', },

                'y': { 803: 'ỵ', 771: 'ỹ', 769: 'ý', 777: 'ỷ', 768: 'ỳ' },
                'Y': { 768: 'Ỳ', 769: 'Ý', 771: 'Ỹ', 777: 'Ỷ', 803: 'Ỵ', }

            };
            var list_oprator = { '768': 768, '769': 769, '771': 771, '777': 777, '803': 803 };
            var length = str.length;
            var rs = "";
            var i = 0;
            if (length > 1) {
                for (i = 0; i < length - 1; i++) {
                    var char_code = str.charCodeAt(i + 1);
                    if (list_oprator[char_code]) {
                        if (list_obj_keyword[str[i]] && list_obj_keyword[str[i]][char_code]) {
                            rs += list_obj_keyword[str[i]][char_code];
                            i++;
                        } else {
                            rs += str[i];
                        }
                    } else {
                        rs += str[i];
                    }
                }
                if (i == length - 1) {
                    rs += str[i];
                }
            } else {
                rs = str;
            }
            return rs.replace(/[ ]+/gi, ' ').toLowerCase().trim();
        }
    }
)

// function get_list_keyword_by_sentence_all

db.system.js.save(
    {
        _id: "get_list_keyword_by_sentence_all",
        value: function (alias, min = 0, max = 100) {
            var m = alias.match(/\(.*?(\))/gi);
            var list = [];
            if (m) {
                var n = alias;
                for (var it of m) {
                    list.push(n.substr(0, n.indexOf(it)).trim());
                    list.push(it.trim());
                    n = n.substr(n.indexOf(it) + it.length, alias.length);
                }
                list.push(n.trim());
            } else {
                list = [alias];
            }
            var l = {};
            for (var it of list) {
                var it_old = it.replace(/^\(|\)$/gi, '');
                it = it_old.replace(/[,\.\?\!\:\(\)]/gi, ',');
                
                var a = it.split(',');
                if(it_old.match(/\./gi)) {
                    var str2 = it_old.replace(/[\.]+/gi,'.');
                    if(!str2.match(/\.$/gi)) {
                        a.push(str2);
                        a.push(str2.replace(/\./gi," ").replace(/[ ]+/gi," "));
                        if(!str2.match(/^\./gi)) {
                            var b = str2.split('.');
                            a = a.concat(b);
                        }
                    }
                }
                for (var b of a) {
                    b = b.trim();
                    if (b) {
                        l[b] = 1;
                    }
                }
            }
            var list = Object.keys(l);
            if (list && list.length) {
                var rs = {};
                for (var it of list) {
                    var c = get_list_keyword_by_sentence(it, min, max);
                    for (var c2 of c) {
                        rs[c2.trim()] = 1;
                    }
                }
                return Object.keys(rs);
            }
            return [];
        }
    }
)
// function get_list_keyword_by_name

db.system.js.save(
    {
        _id: "get_list_keyword_by_name",
        value: function (name) {
            var alias = stripUnicode(name, ' ');
            var name = pretty_str_new(name);
            var l1 = get_list_keyword_by_sentence(alias.trim(), 0, 8);
            var l2 = get_list_keyword_by_sentence_all(name.trim(), 0, 8);
            var r_list_keyword = {};
            for (var it1 of l1) { r_list_keyword[it1] = 1; }
            for (var it1 of l2) { r_list_keyword[it1] = 1; }
            r_list_keyword[name.toLowerCase()] = 1;
            var list_keyword = Object.keys(r_list_keyword);
            if (!list_keyword || !list_keyword) {
                list_keyword = [];
            }
            return list_keyword;
        }
    }
)
// function get_list_keyword_by_hometown_location_name
db.system.js.save({
    _id     : 'get_list_keyword_by_hometown_location_name',
    value   : function(name) {
        var list_keyword = name ? name.split(',') : [];
        var l = {};
        for (var it of list_keyword) {
            var k = it.trim();
            if (k) {
                l[k.toLowerCase()] = 1;
                var alias = stripUnicode(k);
                if (alias) {
                    l[alias] = 1;
                }
            }
        }
        var rs = Object.keys(l);
        return rs ? rs : [];
    }
})

// function insert_data_ignore_not_update

db.system.js.save({
    _id     : 'insert_data_ignore_not_update',
    value   : function(list, collection_name) {
        var data_insert = get_data_insert_by_list_data_and_collection_name(list,collection_name);
        if(data_insert.length) {
            db.getCollection(collection_name).insertMany(data_insert);
            return indexArray(data_insert,'_id');
        }
        return [];
    }
})


// function get_ids_not_in_collection
db.system.js.save({
    _id     : 'get_ids_not_in_collection',
    value   : function(ids, collection_name) {
        var rs_objs = {};
        db.getCollection(collection_name).aggregate([
            { $match: { _id: { $in: ids } } },
            { $project: { _id: 1 } }
        ]).forEach(function (item) {
            rs_objs[item._id] = 1;
        })
        var rs = [];
        for(var id of ids) {
            if(!rs_objs[id]) {
                rs.push(id);
            }
        }
        return rs;

    }
})

// function get_same_value_from_two_object
db.system.js.save({
    _id     : 'get_same_value_from_two_object',
    value   : function(obj1, obj2) {
        var rs = {};
        for(var i in obj1) {
            if(obj2[i]) {
                rs[i] = obj1[i];
            }
        }
        return rs;
    }
})

// function contains
db.system.js.save({
    _id     : 'contains',
    value   : function (s, a) {
        if (a === undefined) {
            return false;
        }
        if (typeof (s) != 'object') {
            for (var item of a) { if (s == item) { return true; } }
        } else {
            for (var item of s) {
                for (var item2 of a) { if (item == item2) { return true; } }
            }
        }
        return false;
    }
})

// function contains
db.system.js.save({
    _id     : 'viet_tat',
    value   : function (name) {
        var a = name.split(' ');
        var str = "";
        for (var i of a) {
            str += i[0];
        }
        return str;
    }
})

// function get_list_keyword_by_word
db.system.js.save({
    _id     : 'get_list_keyword_by_word',
    value   : function (alias, min = 0, max = 100) {
        var a = alias.trim();
        var list = [];
        var length = a.length;
        if (length == 1) {
            list.push(alias);
        } else if (length > 1) {
            for (var i = 0; i < length - 1; i++) {
                list.push(a[i]);
                for (var j = i + 1; j < length; j++) {
                    var b = list[list.length - 1] + '' + a[j];
                    var count = b.split(' ').length;
                    if (count <= max && count >= min) {
                        list.push(b);
                    }
                }
                if (i == length - 2) {
                    list.push(a[length - 1]);
                }
            }
        }
        return list;
    }
})

// function stripUnicodeAZ
db.system.js.save(
    {
        _id: "stripUnicodeAZ",
        value: function (str, doi = ' ') {
            if (str === undefined || str === null) {
                return '';
            } else if (typeof (str) != 'string') {
                str = str.toString();
            }
            str = str.toLowerCase().trim();
            var str_new = "";
            var list_oprator = { '768': 768, '769': 769, '771': 771, '777': 777, '803': 803 };
            var length = str.length;
            for (var i = 0; i < length; i++) {
                if (!list_oprator[str.charCodeAt(i)]) {
                    str_new += str[i];
                }
            }
            str = str_new;
            var arrayPregReplace = {
                'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|ầ|à|å|å': 'a',
                'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ë': 'e',
                'ì|í|ị|ỉ|ĩ|ï': 'i',
                'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ỡ|ơ|ờ|ớ|ợ|ở|ò|Ö|ö|ø|ö|ö|ő|œ|ô': 'o',
                'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ü|ü|ů|ū|û|µ': 'u',
                'ỳ|ý|ỵ|ỷ|ỹ|Ÿ': 'y',
                'đ': 'd',
                'Ç': 'c',
                'ñ': 'n',
                '[ ]+': ' ',
            };
            for (var key in arrayPregReplace) {
                var re = new RegExp(key, 'gi');
                str = str.replace(re, arrayPregReplace[key]);
            }
            str = str.trim();
            str = str.replace(/ /gi, doi);
            return str;
        }
    }
)

db.system.js.save({
    _id     : 'trim_school_name',
    value   : function(ref_school,key_keyword = 'list_keyword_tu_dien', item) {
        var list_obj = {}, c = -1;
        for(var it_school of ref_school) {
            var k1 = '';
            for(var keyword of it_school.list_keyword) {
                if(item[key_keyword].indexOf(keyword) >= 0) {
                    it_school.index_of = item[key_keyword].indexOf(keyword);
                    k1 = keyword;
                    break;
                }
            }
            it_school.keyword_for_school = k1;
            if(!list_obj[it_school.index_of]) {
                list_obj[it_school.index_of] = [];
            }
            list_obj[it_school.index_of].push(it_school);
            if(c == -1 || c > it_school.index_of) {
                c = it_school.index_of;
            }
        }
        ref_school = list_obj[c];
        if(ref_school.length > 1) {
            name = item.name.toLowerCase().replace(/[ ]+/gi,' ').trim();
            var name_new = stripUnicodeAZ(name);
            var l = [];
            for(var it of ref_school) {
                var index1 = name_new.indexOf(it.keyword_for_school);
                var tach = name.substr(index1,it.keyword_for_school.length);
                if(tach == it.name) {
                    l.push(it);
                }
            }
            if(l.length) {
                ref_school = l;
            }
        }
        return ref_school;
    }
})

// get_obj_first_in_object
db.system.js.save({
    _id     : 'get_obj_first_in_object',
    value   : function(obj) {
        for(var i in obj) {
            return obj[i];
        }
        return obj;
    }
})

// build_status_collection_name
db.system.js.save({
    _id     : 'build_status_collection_name',
    value   : function(collection_name,limit = 10000) {
        var list = [];
        var i = 0;
        var ii = 0;
        db.getCollection(collection_name).find().noCursorTimeout().forEach(function(item){
            list.push(item._id);
            i++;
            if(i % limit == 0) {
                db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
                list = [];
                ii++;
            }
        })
        if(list.length) {
            db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
        }
    }
})


// function build_tu_dien_for_education
db.system.js.save({
    _id: 'build_facebook_education_list_keyword_tu_dien',
    value: function () {
        var common_k_obj = {};
        db.getCollection('ref_common').find({}).forEach(function(item){
            for(var it of item.keyword) {
                common_k_obj[it] = it;
            }
        })
        db.getCollection('college_keyword_common').find({}).forEach(function(item){
            common_k_obj[item.alias] = item.alias;
        })
        db.getCollection('ref_city').find({}).forEach(function(item){
            for(var k of item.alias_keyword){
                common_k_obj[k] = k;
            }
        });
        var common_k = Object.keys(common_k_obj);
        build_tu_dien_by_collection_name(['ref_school_1','ref_school_2','ref_school_3'], common_k);
    }
});

db.system.js.save({
    _id: 'get_object_max_city_by_facebook_group',
    value: function (group_id = false) {
        var l = db.getCollection('facebook_user_group').aggregate([
            {$match:{data: group_id}},
            {$project:{_id:1}},
            {$lookup: {
                from        : "user_hometown",
                localField  : "_id",
                foreignField: "_id",
                as          : "user_hometown",
            }},
            {$project:{_id:1,city_id:{$arrayElemAt:["$user_hometown.city_id",0]},city_name:{$arrayElemAt:["$user_hometown.city_name",0]}}},
            {$group:{_id:"$city_id",name:{$first:"$city_name"},sum:{$sum:1}}},
            {$sort:{sum:-1}},
            {$limit:1}
        ]).toArray();
        if(l && l.length) {
            return {
                city_id : l[0]._id,
                city_name : l[0].name,
            }
        }
        return {};
    }
});



db.system.js.save({
    _id: "bulk_write_list_keyword_tu_dien_by_keyword_collection_name",
    value: function (keyword,collection_name) {
        if (typeof (global_tu_dien_word_one_instance) == 'undefined') {
            build_facebook_education_list_keyword_tu_dien();
        }
        var list_keyword = typeof(keyword)=='string' ? [keyword] : keyword;
        var list = [];
        db.getCollection(collection_name).find({list_keyword:{$in:list_keyword}}).forEach(function (item) {
                if(item.alias) {
                    item.list_keyword_tu_dien = global_tu_dien_get_list_array_sentence(item.alias.trim());
                    list.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: { $set: { ref_city: item.ref_city } },
                        }
                    });
                }
            if (list.length == 10000) {
                db.getCollection(collection_name).bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection(collection_name).bulkWrite(list);
        }
    }
});



// build_status_collection_name_by_status_1
db.system.js.save({
    _id     : 'build_status_collection_name_by_status_1',
    value   : function(collection_name,limit_trust = 10000) {
        var c = db.getCollection(collection_name).count();
        var d = db.getCollection(collection_name).count({status:-1});
        var index_now = Math.floor(c/limit_trust);
        var index_thua = c % limit_trust;
        if(index_thua + d > limit_trust) {
            var limit = limit_trust - index_thua;
            var list = [];
            db.getCollection(collection_name).find({status:-1}).forEach(function(item){
                list.push(item._id);
                if(list.length == limit) {
                    db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status:index_now}},{multi:true});
                    index_now++;
                    limit = limit_trust;
                    list = [];
                }
            })
            if(list.length) {
                db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status:index_now}},{multi:true});
            }
        } else {
            db.getCollection(collection_name).update({status:-1},{$set:{status:index_now}},{multi:true});

        }
    }
})




db.system.js.save({
    _id: "rand",
    value: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});