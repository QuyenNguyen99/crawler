db.system.js.save({
    _id: "bulk_write_facebook_education",
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
            {$project:{_id:1,education:{$arrayElemAt:["$facebook_profile.education",0]}}},
            { $unwind: "$education" },
            { $match: { "education.id": { $exists: true }, "education.school.id": { $exists: true }, "education.school.name": { $exists: true } } },
            {$project:{_id:"$education.school.id",name:"$education.school.name"}},
            {$lookup:{
                from            : "facebook_education",
                localField      : "_id",
                foreignField    : "_id",
                as              : "facebook_education",
            }},
            {$match:{facebook_education:[]}},
        ];
        if(collection_name == 'facebook_education') {
            search = [
                { $match: { status: v_status } }
            ];
        }
        db.getCollection(collection_name).aggregate(search).forEach(function(item){
            if(typeof(global_tu_dien_word_one_instance) == 'undefined') {
                build_facebook_education_list_keyword_tu_dien();
            }
            item.alias = stripUnicode(item.name," ");
            item.status = -1;
            delete item.facebook_education;
            if(item.alias) {
                item.list_name = get_list_keyword_by_sentence(item.alias);
                item.list_keyword_tu_dien = global_tu_dien_get_list_array_sentence(item.alias);
                item.alias = " " + item.alias + " ";
                var ref_city = db.getCollection("ref_city").find({ alias_keyword: { $in: item.list_keyword_tu_dien } }).toArray();
                if (ref_city && ref_city.length) {
                    item.city_id = ref_city[0]._id;
                    item.city_name = ref_city[0].name;
                }
            }
            item.sum = db.getCollection('facebook_profile_education_flane').count({"school_id" : item._id});
            var l = db.getCollection('facebook_profile_education_flane').aggregate([{ $match: { school_id: item._id } },{$group: {_id: "$type",sum: { $sum: 1 },}},{$sort:{sum: -1}}]);
            if(l && l.length) {
                item.type = l[0]._id;
            }
            list.push({
                updateOne: {
                        filter: {_id: item._id},
                        update: {$set: item},
                        upsert: true,
                }
            });
            if(list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
        }
    }
});


db.system.js.save({
    _id: "bulk_write_facebook_education_ref_city",
    value: function (status = -1) {
        if (typeof (global_tu_dien_word_one_instance) == 'undefined') {
            build_facebook_education_list_keyword_tu_dien();
        }
        var list = [];
        db.getCollection('facebook_education').aggregate([
            {$match:{ status: status }},
            {$lookup:{
                    from        : "ref_city",        
                    localField  : "list_keyword_tu_dien",
                    foreignField: "list_keyword_mapping",
                    as          : "ref_city",
            }},
            {$project:{_id:1,ref_city:{
                $map: { 
                    "input": "$ref_city", 
                    "as": "m", 
                    "in": { 
                        "_id": "$$m._id", 
                        "name": "$$m.name" ,  
                    } 
                } 
            }}},
        ]).forEach(function (item) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { ref_city: item.ref_city } },
                    }
                });
            if (list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
        }
    }
});



db.system.js.save({
    _id: "bulk_write_facebook_education_count",
    value: function (status = -1) {
        var list = [];
        db.getCollection('facebook_education').aggregate([
            {$match:{ status: status }},
            {$project:{_id:1}},
        ]).forEach(function (item) {
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { count: db.getCollection('facebook_profile_education_flane').count({"school_id" : item._id}) } },
                    }
                });
            if (list.length == 10000) {
                db.getCollection('facebook_education').bulkWrite(list);
                list = [];
            }
        })
        if (list.length) {
            db.getCollection('facebook_education').bulkWrite(list);
        }
    }
});
