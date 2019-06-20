//function out_user_location
db.system.js.save({
    _id: "out_user_location",
    value: function (ids = false, facebook_ids = false) {
        var list = [], search = {}, i = 0;
        if(ids && ids.length) {
            search['location'] = { $in: ids };
        }
        if(facebook_ids && facebook_ids.length) {
            search['_id'] = {$in: facebook_ids};
        }
        db.getCollection('facebook_user_location').aggregate([
            { $match: search },
            {
                $lookup: {
                    from: "facebook_insight_hometown_location",
                    localField: "location",
                    foreignField: "_id",
                    as: "facebook_hometown_location",
                }
            },
            {$match:{facebook_hometown_location:{$ne:[]}}},
            { $project: { _id: 1, facebook_hometown_location: { $arrayElemAt: ["$facebook_hometown_location", 0] } } },
            {
                $project: {
                    _id: 1,
                    city_id: "$facebook_hometown_location.city_id",
                    city_name: "$facebook_hometown_location.city_name",
                    user_location_id: "$facebook_hometown_location._id",
                    user_location_name: "$facebook_hometown_location.name",
                }
            },
        ]).forEach(function (item) {
            i++;
            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: item,
                    upsert: true
                }
            });
            if(i % 10000 == 0) {
                db.getCollection('user_location').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('user_location').bulkWrite(list);
        }
    }
})