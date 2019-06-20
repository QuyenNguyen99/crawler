// function out_user_age
db.system.js.save({
    _id: "out_user_age",
    value: function (facebook_ids = false) {
        var search = facebook_ids && facebook_ids.length ? {_id: { $in: facebook_ids }} : {};
        var list_ids = [], i = 0;
        db.getCollection("user_age").find(search).forEach(function (item) {
            i++;
            list_ids.push(item._id);
            if (i % 10000 == 0) {
                out_user_age_by_ids(list_ids);
                list_ids = [];
            }
        })
        if (list_ids.length) {
            out_user_age_by_ids(list_ids);
            list_ids = [];
        }
    }
})


// function out_user_age
db.system.js.save({
    _id: "out_user_insight_age_by_ids",
    value: function (facebook_ids) {
        out_user_insight_education_school_1_age(false, facebook_ids);
        out_user_insight_group_school_1_age(false, facebook_ids);

        out_user_insight_education_school_2_age(false, facebook_ids);
        out_user_insight_group_school_2_age(false, facebook_ids);

        out_user_insight_education_school_3_age(false, facebook_ids);
        out_user_insight_group_school_3_age(false, facebook_ids);

        out_user_insight_group_dong_nien_age(false, facebook_ids);

        out_user_insight_education_college_age(false, facebook_ids);
        out_user_insight_group_college_age(false, facebook_ids);

        out_user_insight_profile_age(facebook_ids);
    }
})

// function out_user_age
db.system.js.save({
    _id: "out_user_age_by_ids",
    value: function (facebook_ids) {
        var search = facebook_ids && facebook_ids.length ? {_id: { $in: facebook_ids }} : {};
        var list = [];
        var list_age = [];
        var year_now = new Date().getFullYear();
        db.getCollection("user_age").aggregate([
            {$match:search},
            {$lookup: {from: 'user_insight_education_school_1_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_education_school_1_age',}},
            {$lookup: {from: 'user_insight_education_school_2_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_education_school_2_age',}},
            {$lookup: {from: 'user_insight_education_school_3_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_education_school_3_age',}},
            
            {$lookup: {from: 'user_insight_group_school_3_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_group_school_3_age',}},
            {$lookup: {from: 'user_insight_group_school_2_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_group_school_2_age',}},
            {$lookup: {from: 'user_insight_group_dong_nien_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_group_dong_nien_age',}},
            {$lookup: {from: 'user_insight_profile_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_profile_age',}},

            {$lookup: {from: 'user_insight_group_college_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_group_college_age',}},
            {$lookup: {from: 'user_insight_education_college_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_education_college_age',}},

            {$lookup: {from: 'user_insight_group_school_1_age',localField  : '_id',foreignField: 'facebook_id',as : 'user_insight_group_school_1_age',}},
        ]).forEach(function (item) {
            list_age = [];
            list_age = list_age.concat(push_to_list_age(item,'user_insight_education_school_1_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_education_school_2_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_education_school_3_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_group_school_3_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_group_school_2_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_group_dong_nien_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_profile_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_group_college_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_education_college_age'));
            list_age = list_age.concat(push_to_list_age(item,'user_insight_group_school_1_age'));
            var year = calc_age_by_list_age(list_age);
            if(year) {
                list.push({
                    _id         : item._id,
                    year        : year,
                    age         : year_now - year,
                    age_infer   : list_age
                })
            }
            if (list.length == 1000) {
                insert_data_ignore(list,'user_age');
                list_ids = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list,'user_age');
            list = [];
        }
    }
})

// function calc_age_by_list_age
db.system.js.save({
    _id: "calc_age_by_list_age",
    value: function (list_age) {
        if(list_age && list_age.length) {
            if(list_age.length == 1) {
                return list_age[0].year;
            } else {
                var list_obj = {};
                var c = 0;
                for(var it of list_age) {
                    if(!list_obj[it.year]) {
                        list_obj[it.year] = [];
                    }
                    list_obj[it.year].push(it);
                    if(c < list_obj[it.year].length) {
                        c = list_obj[it.year].length;
                    }
                }
                var rs = [];
                for(var year in list_obj) {
                    var v = list_obj[year];
                    if(v.length == c) {
                        return year;
                    }
                }
            }
        }
        return false;
    }
})

// function push_to_list_age
db.system.js.save({
    _id: "push_to_list_age",
    value: function (item,field) {
        var list_age = [];
        if(item[field] && item[field].length) {
            for(var it of item[field]) {
                list_age.push({
                    keyword     : it.keyword,
                    year        : it.year,
                    type        : it.type,
                });
            }
        }
        return list_age;
    }
})

// function out_user_age_id
db.system.js.save({
    _id: "out_user_age_id",
    value: function () {
        out_user_age_id_detail('user_insight_profile_age');

        out_user_age_id_detail('user_insight_education_school_1_age');
        out_user_age_id_detail('user_insight_education_school_2_age');
        out_user_age_id_detail('user_insight_education_school_3_age');
        out_user_age_id_detail('user_insight_education_college_age');

        
        out_user_age_id_detail('user_insight_group_school_1_age');
        out_user_age_id_detail('user_insight_group_school_2_age');
        out_user_age_id_detail('user_insight_group_school_3_age');
        out_user_age_id_detail('user_insight_group_college_age');
        out_user_age_id_detail('user_insight_group_dong_nien_age');

    }
})

// function out_user_age_id_detail
db.system.js.save({
    _id: "out_user_age_id_detail",
    value: function (collection_name) {
        var list = [];
        db.getCollection(collection_name).find().forEach(function(item){
            list.push({_id: item.facebook_id});
            if(list.length == 10000) {
                insert_data_ignore(list,'user_age');
                list = [];
            }
        })
        if(list.length) {
            insert_data_ignore(list,'user_age');
            list = [];
        }
    }
})

// function out_user_school_2_by_ids
db.system.js.save({
    _id: "out_user_school_2_by_ids",
    value: function (facebook_ids) {
        var list_obj = {};
        db.getCollection("user_insight_education_school_2").find({ facebook_id: { $in: facebook_ids } }).forEach(function (item) {
            if (!list_obj[item.facebook_id]) {
                list_obj[item.facebook_id] = {};
            }
            if (!list_obj[item.facebook_id][item.school_2_id]) {
                list_obj[item.facebook_id][item.school_2_id] = {
                    education: [{
                        education_id: item.education_id,
                        education_name: item.education_name,
                    }],
                    school_2_id: item.school_2_id,
                    school_2_name: item.school_2_name,
                    school_2_city_id: item.school_2_city_id,
                    school_2_city_name: item.school_2_city_name,
                };
            } else {
                list_obj[item.facebook_id][item.school_2_id].education.push({
                    education_id: item.education_id,
                    education_name: item.education_name,
                });
            }
        })
        var list_group_obj = {};
        db.getCollection("user_insight_group_school_2").find({ facebook_id: { $in: facebook_ids } }).forEach(function (item) {
            if (!list_obj[item.facebook_id]) {
                if (!list_group_obj[item.facebook_id]) {
                    list_group_obj[item.facebook_id] = {};
                }
                if (!list_group_obj[item.facebook_id][item.school_2_id]) {
                    list_group_obj[item.facebook_id][item.school_2_id] = {
                        school_2_id: item.school_2_id,
                        school_2_name: item.school_2_name,
                        school_2_city_id: item.school_2_city_id,
                        school_2_city_name: item.school_2_city_name,
                        sum: 1,
                        groups: [
                            {
                                group_id: item.group_id,
                                group_name: item.group_name,
                            }
                        ]
                    };
                } else {
                    list_group_obj[item.facebook_id][item.school_2_id].sum++;
                    list_group_obj[item.facebook_id][item.school_2_id].groups.push({
                        group_id: item.group_id,
                        group_name: item.group_name,
                    });
                }
            }
        })
        var list_bulk_write = [];
        for (var facebook_id in list_obj) {
            list_bulk_write.push({
                updateOne: {
                    filter: { _id: facebook_id },
                    update: {
                        _id: facebook_id,
                        data: get_value_object(list_obj[facebook_id]),
                    },
                    upsert: true,
                }
            });
        }

        for (var facebook_id in list_group_obj) {
            var sum = 0;
            var dt = false;
            for (var school_2_id in list_group_obj[facebook_id]) {
                if (sum < list_group_obj[facebook_id][school_2_id].sum) {
                    sum = list_group_obj[facebook_id][school_2_id].sum;
                    dt = list_group_obj[facebook_id][school_2_id];
                }
            }
            list_bulk_write.push({
                updateOne: {
                    filter: { _id: facebook_id },
                    update: {
                        _id: facebook_id,
                        data: [dt],
                        infer: list_group_obj[facebook_id]
                    },
                }
            });
        }
        db.getCollection("user_school_2").bulkWrite(list_bulk_write);
    }
})



// function out_user_education_school_1_age
db.system.js.save({
    _id     : 'out_user_education_school_1_age',
    value   : function(education_ids = false,facebook_ids = false) {
        out_facebook_insight_education_school_1_age_from_raw(education_ids);
        out_facebook_insight_education_school_1_age(education_ids);
        out_user_insight_education_school_1_age(education_ids, facebook_ids);
    }
})
// function out_user_group_school_1_age
db.system.js.save({
    _id     : 'out_user_group_school_1_age',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_insight_group_school_1_age_raw(group_ids);
        out_facebook_insight_group_school_1_age(group_ids);
        out_user_insight_group_school_1_age(group_ids, facebook_ids);
    }
})




// function out_user_education_school_2_age
db.system.js.save({
    _id     : 'out_user_education_school_2_age',
    value   : function(education_ids = false,facebook_ids = false) {
        out_facebook_insight_education_school_2_age_raw(education_ids);
        out_facebook_insight_education_school_2_age(education_ids);
        out_user_insight_education_school_2_age(education_ids, facebook_ids);
    }
})
// function out_user_group_school_2_age
db.system.js.save({
    _id     : 'out_user_group_school_2_age',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_insight_group_school_2_age_raw(group_ids);
        out_facebook_insight_group_school_2_age(group_ids);
        out_user_insight_group_school_2_age(group_ids, facebook_ids);
    }
})




// function out_user_education_school_3_age
db.system.js.save({
    _id     : 'out_user_education_school_3_age',
    value   : function(education_ids = false,facebook_ids = false) {
        out_facebook_insight_education_school_3_age_raw(education_ids);
        out_facebook_insight_education_school_3_age(education_ids);
        out_user_insight_education_school_3_age(education_ids, facebook_ids);
    }
})
// function out_user_group_school_3_age
db.system.js.save({
    _id     : 'out_user_group_school_3_age',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_insight_group_school_3_age_raw(group_ids);
        out_facebook_insight_group_school_3_age(group_ids);
        out_user_insight_group_school_3_age(group_ids, facebook_ids);
    }
})




// function out_user_education_college_age
db.system.js.save({
    _id     : 'out_user_education_college_age',
    value   : function(education_ids = false,facebook_ids = false) {
        out_facebook_insight_education_college_age(education_ids);
        out_user_insight_education_college_age(education_ids, facebook_ids);
    }
})
// function out_user_group_college_age
db.system.js.save({
    _id     : 'out_user_group_college_age',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_insight_group_college_age(group_ids);
        out_user_insight_group_college_age(group_ids, facebook_ids);
    }
})


// function out_user_group_dong_nien_age
db.system.js.save({
    _id     : 'out_user_group_dong_nien_age',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_group_dong_nien(group_ids);
        out_facebook_insight_group_dong_nien_age(group_ids);
        out_user_insight_group_dong_nien_age(group_ids, facebook_ids);
    }
})

// function out_user_profile_age
db.system.js.save({
    _id     : 'out_user_profile_age',
    value   : function(facebook_ids = false) {
        out_user_insight_profile_age(facebook_ids);
    }
})


//function trigger_age_all
db.system.js.save(
    {
        _id: "trigger_age_all",
        value: function (facebook_ids = false) {
            if(!facebook_ids && !facebook_ids.length){return false;}
            var education_ids_obj = {};
            db.getCollection('facebook_user_education').aggregate([
                { $match: { _id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                if (item.data && item.data.length) {
                    for (var id of item.data) {
                        education_ids_obj[id] = 1;
                    }
                }
            })
            var group_ids_obj = {};
            db.getCollection('facebook_user_group').aggregate([
                { $match: { _id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                if (item.data && item.data.length) {
                    for (var group_id of item.data) {
                        group_ids_obj[group_id] = 1;
                    }
                }
            })
            var group_ids = Object.keys(group_ids_obj);
            education_ids = Object.keys(education_ids_obj);
            if (education_ids && education_ids.length) {
                out_user_education_school_1_age(education_ids,facebook_ids);
                out_user_education_school_2_age(education_ids,facebook_ids);
                out_user_education_school_3_age(education_ids,facebook_ids);
                out_user_education_college_age(education_ids,facebook_ids);
            }
            if (group_ids && group_ids.length) {
                out_user_group_school_1_age(group_ids,facebook_ids);
                out_user_group_school_2_age(group_ids,facebook_ids);
                out_user_group_school_3_age(group_ids,facebook_ids);
                out_user_group_college_age(group_ids,facebook_ids);
                out_user_group_dong_nien_age(group_ids,facebook_ids);
            }
            out_user_profile_age(facebook_ids);
            out_user_age(facebook_ids);
        }
    }
)