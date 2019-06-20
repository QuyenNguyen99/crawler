db.loadServerScripts();
var list_obj = {}, count = 0;
db.getCollection('facebook_crawler_user_page').find({}).noCursorTimeout().forEach(function(item){
    if(item.data && item.data.length) {
        for(var it of item.data) {
            it._id = it.id;
            delete it.id;
            if(!list_obj[it._id]) {
                list_obj[it._id] = it;
                it.status = -1;
                count++;
            }   
            if(count == 10000) {
                insert_data_ignore_not_update(get_value_object(list_obj),'facebook_page');
                list_obj = {};
                count = 0;
            }
        }
    }
})
if(count) {
    insert_data_ignore_not_update(get_value_object(list_obj),'facebook_page');
}