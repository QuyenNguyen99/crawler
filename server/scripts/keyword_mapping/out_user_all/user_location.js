db.system.js.save({
    _id: "bulk_write_out_user_location_by_ref",
    value: function (status = -1) {
        var search_common = [
            {
                $lookup: {
                    from: "facebook_insight_hometown_location",
                    localField: "data",
                    foreignField: "source_id",
                    as: "insight",
                }
            },
            { $match: { insight: { $ne: [] } } },
            { $project: { _id: 1, insight: { $arrayElemAt: ["$insight", 0] } } },
            {
                $project: {
                    _id: 1,
                    insight_id: "$insight._id",
                    ref_id: "$insight.ref_id",
                    ref_name: "$insight.ref_name",
                    source_id: "$insight.source_id",
                    source_name: "$insight.source_name",
                    keyword: "$insight.keyword",
                    is_delete: { $literal: 0 },
                    update_time: parseInt(new Date().getTime() / 1000),
                }
            },
        ]
        if (status == -2) {
            db.getCollection("user_location").drop();
            db.getCollection("user_location").createIndex({ "ref_id": 1 }, { background: true });
            db.getCollection("user_location").createIndex({ "source_id": 1 }, { background: true });
            db.getCollection("user_location").createIndex({ "insight_id": 1 }, { background: true });
            db.getCollection('facebook_user_location').aggregate(search_common.concat([
                { $out: "user_location" },
            ]))
        } else {
            var list_source_ids_obj = {};
            var insight_ids = [];
            db.getCollection('facebook_insight_hometown_location').aggregate([
                {$match:{ is_delete: 0, status: status }},
            ]).forEach(function (item) {
                list_source_ids_obj[item.source_id] = 1;
                insight_ids.push(item._id);
            })
            var list_source_ids = Object.keys(list_source_ids_obj);
            if(insight_ids.length) {
                db.getCollection('user_location').update({insight_id:{$in: insight_ids}},{$set:{is_delete:0}},{multi:true});
            }
            if (list_source_ids.length) {
                var list = [];
                db.getCollection('facebook_user_location').aggregate([
                    { $match: {data:{$in: list_source_ids}} }
                ].concat(search_common).concat([
                    {
                        $lookup: {
                            from: "user_location",
                            localField: "_id",
                            foreignField: "_id",
                            as: "user",
                        }
                    },
                    { $match: { user: [] } },
                ])).forEach(function (item) {
                    delete item.user;
                    list.push(item);
                    if (list.length == 10000) {
                        db.getCollection('user_location').insertMany(list);
                        list = [];
                    }
                })
                if (list.length) {
                    db.getCollection('user_location').insertMany(list);
                }
            }


            var insight_delete_ids = [];
            if (ref_ids && ref_ids.length) {
                db.getCollection('facebook_insight_hometown_location').find({ is_delete: 1, status: status }).forEach(function (item) {
                    insight_delete_ids.push(item._id);
                })
            }
            if (insight_delete_ids.length) {
                db.getCollection('user_location').update({ insight_id: { $in: insight_delete_ids } }, { $set: { is_delete: 1,update_time: parseInt(new Date().getTime() / 1000) } }, { multi: true });
            }
        }

    }
})

db.system.js.save({
    _id: "bulk_write_out_user_location",
    value: function (ids = false) {
        var search_common = [
            {
                $lookup: {
                    from: "facebook_insight_hometown_location",
                    localField: "data",
                    foreignField: "source_id",
                    as: "insight",
                }
            },
            { $match: { insight: { $ne: [] } } },
            { $project: { _id: 1, insight: { $arrayElemAt: ["$insight", 0] } } },
            {
                $project: {
                    _id: 1,
                    insight_id: "$insight._id",
                    ref_id: "$insight.ref_id",
                    ref_name: "$insight.ref_name",
                    source_id: "$insight.source_id",
                    source_name: "$insight.source_name",
                    keyword: "$insight.keyword",
                    is_delete: { $literal: 0 },
                    update_time: parseInt(new Date().getTime() / 1000),
                }
            },
        ]
        if (!ids || !ids.length) {
            db.getCollection("user_location").drop();
            db.getCollection("user_location").createIndex({ "ref_id": 1 }, { background: true });
            db.getCollection("user_location").createIndex({ "source_id": 1 }, { background: true });
            db.getCollection("user_location").createIndex({ "insight_id": 1 }, { background: true });
            db.getCollection('facebook_user_location').aggregate(search_common.concat([
                { $out: "user_location" },
            ]))
        } else {
            ids = typeof(ids) == 'object' ? ids : [ids];
            var list = [];
            db.getCollection('facebook_user_location').aggregate([
                { $match: {_id:{$in: ids}} }
            ].concat(search_common).concat([
                {
                    $lookup: {
                        from: "user_location",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user",
                    }
                },
                { $match: { user: [] } },
            ])).forEach(function (item) {
                delete item.user;
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection('user_location').insertMany(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('user_location').insertMany(list);
            }
        }

    }
})