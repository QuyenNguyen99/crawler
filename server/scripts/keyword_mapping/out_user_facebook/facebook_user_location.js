db.system.js.save(
    {
        _id: "bulk_write_facebook_user_location",
        value: function (status = -1) {
            var list = [];
            db.getCollection('facebook_profile_status').aggregate([
                { $match: { status: status } },
                {
                    $lookup: {
                        from: "facebook_profile",
                        localField: "_id",
                        foreignField: "_id",
                        as: "facebook_profile",
                    }
                },
                { $match: { "facebook_profile.location.id": { $exists: true }, "facebook_profile.location.name": { $exists: true } } },
                { $project: { _id: 1, data: { $arrayElemAt: ["$facebook_profile.location.id", 0] } } },
                { $match: { data: { $ne: "" } } },
                {$lookup: {
                    from        : "facebook_user_location",
                    localField  : "_id",
                    foreignField: "_id",
                    as          : "ref",
                }},
                {$match:{ref:[]}},
            ]).forEach(function (item) {
                item.status = -1;
                delete item.ref;
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection('facebook_user_location').insertMany(list);
                    list = [];
                }
            });
            if (list.length) {
                db.getCollection('facebook_user_location').insertMany(list);
            }
        }
    }
);