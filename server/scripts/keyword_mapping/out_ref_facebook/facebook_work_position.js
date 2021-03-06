db.system.js.save({
    _id: "bulk_write_facebook_work_position",
    value: function (v_status = -1) {
        var list = [];
        db.getCollection('facebook_profile_status').aggregate([
            { $match: { status: v_status } },
            {
                $lookup: {
                    from: "facebook_profile",
                    localField: "_id",
                    foreignField: "_id",
                    as: "facebook_profile",
                }
            },
            { $project: { _id: 1, work: { $arrayElemAt: ["$facebook_profile.work", 0] } } },
            { $unwind: "$work" },
            { $match: { "work.id": { $exists: true }, "work.position.id": { $exists: true }, "work.position.name": { $exists: true } } },
            { $project: { _id: "$work.position.id", name: "$work.position.name" } },
            { $group:{_id:"$_id",name:{$first:"$name"}} },
            {
                $lookup: {
                    from: "facebook_work_position",
                    localField: "_id",
                    foreignField: "_id",
                    as: "facebook_work_position",
                }
            },
            { $match: { facebook_work_position: [] } },
        ]).forEach(function (item) {
            item.alias = stripUnicode(item.name, " ");
            item.status = -1;
            delete item.facebook_work_position;
            if (item.alias) {
                item.list_keyword = get_list_keyword_by_sentence(item.alias);
                item.alias = " " + item.alias + " ";
            }
            item.sum = db.getCollection('facebook_profile_work_flane').count({ "position_id": item._id });

            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: item },
                    upsert: true,
                }
            });
            if (list.length == 10000) {
                db.getCollection('facebook_work_position').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('facebook_work_position').bulkWrite(list);
        }

    }

});

