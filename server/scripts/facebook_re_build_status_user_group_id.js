var list = [];
var i = 0;
var ii = 5720;
var limit = 10000;
var collection_name = 'facebook_user_group_id';
db.getCollection(collection_name).find().skip(57200000).noCursorTimeout().forEach(function(item){
    list.push(item._id);
    i++;
    if(i % limit == 0) {
        db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
        list = [];
        ii++;
    }
})
if(list.length) {
    db.getCollection(collection_name).update({_id:{$in: list}},{$set:{status: ii}},{"multi" : true,"upsert" : false});
}