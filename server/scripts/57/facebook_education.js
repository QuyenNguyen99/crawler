
/* BEGIN education */
/*
cần có các hàm như sau
out_facebook_education(ids = false)
out_facebook_profile_education_flane_all()
out_facebook_profile_education_flane(ids = false)
out_facebook_user_education(ids = false)
update_type_facebook_user_education_by_list_ids(ids = false)
update_list_keyword_facebook_education(ids = false)
trigger_education_all(ids = false)
*/
//function out_facebook_education
db.system.js.save(
    {
        _id: "out_facebook_education",
        value: function (ids = false) {
            var list = {},i = 0, rs = [];
            var search = { education: { $exists: true } };
            if(ids && ids.length) {
                search['_id'] = {$in: ids};
            }
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, education: 1 } },
            ]).forEach(function (item) {
                i++;
                if (typeof (item.education) == 'object' && item.education.length) {
                    for (var it of item.education) {
                        list[it.school.id] = {
                            _id: it.school.id,
                            name: it.school.name,
                        }
                    }
                }
                if (i % 10000 == 0) {
                    var ls = get_value_object(list);
                    if(!ids || !ids.length) {
                        insert_data_ignore_not_update(ls,'facebook_education');
                    } else {
                        rs = rs.concat(insert_data_ignore_not_update(ls,'facebook_education'));
                    }
                    list = {};
                }
            })
            if (Object.keys(list).length) {
                var ls = get_value_object(list);
                if(!ids || !ids.length) {
                    insert_data_ignore_not_update(ls,'facebook_education');
                } else {
                    rs = rs.concat(insert_data_ignore_not_update(ls,'facebook_education'));
                }
            }
            return rs;
        }
    }
)



//function out_facebook_profile_education_flane_all
db.system.js.save(
    {
        _id: "out_facebook_profile_education_flane_all",
        value: function () {
            var list = [];
            var i = 0;
            db.getCollection('facebook_id').find({run_university:0}).forEach(function(item){
                i++;
                list.push(item._id);
                if(i % 10000 == 0) {
                    out_facebook_profile_education_flane(list);
                    db.getCollection('facebook_id').update({_id:{$in: list}},{$set:{run_university:1}},{multi:true});
                    list = [];
                }
            })
            if(list.length) {
                out_facebook_profile_education_flane(list);
                db.getCollection('facebook_id').update({_id:{$in: list}},{$set:{run_university:1}},{multi:true});
            }
        }
    }
)

//function out_facebook_profile_education_flane
db.system.js.save(
    {
        _id: "out_facebook_profile_education_flane",
        value: function (ids = false) {
            var list = [],i = 0,rs = [];
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['education'] = { $exists: true };
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, education: 1 } },
                { $unwind: "$education" },
                { $match: {"education.id": {$exists:true},"education.school.id": {$exists:true},"education.school.name": {$exists:true}} },
                {
                    $project: {
                        _id: "$education.id",
                        facebook_id: "$_id",
                        school_id: "$education.school.id",
                        school_name: "$education.school.name",
                        type: "$education.type",
                        year: "$education.year.name",
                        concentration: "$education.concentration",
                    }
                },
            ]).forEach(function(item){
                i++;
                list.push({
                    updateOne: {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true,
                    }
                });
                if(i % 10000 == 0) {
                    db.getCollection('facebook_profile_education_flane').bulkWrite(list);
                    list = [];
                }
            });
            if(list.length) {
                db.getCollection('facebook_profile_education_flane').bulkWrite(list);
            }
            return rs;
        }
    }
)
//function out_facebook_user_education
db.system.js.save(
    {
        _id: "out_facebook_user_education",
        value: function (ids = false) {
            var list = [], i = 0;
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['education'] = { $exists: true };
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, data: "$education.school.id" } },
            ]).forEach(function(item){
                i++;
                list.push({
                    updateOne: {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true,
                    }
                });
                if(i % 10000 == 0) {
                    db.getCollection('facebook_user_education').bulkWrite(list);
                    list = [];
                }
            });
            if(list.length) {
                db.getCollection('facebook_user_education').bulkWrite(list);
            }
        }
    }
)
//function update_type_facebook_user_education_by_list_ids
db.system.js.save({
    _id: "update_type_facebook_user_education_by_list_ids",
    value: function (ids = []) {
        var l = [];
        for(var id of ids) {
            var type = '';
            db.getCollection('facebook_profile_education_flane').aggregate([
                { $match: { school_id: id } },
                {
                    $group: {
                        _id: "$type",
                        sum: { $sum: 1 },
                    }
                },
                {
                    $sort:{sum: -1}
                }
            ]).forEach(function(item){
                if(!type) {type = item._id};
            })
            l.push({
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { type: type } }
                }
            });
        }
        db.getCollection('facebook_education').bulkWrite(l);
    }
})
//function update_type_facebook_user_education
db.system.js.save({
    _id: "update_type_facebook_user_education",
    value: function (ids = false) {
        var list = [];
        var i = 0;
        var search = ids && ids.length ? { _id: { $in: ids } } : {};
        search['type'] = { $exists: false };
        db.getCollection('facebook_education').find(search).forEach(function (item) {
            i++;
            list.push(item._id);
            if (i % 10 == 0) {
                update_type_facebook_user_education_by_list_ids(list);
                list = [];
            }
        });
        if(list.length) {
            update_type_facebook_user_education_by_list_ids(list);
            list = [];
        }
    }
})


//function update_type_facebook_user_education_by_status
db.system.js.save({
    _id: "update_type_facebook_user_education_by_status",
    value: function (status) {
        var list = [];
        var i = 0;
        var search = {status: status};
        search['type'] = { $exists: false };
        db.getCollection('facebook_education').find(search).forEach(function (item) {
            i++;
            list.push(item._id);
            if (i % 10 == 0) {
                update_type_facebook_user_education_by_list_ids(list);
                list = [];
            }
        });
        if(list.length) {
            update_type_facebook_user_education_by_list_ids(list);
            list = [];
        }
    }
})

//function update_count_facebook_user_education_by_list_ids
db.system.js.save({
    _id: "update_count_facebook_user_education_by_list_ids",
    value: function (ids = []) {
        var l = [];
        for(var id of ids) {
            var count = db.getCollection('facebook_profile_education_flane').count({ school_id: id });
            
            l.push({
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { sum: count } }
                }
            });
        }
        db.getCollection('facebook_education').bulkWrite(l);
    }
})
//function update_count_facebook_user_education
db.system.js.save({
    _id: "update_count_facebook_user_education",
    value: function (ids = false) {
        var list = [];
        var i = 0;
        var search = ids && ids.length ? { _id: { $in: ids } } : {};
        search['sum'] = { $exists: false };
        db.getCollection('facebook_education').find(search).forEach(function (item) {
            i++;
            list.push(item._id);
            if (i % 10 == 0) {
                update_count_facebook_user_education_by_list_ids(list);
                list = [];
            }
        });
        if(list.length) {
            update_count_facebook_user_education_by_list_ids(list);
            list = [];
        }
    }
})

//function update_list_keyword_facebook_education
db.system.js.save(
    {
        _id: "update_list_keyword_facebook_education",
        value: function (ids = false) {
            var list = [];
            var i = 0, alias1 = '', alias = '';
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['list_keyword'] = { $exists: false };
            db.getCollection('facebook_education').find(search).forEach(function (item) {
                i++;
                if (item && item.name) {
                    alias1 = stripUnicode(item.name);
                    alias = alias1 ? (' ' + alias1 + ' ') : '';
                    list.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: { $set: { alias: alias, list_keyword: get_list_keyword_by_sentence(alias1) } },
                        }
                    });
                }
                if (i % 1000 == 0) {
                    db.getCollection('facebook_education').bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_education').bulkWrite(list);
            }
        }
    }
)

// function build_tu_dien_for_education
db.system.js.save({
    _id: 'build_facebook_education_list_keyword_tu_dien',
    value: function () {
        var common_k_obj = {};
        db.getCollection('ref_common').find({}).forEach(function(item){
            for(var it of item.keyword) {
                common_k_obj[it] = it;
            }
        })
        db.getCollection('college_keyword_common').find({}).forEach(function(item){
            common_k_obj[item.alias] = item.alias;
        })
        db.getCollection('ref_city').find({}).forEach(function(item){
            for(var k of item.alias_keyword){
                common_k_obj[k] = k;
            }
        });
        var common_k = Object.keys(common_k_obj);
        build_tu_dien_by_collection_name(['ref_school_1','ref_school_2','ref_school_3'], common_k);
    }
});

// function build_list_keyword_tu_dien_for_education
db.system.js.save({
    _id: 'build_list_keyword_tu_dien_for_education',
    value: function () {
        build_facebook_education_list_keyword_tu_dien();
        var list = [];
        db.getCollection('facebook_education').find({list_keyword_tu_dien:{$exists:false}}).forEach(function(item){
            flag = false;
            list.push({
                updateOne: {
                    filter  : {_id: item._id},
                    update  : {$set:{ list_keyword_tu_dien: item.alias && item.alias.trim() ? global_tu_dien_get_list_array_sentence(item.alias) : [] }}
                }
            })
            if(list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
            list = [];
        }
    }
});

// function build_list_keyword_tu_dien_for_education_by_status
db.system.js.save({
    _id: 'build_list_keyword_tu_dien_for_education_by_status',
    value: function (status) {
        var list = [];
        db.getCollection('facebook_education').find({status:status,list_keyword_tu_dien:{$exists:false}}).forEach(function(item){
            flag = false;
            list.push({
                updateOne: {
                    filter  : {_id: item._id},
                    update  : {$set:{ list_keyword_tu_dien: item.alias && item.alias.trim() ? global_tu_dien_get_list_array_sentence(item.alias) : [] }}
                }
            })
            if(list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
            list = [];
        }
    }
});

// function build_list_keyword_tu_dien_for_education_by_ids
db.system.js.save({
    _id: 'build_list_keyword_tu_dien_for_education_by_ids',
    value: function (ids) {
        var list = [];
        db.getCollection('facebook_education').find({_id:{$in: ids},list_keyword_tu_dien:{$exists:false}}).forEach(function(item){
            flag = false;
            list.push({
                updateOne: {
                    filter  : {_id: item._id},
                    update  : {$set:{ list_keyword_tu_dien: item.alias && item.alias.trim() ? global_tu_dien_get_list_array_sentence(item.alias) : [] }}
                }
            })
            if(list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
            list = [];
        }
    }
});

//function trigger_education_all
db.system.js.save(
    {
        _id: "trigger_education_all",
        value: function (ids = false) {
            if(ids && ids.length) {
                var rs = out_facebook_education(ids);
                out_facebook_profile_education_flane(ids);
                if(rs && rs.length) {
                    update_type_facebook_user_education_by_list_ids(rs);
                    update_list_keyword_facebook_education(rs);
                    build_list_keyword_tu_dien_for_education_by_ids(rs);
                    build_facebook_education_city(rs);
                }
                trigger_education_college_all(ids);
            }
        }
    }
)


/* END education */



db.system.js.save(
    {
        _id:"build_facebook_education_city",
        value: function (education_ids){
            
            var search_ = {};
            if (education_ids && education_ids.length) {
                search_['_id'] = { $in: education_ids };
            }
            var list_ = [];
            db.getCollection('facebook_education').aggregate([
                { $match: search_ },
                {
                    $lookup:
                    {
                        from: 'ref_city',
                        localField: 'list_keyword_tu_dien',
                        foreignField: 'alias_keyword',
                        as: 'school_2_with_city'
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
                        "city": "$school_2_with_city"
                    }
                },
            ]).forEach(function (item_) {
                var city_id = [];
                var city_name = [];
                item_.city.forEach(function (item__) {
                    city_id.push(item__._id);
                    city_name.push(item__.name);
                });
                list_.push({
                    updateOne: {
                        filter: { _id: item_._id },
                        update: {$set:{city_id:city_id,city_name:city_name}},
                    }
                });
                if (list_.length == 1000) {
                    db.getCollection('facebook_education').bulkWrite(list_);
                    list_ = [];
                }
            });
            if (list_.length) {
                db.getCollection('facebook_education').bulkWrite(list_);
            }
        }
    }
);

