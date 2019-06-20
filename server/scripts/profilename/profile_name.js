db_73 = connect('192.168.106.57/db_insert');
db_57 = connect('192.168.106.57/facebook');
db_57.loadServerScripts();
var list = [];
db.getCollection('facebook_profile_status').aggregate([
        {$match:{status: v_status}},
        {$lookup:{
            from        : "facebook_profile",
            localField  : "_id",
            foreignField: "_id",
            as          : "facebook_profile",
        }},
        {$project:{_id:1,name:{$arrayElemAt:["$facebook_profile.name",0]}}}
]).forEach(function (item) {
        if (item.name) {
                item.list_name = get_list_keyword_by_name(item.name);
                if (item.list_name && item.list_name.length) {
                        list.push({
                                updateOne: {
                                        filter: { _id: item._id, list_name: { $exists: false } },
                                        update: { $set: { list_name: item.list_name } }
                                }
                        });
                }
                if (list.length == 10000) {
                        db_73.getCollection('user_all').bulkWrite(list);
                        list = [];
                }
        }
})

if (list.length) {
        db_73.getCollection('user_all').bulkWrite(list);
        list = [];
}