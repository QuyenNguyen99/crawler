

db.system.js.save(
    {
        _id: "insight_user_group_nation",
        value: function (group_ids = false, facebook_ids = false) {
            var search = {};
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }

            var ref_ls = [];
            db.getCollection('ref_nation').find({}).forEach(function(ref){
                ref_ls = ref_ls.concat(ref.keyword_search);
            });

            search["list_keyword"] = { $in: ref_ls };

            db.getCollection('facebook_group').aggregate([
                { $match: search },
                { $out: "facebook_group_nation"}
            ]);
            
            db.getCollection('facebook_group_nation').aggregate([
                {
                    $lookup:
                    {
                        from: 'ref_nation',
                        localField: 'list_keyword',
                        foreignField: 'keyword_search',
                        as: 'nation_match'
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "name": 1,
                        "alias": 1,
                        "list_keyword": 1,
                        "sum": 1,
                        "ref_target":
                        {
                            "$map": {
                                "input": "$nation_match",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.name"
                                }
                            }
                        }
                    }
                },
                { $out: "facebook_insight_group_nation"}
            ]);

            var search_ = {};

            var ref_ls_ = [];
            db.getCollection('facebook_insight_group_nation').find({}).forEach(function(insight){
                ref_ls_.push(insight._id);
            });
            search_['data'] = { $in: ref_ls_ };
            if (group_ids && group_ids.length) {
                search_['data'] = { $in: group_ids };
            }
            if (facebook_ids && facebook_ids.length) {
                search_['_id'] = { $in: facebook_ids };
            }

            db.getCollection('facebook_user_group').aggregate([
                { $match: search_ },
                { $out: "user_insight_group_nation"}
            ]);
            //add more filter here

            

            db.getCollection('user_insight_group_nation').aggregate([
                {
                    $lookup:
                    {
                        from: 'facebook_insight_group_nation',
                        localField: 'data',
                        foreignField: '_id',
                        as: 'nation_match'
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "ref_target":
                        {
                            "$map": {
                                "input": "$nation_match",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.name",
                                    "ref_target": "$$m.ref_target"
                                }
                            }
                        }
                    }
                },
                { $out: "user_insight_group_nation"}
            ]);
        }
    }
);



db.system.js.save({
    _id:"out_user_nation",
    value: function(){
        var insert = [], i = 0;
        db.getCollection('user_insight_group_nation').find({}).forEach(function(item){

            var datas_ = [];
            var datas = [];
            
            item.ref_target.forEach(function(target){
                var group_ = {
                    group_id:target._id,
                    group_name:target.name
                }
                target.ref_target.forEach(function(nation){
                    if(datas_[nation._id] == undefined)
                    {
                        datas_[nation._id] = {
                            group:[group_],
                            nation_id:nation._id,
                            nation_name:nation.name
                        };
                    }
                    else
                    {
                        datas_[nation._id].group.push(group_);
                    }
                })
            });
            for(var data of datas_)
            {
                if(data != undefined){
                    datas.push(data);
                }
            }

            insert.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: {
                        data: datas
                    },
                    upsert: true,
                }
            })
            i++;
            if(i%1000 == 0)
            {
                db.getCollection('user_nation').bulkWrite(insert);
                insert = [];
            }
        });
        if (insert.length) {
            db.getCollection('user_nation').bulkWrite(insert);
        }
    }
})
