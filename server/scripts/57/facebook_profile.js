// function get_list_profile_group_by_list_ids
db.system.js.save(
    {
        _id: "get_list_profile_group_by_list_ids",
        value: function (ids) {
            var list = [];
            db.getCollection('facebook_profile').aggregate([
                { $match: { _id: { $in: ids } } },
                { $project: { _id: 1, name: 1, birthday: 1, hometown: 1, work: 1, education: 1 } },
                {
                    $lookup: {
                        from: "facebook_user_group",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user_groups"
                    }
                },
                {
                    $project: { _id: 1, name: 1, birthday: 1, hometown: 1, education: 1, work: 1, "data": { $arrayElemAt: ["$user_groups.data", 0] } }
                },
                {
                    $lookup: {
                        from: "facebook_group",
                        localField: "data",
                        foreignField: "_id",
                        as: "facebook_group"
                    }
                },
                {
                    $project: { _id: 1, name: 1, birthday: 1, hometown: 1, education: 1, work: 1, "facebook_group._id": 1, "facebook_group.name": 1, "facebook_group.alias": 1 }
                },
            ]).forEach(function (item) {
                list.push(item);
            })
            return list;
        }
    }
)
// function get_list_profile_group_by_list_ids_test
db.system.js.save(
    {
        _id: "get_list_profile_group_by_list_ids_test",
        value: function (ids) {
            var list = [];
            db.getCollection('facebook_profile').aggregate([
                { $match: { _id: { $in: ids } } },
                { $project: { _id: 1, name: 1, birthday: 1, hometown: 1, work: 1, education: 1 } },
                {
                    $lookup: {
                        from: "facebook_user_group",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user_groups"
                    }
                },
                {
                    $project: { _id: 1, name: 1, birthday: 1, hometown: 1, education: 1, work: 1, "data": { $arrayElemAt: ["$user_groups.data", 0] } }
                },
                {
                    $lookup: {
                        from: "facebook_group",
                        localField: "data",
                        foreignField: "_id",
                        as: "facebook_group"
                    }
                },
                {
                    $project: { _id: 1, name: 1, birthday: 1, hometown: 1, education: 1, work: 1, "facebook_group._id": 1, "facebook_group.name": 1, "facebook_group.alias": 1 }
                },
            ]).forEach(function (item) {
                list.push(item);
            })
            return list;
        }
    }
)

db.system.js.save(
    {
        _id: "trigger_all",
        value: function (ids) {
            hometown_location_trigger_all(ids);
            hometown_trigger_group_all(ids);
            trigger_education_all(ids);
            trigger_group_college_all(ids);
            trigger_work_all(ids);
            trigger_group_company_all(ids);
        }
    }
);


// facebook_id_has_mobile_phone_not_crawler
db.getCollection('facebook_id_has_mobile_phone_not_crawler').aggregate([
    {$match:{"run_profile" : 1}},
    {$lookup:{
            from        : "facebook_profile",
            localField  : "_id",
            foreignField: "_id",
            as          : "facebook_profile",
    }},
    {$project:{_id:1,length:1,
        facebook_id:1,status:1,
        run_fanpage:1,run_friend:1,
        run_group:1,name:{$arrayElemAt:["$facebook_profile.name",0]}}},
    {$match:{name:{$exists:false}}},
    {$project:{_id:1}},
    {$out:"facebook_id_has_mobile_phone_not_crawler_profile_not_found"}
])
// facebook_id_has_mobile_phone_not_crawler