

db.system.js.save(
    {
        _id: "out_facebook_group_school_3",
        value: function (group_ids = false) {
            build_facebook_group_school_3(group_ids);
            //add more filter here
        }
    }
);

db.system.js.save(
    {
        _id: "insight_facebook_group_school_3",
        value: function (group_ids = false) {
            var search = {};
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }
            var list_bulk_write_facebook_insight_group_school_3 = [];
            var j = 0;
            db.getCollection('facebook_group_school_3').aggregate([
                { $match: search },
                {
                    $lookup:
                    {
                        from: 'ref_school_3',
                        localField: 'list_keyword_tu_dien',
                        foreignField: 'list_keyword',
                        as: 'school_3_match'
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "name": 1,
                        "alias": 1,
                        "list_keyword_tu_dien": 1,
                        "sum": 1,
                        "type": 1,
                        "city_id": 1,
                        "city_name": 1,
                        "ref_target":
                        {
                            "$map": {
                                "input": "$school_3_match",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.content",
                                    "city_id": "$$m.city_id",
                                    "city_name": "$$m.city_name",
                                    "list_keyword": "$$m.list_keyword"
                                }
                            }
                        }
                    }
                }
            ]).forEach(function (it) {
                it.ref_target = (it.ref_target.length > 0)?trim_school_name(it.ref_target,'list_keyword_tu_dien', it):[];
                var ref_insight_id_ = "";
                var ref_insight_name_ = "";
                var ref_insight_city_id_ = "";
                var ref_insight_city_name_ = "";
                //only find 1
                if (it.ref_target.length == 1) {
                    ref_insight_id_ = it.ref_target[0]._id;
                    ref_insight_name_ = it.ref_target[0].name;
                    ref_insight_city_id_ = it.ref_target[0].city_id;
                    ref_insight_city_name_ = it.ref_target[0].city_name;
                }

                //map city
                var length_ = 0;
                for (var school_ of it.ref_target) {
                    if (it.city_id == school_.city_id) {
                        if (length_ < school_.name.length) {
                            length_ = school_.name.length;
                            ref_insight_id_ = school_._id;
                            ref_insight_name_ = school_.name;
                            ref_insight_city_id_ = school_.city_id;
                            ref_insight_city_name_ = school_.city_name;
                        }
                    }
                }
                if(it.ref_target.length > 0)
                {
                    list_bulk_write_facebook_insight_group_school_3.push({
                        updateOne: {
                            filter: { _id: it._id },
                            update: {
                                _id: it._id,
                                name: it.name,
                                alias: it.alias,
                                ref_insight_city_id: ref_insight_city_id_,
                                ref_insight_city_name: ref_insight_city_name_,
                                ref_insight_id: ref_insight_id_,
                                ref_insight_name: ref_insight_name_,
                                home_town_city_id: it.city_id,
                                home_town_city_name: it.city_name,
                                sum: it.sum,
                                list_keyword: it.list_keyword_tu_dien,
                                ref_target: it.ref_target,
                            },
                            upsert: true,
                        }
                    });
                }
                j++;
                if (j % 1000 == 0) {
                    db.getCollection('facebook_insight_group_school_3').bulkWrite(list_bulk_write_facebook_insight_group_school_3);
                    list_bulk_write_facebook_insight_group_school_3 = [];
                }
            });
            if (list_bulk_write_facebook_insight_group_school_3.length) {
                db.getCollection('facebook_insight_group_school_3').bulkWrite(list_bulk_write_facebook_insight_group_school_3);
            }
        }
    }
);


db.system.js.save(
    {
        _id: "out_user_group_school_3",
        value: function (group_ids = false,facebook_ids = false) {
            var search_group = {};
            if (group_ids && group_ids.length) {
                search_group['group_info_id'] = { $in: group_ids };
                out_facebook_group_school_3(group_ids);
                insight_facebook_group_school_3(group_ids);
                out_user_insight_group_school_3(group_ids, facebook_ids);
            }
        }
    }
);

db.system.js.save({
    _id: "build_facebook_group_school_3_city",
    value: function (group_ids = false) {
        var search = group_ids && group_ids.length ? {_id: {$in: group_ids}} : {};
        var list = [], i = 0;

        db.getCollection('facebook_group_school_3').aggregate([
            {$match: search},
            {$lookup:{
                    from                : 'facebook_user_group',
                    localField          : '_id',
                    foreignField        : 'data',
                    as                  : 'facebook_user_group',
            }},
            {$unwind:"$facebook_user_group"},
            {$lookup:{
                    from                : 'user_hometown',
                    localField          : 'facebook_user_group._id',
                    foreignField        : '_id',
                    as                  : 'user_hometown',
            }},
            {
                $project:{
                    _id:1,
                    city_id:{$arrayElemAt:["$user_hometown.city_id",0]},
                    city_name:{$arrayElemAt:["$user_hometown.city_name",0]}
                }
            },
            {
                $match:{
                    city_id:{$exists:true}
                }
            },
            {
                $group:{
                    _id:{_id:"$_id",city_id:"$city_id"},
                    city_name:{$first:"$city_name"},
                    sum:{$sum:1}
                }
            },
            {
                $sort:{
                    sum:-1
                }
            },
            {
                $group:{
                    _id:"$_id._id",
                    city_id:{$first: "$_id.city_id"},
                    city_name:{$first:"$city_name"},
                    sum:{$first:"$sum"}
                }
            },
        ],{allowDiskUse: true}).forEach(function(item){
            list.push({
                    updateOne: {
                            filter      : {_id: item._id},
                            update      : {$set:{city_id: item.city_id, city_sum: item.sum, city_name: item.city_name}}
                    }
            })
            i++;
            if(i % 100 == 0) {
                db.getCollection('facebook_group_school_3').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_group_school_3').bulkWrite(list);
        }
    }
});


db.system.js.save({
    _id: 'build_facebook_group_school_3_list_keyword_tu_dien',
    value: function (group_ids) {
        var ref_ = db.getCollection('ref_common').find({type:"school_3"})[0].keyword;
        var list = [], i = 0;
        if (group_ids && group_ids.length) {
            db.getCollection('facebook_group_school_3').find({_id:{$in:group_ids}}).noCursorTimeout().forEach(function (item) {
                for(var r_ of ref_)
                {
                    item.alias = item.alias.replace(r_," "+r_+" ");
                }
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { list_keyword_tu_dien: global_tu_dien_get_list_array_sentence(item.alias) } }
                    }
                });
            });
            db.getCollection('facebook_group_school_3').bulkWrite(list);
            return;
        };

        var common_k = db.getCollection('ref_common').find({type:"school_3"})[0].keyword;
        var city_k = [];
        db.getCollection('ref_city').find({}).forEach(function(item){
            for(var k of item.alias_keyword)
            {
                city_k.push(k);
            }
        });
        build_tu_dien_by_collection_name('ref_school_3', city_k);

        var common_k = db.getCollection('ref_common').find({type:"school_3"})[0].keyword;
        db.getCollection('facebook_group_school_3').dropIndex( "list_keyword_tu_dien" );
        build_tu_dien_by_collection_name('ref_school_3', common_k);
        db.getCollection('facebook_group_school_3').find({list_keyword_tu_dien:{$exists:false}}).noCursorTimeout().forEach(function (item) {
            if(item.alias)
            {
                for(var r_ of ref_)
                {
                    item.alias = item.alias.replace(r_," "+r_+" ");
                }
                i++;
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { list_keyword_tu_dien: global_tu_dien_get_list_array_sentence(item.alias) } }
                    }
                })
            }
            if (i % 10000 == 0) {
                db.getCollection('facebook_group_school_3').bulkWrite(list);
                list = [];
            }
            
        })
        if (list.length) {
            db.getCollection('facebook_group_school_3').bulkWrite(list);
        }
        db.getCollection('facebook_group_school_3').createIndex({ list_keyword_tu_dien: 1 });
    }
});


db.system.js.save(
    {
        _id:"build_facebook_group_school_3",
        value: function (group_ids){
            var common_k = db.getCollection('ref_common').find({type:"school_3"})[0].keyword;
            var search =
            {
                list_keyword: { $in: common_k }
            };
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }
            var list = [], i = 0;
            db.getCollection('facebook_group').find(search).forEach(function (item) {
                i++;
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: item,
                        upsert: true,
                    }
                });
                if (i % 1000 == 0) {
                    db.getCollection('facebook_group_school_3').bulkWrite(list);
                    list = [];
                }
            });
            if (list.length) {
                db.getCollection('facebook_group_school_3').bulkWrite(list);
            };
        }
    }
);

db.system.js.save(
    {
        _id: "out_user_insight_group_school_3",
        value: function (group_ids = false, facebook_ids = false) {
            var search = {};
            if (facebook_ids && facebook_ids.length) {
                search['_id'] = { $in: facebook_ids };
            } else {
                var search_school_3 = {};
                if (group_ids && group_ids.length) {
                    search_school_3['_id'] = { $in: group_ids };
                } else {
                    search['data'] = { $in: db.getCollection('facebook_insight_group_school_3').find(search_school_3, {_id:1}).map(function(item){ return item._id; }) };
                }
            }
            var list_ = [], j = 0, list_facebook_ids = [];
            db.getCollection('facebook_user_group').aggregate([
                { $match: search },
                {
                    $lookup:
                    {
                        from: 'facebook_insight_group_school_3',
                        localField: 'data',
                        foreignField: '_id',
                        as: 'school_3_user'
                    }
                },
                {
                    $project:
                    {
                        _id: 1,
                        facebook_id: 1,
                        school_3:
                        {
                            "$map": {
                                "input": "$school_3_user",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.name",
                                    "ref_insight_city_id": "$$m.ref_insight_city_id",
                                    "ref_insight_city_name": "$$m.ref_insight_city_name",
                                    "ref_insight_id": "$$m.ref_insight_id",
                                    "ref_insight_name": "$$m.ref_insight_name",
                                    "home_town_city_id": "$$m.home_town_city_id",
                                    "home_town_city_name": "$$m.home_town_city_name",
                                    "ref_target": "$$m.ref_target"
                                }
                            }
                        }
                    }
                }
            ]).forEach(function (it) {
                if (it.school_3.length > 0) {
                    it.data = [];
                    it.school_3.forEach(function(school_3_){
                        for (var target of school_3_.ref_target) {
                            if (target.city_id == school_3_.home_town_city_id) {
                                it.data.push({
                                    ref_insight_id: target._id,
                                    ref_insight_name: target.name,
                                    group_info_id: school_3_._id,
                                    group_info_name: school_3_.name,
                                    city_id: target.city_id,
                                    city_name: target.city_name,
                                });
                            }
                        }
                    });

                    delete it.school_3;

                    if (it.data.length > 0) {
                        j++;
                        list_.push({
                            updateOne: {
                                filter: { _id: it._id },
                                update: it,
                                upsert: true,
                            }
                        });
                        list_facebook_ids.push({
                            updateOne: {
                                filter: { _id: it._id },
                                update: { $set: {_id: it._id} },
                                upsert: true,
                            }
                        });
                    };

                    if (j % 1000 == 0) {
                        db.getCollection('user_insight_group_school_3').bulkWrite(list_);
                        db.getCollection('user_school_3').bulkWrite(list_facebook_ids);
                        list_facebook_ids = [];
                        list_ = [];
                    }
                }

            });
            if (list_.length) {
                db.getCollection('user_insight_group_school_3').bulkWrite(list_);
                db.getCollection('user_school_3').bulkWrite(list_facebook_ids);
            }
        }
    }
);
