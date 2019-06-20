db.loadServerScripts();
var list = [];
db.getCollection('ref_school_3').find({}).forEach(function(item){
    
    list.push({
        updateOne: {
            filter: {_id: item._id},
            update: {$set:{text_search: item.list_keyword.join(',') + ',' + item.name}}
        }
    });
})
db.getCollection('ref_school_3').bulkWrite(list);