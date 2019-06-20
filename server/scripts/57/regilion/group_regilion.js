

db.system.js.save(
    {
        _id: "insight_user_group_regilion",
        value: function (group_ids = false, facebook_ids = false) {
            var search = {};
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }

            var ref_ls = [];
            db.getCollection('ref_regilion').find({}).forEach(function(ref){
                ref_ls = ref_ls.concat(ref.keyword_search);
            });

            search["list_keyword"] = { $in: ref_ls };

            db.getCollection('facebook_group').aggregate([
                { $match: search },
                { $out: "facebook_group_regilion"}
            ]);
            
            db.getCollection('facebook_group_regilion').aggregate([
                {
                    $lookup:
                    {
                        from: 'ref_regilion',
                        localField: 'list_keyword',
                        foreignField: 'keyword_search',
                        as: 'regilion_match'
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
                                "input": "$regilion_match",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.name"
                                }
                            }
                        }
                    }
                },
                { $out: "facebook_insight_group_regilion"}
            ]);

            var search_ = {};

            var ref_ls_ = [];
            db.getCollection('facebook_insight_group_regilion').find({}).forEach(function(insight){
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
                { $out: "user_insight_group_regilion"}
            ]);
            //add more filter here

            

            db.getCollection('user_insight_group_regilion').aggregate([
                {
                    $lookup:
                    {
                        from: 'facebook_insight_group_regilion',
                        localField: 'data',
                        foreignField: '_id',
                        as: 'regilion_match'
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "ref_target":
                        {
                            "$map": {
                                "input": "$regilion_match",
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
                { $out: "user_insight_group_regilion"}
            ]);
        }
    }
);

db.system.js.save({
    _id:"out_user_regilion",
    value: function(){
        var insert = [], i = 0;
        db.getCollection('user_insight_group_regilion').find({}).forEach(function(item){

            var datas_ = [];
            var datas = [];
            
            item.ref_target.forEach(function(target){
                var group_ = {
                    group_id:target._id,
                    group_name:target.name
                }
                target.ref_target.forEach(function(regilion){
                    if(datas_[regilion._id] == undefined)
                    {
                        datas_[regilion._id] = {
                            group:[group_],
                            regilion_id:regilion._id,
                            regilion_name:regilion.name
                        };
                    }
                    else
                    {
                        datas_[regilion._id].group.push(group_);
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
                db.getCollection('user_regilion').bulkWrite(insert);
                insert = [];
            }
        });
        if (insert.length) {
            db.getCollection('user_regilion').bulkWrite(insert);
        }
    }
})

