db.system.js.save({
    _id: "out_user_insight_school_common",
    value: function (collection_insight,collection_user,collection_user_insight,college_user_all,status = -1, ref_ids = false) {
        if(status == -2) {
            db.getCollection(collection_user_insight).drop();
        }
        var search = status == -2 ? {} : {status: status};
        if(ref_ids) {
            ref_ids = typeof(ref_ids) == 'object' ? ref_ids : [parseInt(ref_ids)];
            search['ref_id'] = {$in: ref_ids};
        }
        var search_common = [
            {$lookup:{
                from        : collection_user,
                localField  : "source_id",
                foreignField: "data",
                as          : "facebook",
            }},
            {$unwind:"$facebook"},
            {$lookup:{
                from                : 'user_hometown',
                localField          : 'facebook.facebook_id',
                foreignField        : '_id',
                as                  : 'user_hometown',
            }},
            {$project:{_id:{$concat:["$_id","_","$facebook.facebook_id"]},
                ref_id:1,ref_name:1,ref_city_id:1,ref_city_name:1,
                source_id:1,source_name:1,keyword:1,
                city_id:{$cond:["$education_school","$ref_city_id",{$arrayElemAt:["$user_hometown.ref_id",0]}]},
                city_name:{$cond:["$education_school","$ref_city_name",{$arrayElemAt:["$user_hometown.ref_name",0]}]},
                compare: {$eq:["$ref_city_id",{$cond:["$education_school","$ref_city_id",{$arrayElemAt:["$user_hometown.ref_id",0]}]}]},
                status: { $literal: -1 }, 
                facebook_id: "$facebook.facebook_id",
                is_delete: { $literal: 0 }
            }},
            {$match:{compare:true}},
        ];
        if(collection_insight.indexOf('group') >= 0) {
            search_common = [
                {$lookup:{
                    from        : collection_user,
                    localField  : "source_id",
                    foreignField: "data",
                    as          : "facebook",
                }},
                {$unwind:"$facebook"},
                {$project:{_id:{$concat:["$_id","_","$facebook.facebook_id"]},
                    ref_id:1,ref_name:1,ref_city_id:1,ref_city_name:1,
                    source_id:1,source_name:1,keyword:1,
                    city_id:"$ref_city_id",
                    city_name:"$ref_city_name",
                    status: { $literal: -1 }, 
                    facebook_id: "$facebook.facebook_id",
                    is_delete: { $literal: 0 }
                }},
            ];
        }
        if(status == -2) {
            db.getCollection(collection_insight).aggregate([
                {$match:search},
            ].concat(search_common).concat([
                {$project:{
                    _id:1,
                    ref_id:1,ref_name:1,ref_city_id:1,ref_city_name:1,
                    facebook_id:1,
                    source_id:1,source_name:1,keyword:1,city_id:1,city_name:1,status: 1, is_delete: 1
                }},
                {$out:collection_user_insight}
            ]))
            db.getCollection(collection_user_insight).createIndex({ref_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({source_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({facebook_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({keyword: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({status: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({is_delete: 1},{background:true});
            var list_user_school_bulk_write = [];
            db.getCollection(collection_user_insight).find().forEach(function(item){
                list_user_school_bulk_write.push({
                    updateOne: {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status: rand(10,20)}},
                        upsert: true
                    }
                });
                if(list_user_school_bulk_write.length == 10000) {
                    db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                    list_user_school_bulk_write = [];
                }
            })
            if(list_user_school_bulk_write.length) {
                db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                list_user_school_bulk_write = [];
            }
        } else {
            var list = [];
            var list_user_school_bulk_write = [];
            var search_update = Object.assign({status:-1,is_delete:0},search);
            db.getCollection(collection_insight).aggregate([
                {$match:search_update},
            ].concat(search_common).concat([
                {$lookup:{
                    from        : collection_user_insight,
                    localField  : '_id',
                    foreignField: '_id',
                    as          : "user",
                }},
                {$match:{user:[]}}
            ])).forEach(function(item){
                delete item.user;
                list.push(item);
                list_user_school_bulk_write.push({
                    updateOne: {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status: rand(10,20)}},
                        upsert: true
                    }
                });
                if(list.length == 10000) {
                    db.getCollection(collection_user_insight).insertMany(list);
                    db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                    list = [];
                    list_user_school_bulk_write = [];
                }
            })
            if(list.length) {
                db.getCollection(collection_user_insight).insertMany(list);
                db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
            }

            var list_bulkwrite_delete = [];
            var list_ids_delete = [];
            var fl = true;
            db.getCollection(collection_insight).aggregate([
                {$match:Object.assign({status:-1,is_delete:1},search)},
            ].concat(search_common).concat([
                {$lookup:{
                    from        : collection_user_insight,
                    localField  : '_id',
                    foreignField: '_id',
                    as          : "user",
                }},
            ])).forEach(function(item){
                fl = false;
                list_ids_delete.push(item._id);
                list_bulkwrite_delete.push({
                    updateOne : {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status:rand(10,20)}},
                    }
                });
                if(list_bulkwrite_delete.length == 10000) {
                    db.getCollection(collection_user_insight).remove({_id:{$in: list_ids_delete}});
                    db.getCollection(college_user_all).bulkWrite(list_bulkwrite_delete);
                    list_bulkwrite_delete = [];
                }
            })
            if(list_bulkwrite_delete.length) {
                db.getCollection(collection_user_insight).remove({_id:{$in: list_ids_delete}});
                db.getCollection(college_user_all).bulkWrite(list_bulkwrite_delete);
                list_bulkwrite_delete = [];
                list_ids_delete = [];
            }

            if(status == -1) {
                if(!fl) {
                    db.getCollection(collection_insight).remove(Object.assign({},search,{status:-1,is_delete:1}));
                }
                db.getCollection(collection_insight).update(Object.assign({},search,{status:-1}),{$set:{status:0}},{multi:true});
            }
        }
    }
})


db.system.js.save({
    _id: "out_user_insight_common",
    value: function (collection_insight,collection_user,collection_user_insight,college_user_all,status = -1, ref_ids = false) {
        if(status == -2) {
            db.getCollection(collection_user_insight).drop();
            db.getCollection(collection_user_insight).createIndex({ref_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({source_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({facebook_id: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({keyword: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({status: 1},{background:true});
            db.getCollection(collection_user_insight).createIndex({is_delete: 1},{background:true});
        }
        var search = status == -2 ? {} : {status: status};
        if(ref_ids) {
            ref_ids = typeof(ref_ids) == 'object' ? ref_ids : [parseInt(ref_ids)];
            search['ref_id'] = {$in: ref_ids};
        }
        var facebook_id = collection_user == 'facebook_user_page' ? '_id' : 'facebook_id';
        var search_common = [
            {$lookup:{
                from        : collection_user,
                localField  : "source_id",
                foreignField: "data",
                as          : "facebook",
            }},
            {$unwind:"$facebook"},
            {$project:{_id:{$concat:["$_id","_","$facebook." + facebook_id]},
                ref_id:1,ref_name:1,
                ref_city_id:1,ref_city_name:1,
                facebook_id: "$facebook." + facebook_id,
                source_id:1,source_name:1,keyword:1,
                status: { $literal: -1 }, 
                is_delete: { $literal: 0 }
            }},
        ];
        if(status == -2) {
            db.getCollection(collection_insight).aggregate([
                {$match:search},
            ].concat(search_common).concat([
                {$out:collection_user_insight}
            ]),{allowDiskUse:true})
            var list_user_school_bulk_write = [];
            db.getCollection(collection_user_insight).find().forEach(function(item){
                list_user_school_bulk_write.push({
                    updateOne: {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status: rand(10,20)}},
                        upsert: true
                    }
                });
                if(list_user_school_bulk_write.length == 10000) {
                    db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                    list_user_school_bulk_write = [];
                }
            })
            if(list_user_school_bulk_write.length) {
                db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                list_user_school_bulk_write = [];
            }
        } else {
            var list = [];
            var list_user_school_bulk_write = [];
            var search_update = Object.assign({status:-1,is_delete:0},search);
            db.getCollection(collection_insight).aggregate([
                {$match:search_update},
            ].concat(search_common).concat([
                {$lookup:{
                    from        : collection_user_insight,
                    localField  : '_id',
                    foreignField: '_id',
                    as          : "user",
                }},
                {$match:{user:[]}}
            ])).forEach(function(item){
                delete item.user;
                list.push(item);
                list_user_school_bulk_write.push({
                    updateOne: {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status: rand(10,20)}},
                        upsert: true
                    }
                });
                if(list.length == 10000) {
                    db.getCollection(collection_user_insight).insertMany(list);
                    db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
                    list = [];
                    list_user_school_bulk_write = [];
                }
            })
            if(list.length) {
                db.getCollection(collection_user_insight).insertMany(list);
                db.getCollection(college_user_all).bulkWrite(list_user_school_bulk_write);
            }

            var list_bulkwrite_delete = [];
            var list_ids_delete = [];
            var fl = true;
            db.getCollection(collection_insight).aggregate([
                {$match:Object.assign({status:-1,is_delete:1},search)},
            ].concat(search_common).concat([
                {$lookup:{
                    from        : collection_user_insight,
                    localField  : '_id',
                    foreignField: '_id',
                    as          : "user",
                }},
            ])).forEach(function(item){
                fl = false;
                list_ids_delete.push(item._id);
                list_bulkwrite_delete.push({
                    updateOne : {
                        filter: {_id: item.facebook_id},
                        update: {$set:{status:rand(10,20)}},
                    }
                });
                if(list_bulkwrite_delete.length == 10000) {
                    db.getCollection(collection_user_insight).remove({_id:{$in: list_ids_delete}});
                    db.getCollection(college_user_all).bulkWrite(list_bulkwrite_delete);
                    list_bulkwrite_delete = [];
                }
            })
            if(list_bulkwrite_delete.length) {
                db.getCollection(collection_user_insight).remove({_id:{$in: list_ids_delete}});
                db.getCollection(college_user_all).bulkWrite(list_bulkwrite_delete);
                list_bulkwrite_delete = [];
                list_ids_delete = [];
            }

            if(status == -1) {
                if(!fl) {
                    db.getCollection(collection_insight).remove(Object.assign({},search,{status:-1,is_delete:1}));
                }
                db.getCollection(collection_insight).update(Object.assign({},search,{status:-1}),{$set:{status:0}},{multi:true});
            }
        }
    }
})