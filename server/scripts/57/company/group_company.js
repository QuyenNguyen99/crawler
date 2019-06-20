

// function delete_facebook_insight_group_company
db.system.js.save({
    _id: "delete_facebook_insight_group_company",
    value: function (company_id = false, group_ids = false) {
        var search_insight_user_delete = { company_id: company_id };
        var search_insight_group_delete = { company_id: company_id };
        if (group_ids && group_ids.length) {
            search_insight_user_delete['group_id'] = { $in: group_ids };
            search_insight_group_delete['_id'] = { $in: group_ids };
        }
        db.getCollection('facebook_insight_group_company').remove(search_insight_group_delete);
        var list_ids_obj = {};
        db.getCollection('user_insight_group_company').find(search_insight_user_delete).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        var list_ids = Object.keys(list_ids_obj);
        if(list_ids && list_ids.length) {
            db.getCollection('user_insight_group_company').remove(search_insight_user_delete);
            db.getCollection('user_company').remove({
                _id: {$in: list_ids},
                data:{$size:1},
                "data.group":{$exists:true}
            });
            out_user_company_by_ids(list_ids);
        }
    }
})

// function out_facebook_insight_group_company_by_ref_company
db.system.js.save({
    _id: "out_facebook_insight_group_company_by_ref_company",
    value: function (company_ids = false) {
        var search = {list_facebook_group_id:{$exists:true}};
        if(company_ids && company_ids.length) {
            search['_id'] = {$in: company_ids};
        }
        db.getCollection('ref_company').aggregate([
            {$match: search},
            {$project:{_id: 1,name:1,list_facebook_group_id:1}}
        ]).forEach(function(item){
            if(item.list_facebook_group_id && item.list_facebook_group_id.length) {
                var list_bulk_write = [];
                var list_ids_delete_obj = {};
                db.getCollection('facebook_insight_group_company').find({company_id: item._id}).forEach(function(it_delete){
                    list_ids_delete_obj[it_delete._id] = 1;
                })
                db.getCollection('facebook_group').find({_id:{$in: item.list_facebook_group_id}}).forEach(function(it){
                    delete list_ids_delete_obj[it._id];
                    list_bulk_write.push({
                        updateOne   : {
                            filter  : {_id: it._id},
                            update  : {
                                _id             : it._id,
                                name            : it.name,
                                company_id      : item._id,
                                company_name    : item.name,
                            },
                            upsert  : true
                        }
                    })
                })
                db.getCollection('facebook_insight_group_company').bulkWrite(list_bulk_write);
                var list_ids_delete = Object.keys(list_ids_delete_obj);
                if(list_ids_delete && list_ids_delete.length) {
                    delete_facebook_insight_group_company(item._id, list_ids_delete);
                }
            }
        })
    }
})
// function out_user_insight_group_company
db.system.js.save({
    _id: "out_user_insight_group_company",
    value: function (group_ids = false, facebook_ids = false) {
        var search = group_ids && group_ids.length ? { _id: { $in: group_ids } } : {};
        var list_ids = [];
        var list_ids_obj = {};
        db.getCollection('facebook_insight_group_company').aggregate([
            { $match: search },
            { $project: { _id: 1, name: 1, company_id: 1, company_name: 1 } }
        ]).forEach(function (item) {
            list_ids.push(item._id);
            list_ids_obj[item._id] = item;
        });
        for (var group_id of list_ids) {
            var search_user_group = { data: group_id };
            if (facebook_ids && facebook_ids.length) {
                search_user_group['_id'] = { $in: facebook_ids };
            }
            var list = [], i = 0;
            var list_user_company = [];
            db.getCollection('facebook_user_group').aggregate([
                { $match: search_user_group },
                { $project: { _id: 1 } }
            ]).forEach(function (item) {
                i++;
                _id = group_id + '_' + item._id;
                list.push({
                    updateOne: {
                        filter: { _id: _id },
                        update: {
                            _id: _id,
                            group_id: group_id,
                            facebook_id: item._id,
                            group_name: list_ids_obj[group_id].name,
                            company_id: list_ids_obj[group_id].company_id,
                            company_name: list_ids_obj[group_id].company_name,
                        },
                        upsert: true,
                    }
                });
                list_user_company.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { _id: item._id } },
                        upsert: true,

                    }
                });
                if (i % 10000 == 0) {
                    db.getCollection('user_insight_group_company').bulkWrite(list);
                    db.getCollection('user_company').bulkWrite(list_user_company);
                    list = [];
                    list_user_company = [];
                }
            })
            if (list.length) {
                db.getCollection('user_insight_group_company').bulkWrite(list);
                db.getCollection('user_company').bulkWrite(list_user_company);
            }
        }
    }
})
