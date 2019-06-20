var list = [];
db.getCollection('facebook_id_has_mobile_phone_not_crawler_new').find({"facebook_profile.error":{$exists:true}}).forEach(function(item){
    list.push(item._id);
    if(list.length == 10000) {
        db.getCollection('facebook_id_has_mobile_phone').remove({_id:{$in: list}});
        list = [];
    }
})
if(list.length) {
    db.getCollection('facebook_id_has_mobile_phone').remove({_id:{$in: list}});
}