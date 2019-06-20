

db.system.js.save(
    {
        _id: "insight_facebook_group_parent",
        value: function (group_ids = false) {
            var search = {};
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }
            var listcmkey = db.getCollection('ref_common').find({type:"parent"})[0].keyword;
            search['list_keyword_tu_dien'] = { $in: listcmkey };
            db.getCollection('facebook_group').aggregate([
                {$match:search},
                {$out:"facebook_insight_group_parent"}
            ]);
        }
    }
);

db.system.js.save(
    {
        _id: "insight_user_group_parent",
        value: function (group_ids = false, facebook_ids = false) {
            var search = {};
            if (group_ids && group_ids.length) {
                search['_id'] = { $in: group_ids };
            }
            if (facebook_ids && facebook_ids.length) {
                search['_id'] = { $in: facebook_ids };
            }
            

            var value = [];
            var is_parent_list = [];
            var year = (new Date()).getFullYear();
            db.getCollection('ref_is_parent_age').find({}).forEach(function(age){
                var agenum = Number(age.year);
                var real_age = year - agenum;
                var _name;
                var _pa_age;
                var _pa_id;
                if (real_age == 0) {
                    _name = "Bố/mẹ trẻ mới sinh/sắp sinh";
                    _pa_age = 18;
                    _pa_id = 23;

                }
                else if (real_age == 1) {
                    _name = "Bố/mẹ trẻ tuổi tập đi";
                    _pa_age = 18;
                    _pa_id = 24;
                }
                else if (2 <= real_age && real_age <= 5) {
                    _name = "Bố/mẹ trẻ tuổi mẫu giáo, nhà trẻ";
                    _pa_age = 18;
                    _pa_id = 25;
                    
                }
                else if (6 <= real_age && real_age <= 11) {
                    _name = "Bố/mẹ học sinh cấp I";
                    _pa_age = 24;
                    _pa_id = 26;
                }
                else if (12 <= real_age && real_age <= 15) {
                    _name = "Bố/mẹ học sinh cấp II";
                    _pa_age = 30;
                    _pa_id = 27;
                }
                else if (16 <= real_age && real_age <= 18) {
                    _name = "Bố/mẹ học sinh cấp III";
                    _pa_age = 33;
                    _pa_id = 28;
                }
                if(_name!="" || _pa_age >=18)
                {
                    var isparent = {
                        name: _name,
                        rgx: "^(?=.*\\b(" + age.keyword_search.join("|") + ")\\b)(?=.*\\b(" + age.year + ")\\b).*$",
                        pa_age: _pa_age,
                        pa_id: _pa_id
                    };
                    is_parent_list.push(isparent);
                }
            });
            db.getCollection('ref_is_parent_school_year').find({}).forEach(function(school_year){
                var _name = school_year.name;
                var keyword_common = school_year.keyword_common.join("|");
                var keyword_search = school_year.keyword_search.join("|");
                var intcount = Number(school_year.count);
                var pa_age_ = Number(school_year.pa_age);
        
                var year_val = [];
                var year_list = "";
                var i;
                for (i = 0; i < intcount; i++) {
                    year_val.push(year + i);
                }
                if (year_val.length > 0) {
                    year_list = year_val.join('|')
                }
                var isparent = {
                    name: _name,
                    rgx: "^(?=.*\\b(" + keyword_common + ")\\b)(?=.*\\b(" + keyword_search + ")\\b)(?=.*\\b(" + year_list + ")\\b).*$",
                    pa_age: pa_age_,
                    pa_id: school_year._id
                };
                is_parent_list.push(isparent);
        
            });
            //var is_parent_list = await IsParent.get_all();
            
            var list_ = [], j = 0;
            db.getCollection('facebook_user_group').aggregate([
                { $match: search },
                {
                    $lookup:
                    {
                        from: 'facebook_insight_group_parent',
                        localField: 'data',
                        foreignField: '_id',
                        as: 'parent_user'
                    }
                },
                {
                    $project:
                    {
                        _id: 1,
                        data:
                        {
                            "$map": {
                                "input": "$parent_user",
                                "as": "m",
                                "in": {
                                    "_id": "$$m._id",
                                    "name": "$$m.name",
                                    "alias": "$$m.alias"
                                }
                            }
                        }
                    }
                },
                {
                    $match:{data : {$ne:[]}}
                },
                {
                    $lookup:
                    {
                        from: 'user_age',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'parent_age'
                    }
                },
                {
                    $project:
                    {
                        _id: 1,
                        data: 1,
                        age: { $arrayElemAt: [ "$parent_age.age", 0 ] }
                    }
                },
                {
                    $match:{age : {$exists:true}}
                }
            ]).forEach(function(item){
                var rs = [];
                for (var is_parent of is_parent_list) {
                    for(var data_ of item.data)
                    {
                        if ((data_.alias).toLowerCase().match(new RegExp(is_parent.rgx)) && (item.age >= is_parent.pa_age)) {
                            if (value.indexOf(is_parent.name) === -1) { 
                                var found = false;
                                for(var x of rs)
                                {
                                    if(x.parent_id == is_parent.pa_id)
                                    {
                                        found =true;
                                        x.group.push({
                                            group_id:data_._id,
                                            group_name:data_.name
                                        });
                                    }
                                }
                                if(!found)
                                {
                                    var r = {
                                        group:[
                                            {
                                                group_id:data_._id,
                                                group_name:data_.name,
                                            }
                                        ],
                                        parent_id:is_parent.pa_id,
                                        parent_name:is_parent.name
                                    }
                                    rs.push(r);
                                }
                            }
                        }
                    }
                }
                if(rs.length>0)
                {
                    list_.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: {
                                _id: item._id,
                                data: rs
                            },
                            upsert: true,
                        }
                    });
                    j++;
                }

                if (j % 1000 == 0) {
                    db.getCollection('user_insight_group_parent').bulkWrite(list_);
                    db.getCollection('user_parent').bulkWrite(list_);
                    list_ = [];
                }
            });
            db.getCollection('user_insight_group_parent').bulkWrite(list_);
            db.getCollection('user_parent').bulkWrite(list_);
        }
    }
);

db.system.js.save({
    _id:"out_user_parent",
    value: function(){
        var insert = [], i = 0;
        db.getCollection('user_insight_group_parent').find({}).forEach(function(item){
            var ref_ = [];
            var ref_name_ = [];
            var raw_ = [];
            var raw_name_ = [];
            
            item.ref_target.forEach(function(target){
                ref_.push(target._id);
                ref_name_.push(target.name);
                target.ref_target.forEach(function(parent){
                    raw_.push(parent._id);
                    raw_name_.push(parent.name);
                })
            });
            insert.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: {
                        ref: ref_,
                        ref_name: ref_name_,
                        raw: raw_,
                        raw_name: raw_name_,
                        source: "group"
                    },
                    upsert: true,
                }
            })
            i++;
            if(i%1000 == 0)
            {
                db.getCollection('user_parent').bulkWrite(insert);
                insert = [];
            }
        });
        if (insert.length) {
            db.getCollection('user_parent').bulkWrite(insert);
        }
    }
})

