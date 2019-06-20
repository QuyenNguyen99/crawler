

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


// function out_user_school_2
db.system.js.save({
    _id: "out_user_school_2",
    value: function (facebook_ids = false) {
        var search = facebook_ids && facebook_ids.length ? {_id: { $in: facebook_ids }} : {};
        var list_ids = [], i = 0;
        db.getCollection("user_school_2").find(search).forEach(function (item) {
            i++;
            list_ids.push(item._id);
            if (i % 10000 == 0) {
                out_user_school_2_by_ids(list_ids);
                list_ids = [];
            }
        })
        if (list_ids.length) {
            out_user_school_2_by_ids(list_ids);
            list_ids = [];
        }
    }
})



// function out_user_education_school_2
db.system.js.save({
    _id     : 'out_user_education_school_2',
    value   : function(education_ids = false,facebook_ids = false) {
        out_facebook_education_school_2(education_ids);
        insight_facebook_education_school_2(false, education_ids);
        out_user_insight_education_school_2(education_ids, facebook_ids);
    }
})

// function out_user_education_school_2
db.system.js.save({
    _id     : 'out_user_group_school_2',
    value   : function(group_ids = false,facebook_ids = false) {
        out_facebook_group_school_2(group_ids);
        build_list_keyword_tu_dien_facebook_group_school_2(group_ids);
        update_city_id_facebook_group_school_2_by_hometown(group_ids);
        insight_facebook_group_school_2(false, group_ids);
        out_user_insight_group_school_2(group_ids, facebook_ids);
    }
})

//function trigger_education_school_2_all
db.system.js.save(
    {
        _id: "trigger_education_school_2_all",
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
                out_user_education_school_2(education_ids,facebook_ids);
            }
            if (group_ids && group_ids.length) {
                out_user_group_school_2(group_ids,facebook_ids);
            }
            out_user_school_2(facebook_ids);
        }
    }
)