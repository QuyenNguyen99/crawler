db.system.js.save(
    {
        _id: "transfer_facebook_page_user_56_to_57",
        value: function (status = -1) {
            var db_57 = connect("192.168.106.57/facebook");
            var db_56 = connect("192.168.106.56/facebook");
            db_57.getCollection('facebook_page_user').insertMany(
                db_56.getCollection('facebook_page_user_id').aggregate([
                    { $match: { status: status } },
                    {
                        $lookup: {
                            from: "facebook_page_user",
                            localField: "_id",
                            foreignField: "_id",
                            as: "page"
                        }
                    },
                    { $project: { _id: 1, data: { $arrayElemAt: ["$page.data", 0] } } }
                ]).toArray()
            )
        }
    }
);