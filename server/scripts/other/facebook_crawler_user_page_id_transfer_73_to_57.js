var db_57 = connect('192.168.106.57/facebook')
var db_73 = connect('192.168.105.73/db_insert')
var list = [];
db_73.getCollection('facebook_crawler_user_page_id').find({}).skip(18348000).forEach(function(item){
    list.push(item);
    if(list.length == 20000) {
            db_57.getCollection('facebook_crawler_user_page_id').insertMany(list);
            list = [];
    }
})

if(list.length) {
            db_57.getCollection('facebook_crawler_user_page_id').insertMany(list);
            list = [];
    }