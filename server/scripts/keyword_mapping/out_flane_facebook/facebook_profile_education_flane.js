db.system.js.save({
    _id: "bulk_write_facebook_profile_education_flane",
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
            { $project: { _id: 1, education: { $arrayElemAt: ["$facebook_profile.education", 0] } } },
            { $unwind: "$education" },
            { $match: { "education.id": { $exists: true }, "education.school.id": { $exists: true }, "education.school.name": { $exists: true } } },
            {
                $project: {
                    _id: "$education.id",
                    facebook_id: "$_id",
                    school_id: "$education.school.id",
                    school_name: "$education.school.name",
                    type: "$education.type",
                    year: "$education.year.name",
                    concentration: "$education.concentration",
                }
            },


            {
                $lookup: {

                    from: "facebook_profile_education_flane",

                    localField: "_id",

                    foreignField: "_id",

                    as: "facebook_profile_education_flane",

                }
            },
            { $match: { facebook_profile_education_flane: [] } },

        ]).forEach(function (item) {
            delete item.facebook_profile_education_flane;
            item.status = -1;
            list.push(item);
            if (list.length == 10000) {
                db.getCollection('facebook_profile_education_flane').insertMany(list);
                list = [];
            }
        });
        if (list.length) {
            db.getCollection('facebook_profile_education_flane').insertMany(list);
        }
    }
});