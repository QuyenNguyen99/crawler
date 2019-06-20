/*
db.loadServerScripts();
out_facebook_group_school_2();
insight_facebook_group_school_2();
out_user_insight_group_school_2();
*/
db.system.js.save({
    _id: 'out_facebook_group_school_2',
    value: function (group_ids = false) {
        var search = group_ids && group_ids.length ? { _id: { $in: group_ids } } : {};
        search['$and'] = [
            { 'list_keyword': { $in: db.getCollection('ref_common').find({ type: "school_2" })[0].keyword } },
        ];
        var list = [];
        db.getCollection('facebook_group').find(search).forEach(function (item) {
            if (!item.alias.match(/dai hoc|daihoc|thsp|caodang|cao dang|hoc vien|hocvien|trungcap|trung cap|thpt|trung hoc pho thong|cap 3|cap1|tieu hoc|primary school|tieuhoc/gi)) {
                delete item.list_keyword;
                list.push(item);
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_group_school_2');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_group_school_2');
        }
    }
});

db.system.js.save({
    _id: 'build_list_keyword_tu_dien_facebook_group_school_2',
    value: function (group_ids = false) {
        build_facebook_education_list_keyword_tu_dien();
        var search = group_ids && group_ids.length ? { _id: { $in: group_ids } } : {};
        search['list_keyword_tu_dien'] = { $exists: false };
        var list = [];
        db.getCollection('facebook_group_school_2').find(search).forEach(function (item) {
            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { list_keyword_tu_dien: global_tu_dien_get_list_array_sentence(item.alias) } }
                }
            });
            if (list.length == 10000) {
                db.getCollection('facebook_group_school_2').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('facebook_group_school_2').bulkWrite(list);
        }
    }
});

db.system.js.save({
    _id: 'build_list_keyword_tu_dien_facebook_group_school_2_by_status',
    value: function (start,end) {
        build_facebook_education_list_keyword_tu_dien();
        for (var i = start; i < end; i++) {
            var search = { list_keyword_tu_dien: { $exists: false }, status: i };
            var list = [];
            db.getCollection('facebook_group_school_2').find(search).forEach(function (item) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { list_keyword_tu_dien: global_tu_dien_get_list_array_sentence(item.alias) } }
                    }
                });
                if (list.length == 10000) {
                    db.getCollection('facebook_group_school_2').bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_group_school_2').bulkWrite(list);
            }
        }

    }
});

// function update_city_id_facebook_group_by_group_id
db.system.js.save({
    _id: "update_city_id_facebook_group_by_group_id",
    value: function (group_id) {
        var item = db.getCollection('facebook_user_group').aggregate([
            { $match: { data: group_id } },
            { $project: { _id: 1 } },
            {
                $lookup: {
                    from: 'user_hometown',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user_hometown',
                }
            },
            {
                $project: {
                    _id: 1,
                    city_id: { $arrayElemAt: ["$user_hometown.city_id", 0] },
                    city_name: { $arrayElemAt: ["$user_hometown.city_name", 0] },
                }
            },
            { $group: { _id: "$city_id", sum: { $sum: 1 }, city_name: { $first: "$city_name" } } },
            { $match: { _id: { $ne: null } } },
            { $sort: { sum: -1 } },
            { $limit: 1 }
        ]).toArray();
        if (item && item.length) {
            return item[0];
        }
        return false;
    }
})
// function update_city_id_facebook_group_school_2_by_hometown
db.system.js.save({
    _id: "update_city_id_facebook_group_school_2_by_hometown",
    value: function (group_ids = false) {
        var search = group_ids && group_ids.length ? { _id: { $in: group_ids } } : {};
        search['hometown_city_id'] = { $exists: false };
        var list = [];
        db.getCollection('facebook_group_school_2').find(search).forEach(function (item) {
            var row = update_city_id_facebook_group_by_group_id(item._id);
            if (row) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            $set: {
                                hometown_city_id: row._id,
                                hometown_city_name: row.city_name,
                                hometown_city_sum: row.sum,
                            }
                        }
                    }
                })
            }

            if (list.length == 10) {
                db.getCollection('facebook_group_school_2').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('facebook_group_school_2').bulkWrite(list);
        }
        return false;
    }
})

// function update_city_id_facebook_group_school_2_by_hometown_by_status
db.system.js.save({
    _id: "update_city_id_facebook_group_school_2_by_hometown_by_status",
    value: function (status_start = 0, status_end = 10) {
        for (var i = status_start; i <= status_end; i++) {
            var search = { 'hometown_city_id': { $exists: false }, status: i };
            var list = [];
            db.getCollection('facebook_group_school_2').find(search).forEach(function (item) {
                var row = update_city_id_facebook_group_by_group_id(item._id);
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            $set: {
                                hometown_city_id: row ? row._id : false,
                                hometown_city_name: row ? row.city_name : false,
                                hometown_city_sum: row ? row.sum : false,
                            }
                        }
                    }
                })

                if (list.length == 10) {
                    db.getCollection('facebook_group_school_2').bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_group_school_2').bulkWrite(list);
            }
        }
    }
})

// function insight_facebook_group_school_2
db.system.js.save({
    _id: "insight_facebook_group_school_2",
    value: function (school_2_ids = false, group_ids = false) {
        var search_1 = group_ids && group_ids.length ? { _id: { $in: group_ids } } : {};
        var search_school_2 = { $and: [{ "ref_school_2": { $ne: [] } },] };
        if (school_2_ids && school_2_ids.length) {
            search_school_2['$and'].push({ 'ref_school_2._id': { $in: school_2_ids } });
        }
        var list = [], i = 0;
        db.getCollection('facebook_group_school_2').aggregate([
            { $match: search_1 },
            {
                $lookup: {
                    from: 'ref_school_2',
                    localField: 'list_keyword_tu_dien',
                    foreignField: 'list_keyword',
                    as: 'ref_school_2',
                }
            },
            {
                $project: {
                    _id: 1, name: 1, alias: 1, sum: 1, list_keyword_tu_dien: 1, hometown_city_id: 1, hometown_city_name: 1, ref_school_2: {
                        $map: {
                            "input": "$ref_school_2",
                            "as": "m",
                            "in": {
                                "_id": "$$m._id",
                                "name": "$$m.name",
                                "city_id": "$$m.city_id",
                                "city_name": "$$m.city_name",
                                "list_keyword": "$$m.list_keyword"
                            }
                        }
                    }
                }
            },
            { $match: search_school_2 }
        ]).forEach(function (item) {
            i++;
            if (item.hometown_city_id) {
                var ref_school_2 = [];
                for (var it_school_2 of item.ref_school_2) {
                    if (item.hometown_city_id == it_school_2.city_id) {
                        ref_school_2.push(it_school_2);
                    }
                }
                if (ref_school_2.length > 1) {
                    ref_school_2 = trim_school_name(ref_school_2, 'list_keyword_tu_dien', item);
                }
                if (ref_school_2.length == 1) {
                    item.ref_school_2 = ref_school_2;
                    list.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: item,
                            upsert: true
                        }
                    });
                }
            }

            if (i % 10000 == 0) {
                if (list.length) {
                    db.getCollection('facebook_insight_group_school_2').bulkWrite(list);
                }

                list = [];
            }
        })
        if (list.length) {
            if (list.length) {
                db.getCollection('facebook_insight_group_school_2').bulkWrite(list);
            }
            list = [];
        }
        return rs;
    }
})

// function out_user_insight_group_school_2
db.system.js.save({
    _id: "out_user_insight_group_school_2",
    value: function (data_ids = false, facebook_ids = false) {
        var list = [], i = 0;
        var search = {  };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? {_id: {$in: data_ids}} : {};
            var list_ids = [];
            db.getCollection('facebook_insight_group_school_2').find(search_ref).forEach(function(item){
                list_ids.push(item._id);
            })
            search['data'] = {$in: list_ids};
        }
        var list_user_school_2 = [];
        db.getCollection('facebook_user_group').aggregate([
            { $match: search },
            {
                $lookup: {
                    from: 'facebook_insight_group_school_2',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_insight_group_school_2',
                }
            },
            { $project: { _id: 1, facebook_insight_group_school_2: 1 } },
        ]).forEach(function (item) {
            i++;
            if (item.facebook_insight_group_school_2.length) {
                for (var it of item.facebook_insight_group_school_2) {
                    if (it.ref_school_2.length == 1) {
                        var id_update = it._id + '_' + item._id;
                        list.push({
                            updateOne: {
                                filter: { _id: id_update },
                                update: {
                                    _id: id_update,
                                    facebook_id: item._id,
                                    school_2_id: it.ref_school_2[0]._id,
                                    school_2_name: it.ref_school_2[0].name,
                                    school_2_city_id: it.ref_school_2[0].city_id,
                                    school_2_city_name: it.ref_school_2[0].city_name,
                                    group_name: it.name,
                                    group_id: it._id,
                                },
                                upsert: true
                            }
                        })
                        list_user_school_2.push({
                            updateOne: {
                                filter: { _id: item._id },
                                update: { $set: { _id: item._id } },
                                upsert: true
                            }
                        });
                    }
                }
            }

            if (i % 10000 == 0) {
                db.getCollection('user_insight_group_school_2').bulkWrite(list);
                db.getCollection('user_school_2').bulkWrite(list_user_school_2);
                list_user_school_2 = [];
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('user_insight_group_school_2').bulkWrite(list);
            db.getCollection('user_school_2').bulkWrite(list_user_school_2);
            list_user_school_2 = [];
            list = [];
        }
        return rs;
    }
})
