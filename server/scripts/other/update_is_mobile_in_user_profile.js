
var list = [];
db.getCollection('facebook_id_has_mobile_phone').find().noCursorTimeout().forEach(function(item){
    list.push(item._id);
    if(list.length == 20000) {
        db.getCollection('user_profile').update({_id:{$in: list}},{$set:{is_mobile:1}},{multi:true});
        list = [];
    }
})
if(list.length) {
        db.getCollection('user_profile').update({_id:{$in: list}},{$set:{is_mobile:1}},{multi:true});
        list = [];
    }