

/* BEGIN work */
/*
cần có các hàm như sau
out_facebook_work(ids = false)
out_facebook_profile_work_flane_all()
out_facebook_profile_work_flane(ids = false)
out_facebook_user_work(ids = false)
update_type_facebook_user_work_by_list_ids(ids = false)
update_list_keyword_facebook_work(ids = false)
trigger_work_all(ids = false)
*/
//function out_facebook_work
db.system.js.save(
    {
        _id: "out_facebook_work",
        value: function (ids = false) {
            var list = {},i = 0, rs = [];
            var search = { work: { $exists: true } };
            if(ids && ids.length) {
                search['_id'] = {$in: ids};
            }
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, work: 1 } },
            ]).forEach(function (item) {
                i++;
                if (typeof (item.work) == 'object' && item.work.length) {
                    for (var it of item.work) {
                        list[it.employer.id] = {
                            _id: it.employer.id,
                            name: it.employer.name,
                        }
                    }
                }
                if (i % 10000 == 0) {
                    var ls = get_value_object(list);
                    if(!ids || !ids.length) {
                        insert_data_ignore_not_update(ls,'facebook_work');
                    } else {
                        rs = rs.concat(insert_data_ignore_not_update(ls,'facebook_work'));
                    }
                    list = {};
                }
            })
            if (Object.keys(list).length) {
                var ls = get_value_object(list);
                if(!ids || !ids.length) {
                    insert_data_ignore_not_update(ls,'facebook_work');
                } else {
                    rs = rs.concat(insert_data_ignore_not_update(ls,'facebook_work'));
                }
            }
            return rs;
        }
    }
)



//function out_facebook_profile_work_flane_all
db.system.js.save(
    {
        _id: "out_facebook_profile_work_flane_all",
        value: function () {
            var list = [];
            var i = 0;
            db.getCollection('facebook_id').find({run_company:1}).forEach(function(item){
                i++;
                list.push(item._id);
                if(i % 10000 == 0) {
                    out_facebook_profile_work_flane(list);
                    db.getCollection('facebook_id').update({_id:{$in: list}},{$set:{run_company:0}},{multi:true});
                    list = [];
                }
            })
            if(list.length) {
                out_facebook_profile_work_flane(list);
                db.getCollection('facebook_id').update({_id:{$in: list}},{$set:{run_company:0}},{multi:true});
            }
        }
    }
)

//function out_facebook_profile_work_flane
db.system.js.save(
    {
        _id: "out_facebook_profile_work_flane",
        value: function (ids = false) {
            var list = [],i = 0,rs = [];
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['work'] = { $exists: true };
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, work: 1 } },
                { $unwind: "$work" },
                { $match: {"work.id": {$exists:true},"work.employer.id": {$exists:true},"work.employer.name": {$exists:true}} },
                {
                    $project: {
                        _id: "$work.id",
                        employer_id: "$work.employer.id",
                        employer_name: "$work.employer.name",
                        type: "$work.type",
                        year: "$work.year.name",
                        concentration: "$work.concentration",
                    }
                },
            ]).forEach(function(item){
                i++;
                list.push({
                    updateOne: {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true,
                    }
                });
                if(i % 10000 == 0) {
                    db.getCollection('facebook_profile_work_flane').bulkWrite(list);
                    list = [];
                }
            });
            if(list.length) {
                db.getCollection('facebook_profile_work_flane').bulkWrite(list);
            }
            return rs;
        }
    }
)
//function out_facebook_user_work
db.system.js.save(
    {
        _id: "out_facebook_user_work",
        value: function (ids = false) {
            var list = [], i = 0;
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['work'] = { $exists: true };
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, data: "$work.employer.id" } },
            ]).forEach(function(item){
                i++;
                list.push({
                    updateOne: {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true,
                    }
                });
                if(i % 10000 == 0) {
                    db.getCollection('facebook_user_work').bulkWrite(list);
                    list = [];
                }
            });
            if(list.length) {
                db.getCollection('facebook_user_work').bulkWrite(list);
            }
        }
    }
)
//function update_type_facebook_user_work_by_list_ids
db.system.js.save({
    _id: "update_type_facebook_user_work_by_list_ids",
    value: function (ids = []) {
        var l = [];
        for(var id of ids) {
            var type = '';
            var count = db.getCollection('facebook_profile_work_flane').count({ employer_id: id });
            db.getCollection('facebook_profile_work_flane').aggregate([
                { $match: { employer_id: id } },
                {
                    $group: {
                        _id: "$type",
                        sum: { $sum: 1 },
                    }
                },
                {
                    $sort:{sum: -1}
                }
            ]).forEach(function(item){
                if(!type) {type = item._id};
            })
            l.push({
                updateOne: {
                    filter: { _id: id },
                    update: { $set: { type: type, sum: count } }
                }
            });
        }
        db.getCollection('facebook_work').bulkWrite(l);
    }
})
//function update_type_facebook_user_work
db.system.js.save({
    _id: "update_type_facebook_user_work",
    value: function (ids = false) {
        var list = [];
        var i = 0;
        var search = ids && ids.length ? { _id: { $in: ids } } : {};
        search['type'] = { $exists: false };
        db.getCollection('facebook_work').find(search).forEach(function (item) {
            i++;
            list.push(item._id);
            if (i % 10 == 0) {
                update_type_facebook_user_work_by_list_ids(list);
                list = [];
            }
        });
        if(list.length) {
            update_type_facebook_user_work_by_list_ids(list);
            list = [];
        }
    }
})

//function update_list_keyword_facebook_work
db.system.js.save(
    {
        _id: "update_list_keyword_facebook_work",
        value: function (ids = false) {
            var list = [];
            var i = 0, alias1 = '', alias = '';
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['list_keyword'] = { $exists: false };
            db.getCollection('facebook_work').find(search).forEach(function (item) {
                i++;
                if (item && item.name) {
                    alias1 = stripUnicode(item.name);
                    alias = alias1 ? (' ' + alias1 + ' ') : '';
                    list.push({
                        updateOne: {
                            filter: { _id: item._id },
                            update: { $set: { alias: alias, list_keyword: get_list_keyword_by_sentence(alias1) } },
                        }
                    });
                }
                if (i % 1000 == 0) {
                    db.getCollection('facebook_work').bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_work').bulkWrite(list);
            }
        }
    }
)



//function trigger_work_all
db.system.js.save(
    {
        _id: "trigger_work_all",
        value: function (ids = false) {
            if(ids && ids.length) {
                var rs = out_facebook_work(ids);
                out_facebook_profile_work_flane(ids);
                if(rs && rs.length) {
                    update_type_facebook_user_work_by_list_ids(rs);
                    update_list_keyword_facebook_work(rs);
                }
                trigger_work_company_all(ids);
            }
        }
    }
)

/* END work */