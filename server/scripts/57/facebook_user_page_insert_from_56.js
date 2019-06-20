db.loadServerScripts();
var list = [];
db.getCollection('facebook_crawler_user_page').find({}).noCursorTimeout().forEach(function(item){
    var data = [];
    if(item.data && item.data.length) {
        for(var it of item.data) {
            data.push(it.id);
        }
    }
    list.push({
            _id : item._id,
            data: data
    });
    if(list.length == 10000) {
        insert_data_ignore_not_update(list,'facebook_page_user');
        list = [];
    }
})
if(list.length) {
    insert_data_ignore_not_update(list,'facebook_page');
}