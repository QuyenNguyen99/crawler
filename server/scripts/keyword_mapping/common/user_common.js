db.system.js.save({
    _id: "reset_user_common",
    value: function (collection_name, collection_name_education = false, collection_name_group = false) {
        db.getCollection(collection_name).drop();
        db.getCollection(collection_name).createIndex({ "data.ref_id": 1 }, { background: true });
        db.getCollection(collection_name).createIndex({ "data.ref_id": 1,is_delete:1 }, { background: true });
        
        if (collection_name_education) {
            db.getCollection(collection_name).createIndex({ "data.profilesource.source_id": 1 }, { background: true });
            var list = [];
            db.getCollection(collection_name_education).aggregate([
                { $group: { _id: "$facebook_id" } },
                { $project: { _id: 1, status: { $literal: -1 } } },
                { $out: collection_name },
            ], { allowDiskUse: true }).forEach(function (item) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                        upsert: true
                    }
                });
                if (list.length == 10000) {
                    db.getCollection(collection_name).bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection(collection_name).bulkWrite(list);
                list = [];
            }
        }
        if (collection_name_group) {
            db.getCollection(collection_name).createIndex({ "data.group.source_id": 1 }, { background: true });
            var list = [];
            db.getCollection(collection_name_group).aggregate([
                { $group: { _id: "$facebook_id" } },
                { $project: { _id: 1, status: { $literal: -1 } } },
            ], { allowDiskUse: true }).forEach(function (item) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: item },
                        upsert: true
                    }
                });
                if (list.length == 10000) {
                    db.getCollection(collection_name).bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection(collection_name).bulkWrite(list);
                list = [];
            }
        }
    }
});


db.system.js.save({
    _id: "bulk_write_user_common_by_search",
    value: function (collection_name,collection_name_education,collection_name_group, search = {}) {
        var list_bulk_write = [];
        var data_aggregate = [
            { $match: search },
        ];
        if(collection_name_education) {
            data_aggregate.push({
                $lookup: {
                    from: collection_name_education,
                    localField: "_id",
                    foreignField: "facebook_id",
                    as: "profilesource",
                }
            });
        }
        if(collection_name_group) {
            data_aggregate.push({
                $lookup: {
                    from: collection_name_group,
                    localField: "_id",
                    foreignField: "facebook_id",
                    as: "group",
                }
            });
        }
        db.getCollection(collection_name).aggregate(data_aggregate).forEach(function (item) {
            var data_obj_old = {};
            var data = {};
            var fl = false;
            if (item.data && item.data.length) {
                for (var it of item.data) {
                    if (!data_obj_old[it.ref_id]) {
                        data_obj_old[it.ref_id] = { profilesource: {}, group: {} };
                    }
                    if(it.profilesource) {
                        for (var it_2 of it.profilesource) {
                            data_obj_old[it.ref_id].profilesource[it_2.source_id] = it_2;
                        }
                    }
                    if(it.group) {
                        for (var it_2 of it.group) {
                            data_obj_old[it.ref_id].group[it_2.source_id] = it_2;
                        }
                    }
                }
            }
            if (item.profilesource && item.profilesource.length) {
                for (var it of item.profilesource) {
                    if (!data[it.ref_id]) {
                        data[it.ref_id] = {
                            ref_id: it.ref_id,
                            ref_name: it.ref_name,
                            profilesource: [],
                            group: [],
                        };
                        if(it.ref_city_id) {
                            data[it.ref_id].ref_city_id = it.ref_city_id;
                            data[it.ref_id].ref_city_name = it.ref_city_name;
                        }
                    }
                    data[it.ref_id].profilesource.push({
                        source_id: it.source_id,
                        source_name: it.source_name,
                        keyword: it.keyword,
                    });
                    if (!data_obj_old[it.ref_id] || !data_obj_old[it.ref_id].profilesource[it.source_id]) {
                        fl = true;
                    }
                }
            }
            if (item.group && item.group.length) {
                for (var it of item.group) {
                    if (!data[it.ref_id]) {
                        data[it.ref_id] = {
                            ref_id: it.ref_id,
                            ref_name: it.ref_name,
                            group: [],
                            profilesource: [],
                        };
                        if(it.ref_city_id) {
                            data[it.ref_id].ref_city_id = it.ref_city_id;
                            data[it.ref_id].ref_city_name = it.ref_city_name;
                        }
                    }
                    data[it.ref_id].group.push({
                        source_id: it.source_id,
                        source_name: it.source_name,
                        keyword: it.keyword,
                    });
                    if (!data_obj_old[it.ref_id] || !data_obj_old[it.ref_id].group[it.source_id]) {
                        fl = true;
                    }
                }
            }

            var data_value = get_value_object(data);

            if (data_value.length) {
                if (fl) {
                    list_bulk_write.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: {
                                $set: { status: 0, data: data_value, is_delete: 0, update_time: parseInt(new Date().getTime() / 1000) },
                            }
                        }
                    })
                }
            } else {
                list_bulk_write.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            $set: { is_delete: 1, update_time: parseInt(new Date().getTime() / 1000) },
                        }
                    }
                });
            }
            if (list_bulk_write.length == 10000) {
                db.getCollection(collection_name).bulkWrite(list_bulk_write);
                list_bulk_write = [];
            }
        })
        if (list_bulk_write.length) {
            db.getCollection(collection_name).bulkWrite(list_bulk_write);
            list_bulk_write = [];
        }
        // db.getCollection(collection_name).remove({ is_delete: 1 });
    }
})