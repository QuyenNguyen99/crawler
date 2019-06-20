var db_57_db_insert   = connect('192.168.105.73/db_insert');
var db_57_friend_flat = connect('192.168.105.73/friend_flat');
var list = [];
var count = db_57_friend_flat.getCollection('friend_flat_{status}').count();
if(!count) {
    db_57_db_insert.getCollection('facebook_user_friend_id0').aggregate([
        {$match:{status:{status}}},
        {$lookup:{
            from            : "facebook_user_friend_index0",
            localField      : "_id",
            foreignField    : "_id",
            as              : "facebook_user_friend_index0",
        }},
        {$project:{_id:1,data:{$arrayElemAt:["$facebook_user_friend_index0.data",0]}}},
        {$unwind:"$data"},
        {$project:{
            _id: 0,
            id1:{$cond: { if: { $gte: [ "$_id", "$data" ] }, then: "$_id", else: "$data" }},
            id2:{$cond: { if: { $gte: [ "$_id", "$data" ] }, then: "$data", else: "$_id" }},
        }},
    ],{allowDiskUse:true}).forEach(function(item){
        list.push(item);
        if(list.length == 100000) {
            db_57_friend_flat.getCollection('friend_flat_{status}').insertMany(list);
            list = [];
        }
    })
    if(list.length) {
        db_57_friend_flat.getCollection('friend_flat_{status}').insertMany(list);
    }
}