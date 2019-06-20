db.system.js.save(
    {
        _id: "bulk_write_facebook_user_group_flat",
        value: function (status = -1) {
            var list = [], list_obj = {};
            db.getCollection('facebook_user_group_id').aggregate([
                { $match: { status: status } },
                {
                    $lookup: {
                        from: "facebook_user_group",
                        localField: "_id",
                        foreignField: "_id",
                        as: "data",
                    }
                },
                {$unwind:"$data"},
                { $project: {_id: "$data._id",data:"$data.data"}},
            ]).forEach(function (item) {
                list_obj = {};
                for(var it of item.data) {
                    if(!list_obj[it]) {
                        list_obj[it] = item._id;
                        list.push({
                            _id             : item._id + "_" + it,
                            facebook_id     : item._id,
                            data            : it
                            
                        });
                        // list.push({
                        //     updateOne: {
                        //         filter: {
                        //             _id             : item._id + "_" + it
                        //         },
                        //         update: {
                        //             facebook_id     : item._id,
                        //             data            : it
                        //         },
                        //         upsert: true,
                        //     }
                        // })
                    }
                }
                if (list.length >= 10000) {
                    db.getCollection('facebook_user_group_new').insertMany(list);
                    list = [];
                }
            });
            if (list.length) {
                db.getCollection('facebook_user_group_new').insertMany(list);
            }
        }
    }
);