var list = [];
db.getCollection('facebook_id').aggregate([
    {$match:{status:{status}}},
    {$lookup:{
        from        : "facebook_user_friend_index0",
        localField  : "_id",
        foreignField: "_id",
        as          : "friends",
    }},
    { $project: { _id: 1, data:{$arrayElemAt:["$friends.data",0]} } },
    { $unwind: "$data" },
    {
        $project: {
            id1: { $cond: { if: { $gte: ["$_id", "$data"] }, then: "$_id", else: "$data" } },
            id2: { $cond: { if: { $gte: ["$_id", "$data"] }, then: "$data", else: "$_id" } },
        }
    },
    {
        $project: {
            _id: { $concat: ["$id1", '_', "$id2"] },
            id1: 1,
            id2: 1,
        }
    }
]).forEach(function (item1) {
    list.push({
        updateOne: {
            filter: { _id: item1._id },
            update: item1,
            upsert: true,
        }
    });
    if (list.length == 20000) {
        db.getCollection('facebook_user_friend_flat_new').bulkWrite(list);
        list = [];
    }
})
if (list.length) {
    db.getCollection('facebook_user_friend_flat_new').bulkWrite(list);
    list = [];
}
db.getCollection('facebook_id').update({status:{status}},{$set:100000},{multi:true});