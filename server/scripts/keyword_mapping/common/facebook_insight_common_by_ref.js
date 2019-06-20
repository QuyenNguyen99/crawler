db.system.js.save({
    _id: "bulk_write_facebook_insight_education_school_common_by_ref",
    value: function (type = 'school_1', ids = false) {
        var collection = 'facebook_education_' + type;
        var collection_insight = "facebook_insight_education_" + type;
        var collection_ref_keyword_mapping = "ref_" + type + "_keyword_mapping";
        var collection_ref = "ref_" + type;
        if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
        if (!ids) {
            db.getCollection(collection_insight).drop();
            db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
        }
        var search = { status: -1 };
        var ids_obj = {};
        var flag_ids = false;
        if (ids) {
            flag_ids = true;
            search['id'] = { $in: ids };
            for (var id of ids) {
                ids_obj[id] = 1;
            }
        }
        var list_keyword = [];
        var list_delete = {};
        db.getCollection(collection_ref_keyword_mapping).find(search).forEach(function (item) {
            if (item.is_delete == 0) {
                list_keyword.push(item.keyword);
            } else if (item.is_delete == 1) {
                if (!list_delete[item.id]) {
                    list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
                } else {
                    list_delete[item.id].keyword['$in'].push(item.keyword);
                }
            }
        })
        var search_ref = { $and: [{ "ref": { $ne: [] } },] };
        var list = [], list_obj = {};
        db.getCollection(collection).aggregate([
            { $match: { list_keyword_tu_dien: { $in: list_keyword } } },
            {
                $lookup: {
                    from: collection_ref,
                    localField: 'list_keyword_tu_dien',
                    foreignField: 'list_keyword',
                    as: 'ref',
                }
            },
            {
                $project: {
                    _id: 1, name: 1, alias: 1, sum: 1, type: 1, list_keyword_tu_dien: 1, ref_city: 1, ref: {
                        $map: {
                            "input": "$ref",
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
            { $match: search_ref }
        ]).forEach(function (item) {
            if (item.ref_city && item.ref_city.length) {
                var city_ids = index(item.ref_city, '_id');
                var ref = [];
                for (var it_ref of item.ref) {
                    if (city_ids[it_ref.city_id]) {
                        ref.push(it_ref);
                    }
                }
                item.ref = ref;
            }
            if (item.ref && item.ref.length) {
                item.ref = trim_school_name(item.ref, 'list_keyword_tu_dien', item);
                var fl = item.ref.length == 1 ? true : false;
                for (var it of item.ref) {
                    if (!flag_ids || (flag_ids && ids_obj[it._id])) {
                        var _id = item._id + "_" + it._id + "_" + it.keyword_for_school;
                        var item_insert = {
                            _id: _id,
                            ref_id: it._id,
                            ref_name: it.name,
                            ref_city_id: it.city_id,
                            ref_city_name: it.city_name,
                            source_id: item._id,
                            source_name: item.name,
                            sum: item.sum,
                            keyword: it.keyword_for_school,
                            status: -1,
                            is_delete: 0,
                            education_school: fl,
                        };
                        list_obj[item_insert._id] = item_insert;
                        list.push(item_insert);
                        if (list.length == 10000) {
                            insert_data_ignore(get_value_object(list_obj), collection_insight);
                            list_obj = {};
                            list = [];
                        }
                    }
                }
            }
        })
        if (list.length) {
            insert_data_ignore(get_value_object(list_obj), collection_insight);
            list_obj = {};
            list = [];
        }
        for (var key in list_delete) {
            db.getCollection(collection_insight).update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
        }
    }
})



db.system.js.save({
    _id: "bulk_write_facebook_insight_group_school_common_by_ref",
    value: function (type = 'school_1', ids = false) {
        var collection = 'facebook_group_' + type;
        var collection_insight = "facebook_insight_group_" + type;
        var collection_ref_keyword_mapping = "ref_" + type + "_keyword_mapping";
        var collection_ref = "ref_" + type;
        if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
        if (!ids) {
            db.getCollection(collection_insight).drop();
            db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
        }
        var search = { status: -1 };
        var ids_obj = {};
        var flag_ids = false;
        if (ids) {
            flag_ids = true;
            search['id'] = { $in: ids };
            for (var id of ids) {
                ids_obj[id] = 1;
            }
        }
        var list_keyword = [];
        var list_delete = {};
        db.getCollection(collection_ref_keyword_mapping).find(search).forEach(function (item) {
            if (item.is_delete == 0) {
                list_keyword.push(item.keyword);
            } else if (item.is_delete == 1) {
                if (!list_delete[item.id]) {
                    list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
                } else {
                    list_delete[item.id].keyword['$in'].push(item.keyword);
                }
            }
        })
        var search_ref = { $and: [{ "ref": { $ne: [] } },] };
        var list = [], list_obj = {};
        db.getCollection(collection).aggregate([
            { $match: { list_keyword_tu_dien: { $in: list_keyword } } },
            {
                $lookup: {
                    from: collection_ref,
                    localField: 'list_keyword_tu_dien',
                    foreignField: 'list_keyword',
                    as: 'ref',
                }
            },
            {
                $project: {
                    _id: 1, name: 1, alias: 1, sum: 1, type: 1, list_keyword_tu_dien: 1, city_id: 1, ref: {
                        $map: {
                            "input": "$ref",
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
            { $match: search_ref }
        ]).forEach(function (item) {
            if (item.city_id) {
                var ref = [];
                for (var it_ref of item.ref) {
                    if (item.city_id == it_ref.city_id) {
                        ref.push(it_ref);
                    }
                }
                item.ref = ref;
                if (item.ref && item.ref.length) {
                    item.ref = trim_school_name(item.ref, 'list_keyword_tu_dien', item);
                    for (var it of item.ref) {
                        if (!flag_ids || (flag_ids && ids_obj[it._id])) {
                            var _id = item._id + "_" + it._id + "_" + it.keyword_for_school;
                            var item_insert = {
                                _id: _id,
                                ref_id: it._id,
                                ref_name: it.name,
                                ref_city_id: it.city_id,
                                ref_city_name: it.city_name,
                                source_id: item._id,
                                source_name: item.name,
                                sum: item.sum,
                                keyword: it.keyword_for_school,
                                status: -1,
                                is_delete: 0,
                            }
                            list_obj[item_insert._id] = item_insert;
                            list.push(item_insert);
                            if (list.length == 10000) {
                                insert_data_ignore(get_value_object(list_obj), collection_insight);
                                list_obj = {};
                                list = [];
                            }
                        }
                    }
                }
            }
            
        })
        if (list.length) {
            insert_data_ignore(get_value_object(list_obj), collection_insight);
            list_obj = {};
            list = [];
        }
        for (var key in list_delete) {
            db.getCollection(collection_insight).update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
        }

    }
})




db.system.js.save({
    _id: "bulk_write_facebook_insight_college_common_by_ref",
    value: function (college_type = 'group', ids = false) {
        var collection = 'facebook_' + college_type + '_college';
        var collection_insight = "facebook_insight_" + college_type + "_college";
        var collection_ref = "ref_college_keyword_mapping";
        if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
        if (!ids) {
            db.getCollection(collection_insight).drop();
            db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
        }
        var search = { status: -1 };
        if (ids) {
            search['id'] = { $in: ids };
        }
        var list_delete = {};
        db.getCollection(collection_ref).find(Object.assign({ is_delete: 1, type: 'search' }, search)).forEach(function (item) {
            if (!list_delete[item.id]) {
                list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
            } else {
                list_delete[item.id].keyword['$in'].push(item.keyword);
            }
        })
        var list = [];
        db.getCollection(collection_ref).aggregate([
            { $match: Object.assign({ is_delete: 0, type: 'search' }, search) },
            {
                $lookup: {
                    from: collection,
                    localField: 'keyword',
                    foreignField: 'list_keyword',
                    as: 'source',
                }
            },
            { $unwind: "$source" },
            {
                $project: {
                    _id: { $concat: ["$source._id", "_", "$_id"] },
                    ref_id: "$id",
                    ref_name: "$name",
                    city_id: "$city_id",
                    city_name: "$city_name",
                    source_id: "$source._id",
                    source_name: "$source.name",
                    keyword: "$keyword",
                    status: { $literal: -1 },
                    is_delete: { $literal: 0 },
                }
            },
            {
                $lookup: {
                    from: collection_insight,
                    localField: "_id",
                    foreignField: "_id",
                    as: "insight",
                }
            },
            { $match: { insight: [] } }
        ]).forEach(function (item) {
            delete item.insight;
            list.push(item);
            if (list.length == 10000) {
                db.getCollection(collection_insight).insertMany(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection(collection_insight).insertMany(list);
            list = [];
        }
        for (var key in list_delete) {
            db.getCollection(collection_insight).update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
        }
    }
})


db.system.js.save({
    _id: "bulk_write_facebook_insight_college_alias_common_by_ref",
    value: function (type = 'group', ids = false) {
        var collection = 'facebook_' + type + '_college';
        var collection_insight = "facebook_insight_" + type + "_college";
        var collection_ref = "ref_college_keyword_mapping";
        if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
        if (!ids) {
            db.getCollection(collection_insight).drop();
            db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
        }
        var search = { status: -1 };
        if (ids) {
            search['id'] = { $in: ids };
        }
        var list_delete = {};
        db.getCollection(collection_ref).find(Object.assign({ is_delete: 1, type: 'search_full' }, search)).forEach(function (item) {
            if (!list_delete[item.id]) {
                list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
            } else {
                list_delete[item.id].keyword['$in'].push(item.keyword);
            }
        })
        var list = [];
        db.getCollection(collection_ref).aggregate([
            { $match: Object.assign({ is_delete: 0, type: 'search_full' }, search) },
            {
                $lookup: {
                    from: collection,
                    localField: 'keyword',
                    foreignField: 'alias',
                    as: 'source',
                }
            },
            { $unwind: "$source" },
            {
                $project: {
                    _id: { $concat: ["$source._id", "_", "$_id"] },
                    ref_id: "$id",
                    ref_name: "$name",
                    city_id: "$city_id",
                    city_name: "$city_name",
                    source_id: "$source._id",
                    source_name: "$source.name",
                    keyword: "$keyword",
                    status: { $literal: -1 },
                    is_delete: { $literal: 0 },
                }
            },
            {
                $lookup: {
                    from: collection_insight,
                    localField: "_id",
                    foreignField: "_id",
                    as: "insight",
                }
            },
            { $match: { insight: [] } }
        ]).forEach(function (item) {
            delete item.insight;
            list.push(item);
            if (list.length == 10000) {
                db.getCollection(collection_insight).insertMany(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection(collection_insight).insertMany(list);
            list = [];
        }
        for (var key in list_delete) {
            db.getCollection(collection_insight).update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
        }
    }
})




db.system.js.save({
    _id: "bulk_write_facebook_insight_common_by_ref",
    value: function (collection_ref, collection_insight, collection, ids = false, flag_func = false) {
        if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
        if (!ids) {
            db.getCollection(collection_insight).drop();
            db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
        }
        var search = { status: -1 };
        if (ids) {
            search['id'] = { $in: ids };
        }
        var list_delete = {};
        db.getCollection(collection_ref).find(Object.assign({ is_delete: 1 }, search)).forEach(function (item) {
            if (!list_delete[item.id]) {
                list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
            } else {
                list_delete[item.id].keyword['$in'].push(item.keyword);
            }
        })
        var list = [];
        db.getCollection(collection_ref).aggregate([
            { $match: Object.assign({ is_delete: 0 }, search) },
            {
                $lookup: {
                    from: collection,
                    localField: 'keyword',
                    foreignField: 'list_keyword',
                    as: 'source',
                }
            },
            { $unwind: "$source" },
            {
                $project: {
                    _id: { $concat: ["$source._id", "_", "$_id"] },
                    ref_id: "$id",
                    ref_name: "$name",
                    alias: "$source.alias",
                    keyword: "$keyword",
                    source_id: "$source._id",
                    source_name: "$source.name",
                    status: { $literal: -1 },
                    is_delete: { $literal: 0 },
                }
            },
            {
                $lookup: {
                    from: collection_insight,
                    localField: "_id",
                    foreignField: "_id",
                    as: "insight",
                }
            },
            { $match: { insight: [] } }
        ]).forEach(function (item) {
            delete item.insight;
            var flag = typeof (flag_func) == 'function' ? flag_func(item) : true;
            if (flag) {
                delete item.alias;
                list.push(item);
            }
            if (list.length == 10000) {
                db.getCollection(collection_insight).insertMany(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection(collection_insight).insertMany(list);
            list = [];
        }
        for (var key in list_delete) {
            db.getCollection(collection_insight).update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
        }
    }
})
