db.system.js.save(
    {
        _id: "bulk_write_facebook_user_hometown",
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
                { $match: { "facebook_profile.hometown.id": { $exists: true }, "facebook_profile.hometown.name": { $exists: true } } },
                { $project: { _id: 1, facebook_id:"$_id", data: { $arrayElemAt: ["$facebook_profile.hometown.id", 0] } } },
                { $match: { data: { $ne: "" } } },
                {$lookup: {
                    from        : "facebook_user_hometown",
                    localField  : "_id",
                    foreignField: "_id",
                    as          : "ref",
                }},
                {$match:{ref:[]}},
            ]).forEach(function (item) {
                delete item.ref;
                item.status = -1;
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection('facebook_user_hometown').insertMany(list);
                    list = [];
                }
            });
            if (list.length) {
                db.getCollection('facebook_user_hometown').insertMany(list);
            }
        }
    }
);