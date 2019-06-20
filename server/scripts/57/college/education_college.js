
db.system.js.save(
    {
        _id: "out_facebook_education_college",
        value: function (ids = false) {
            var search = {
                $or: [
                    { list_keyword: { $in: db.getCollection('ref_common').find({ type: "college" })[0].keyword } },
                    { type: { $in: ['College', 'Graduate School'] } }
                ]
            };
            if (ids && ids.length) {
                search['_id'] = { $in: ids };
            }
            var list = [], i = 0, rs = [];
            db.getCollection('facebook_education').find(search).forEach(function (item) {
                i++;
                list.push(item);
                if (i % 10000 == 0) {
                    if (!ids || !ids.length) {
                        insert_data_ignore_not_update(list, 'facebook_education_college');
                    } else {
                        rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_education_college'));
                    }
                    list = [];
                }
            })
            if (list.length) {
                if (!ids || !ids.length) {
                    insert_data_ignore_not_update(list, 'facebook_education_college');
                } else {
                    rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_education_college'));
                }
            }
            return rs;
        }
    }
)


// function delete_insight_facebook_education_college
db.system.js.save({
    _id: "delete_insight_facebook_education_college",
    value: function (college_id, education_ids = false) {
        var search_insight_user_delete = { college_id: college_id };
        var search_insight_education_delete = { college_id: college_id };
        if (education_ids && education_ids.length) {
            search_insight_user_delete['education_id'] = { $in: education_ids };
            search_insight_education_delete['_id'] = { $in: education_ids };
        }
        db.getCollection('facebook_insight_education_college').remove(search_insight_education_delete);
        var list_ids_obj = {};
        db.getCollection('user_insight_education_college').find(search_insight_user_delete).forEach(function(item){
            list_ids_obj[item.facebook_id] = 1;
        })
        var list_ids = Object.keys(list_ids_obj);
        if(list_ids && list_ids.length) {
            db.getCollection('user_insight_education_college').remove(search_insight_user_delete);
            db.getCollection('user_college').remove({_id: {$in: list_ids},data:{$size:1}});
            out_user_college_by_ids(list_ids);
        }
    }
})



// function insight_facebook_education_college
db.system.js.save({
    _id: "insight_facebook_education_college",
    value: function (college_ids = false, education_ids = false) {
        var rs_ref_college = get_insight_ref_college(college_ids);
        var search = {};
        for (var item of rs_ref_college) {
            search = {
                $or: [
                    { list_keyword: { $in: item.list_search_default } }
                ]
            };
            if (item.list_search_full && item.list_search_full.length) {
                search['$or'].push({ alias: { $in: item.list_search_full } });
            }
            var list_bulk_write_facebook_education_college = [];
            var list_bulk_write_facebook_insight_education_college = [];
            var search_delete = { college_id: item._id };

            if (education_ids && education_ids.length) {
                search['_id'] = { $in: education_ids };
                search_delete['_id'] = { $in: education_ids };
            }
            db.getCollection('facebook_education_college').update(search, { $unset: { college_id: 0, college_name: 0, college_city_id: 0, college_city_name: 0 } }, { multi: true });
            var list_id_delete_obj = {};
            
            db.getCollection('facebook_insight_education_college').find(search_delete).forEach(function(it_delete){
                list_id_delete_obj[it_delete._id] = 1;
            })
            

            db.getCollection('facebook_education_college').find(search).forEach(function (it) {
                delete list_id_delete_obj[it._id];
                if (!it.college_name || (it.college_name.length < item.name.length && item.name.toLowerCase().indexOf(it.college_name.toLowerCase()) >= 0)) {
                    list_bulk_write_facebook_insight_education_college.push({
                        updateOne: {
                            filter: { _id: it._id },
                            update: {
                                _id: it._id,
                                name: it.name,
                                sum: it.sum,
                                alias: it.alias,
                                list_keyword: it.list_keyword,
                                college_city_id: item.city_id,
                                college_city_name: item.city_name,
                                college_id: item._id,
                                college_name: item.name
                            },
                            upsert: true,
                        }
                    })
                    it['college_city_id'] = item.city_id;
                    it['college_city_name'] = item.city_name;
                    it['college_id'] = item._id;
                    it['college_name'] = item.name;
                    list_bulk_write_facebook_education_college.push({
                        updateOne: {
                            filter: { _id: it._id },
                            update: it,
                            upsert: true,
                        }
                    })
                }
            })
            db.getCollection('facebook_education_college').bulkWrite(list_bulk_write_facebook_education_college);
            db.getCollection('facebook_insight_education_college').bulkWrite(list_bulk_write_facebook_insight_education_college);
            var list_id_delete = Object.keys(list_id_delete_obj);
            if(list_id_delete && list_id_delete.length) {
                delete_insight_facebook_education_college(item._id,list_id_delete);
            }
        }
        return rs;
    }
})


// function insight_facebook_education_college_by_education_ids
db.system.js.save({
    _id: "insight_facebook_education_college_by_education_ids",
    value: function (education_ids) {
        var list_bulk_write_facebook_education_college = [], list_bulk_write_facebook_insight_education_college = [];
        db.getCollection('facebook_education_college').aggregate([{ $match: { _id: { $in: education_ids } } }]).forEach(function (item) {
            var obj_rs = insight_college_by_alias(item.alias);
            if (obj_rs && Object.keys(obj_rs).length == 1) {
                var obj = get_obj_first_in_object(obj_rs);
                item['college_id'] = obj._id;
                item['college_name'] = obj.name;
                item['college_city_id'] = obj.city_id;
                item['college_city_name'] = obj.city_name;
                list_bulk_write_facebook_education_college.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: item,
                        upsert: true
                    }
                })
                list_bulk_write_facebook_insight_education_college.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            _id: item._id,
                            name: item.name,
                            sum: item.sum,
                            list_keyword: item.list_keyword,
                            college_city_id: obj.city_id,
                            college_city_name: obj.city_name,
                            college_id: obj._id,
                            college_name: obj.name
                        },
                        upsert: true
                    }
                })
            }
        })
        if (list_bulk_write_facebook_education_college.length) {
            db.getCollection('facebook_education_college').bulkWrite(list_bulk_write_facebook_education_college);
        }
        if (list_bulk_write_facebook_insight_education_college.length) {
            db.getCollection('facebook_insight_education_college').bulkWrite(list_bulk_write_facebook_insight_education_college);
        }
    }
})
// function out_user_insight_education_college
db.system.js.save({
    _id: "out_user_insight_education_college",
    value: function (education_ids = false, facebook_ids = false) {
        var search = education_ids && education_ids.length ? { _id: { $in: education_ids } } : {};
        var list_ids = [];
        var list_ids_obj = {};
        db.getCollection('facebook_insight_education_college').aggregate([
            { $match: search },
            { $project: { _id: 1, name: 1, college_id: 1, college_name: 1, college_city_id: 1, college_city_name: 1 } }
        ]).forEach(function (item) {
            list_ids.push(item._id);
            list_ids_obj[item._id] = item;
        });
        for (var education_id of list_ids) {
            var search_user_education = { data: education_id };
            if (facebook_ids && facebook_ids.length) {
                search_user_education['_id'] = { $in: facebook_ids };
            }
            var list = [], i = 0;
            var list_user_college = [];
            db.getCollection('facebook_user_education').aggregate([
                { $match: search_user_education },
                { $project: { _id: 1 } }
            ]).forEach(function (item) {
                i++;
                _id = education_id + '_' + item._id;
                list.push({
                    updateOne: {
                        filter: { _id: _id },
                        update: {
                            _id: _id,
                            education_id: education_id,
                            facebook_id: item._id,
                            education_name: list_ids_obj[education_id].name,
                            college_id: list_ids_obj[education_id].college_id,
                            college_name: list_ids_obj[education_id].college_name,
                            college_city_id: list_ids_obj[education_id].college_city_id,
                            college_city_name: list_ids_obj[education_id].college_city_name,
                        },
                        upsert: true,
                    }
                });
                list_user_college.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: { $set: { _id: item._id } },
                        upsert: true,

                    }
                });
                if (i % 10000 == 0) {
                    db.getCollection('user_insight_education_college').bulkWrite(list);
                    db.getCollection('user_college').bulkWrite(list_user_college);
                    list = [];
                    list_user_college = [];
                }
            })
            if (list.length) {
                db.getCollection('user_insight_education_college').bulkWrite(list);
                db.getCollection('user_college').bulkWrite(list_user_college);
            }
        }
    }
})