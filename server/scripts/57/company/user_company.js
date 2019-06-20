
/*
Phần này gồm các function sau
*/



// function trigger_user_company_by_company_ids
db.system.js.save({
    _id: "trigger_user_company_by_company_ids",
    value: function (company_ids = false) {
        if(!company_ids || !company_ids.length){return false;}
        db.getCollection('ref_company').aggregate([
            {$match: {_id: {$in: company_ids}}},
            {$project:{_id: 1,name:1,list_facebook_work_id:1,list_facebook_group_id:1}}
        ]).forEach(function(item){
            if(item.list_facebook_work_id && item.list_facebook_work_id.length) {
                out_facebook_insight_work_company_by_ref_company([item._id]);
                out_user_insight_work_company(item.list_facebook_work_id);
                out_user_company_by_work_ids(item.list_facebook_work_id);
            }
            if(item.list_facebook_group_id && item.list_facebook_group_id.length) {
                out_facebook_insight_group_company_by_ref_company([item._id]);
                out_user_insight_group_company(item.list_facebook_group_id);
                out_user_company_by_group_ids(item.list_facebook_group_id);
            }
            db.getCollection('ref_company').update({_id: item._id},{$set:{user_count: db.getCollection('user_company').count({"data.company_id": item._id})}});
        });
    }
})


// function out_user_company_by_ids
db.system.js.save({
    _id: "out_user_company_by_ids",
    value: function (facebook_ids) {
        var list_obj = {};
        db.getCollection('user_insight_work_company').find({facebook_id: {$in: facebook_ids}}).forEach(function(item){
            if(!list_obj[item.facebook_id]) {
                list_obj[item.facebook_id] = {};
            }
            if(!list_obj[item.facebook_id][item.company_id]) {
                list_obj[item.facebook_id][item.company_id] = {
                    company_id      : item.company_id,
                    company_name    : item.company_name,
                    work            : [],
                    data            : [],
                };
            }
            list_obj[item.facebook_id][item.company_id].work.push({
                work_id     : item.work_id,
                work_name   : item.work_name,
            })
            list_obj[item.facebook_id][item.company_id].data.push(item.work_name);
        })

        db.getCollection('user_insight_group_company').find({facebook_id: {$in: facebook_ids}}).forEach(function(item){
            if(!list_obj[item.facebook_id]) {
                list_obj[item.facebook_id] = {};
            }
            if(!list_obj[item.facebook_id][item.company_id]) {
                list_obj[item.facebook_id][item.company_id] = {
                    company_id      : item.company_id,
                    company_name    : item.company_name,
                    group            : [],
                    data            : [],
                };
            }
            if(!list_obj[item.facebook_id][item.company_id].group) {
                list_obj[item.facebook_id][item.company_id].group = [];
            }
            list_obj[item.facebook_id][item.company_id].group.push({
                work_id     : item.group_id,
                work_name   : item.group_name,
            })
            if(!list_obj[item.facebook_id][item.company_id].data) {
                list_obj[item.facebook_id][item.company_id].data = [];
            }
            list_obj[item.facebook_id][item.company_id].data.push(item.group_name);
        })
        var list_bulk_write = [];
        for(var facebook_id in list_obj) {
            var obj = list_obj[facebook_id];
            var item = {
                _id     : facebook_id,
                data    : [],
            };
            for(var company_id in obj) {
                item.data.push(obj[company_id]);
            }
            list_bulk_write.push({
                updateOne: {
                    filter  : {_id: facebook_id},
                    update  : item
                }
            });
        }
        db.getCollection('user_company').bulkWrite(list_bulk_write);
    }
})

// function out_user_company_by_company_ids
db.system.js.save({
    _id: "out_user_company_by_company_ids",
    value: function (company_ids = false) {
        if(!company_ids || !company_ids.length) { return false;}
        var list_ids_obj = {};
        db.getCollection('user_insight_work_company').find({company_id: {$in: company_ids}}).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        db.getCollection('user_insight_group_company').find({company_id: {$in: company_ids}}).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        var list_ids = Object.keys(list_ids_obj);
        if(list_ids && list_ids.length) {
            out_user_company(list_ids);
        }
    }
})

// function out_user_company_by_work_ids
db.system.js.save({
    _id: "out_user_company_by_work_ids",
    value: function (work_ids = false) {
        if(!work_ids || !work_ids.length) { return false;}
        var list_ids_obj = {};
        db.getCollection('user_insight_work_company').find({work_id: {$in: work_ids}}).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        var list_ids = Object.keys(list_ids_obj);
        if(list_ids && list_ids.length) {
            out_user_company(list_ids);
        }
    }
})

// function out_user_company_by_group_ids
db.system.js.save({
    _id: "out_user_company_by_group_ids",
    value: function (group_ids = false) {
        if(!group_ids || !group_ids.length) { return false;}
        var list_ids_obj = {};
        db.getCollection('user_insight_group_company').find({group_id: {$in: group_ids}}).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        var list_ids = Object.keys(list_ids_obj);
        if(list_ids && list_ids.length) {
            out_user_company(list_ids);
        }
    }
})

// function out_user_company
db.system.js.save({
    _id: "out_user_company",
    value: function (facebook_ids = false) {
        var list = [],i = 0;
        var search = facebook_ids && facebook_ids.length ? {_id: {$in: facebook_ids}} : {};
        db.getCollection('user_company').find(search).forEach(function(item){
            i++;
            list.push(item._id);
            if(i % 10000 == 0) {
                out_user_company_by_ids(list);
                list = [];
            }
        })
        if(list.length) {
            out_user_company_by_ids(list);
        }
    }
})

// function trigger_work_company_all
db.system.js.save({
    _id: "trigger_work_company_all",
    value: function (facebook_ids = false) {
        if(!facebook_ids && !facebook_ids.length){return false;}
            var ids_obj = {};
            db.getCollection('facebook_user_work').aggregate([
                { $match: { facebook_id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                ids_obj[item.data] = 1;
            })
            var ids = Object.keys(ids_obj);
            if (ids && ids.length) {
                if ((facebook_ids && facebook_ids.length) && (ids && ids.length)) {
                    out_user_insight_work_company(ids, facebook_ids);
                    if (facebook_ids && facebook_ids.length) {
                        out_user_company(facebook_ids);
                    }
                }
            }
    }
})


//function trigger_group_company_all
db.system.js.save(
    {
        _id: "trigger_group_company_all",
        value: function (facebook_ids = false) {
            if(!facebook_ids && !facebook_ids.length){return false;}
            var group_ids_obj = {};
            db.getCollection('facebook_user_group').aggregate([
                { $match: { _id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                if (item.data && item.data.length) {
                    for (var group_id of item.data) {
                        group_ids_obj[group_id] = 1;
                    }
                }
            })
            var group_ids = Object.keys(group_ids_obj);
            if (group_ids && group_ids.length) {
                if ((facebook_ids && facebook_ids.length) && (group_ids && group_ids.length)) {
                    out_user_insight_group_company(group_ids, facebook_ids);
                    if (facebook_ids && facebook_ids.length) {
                        out_user_company(facebook_ids);
                    }
                }
            }
        }
    }
)