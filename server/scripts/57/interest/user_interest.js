db.system.js.save({
    _id: "user_interest_by_status",
    value: function (status) {

        var list = [];
        db.getCollection('user_interest').aggregate([
            { $match: { status: status } },
            {
                $lookup: {
                    from: "user_insight_interest_group",
                    localField: "_id",
                    foreignField: "facebook_id",
                    as: "user_insight_interest_group",
                }
            },
            {
                $lookup: {
                    from: "user_insight_interest_page",
                    localField: "_id",
                    foreignField: "facebook_id",
                    as: "user_insight_interest_page",
                }
            },
            {
                $match: {
                    $or: [
                        { user_insight_interest_group: { $ne: [] } },
                        { user_insight_interest_page: { $ne: [] } },
                    ]
                }
            },
            { $project: { _id: 1, data: { $concatArrays: ["$user_insight_interest_group", "$user_insight_interest_page"] } } },
        ]).forEach(function (item) {
            var l = [];
            var obj = {};
            for (var it of item.data) {
                if (!obj[it.interest_id]) {
                    obj[it.interest_id] = { interest_id: it.interest_id,interest_name: it.interest_name, strength: it.count };
                    l.push(obj[it.interest_id]);
                } else {
                    obj[it.interest_id].strength += it.count;
                }
            }
            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { data: l } }
                }
            });
            if (list.length == 1000) {
                db.getCollection('user_interest').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('user_interest').bulkWrite(list);
        }
    }
});