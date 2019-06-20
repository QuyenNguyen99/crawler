db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_college_common",
        value: function (type = 'education',status = -1) {
            var collection_temp = 'facebook_insight_' + type + '_college_temp';
            var collection = 'facebook_' + type + '_college';
            var collection_insight = 'facebook_insight_' + type + '_college';
            var search_common = [
                {
                    $lookup: {
                        from: "ref_college_keyword_mapping",
                        localField: "list_keyword",
                        foreignField: "keyword",
                        as: "keyword_mapping",
                    }
                },
                { $match: { keyword_mapping: { $ne: [] } } },
                { $unwind: "$keyword_mapping" },
                {
                    $project: {
                        _id: { $concat: ["$_id", "_", "$keyword_mapping._id"] },
                        ref_id: "$keyword_mapping.id",
                        ref_name: "$keyword_mapping.name",
                        ref_city_id: "$keyword_mapping.city_id",
                        ref_city_name: "$keyword_mapping.city_name",
                        source_id: "$_id",
                        source_name: "$name",
                        keyword: "$keyword_mapping.keyword",
                        type: "$keyword_mapping.type",
                        status: { $literal: -1 },
                    }
                },
                {$match:{type:"search"}}
            ]
            if (status == -2) {
                db.getCollection(collection_temp).drop();
                db.getCollection(collection).aggregate(search_common.concat([
                    { $out: collection_temp }
                ]));
                db.getCollection(collection_temp).createIndex({status:1},{background:true});
                db.getCollection(collection_temp).createIndex({ ref_id: 1 }, { background: true });
                db.getCollection(collection_temp).createIndex({ source_id: 1 }, { background: true });
                db.getCollection(collection_temp).createIndex({ keyword: 1 }, { background: true });
                db.getCollection(collection_insight).drop();
                db.getCollection(collection_temp).renameCollection(collection_insight);
            } else {
                var list = [];
                db.getCollection(collection).aggregate([
                    { $match: { status: status } },
                ].concat(search_common).concat([
                    {
                        $lookup: {
                            from: collection_insight,
                            localField: "_id",
                            foreignField: "_id",
                            as: "insight",
                        }
                    },
                    { $match: { insight: [] } }
                ])).forEach(function (item) {
                    delete item.insight;
                    list.push(item);
                    if (list.length == 10000) {
                        db.getCollection(collection_insight).insertMany(list);
                        list = [];
                    }
                })
                if (list.length) {
                    db.getCollection(collection_insight).insertMany(list);
                }
            }
        }
    }
);



db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_college_alias_common",
        value: function (type = 'education',status = -1) {
            var collection = 'facebook_' + type + '_college';
            var collection_insight = 'facebook_insight_' + type + '_college';
            var list_search = [];
            db.getCollection('ref_college_keyword_mapping').find({ type: "search_full" }).forEach(function (item) {
                list_search.push(' ' + item.keyword.trim() + ' ');
            });
            var search = { alias: { $in: list_search } };
            if (status != -2) {
                search['status'] = status;
            }
            var list = [];
            db.getCollection(collection).aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: "ref_college_keyword_mapping",
                        localField: "alias",
                        foreignField: "keyword",
                        as: "keyword_mapping",
                    }
                },
                { $match: { keyword_mapping: { $ne: [] } } },
                { $unwind: "$keyword_mapping" },
                {
                    $project: {
                        _id: { $concat: ["$_id", "_", "$keyword_mapping._id"] },
                        ref_id: "$keyword_mapping.id",
                        ref_name: "$keyword_mapping.name",
                        ref_city_id: "$keyword_mapping.city_id",
                        ref_city_name: "$keyword_mapping.city_name",
                        source_id: "$_id",
                        source_name: "$name",
                        keyword: "$keyword_mapping.keyword",
                        type: "$keyword_mapping.type",
                        status: { $literal: -1 },
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
            }
        }
    }
);




db.system.js.save({
    _id: "bulk_write_facebook_insight_education_school_common",
    value: function (collection_type = 'school_1',  status = -1) {
        var collection_insight = 'facebook_insight_education_' + collection_type;
        var collection_source = 'facebook_education_' + collection_type;
        var collection_ref = 'ref_' + collection_type;
        if(status == -2) {
            db.getCollection(collection_insight).drop();
        }
        var search_1 = status == -2 ? {} : { status: status };
        var search_ref = { $and: [{ "ref": { $ne: [] } },] };
        
        var list = [];
        db.getCollection(collection_source).aggregate([
            { $match: search_1 },
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
                var city_ids = index(item.ref_city,'_id');
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
                for(var it of item.ref) {
                    var _id = item._id + "_" + it._id + "_" + it.keyword_for_school;
                    list.push({
                        _id             : _id,
                        ref_id          : it._id,
                        ref_name        : it.name,
                        ref_city_id     : it.city_id,
                        ref_city_name   : it.city_name,
                        source_id       : item._id,
                        source_name     : item.name,
                        sum             : item.sum,
                        keyword         : it.keyword_for_school,
                        status          : -1,
                        is_delete       : 0,
                        education_school: fl,
                    });
                    if (list.length == 10000) {
                        insert_data_ignore_not_update(list,collection_insight);
                        list = [];
                    }    
                }
            }
        })
        if (list.length) {
            insert_data_ignore_not_update(list,collection_insight);
            list = [];
        }
        if(status == -2) {
            db.getCollection(collection_insight).createIndex({ref_id:1},{background:true});
            db.getCollection(collection_insight).createIndex({source_id:1},{background:true});
            db.getCollection(collection_insight).createIndex({keyword:1},{background:true});
            db.getCollection(collection_insight).createIndex({status:1},{background:true});
        }
    }
})


db.system.js.save({
    _id: "bulk_write_facebook_insight_group_school_common",
    value: function (collection_type = 'school_1',  status = -1) {
        var collection_insight = 'facebook_insight_group_' + collection_type;
        var collection_source = 'facebook_group_' + collection_type;
        var collection_ref = 'ref_' + collection_type;
        if (status == -2) {
            db.getCollection(collection_insight).drop();
        }
        var search_1 = status == -2 ? {} : { status: status };
        var search_ref = { $and: [{ "ref": { $ne: [] } },] };
        var list = [];
        db.getCollection(collection_source).aggregate([
            { $match: search_1 },
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
                    _id: 1, name: 1, alias: 1, sum: 1, type: 1, list_keyword_tu_dien: 1, city_id: 1, city_name: 1, ref: {
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
                        var _id = item._id + "_" + it._id + "_" + it.keyword_for_school;
                        list.push({
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
                        });
                        if (list.length == 10000) {
                            insert_data_ignore_not_update(list, collection_insight);
                            list = [];
                        }
                    }
                }
            }
        })
        if (list.length) {
            insert_data_ignore_not_update(list, collection_insight);
            list = [];
        }
        if (status == -2) {
            db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({status:1},{background:true});
        }
    }
})

db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_common",
        value: function (collection_ref,collection,collection_insight,status = -1,flag_func) {
            var search_common = [
                {$lookup:{
                    from            : collection_ref,
                    localField      : "list_keyword",
                    foreignField    : "keyword",
                    as              : "ref",
                }},
                {$unwind:"$ref"},
                {$project:{
                    _id:{$concat:["$_id","_","$ref._id"]},
                    ref_id:"$ref.id",
                    ref_name:"$ref.name",
                    alias: "$alias",
                    source_id:"$_id",
                    source_name:"$name",
                    keyword:"$ref.keyword",
                    status:{$literal: -1},
                }},
            ]
            if (status == -2 && typeof(flag_func) !== 'function') {
                db.getCollection(collection_insight).drop();
                db.getCollection(collection_ref).aggregate([
                    {$lookup:{
                        from            : collection,
                        localField      : "keyword",
                        foreignField    : "list_keyword",
                        as              : "source",
                    }},
                    {$unwind:"$source"},
                    {$project:{
                        _id:{$concat:["$source._id","_","$_id"]},
                        ref_id:"$id",
                        ref_name:"$name",
                        keyword:"$keyword",
                        source_id:"$source._id",
                        source_name:"$source.name",
                        status:{$literal: -1},
                    }},
                    { $out: collection_insight }
                ])
                db.getCollection(collection_insight).createIndex({ status: 1 }, { background: true });
                db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
                db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
                db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
            db.getCollection(collection_insight).createIndex({status:1},{background:true});
            } else {
                var list = [];
                var search = status == -2 ? {} : {status: status};
                if(status == -2) {
                    db.getCollection(collection_insight).createIndex({status:1},{background:true});
                    db.getCollection(collection_insight).createIndex({ ref_id: 1 }, { background: true });
                    db.getCollection(collection_insight).createIndex({ source_id: 1 }, { background: true });
                    db.getCollection(collection_insight).createIndex({ keyword: 1 }, { background: true });
                }
                db.getCollection(collection).aggregate([
                    { $match: search },
                ].concat(search_common).concat([
                    {
                        $lookup: {
                            from: collection_insight,
                            localField: "_id",
                            foreignField: "_id",
                            as: "insight",
                        }
                    },
                    { $match: { insight: [] } }
                ])).forEach(function (item) {
                    delete item.insight;
                    var flag  =  typeof(flag_func) == 'function' ? flag_func(item) : true;
                    if(flag) {
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
                }
            }
        }
    }
);