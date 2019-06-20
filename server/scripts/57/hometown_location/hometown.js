
//function out_user_insight_hometown_by_ids
/*
Cần có các hàm sau
out_user_insight_hometown (ids = false, facebook_ids = false)
out_facebook_group_dong_huong (ids = false)
insight_facebook_group_dong_huong (ids = false)
out_user_insight_hometown_group (ids = false, facebook_ids = false)
*/
db.system.js.save({
    _id: "out_user_insight_hometown",
    value: function (ids = false, facebook_ids = false) {
        var list = [], search = {}, i = 0;
        if (ids && ids.length) {
            search['hometown'] = { $in: ids };
        }
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        }
        db.getCollection('facebook_user_hometown').aggregate([
            { $match: search },
            {
                $lookup: {
                    from: "facebook_insight_hometown_location",
                    localField: "hometown",
                    foreignField: "_id",
                    as: "facebook_hometown_location",
                }
            },
            {$match:{facebook_hometown_location:{$ne:[]}}},
            { $project: { _id: 1, facebook_hometown_location: { $arrayElemAt: ["$facebook_hometown_location", 0] } } },
            {
                $project: {
                    _id: 1,
                    city_id: "$facebook_hometown_location.city_id",
                    city_name: "$facebook_hometown_location.city_name",
                    user_hometown_id: "$facebook_hometown_location._id",
                    user_hometown_name: "$facebook_hometown_location.name",
                }
            },
            {
                $match:{city_id: {$exists:true}},
            },
        ]).forEach(function (item) {
            i++;
            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: item,
                    upsert: true
                }
            });
            if (i % 10000 == 0) {
                db.getCollection('user_insight_hometown').bulkWrite(list);
                db.getCollection('user_hometown').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('user_insight_hometown').bulkWrite(list);
            db.getCollection('user_hometown').bulkWrite(list);
        }
    }
})

//function out_facebook_group_dong_huong
db.system.js.save({
    _id: "out_facebook_group_dong_huong",
    value: function (ids = false) {
        var l = [], i = 0, rs = [];
        var search = { list_keyword: { $in: ["hoi dong huong", "nhom dong huong"] } };
        if (ids && ids.length) {
            search['_id'] = { $in: ids };
        }
        db.getCollection('facebook_group').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            i++;
            var alias = stripUnicode(item.name);
            if(alias) {
                    alias = ' ' + alias + ' ';
            }
            list_keyword = get_list_keyword_by_sentence(alias.trim());
            l.push(item);
            if (i % 10000 == 0) {
                rs = rs.concat(insert_data_ignore_not_update(l, 'facebook_group_dong_huong'));
                l = [];
            }
        })
        if (l.length) {
            rs = rs.concat(insert_data_ignore_not_update(l, 'facebook_group_dong_huong'));
        }
        return rs;
    }
})




//function insight_facebook_group_dong_huong
db.system.js.save({
    _id: "insight_facebook_group_dong_huong",
    value: function (ids = false) {
        var search = {   };
        if (ids && ids.length) {
            search['_id'] = { $in: ids };
        }
        var rs = [];
        var l = [];
        db.getCollection("facebook_group_dong_huong").aggregate([
            {$match:search},
            {$lookup:{
                    from        : 'ref_city',
                    localField  : 'list_keyword',
                    foreignField: 'list_keyword_mapping',
                    as          : 'ref_city',
            }},
            {$match:{ref_city:{$ne:[]}}},
            {$project:{_id:1,name:1,alias:1,city_id:{$arrayElemAt:["$ref_city._id",0]},city_name:{$arrayElemAt:["$ref_city.name",0]}}}
        ]).forEach(function (item) {
            l.push(item);
        })
        rs = rs.concat(insert_data_ignore_not_update(l, 'facebook_insight_group_dong_huong'));
        return rs;
    }
})



// function out_user_insight_hometown_group
db.system.js.save({
    _id: "out_user_insight_hometown_group",
    value: function (ids = false, facebook_ids = false) {
        var search = ids && ids.length ? { _id: { $in: ids } } : {};
        var list_data = {};
        db.getCollection('facebook_insight_group_dong_huong').find(search).forEach(function (item) {
            list_data[item._id] = item;
        })
        var list_ids = Object.keys(list_data);
        var list = [], i = 0;
        var search2 = list_ids && list_ids.length ? { data: { $in: list_ids } } : {};
        if (facebook_ids && facebook_ids.length) {
            search2['_id'] = { $in: facebook_ids };
        }
        if (!Object.keys(search2) || !Object.keys(search2).length) {
            return false;
        }
        var list_user_hometown = [];
        var rs = [];
        db.getCollection('facebook_user_group').aggregate([
            { $match: search2 },
        ]).forEach(function (it) {
            i++;
            for (var group_id of it.data) {
                if (list_data[group_id]) {
                    item = list_data[group_id];
                    list.push({
                        _id         : it._id + '_' + group_id,
                        group_id    : group_id,
                        facebook_id : it._id,
                        group_name  : item.name,
                        city_id     : item.city_id,
                        city_name   : item.city_name,
                    });
                }
            }
            list_user_hometown.push({
                _id     : it._id,
            });
            if (i % 10000 == 0) {
                insert_data_ignore_not_update(list, 'user_insight_hometown_group');
                if((facebook_ids && facebook_ids.length) || (ids && ids.length)) {
                    rs = rs.concat(insert_data_ignore_not_update(list_user_hometown,'user_hometown'));
                } else {
                    insert_data_ignore_not_update(list_user_hometown,'user_hometown');
                }
                
                list = [];
                list_user_hometown = [];
            }
        })
        if (list.length) {
            insert_data_ignore_not_update(list, 'user_insight_hometown_group');
            if((facebook_ids && facebook_ids.length) || (ids && ids.length)) {
                rs = rs.concat(insert_data_ignore_not_update(list_user_hometown,'user_hometown'));
            } else {
                insert_data_ignore_not_update(list_user_hometown,'user_hometown');
            }
        }
        var search_3 = false;
        if(rs.length) {
            search_3 = {_id: { $in: rs }};
        } else if((!facebook_ids && !ids)) {
            search_3 ={city_id: {$exists: false}};
        }
        if(search_3) {
            var list_facebook_ids = [], i = 0;
            db.getCollection('user_hometown').find(search_3).forEach(function(item){
                i++;
                list_facebook_ids.push(item._id);
                if(i % 10000 == 0) {
                    out_user_hometown_froup_group(list_facebook_ids);
                    list_facebook_ids = [];
                }
                
            })
            if(list_facebook_ids.length) {
                out_user_hometown_froup_group(list_facebook_ids);
            }
        }
    }
})



// function out_user_hometown_froup_group
db.system.js.save({
    _id: "out_user_hometown_froup_group",
    value: function (facebook_ids) {
        var list_group_obj = {};
        
        db.getCollection('user_insight_hometown_group').find({facebook_id: {$in: facebook_ids}}).forEach(function(item){
            if(!list_group_obj[item.facebook_id]) {
                if(!list_group_obj[item.facebook_id]) {
                    list_group_obj[item.facebook_id] = {};
                }
                if(!list_group_obj[item.facebook_id][item.city_id]) {
                    list_group_obj[item.facebook_id][item.city_id] = {
                        city_id          : item.city_id,
                        city_name        : item.city_name,
                        sum                 : 1,
                        groups              : [
                            {
                                group_id            : item.group_id,
                                group_name          : item.group_name,
                            }
                        ]
                    };
                } else {
                    list_group_obj[item.facebook_id][item.city_id].sum++;
                    list_group_obj[item.facebook_id][item.city_id].groups.push({
                        group_id            : item.group_id,
                        group_name          : item.group_name,
                    });
                }
            }
            
        })

        var list_bulk_write = [];
        for(var facebook_id in list_group_obj) {
            var sum = 0;
            var dt = false;
            for(var city_id in list_group_obj[facebook_id]) {
                if(sum < list_group_obj[facebook_id][city_id].sum) {
                    sum = list_group_obj[facebook_id][city_id].sum;
                    dt = list_group_obj[facebook_id][city_id];
                }
            }
            list_bulk_write.push({
                updateOne   : {
                    filter  : {_id: facebook_id,user_hometown_id:{$exists: false}},
                    update  : {
                        _id         : facebook_id,
                        city_id          : dt.city_id,
                        city_name        : dt.city_name,
                        infer           : list_group_obj[facebook_id]
                    },
                }
            });
        }

        db.getCollection("user_hometown").bulkWrite(list_bulk_write);

        
    }
});

// function hometown_trigger_group_all
db.system.js.save({
    _id: "hometown_trigger_group_all",
    value: function (facebook_ids) {
        var group_ids_obj = {};
        db.getCollection('facebook_user_group').aggregate([
            { $match: { _id: { $in: facebook_ids } } },
        ]).forEach(function (item) {
            if (item.data && item.data.length) {
                for (var group_id of item.data) {
                    group_ids_obj[group_id] = 1;
                }
            }
        })
        var group_ids = Object.keys(group_ids_obj);
        if (group_ids && group_ids.length) {
            var hometown_group_ids = out_facebook_group_dong_huong(group_ids);
            var hometown_group_ids_insight = hometown_group_ids && hometown_group_ids.length ? insight_facebook_group_dong_huong(hometown_group_ids) : false;
            out_user_insight_hometown_group(hometown_group_ids_insight, facebook_ids);
        }

    }
})