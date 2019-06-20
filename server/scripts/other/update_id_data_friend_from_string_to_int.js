var list = [];
db.getCollection('facebook_user_friend_index0').find({}).limit(1).forEach(function(item){
        item._id = parseInt(item._id);
    for(var i in item.data) {
            item.data[i] = parseInt(item.data[i]);
    }
    list.push({
            updateOne: {
                    filter: {_id: item._id},
                    update: {$set:item},
                    upsert: true
            }
    });
    if(list.length == 1000) {
        db.getCollection('facebook_user_friend_index0_copy').bulkWrite(list);
        list = [];
    }
})
if(list.length) {
    db.getCollection('facebook_user_friend_index0_copy').bulkWrite(list);
    list = [];
}