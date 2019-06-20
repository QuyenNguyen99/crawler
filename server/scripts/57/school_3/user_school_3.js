db.system.js.save(
    {
        _id: "out_user_school_3",
        value: function (education_ids = false, group_ids = false, facebook_ids = false) {
            out_user_group_school_3(group_ids, facebook_ids);
            out_user_education_school_3(education_ids, facebook_ids);
            if (facebook_ids && facebook_ids.length) {
                user_school_3_by_ids(facebook_ids);
            }
        }
    }
);

db.system.js.save({
    _id: "user_school_3_by_ids",
    value: function (facebook_ids) {
        var list_obj = {};
        db.getCollection('user_insight_education_school_3').find({ _id: { $in: facebook_ids } }).forEach(function (item) {
            list_obj[item._id] = { _id: item.facebook_id, data: [] };
            for (var it of item.data) {
                if (!list_obj[item._id][it.ref_insight_id]) {
                    list_obj[item._id][it.ref_insight_id] = { education: [], school_3_id: it.ref_insight_id, school_3_name: it.ref_insight_name,school_3_city_id: it.city_id,school_3_city_name: it.city_name };
                    list_obj[item._id].data.push(list_obj[item._id][it.ref_insight_id]);
                }
                list_obj[item._id][it.ref_insight_id].education.push({ education_id: it.edu_info_id, education_name: it.edu_info_name });
            }
        })
        var list_id_group = [];
        for (var id of facebook_ids) {
            if (!list_obj[id]) {
                list_id_group.push(id);
            }
        }
        db.getCollection('user_insight_group_school_3').find({ _id: { $in: list_id_group } }).forEach(function (item) {
            list_obj[item._id] = { _id: item._id, data: [] };
            for (var it of item.data) {
                if (!list_obj[item._id][it.ref_insight_id]) {
                    list_obj[item._id][it.ref_insight_id] = { group: [{ group_id: it.group_info_id, group_name: it.group_info_name }], school_3_id: it.ref_insight_id, school_3_name: it.ref_insight_name,school_3_city_id: it.city_id,school_3_city_name: it.city_name };
                    list_obj[item._id].data.push(list_obj[item._id][it.ref_insight_id]);
                } else {
                    list_obj[item._id][it.ref_insight_id].group.push({ group_id: it.group_info_id, group_name: it.group_info_name });
                }
            }
            list_obj[item._id].data.sort(function (it1, it2) {
                return it2.group.length - it1.group.length;
            });
            list_obj[item._id].data = [list_obj[item._id].data[0]];
        })

        var list_bulk_write = [];
        for (var facebook_id in list_obj) {
            list_bulk_write.push({
                updateOne: {
                    filter: { _id: facebook_id },
                    update: {
                        _id: facebook_id,
                        data: list_obj[facebook_id].data,
                    },
                }
            });
        }
        db.getCollection("user_school_3").bulkWrite(list_bulk_write);
    }
})

db.system.js.save(
    {
        _id: "out_user_first_run_school_3",
        value: function () {
            var list = [];
            db.getCollection('user_school_3').find().forEach(function (item) {
                list.push(item._id);
                if (list.length == 10000) {
                    user_school_3_by_ids(list);
                    list = [];
                }
            })
            if (list.length) {
                user_school_3_by_ids(list);
                list = [];
            }
        }
    }
);


//function trigger_school_3_all
db.system.js.save(
    {
        _id: "trigger_school_3_all",
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
                out_user_education_school_3(education_ids,facebook_ids);
            }
            if (group_ids && group_ids.length) {
                out_user_group_school_3(group_ids,facebook_ids);
            }
            user_school_3_by_ids(facebook_ids);
        }
    }
)