db.system.js.save(
    {
        _id: "bulk_write_facebook_user_languages",
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
                { $match: { "facebook_profile.languages.id": { $exists: true }, "facebook_profile.languages.name": { $exists: true } } },
                { $project: { _id: 1, data: { $arrayElemAt: ["$facebook_profile.languages.id", 0] } } },
                {$unwind:"$data"},
                { $project: {_id: {$concat:["$_id","_","$data"]},facebook_id:"$_id",data:"$data"}},
                {$lookup: {
                    from        : "facebook_user_languages",
                    localField  : "_id",
                    foreignField: "_id",
                    as          : "ref",
                }},
                {$match:{ref:[]}},
            ]).forEach(function (item) {
                delete item.ref;
                item.status = -1;
                list.push({
                    updateOne : {
                        filter: {_id: item._id},
                        update: {$set:item},
                        upsert: true
                    }
                });
                if (list.length == 10000) {
                    db.getCollection('facebook_user_languages').bulkWrite(list);
                    list = [];
                }
            });
            if (list.length) {
                db.getCollection('facebook_user_languages').bulkWrite(list);
            }
        }
    }
);