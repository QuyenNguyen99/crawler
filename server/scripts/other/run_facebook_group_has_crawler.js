db.loadServerScripts();
var list = [];
db.getCollection('facebook_id_has_mobile_phone_not_crawler_group').find().forEach(function(item){
    list.push(item._id);
    if(list.length == 10000) {
        db.getCollection('facebook_id_has_mobile_phone').update({_id:{$in: list}},{$set:{group_status:0}},{multi:true});
        list = [];
    }
})
if(list.length) {
    db.getCollection('facebook_id_has_mobile_phone').update({_id:{$in: list}},{$set:{group_status:0}},{multi:true});
    list = [];
}