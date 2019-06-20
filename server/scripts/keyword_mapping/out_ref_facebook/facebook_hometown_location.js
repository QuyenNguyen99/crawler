db.system.js.save({
    _id: "bulk_write_facebook_hometown_location",
    value: function (v_status = -1, collection_name = 'facebook_profile_status') {
        var list = [];
        var search = [
            { $match: { status: v_status } },
            {
                $lookup: {
                    from: "facebook_profile",
                    localField: "_id",
                    foreignField: "_id",
                    as: "facebook_profile",
                }
            },
            {$project:{_id:1,hometown:{$arrayElemAt:["$facebook_profile.hometown",0]}}},
            { $match: { "hometown.id": { $exists: true }, "hometown.name": { $exists: true } } },
            { $match: { "hometown.id": {$ne:""} } },
            {$project:{_id:"$hometown.id",name:"$hometown.name"}},
            {$group:{_id:"$_id",name:{$first:"$name"}}},
            {$lookup:{
                from            : "facebook_hometown_location",
                localField      : "_id",
                foreignField    : "_id",
                as              : "facebook_hometown_location",
            }},
            {$match:{facebook_hometown_location:[]}},
        ];
        if(collection_name == 'facebook_hometown_location') {
            search = [
                { $match: { status: v_status } },
            ];
        }
        db.getCollection(collection_name).aggregate(search).forEach(function(item){
            item.status = -1;
            delete item.facebook_hometown_location;
            item.list_keyword = get_list_keyword_by_name(item.name);
            list.push({
                updateOne: {
                        filter: {_id: item._id},
                        update: {$set: item},
                        upsert: true,
                }
            });
            if(list.length == 10000) {
                db.getCollection('facebook_hometown_location').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_hometown_location').bulkWrite(list);
        }
    }
});
