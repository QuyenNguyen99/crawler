// function 1
db.system.js.save(
    {
        _id: "get_total_links_by_list_ids_age",
        value: function (ids) {
            var ids_obj = {};
            var list_obj = {};
            for (var it of ids) {
                ids_obj[it] = it;
            }
            var sum = 0;
            db.getCollection('facebook_user_friend_index0').aggregate([{ $match: { _id: { $in: ids } } }]).forEach(item => {
                for (var it of item.data) {
                    if (ids_obj[it]) {
                        var id = item._id > it ? (item._id + '_' + it) : (it + '_' + item._id);
                        if (!list_obj[id]) {
                            list_obj[id] = 1;
                            sum++;
                        }
                    }
                }
            })
            db.getCollection('facebook_user_friend_index1').aggregate([{ $match: { _id: { $in: ids } } }]).forEach(item => {
                for (var it of item.data) {
                    if (ids_obj[it]) {
                        var id = item._id > it ? (item._id + '_' + it) : (it + '_' + item._id);
                        if (!list_obj[id]) {
                            list_obj[id] = 1;
                            sum++;
                        }
                    }
                }
            })
            return sum;
        }
    }
)
// function 2
db.system.js.save(
    {
        _id: "get_friend_age_by_id",
        value: function (id) {
            var item = get_friend_by_id(id);
            if (!item || !item._id || !item.data || !item.data.length) {
                db.getCollection('user_age_id_not_age').update({_id:id},{$set:{status:1}});
                return false;
            }
            var list = db.getCollection("user_age").aggregate([
                {$match:{_id:{$in: item.data },age:{$exists:true}}},
                {$group:{_id:"$age",sum:{$sum:1},ids:{$push:"$_id"}}},
                {$match:{sum:{$gt:8}}},
                {$sort:{sum:-1}},
                {$limit:2},
                {$lookup:{
                        from        : 'facebook_user_friend_index0',
                        localField  : 'ids',
                        foreignField: '_id',
                        as          : 'facebook_user_friend_index0',
                }},
                {$unwind:"$facebook_user_friend_index0"},
                {$project:{_id:1,total_size:{$size:"$ids"},total_link:{$size: {$setIntersection:["$ids","$facebook_user_friend_index0.data"]}}}},
                {$group:{_id:"$_id",total_size:{$first:"$total_size"},total_link:{$sum:"$total_link"}}},
                {$project:{_id:"$_id",year:{$subtract:[new Date().getFullYear() ,"$_id"]},total_size:1,total_link:1,score:{$multiply:["$total_size","$total_link"]},gt:{$gte:["$total_link","$total_size"]}}},
                {$match:{score:{$gte:50},gt:true}},
                {$sort:{score:-1}},
                {$project:{_id:1,year:1,age:"$_id",total_size:1,total_link:1,score:1}},
            ]).toArray();
            if(list && list.length) {
                var item = {_id: id,year: list[0].year,age: list[0].age,age_infer: list};
                insert_data_ignore([item], "user_age");
                insert_data_ignore([item], "friend_age");
                insert_data_ignore([{_id: id,year: list[0].year,age: list[0].age}], "user_all");
            }
            db.getCollection('user_age_id_not_age').update({_id:id},{$set:{status:1}});
        }
    }
)
// function 3
db.system.js.save(
    {
        _id: "get_friend_by_id",
        value: function (id) {
            var item_1 = db.getCollection("facebook_user_friend_index0").findOne({ _id: id });
            if (item_1 && item_1.data && item_1.data.length) {
                return item_1;
            }
            var item_1 = db.getCollection("facebook_user_friend_index1").findOne({ _id: id });
            if (item_1 && item_1.data && item_1.data.length) {
                return item_1;
            }
            var list = [];
            db.getCollection("facebook_user_friend_index0").aggregate([{ $match: { data: id } }, { $project: { _id: 1 } }]).forEach(it => {
                list.push(it._id);
            })
            db.getCollection("facebook_user_friend_index1").bulkWrite([{
                updateOne: {
                    filter  : {_id: id},
                    update  : {$set:{_id:id,data: list}},
                    upsert  : true,
                }
            }]);
            return { _id: id, data: list };
        }
    }
)
// function 4
db.system.js.save(
    {
        _id: "get_mutual_friends_by_id",
        value: function (id) {
            var rs = db.getCollection('friend_mutual').findOne({ _id: id });
            if (rs && rs._id) {
                return rs.data;
            }
            var id_old = id;
            var item = get_friend_by_id(id);
            if (item && typeof (item) == 'object' && item._id && item.data && item.data.length) {
                var ids_obj = {}, list_obj = {}, list_obj_ids = {};
                for (var it of item.data) {
                    ids_obj[it] = 1;
                }
                db.getCollection('facebook_user_friend_index0').aggregate([{ $match: { _id: { $in: item.data } } }]).forEach(item_it => {
                    list_obj_ids[item_it._id] = item_it.data ? item_it.data : [];
                })
                db.getCollection('facebook_user_friend_index1').aggregate([{ $match: { _id: { $in: item.data } } }]).forEach(item_it => {
                    list_obj_ids[item_it._id] = item_it.data ? item_it.data : [];
                })
                for (var id in list_obj_ids) {
                    for (var it of list_obj_ids[id]) {
                        if (ids_obj[it]) {
                            var id1 = list_obj_ids[id]._id > it ? list_obj_ids[id]._id : it;
                            var id2 = list_obj_ids[id]._id > it ? it : list_obj_ids[id]._id;
                            if (!list_obj[id1]) { list_obj[id1] = 0; }
                            if (!list_obj[id2]) { list_obj[id2] = 0; }
                            list_obj[id1]++;
                            list_obj[id2]++;
                        }
                    }
                }
                var rs_all = [];
                for (var id of item.data) {
                    rs_all.push({
                        id: id,
                        sum: list_obj[id] ? list_obj[id] : 0,
                    });
                }
                rs_all.sort(function (item1, item2) {
                    return item2.sum - item1.sum;
                })
                db.getCollection('friend_mutual').bulkWrite([{
                    updateOne: {
                        filter: { _id: id_old },
                        update: { _id: id_old, data: rs_all },
                        upsert: true
                    }
                }]);
                return rs_all;
            } else {
                return false;
            }
        }
    }
)


db.system.js.save(
    {
        _id: "trasfer_data_friend_index_0_73_to_98",
        value: function () {
            db_57 = connect('192.168.105.73/db_insert');
            db_98 = connect('192.168.105.98/db_insert');
            var list = [];
            var list_ids = [];
            db_57.getCollection('facebook_friend_id_index0').aggregate([
                {$match:{friend_crawler: {$in: [1,2]}}},
                {$lookup:{
                    from: "facebook_user_friend_index0",
                    localField: "_id",
                    foreignField: "_id",
                    as: "facebook_user_friend_index0"
                }},
                {$project:{_id:1,data:{$arrayElemAt:["$facebook_user_friend_index0.data",0]}}},
            ]).forEach(function (item) {
                item.count = item.data && item.data.length ? item.data.length : 0;
                list_ids.push(item._id);
                list.push({ _id: item._id, data: item.data, count: item.data && item.data.length ? item.data.length : 0 });
                if (list.length == 1000) {
                    db_98.getCollection('facebook_user_friend').insertMany(list);
                    db_57.getCollection('facebook_friend_id_index0').update({ _id: { $in: list_ids } }, { $set: { friend_crawler: 3 } }, { multi: true });
                    list = [];
                    list_ids = [];
                }
            })
            if (list.length) {
                db_98.getCollection('facebook_user_friend').insertMany(list);
                db_57.getCollection('facebook_user_friend_index0').update({ _id: { $in: list_ids } }, { $set: { status: 2 } }, { multi: true });
                list = [];
                list_ids = [];
            }
        }
    }
)



db.system.js.save(
    {
        _id: "trasfer_data_friend_index_1_73_to_98",
        value: function () {
            db_57 = connect('192.168.105.73/db_insert');
            db_98 = connect('192.168.105.98/db_insert');
            var list = [];
            var list_ids = [];
            db_57.getCollection('facebook_user_friend_index1').find({ status: 1 }).forEach(function (item) {
                item.count = item.data && item.data.length ? item.data.length : 0;
                list_ids.push(item._id);
                list.push({ _id: item._id, data: item.data, count: item.data && item.data.length ? item.data.length : 0 });
                if (list.length == 1000) {
                    db_98.getCollection('facebook_user_friend').bulkWrite(list);
                    db_57.getCollection('facebook_user_friend_index1').update({ _id: { $in: list_ids } }, { $set: { status: 2 } }, { multi: true });
                    list = [];
                    list_ids = [];
                }
            })
            if (list.length) {
                db_98.getCollection('facebook_user_friend').bulkWrite(list);
                db_57.getCollection('facebook_user_friend_index1').update({ _id: { $in: list_ids } }, { $set: { status: 2 } }, { multi: true });
                list = [];
                list_ids = [];
            }
        }
    }
)