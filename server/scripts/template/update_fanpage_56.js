var db_73 = connect('192.168.105.73/db_insert');
var db_56 = connect('192.168.106.56/facebook');
db.loadServerScripts();
var list_pages = [], list_pages_ids = [];
function process_page(list_pages, list_pages_ids) {
    var list_page_insert = [];
    db_56.getCollection('facebook_page').find({_id: {$in: list_pages_ids}}).forEach(function(it_2){
        if(list_pages[it_2._id]) {
            delete list_pages[it_2._id];
        }
    })
    for(var page_id in list_pages) {
        list_pages[page_id].alias = " " + stripUnicode(list_pages[page_id].name) + " ";
        list_pages[page_id].status = 0;
        list_pages[page_id].list_keyword = get_list_keyword_by_name(list_pages[page_id].name);
        list_page_insert.push({
            updateOne: {
                filter: {_id: page_id},
                update: {$set: list_pages[page_id]},
                upsert: true
            }
        });
    }
    if(list_page_insert.length) {
        db_56.getCollection('facebook_page').bulkWrite(list_page_insert);
    }
}
db_73.getCollection('facebook_crawler_user_page_id').aggregate([
    {$match:{"status" : {status}}},
    {$lookup:{
        from            : "facebook_crawler_user_page",
        localField      : "_id",
        foreignField    : "_id",
        as              : "facebook_crawler_user_page",
    }},
    {$project:{_id:1,data:{$arrayElemAt:["$facebook_crawler_user_page.data",0]}}}
]).forEach(function(item){
    if(item.data && item.data.length) {
        for(var it of item.data) {
            if(!list_pages[it.id]) {
                it._id = it.id;
                delete it.id;
                list_pages[it._id] = it;
                list_pages_ids.push(it._id);
            }
        }
    }
    if(list_pages_ids.length >= 10000) {
        process_page(list_pages, list_pages_ids);
        list_pages = {};
        list_pages_ids = [];
    }
})
if(list_pages_ids.length) {
    process_page(list_pages, list_pages_ids);
}