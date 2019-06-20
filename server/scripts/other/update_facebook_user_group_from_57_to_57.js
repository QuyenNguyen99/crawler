db.loadServerScripts();
var db_56 = connect('192.168.106.56/facebook');
var db_57 = connect('192.168.106.57/facebook');
function process_group(list_groups, list_groups_ids) {
    var list_group_update = [];
    var list_group_insert = [];
    db_57.getCollection('facebook_group').find({_id: {$in: list_groups_ids}}).forEach(function(it_2){
        if(list_groups[it_2._id]) {
            list_group_update.push({
                updateOne   : {
                    filter  : {_id: it_2._id,privacy:{$exists:false}},
                    update  : {$set:{privacy: list_groups[it_2._id].privacy}}
                }
            });
            delete list_groups[it_2._id];
        }
    })
    for(var group_id in list_groups) {
        list_groups[group_id].alias = " " + stripUnicode(list_groups[group_id].name) + " ";
        list_groups[group_id].infer = 0;
        list_groups[group_id].list_keyword = get_list_keyword_by_name(list_groups[group_id].name);
        list_group_insert.push(list_groups[group_id]);
    }
    if(list_group_update.length) {
        db_57.getCollection('facebook_group').bulkWrite(list_group_update);
    }
    if(list_group_insert.length) {
        db_57.getCollection('facebook_group').insertMany(list_group_insert);
    }
}
var list = [], list_ids = [], list_groups = {}, list_groups_ids = [];
db_56.getCollection('facebook_group_user_raw').find({status:0}).forEach(function(item){
    list_ids.push(item._id);
    var item2 = db_57.getCollection('facebook_user_group').findOne({_id:item._id});
    var flag = false;
    if(!item2 || !item2._id) {
        item2 = {_id: item._id,data:[],length:0};
        flag = true;
    }
    if(item && item.data && item.data.length) {
        var obj = {};
        for(var it of item2.data) {
            obj[it] = true;
        }
        for(var it of item.data) {
            if(!obj[it]) {
                item2.data.push(it.id);
                flag = true;
            }
            if(!list_groups[it.id]) {
                it._id = it.id;
                delete it.id;
                list_groups[it._id] = it;
                list_groups_ids.push(it._id);
            }
        }
    }
    if(list_groups_ids.length >= 10000) {
        process_group(list_groups, list_groups_ids);
        list_groups = {};
        list_groups_ids = [];
    }
    if(flag) {
        list.push({
                updateOne: {
                    filter: {_id: item2._id},
                    update: {$set:item2},
                    upsert: true
                },
        });
    }
    if(list.length == 100) {
        db_57.getCollection('facebook_user_group').bulkWrite(list);
        list = [];
    }
    if(list_ids.length == 1000) {
        db_56.getCollection('facebook_group_user_raw').update({_id:{$in: list_ids}},{$set:{status:1}},{multi:true});
        list_ids = [];
    }
})
if(list.length) {
    db_57.getCollection('facebook_user_group').bulkWrite(list);
}
if(list_ids.length) {
    db_56.getCollection('facebook_group_user_raw').update({_id:{$in: list_ids}},{$set:{status:1}},{multi:true});    
}
if(list_groups_ids.length) {
    process_group(list_groups, list_groups_ids);
}