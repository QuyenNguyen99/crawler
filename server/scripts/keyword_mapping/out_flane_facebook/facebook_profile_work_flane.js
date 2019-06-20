db.system.js.save({
    _id: "bulk_write_facebook_profile_work_flane",
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
            { $project: { _id: 1, work: { $arrayElemAt: ["$facebook_profile.work", 0] } } },
            { $unwind: "$work" },
            { $match: { "work.id": { $exists: true }, "work.employer.id": { $exists: true }, "work.employer.name": { $exists: true } } },
            {
                $project: {
                    _id: "$work.id",
                    facebook_id: "$_id",
                    employer_id: "$work.employer.id",
                    employer_name: "$work.employer.name",
                    position_id: "$work.position.id",
                    position_name: "$work.position.name",
                    start_date: "$work.start_date",
                    end_date: "$work.end_date",
                    projects: "$work.projects",
                }
            },
            {
                $lookup: {
                    from: "facebook_profile_work_flane",
                    localField: "_id",
                    foreignField: "_id",
                    as: "facebook_profile_work_flane",
                }
            },
            { $match: { facebook_profile_work_flane: [] } },

        ]).forEach(function (item) {
            delete item.facebook_profile_work_flane;
            item.status = -1;
            list.push(item);
            if (list.length == 10000) {
                db.getCollection('facebook_profile_work_flane').insertMany(list);
                list = [];
            }
        });
        if (list.length) {
            db.getCollection('facebook_profile_work_flane').insertMany(list);
        }

    }
});