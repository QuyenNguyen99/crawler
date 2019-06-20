var list = [];
db.getCollection('facebook_user_friend_id0').aggregate([
    {$match:{status:6301}},
    {$lookup:{
        from            : "facebook_user_friend_index0",
        localField      : "_id",
        foreignField    : "_id",
        as              : "facebook_user_friend_index0",
    }},
    {$project:{_id:1,data:{$arrayElemAt:["$facebook_user_friend_index0.data",0]}}},
    {$unwind:"$data"},
    {$project:{
        id1:{$cond: { if: { $gte: [ "$_id", "$data" ] }, then: "$_id", else: "$data" }},
        id2:{$cond: { if: { $gte: [ "$_id", "$data" ] }, then: "$data", else: "$_id" }},
    }},
    {$project:{
        _id:{$concat:["$id1",'_',"$id2"]},
        id1:1,
        id2:1,
    }}
]).forEach(function(item){
    list.push({
        updateOne: {
            filter : {_id: item._id},
            update : item,
            upsert : true,
        }
    });
    if(list.length == 20000){
        db.getCollection('facebook_user_friend_flat_new').bulkWrite(list);
        list = [];
    }
})

if(list.length) {
    db.getCollection('facebook_user_friend_flat_new').bulkWrite(list);
}