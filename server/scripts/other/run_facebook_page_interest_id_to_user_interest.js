db.loadServerScripts();
var list = [];
db.getCollection('facebook_crawler_user_page_id').find({}).forEach(function(item){
    list.push({
    	updateOne: {
    		filter: {_id: item._id},
    		update: {$set:{_id:item._id}},
    		upsert: true
    	}
	});
    if(list.length == 20000) {
        db.getCollection('user_interest').bulkWrite(list);
        list = [];
    }
})
if(list.length) {
	db.getCollection('user_interest').bulkWrite(list);
    list = [];
}

