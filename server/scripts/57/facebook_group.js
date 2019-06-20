
/* function group_insert_by_data */
db.system.js.save(
    {
        _id: "group_insert_by_data",
        value: function (data) {
            list = [];
            list_bulk_write = [];
            for (var item of data) {
                var alias = stripUnicode(item.name,' ');
                if(alias) {
                    alias = ' ' + alias + ' ';
                }
                list.push({
                    "_id": item.id,
                    "name": item.name,
                    "status": -1,
                    "infer": 0,
                    "alias": alias,
                    "administrator": item.administrator,
                    "bookmark_order": item.bookmark_order,
                    "privacy": item.privacy,
                    "unread": item.unread,
                    "version": item.version,
                    "list_keyword": get_list_keyword_by_name(item.name),
                });
                list_bulk_write.push({
                    updateOne: {
                        filter      : {_id: item.id},
                        update      : {$set: {
                            "administrator": item.administrator,
                            "bookmark_order": item.bookmark_order,
                            "privacy": item.privacy,
                            "unread": item.unread,
                            "version": item.version,
                        }}
                    }
                });
            }
            if(list_bulk_write && list_bulk_write.length) {
                db.getCollection('facebook_group').bulkWrite(list_bulk_write);
            }
            if(list && list.length) {
                insert_data_ignore_not_update(list,'facebook_group');
            }
        }
    }
)



// function build_list_keyword_tu_dien_for_group
db.system.js.save({
    _id: 'build_list_keyword_tu_dien_for_group',
    value: function () {
        build_facebook_education_list_keyword_tu_dien();
        var list = [];
        db.getCollection('facebook_group').find({list_keyword_tu_dien:{$exists:false}}).forEach(function(item){
            flag = false;
            list.push({
                updateOne: {
                    filter  : {_id: item._id},
                    update  : {$set:{ list_keyword_tu_dien: item.alias && item.alias.trim() ? global_tu_dien_get_list_array_sentence(item.alias) : [] }}
                }
            })
            if(list.length == 10000) {
                db.getCollection('facebook_group').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_group').bulkWrite(list);
            list = [];
        }
    }
});



// function build_list_keyword_tu_dien_for_group_by_status
db.system.js.save({
    _id: 'build_list_keyword_tu_dien_for_group_by_status',
    value: function (start, end) {
        build_facebook_education_list_keyword_tu_dien();
        for(var i = start; i <= end;i++) {
            var list = [];
            db.getCollection('facebook_group').find({status:i,list_keyword_tu_dien:{$exists:false}}).forEach(function(item){
                flag = false;
                list.push({
                    updateOne: {
                        filter  : {_id: item._id},
                        update  : {$set:{ list_keyword_tu_dien: item.alias && item.alias.trim() ? global_tu_dien_get_list_array_sentence(item.alias) : [] }}
                    }
                })
                if(list.length == 10000) {
                    db.getCollection('facebook_group').bulkWrite(list);
                    list = [];
                }
            })
            if(list.length) {
                db.getCollection('facebook_group').bulkWrite(list);
                list = [];
            }
        }
    }
});


// function build_list_keyword_for_group_by_status
db.system.js.save({
    _id: 'build_list_keyword_for_group_by_status',
    value: function (start, end) {
        var list = [];
        for(var i = start; i <= end;i++) {
            list = [];
            db.getCollection('facebook_group').find({status:i}).forEach(function(item){
                if(item.name) {
                    list.push({
                        updateOne: {
                            filter  : {_id: item._id},
                            update  : {$set:{ list_keyword: get_list_keyword_by_name(item.name) }}
                        }
                    })
                }
                if(list.length == 1000) {
                    db.getCollection('facebook_group').bulkWrite(list);
                    list = [];
                }
            })
            if(list.length) {
                db.getCollection('facebook_group').bulkWrite(list);
                list = [];
            }
        }
    }
});

// facebook_group_interest

var list = [];
db.getCollection('facebook_group_interest').aggregate([
    {$unwind:"$keyword"},
    {$group:{_id:{group_id:"$_id",interest_id:"$keyword.id"},
        group_id:{$first:"$_id"},
        group_name:{$first:"$name"},
        interest_id:{$first:"$keyword.id"},
        interest_name:{$first:"$keyword.name"},
    }},
    {$out:"facebook_group_interest_flat_new"},
],{allowDiskUse:true});

// facebook_group_interest