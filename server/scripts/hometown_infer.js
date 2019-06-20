db_73 = connect('192.168.105.73/db_insert');
db_57 = connect('192.168.106.57/facebook');
db_57.loadServerScripts();
var list = [];
db_57.getCollection('user_hometown_infer').find().forEach(function(item){
    list.push({
            updateOne: {
                    filter: {_id: item._id, city_id:{$exists:false}},
                    update: {
                            $set: {
                                _id: item._id,
                                hometown: item.city_id,
                                hometown_name: item.city_name,
                            }
                    },
                    upsert: true
            },
    });
    if(list.length == 10000) {
            db_73.getCollection('user_all').bulkWrite(list);
            list = [];
    }
})

if(list.length) {
        db_73.getCollection('user_all').bulkWrite(list);
        list = [];
}