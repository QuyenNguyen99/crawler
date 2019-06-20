db_73 = connect('192.168.106.57/db_insert');
db_57 = connect('192.168.106.57/facebook');
db_57.loadServerScripts();
var list = [];
db_57.getCollection('user_hometown_infer').find().noCursorTimeout().forEach(function (item) {
        if (item.city_id && item.city_id !== undefined) {
                list.push({
                        updateOne: {
                                filter: { _id: item._id, hometown: { $exists: false } },
                                update: {
                                        $set: {
                                                // year: item.year,
                                                hometown: item.city_id,
                                        }
                                },
                        },
                });
        }
        if (list.length == 10000) {
                db_73.getCollection('user_all').bulkWrite(list);
                list = [];
        }
})

if (list.length) {
        db_73.getCollection('user_all').bulkWrite(list);
        list = [];
}