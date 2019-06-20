db.system.js.save(
    {
        _id: "bulk_write_facebook_group_child_hometown",
        value: function (status = -1) {
            var search = {
                list_keyword: { $in: ["hoi dong huong", "nhom dong huong"] }
            };
            if(status != -2) {
                search['status'] = status;
                db.getCollection('facebook_group_hometown').createIndex({list_keyword:1},{background:true});
            }
            var list = [];
            db.getCollection('facebook_group').aggregate([
                {$match:search},
                {$lookup:{
                    from        : "facebook_group_hometown",
                    localField  : "_id",
                    foreignField: "_id",
                    as          : "facebook_group_hometown",
                }},
                {$match:{facebook_group_hometown:[]}}
            ]).forEach(function (item) {
                item.status = -1;
                delete item.facebook_group_hometown;
                item.list_keyword = item.alias ? get_list_keyword_by_sentence(item.alias.trim()) : [];
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection('facebook_group_hometown').insertMany(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_group_hometown').insertMany(list);
            }
        }
    }
)