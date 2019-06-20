db.loadServerScripts();
var list = [];
db.getCollection('ref_college').find({}).forEach(function(item){
    item.list_search_one_keyword.push(item.name.toLowerCase());
    list.push({
        updateOne: {
            filter: {_id: item._id},
            update: {$set:{text_search: item.list_search_one_keyword.join(',')}}
        }
    });
})
db.getCollection('ref_college').bulkWrite(list);