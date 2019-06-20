
/* function update_alias_list_keyword for facebook_page */
db.system.js.save(
    {
        _id: "update_list_keyword_facebook_page",
        value: function () {
            var list = [], i = 0, alias = "", list_keyword = [], alias1 = "";
            db.getCollection('facebook_page').find({ list_keyword: { $exists: false } }).forEach(function (item) {
                i++;
                if (item.name) {
                    alias1 = stripUnicode(item.name);
                    if (alias1) {
                        alias = ' ' + alias1 + ' ';
                        list_keyword = get_list_keyword_by_name(item.name);
                        list.push({
                            updateOne: {
                                filter: { _id: item._id },
                                update: { $set: { alias: alias, list_keyword: list_keyword } }
                            }
                        });
                    }
                }
                if (i % 10000 == 0) {
                    if (list.length) {
                        db.getCollection('facebook_page').bulkWrite(list);
                    }
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_page').bulkWrite(list);
            }
        }
    }
)

// function out_facebook_page_user_57_to_56
db.system.js.save(
    {
        _id: "out_facebook_page_user_57_to_56",
        value: function () {
            db_57 = connect('192.168.106.57/facebook');
            db_56 = connect('192.168.106.56/facebook');
            var list = [];
            var i = 0;
            db_57.getCollection('facebook_page_user').find({}).forEach(function (item) {
                i++;
                list.push(item);
                if (i % 3000 == 0) {
                    db_56.getCollection('facebook_page_user').insertMany(list);
                    list = [];
                }
            });
            if (list.length) {
                db_56.getCollection('facebook_page_user').insertMany(list);
                list = [];
            }
        }
    }
)

// function out_facebook_page_57_to_56
db.system.js.save(
    {
        _id: "out_facebook_page_57_to_56",
        value: function () {
            db_57 = connect('192.168.106.57/facebook');
            db_56 = connect('192.168.106.56/facebook');
            var list = [], i = 0, alias1 = "";
            db_57.getCollection('facebook_page').find({status:0}).forEach(function (item) {
                i++;
                if (item.name) {
                    alias1 = stripUnicode(item.name);
                    if (alias1) {
                        item.alias = ' ' + alias1 + ' ';
                        item.list_keyword = get_list_keyword_by_name(item.name);
                    }
                }
                list.push(item);
                if (i % 1000 == 0) {
                    db_56.getCollection('facebook_page').insertMany(list);
                    db_57.getCollection('facebook_page').update({_id:{$in: indexArray(list,'_id')}},{$set:{status: 1}},{multi: true});
                    list = [];
                }
            });
            if (list.length) {
                db_56.getCollection('facebook_page').insertMany(list);
                db_57.getCollection('facebook_page').update({_id:{$in: indexArray(list,'_id')}},{$set:{status: 1}},{multi: true});
                list = [];
            }
        }
    }
)

// function update_sum_facebook_page
db.system.js.save(
    {
        _id: "update_sum_facebook_page",
        value: function () {
            db.getCollection('facebook_page').find({status:0}).forEach(function(item){
                var sum = db.getCollection('facebook_page_user').count({data:item._id});
                    db.getCollection('facebook_page').bulkWrite([{
                        updateOne: {
                                filter : {_id: item._id},
                                update : {$set:{status:0, sum: sum}}
                        }
                    }]);
            })
        }
    }
)


// function build_list_keyword_for_page_by_status
db.system.js.save({
    _id: 'build_list_keyword_for_page_by_status',
    value: function (status) {
        var db_57 = connect("192.168.106.57/facebook");
        var db_56 = connect("192.168.106.56/facebook");
        var list = [];
        db_56.getCollection('facebook_page_id').aggregate([
            {$match:{status:status}},
            {$lookup:{
                from        : "facebook_page",
                localField  : "_id",
                foreignField: "_id",
                as          : "page",
            }},
        ]).forEach(function(item){
            if(item.page && item.page.length) {
                var page = item.page[0];
                if(page.name) {
                    page.list_keyword = get_list_keyword_by_name(page.name);
                }
                list.push(page);
            }
            if(list.length == 10000) {
                db_57.getCollection('facebook_page').insertMany(list);
                list = [];
            }
        })
        if(list.length) {
            db_57.getCollection('facebook_page').insertMany(list);
            list = [];
        }
    }
});