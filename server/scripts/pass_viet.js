var list = [];
db.getCollection('facebook_profile_dif_vi_id').find({}).forEach(function(item){
    var pass = false;
    if(item.total_score && item.score) {
            pass = item.score / item.total_score > 0.5 ?  true : false;
    }
    list.push({
            updateOne: {
                filter: {_id: item._id},
                update: {$set:{pass: pass}}
            }
    });
    if(list.length >= 10000) {
            db.getCollection('facebook_profile_dif_vi_id').bulkWrite(list);
            list = [];
    }
})

if(list.length) {
        db.getCollection('facebook_profile_dif_vi_id').bulkWrite(list);
        list = [];
}