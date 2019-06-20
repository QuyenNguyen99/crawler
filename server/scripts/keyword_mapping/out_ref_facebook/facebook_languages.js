db.system.js.save({
    _id: "bulk_write_facebook_languages",
    value: function (v_status = -1,collection_name = 'facebook_profile_status') {
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
            {$project:{_id:1,languages:{$arrayElemAt:["$facebook_profile.languages",0]}}},
            { $unwind: "$languages" },
            { $match: { "languages.id": { $exists: true }, "languages.id": { $ne: "" }, "languages.name": { $exists: true } } },
            {$project:{_id:"$languages.id",name:"$languages.name"}},
            {$group:{_id:"$_id",name:{$first:"$name"}}},
            {$lookup:{
                from            : "facebook_languages",
                localField      : "_id",
                foreignField    : "_id",
                as              : "facebook_languages",
            }},
            {$match:{facebook_languages:[]}},
        ];
        if(collection_name == 'facebook_languages') {
            search = [
                { $match: { status: v_status } },
            ];
        }
        db.getCollection(collection_name).aggregate(search).forEach(function(item){
            item.alias = stripUnicode(item.name," ");
            item.status = -1;
            delete item.facebook_languages;
            if(item.alias) {
                item.list_keyword = get_list_keyword_by_sentence(item.alias);
                item.alias = " " + item.alias + " ";
            }
            list.push({
                updateOne: {
                        filter: {_id: item._id},
                        update: {$set: item},
                        upsert: true,
                }
            });
            if(list.length == 10000) {
                db.getCollection('facebook_languages').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_languages').bulkWrite(list);

        }

    }

});

