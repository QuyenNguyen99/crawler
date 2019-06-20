
/* BEGIN hometown location */
/*
Cần có các hàm sau
out_facebook_hometown_location(facebook_ids = false)
out_facebook_user_hometown(ids = false)
out_facebook_user_location(ids = false)
insight_facebook_hometown_and_location(ids = false)
*/
//function out_facebook_hometown_location
db.system.js.save(
    {
        _id: "out_facebook_hometown_location",
        value: function (facebook_ids = false) {
            var search = facebook_ids && facebook_ids.length ? { _id: { $in: facebook_ids } } : {};
            search['$or'] = [
                { hometown: { $exists: true } },
                { location: { $exists: true } },
            ];
            var list = [], i = 0, ids_obj = {}, rs = [];
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, hometown: 1, location: 1 } }
            ]).forEach(function (item) {
                if (item.hometown && item.hometown.id && ids_obj[item.hometown.id]) {
                    list.push({
                        _id: item.hometown.id,
                        name: item.hometown.name,
                        list_keyword: get_list_keyword_by_hometown_location_name(item.hometown.name),
                    });
                    ids_obj[item.hometown.id] = 1;
                    i++;
                }
                if (item.location && item.location.id && ids_obj[item.location.id]) {
                    list.push({
                        _id: item.location.id,
                        name: item.location.name,
                        list_keyword: get_list_keyword_by_hometown_location_name(item.location.name),
                    });
                    ids_obj[item.location.id] = 1;
                    i++;
                }
                if (i % 10000 == 0) {
                    rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_hometown_location'));
                    list = [];
                }
            })
            if (list.length) {
                rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_hometown_location'));
            }
            return rs;
        }
    }
)
//function out_facebook_user_hometown
db.system.js.save(
    {
        _id: "out_facebook_user_hometown",
        value: function (ids = false) {
            var search = { hometown: { $exists: true }, "hometown.id": { $exists: true } };
            if (ids && ids.length) {
                search['_id'] = { $in: ids };
            }
            var list = [], i = 0;
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, hometown: "$hometown.id" } },
            ]).forEach(function (item) {
                i++;
                list.push(item);
                if (i % 10000 == 0) {
                    insert_data_ignore_not_update(list, 'facebook_user_hometown');
                    list = [];
                }
            })
            if (list.length) {
                insert_data_ignore_not_update(list, 'facebook_user_hometown');
            }
        }
    }
)
//function out_facebook_user_hometown
db.system.js.save(
    {
        _id: "out_facebook_user_location",
        value: function (ids = false) {
            var search = { location: { $exists: true }, "location.id": { $exists: true } };
            if (ids && ids.length) {
                search['_id'] = { $in: ids };
            }
            var list = [], i = 0;
            db.getCollection('facebook_profile').aggregate([
                { $match: search },
                { $project: { _id: 1, location: "$location.id" } },
            ]).forEach(function (item) {
                i++;
                list.push(item);
                if (i % 10000 == 0) {
                    insert_data_ignore_not_update(list, 'facebook_user_location');
                    list = [];
                }
            })
            if (list.length) {
                insert_data_ignore_not_update(list, 'facebook_user_location');
            }
        }
    }
)
//function insight_facebook_hometown_and_location
db.system.js.save({
    _id: "insight_facebook_hometown_and_location",
    value: function (ids = false) {
        var search = {   };
        if (ids && ids.length) {
            search['_id'] = { $in: ids };
        }
        var rs = [];
        var l = [];
        db.getCollection("facebook_hometown_location").aggregate([
            {$match:search},
            {$lookup:{
                    from        : 'ref_city',
                    localField  : 'list_keyword',
                    foreignField: 'list_keyword_mapping',
                    as          : 'ref_city',
            }},
            {$match:{ref_city:{$ne:[]}}},
            {$project:{_id:1,name:1,city_id:{$arrayElemAt:["$ref_city._id",0]},city_name:{$arrayElemAt:["$ref_city.name",0]}}}
        ]).forEach(function (item) {
            l.push(item);
        })
        rs = rs.concat(insert_data_ignore_not_update(l, 'facebook_insight_hometown_location'));
        return rs;
    }
})




// function get_ref_city_county_insight
db.system.js.save({
    _id: "get_ref_city_county_insight",
    value: function () {
        var list_item_obj = {};
        var ids = [];
        db.getCollection('ref_city_county').find({ pid: 0 }).forEach(function (item) {
            ids.push(item._id);
            list_item_obj[item._id] = {
                _id: item._id,
                name: item.name,
                list_keyword: array_to_object(item.list_keyword),
            };
        })
        db.getCollection('ref_city_county').find({ pid: { $in: ids } }).forEach(function (item) {
            if (list_item_obj[item.pid]) {
                Object.assign(list_item_obj[item.pid].list_keyword, array_to_object(item.list_keyword));
            }
        })
        return list_item_obj;
    }
});

// function hometown_location_trigger_profile_all
db.system.js.save({
    _id: "hometown_location_trigger_all",
    value: function (facebook_ids) {
        if (facebook_ids && facebook_ids.length) {
            var hometown_location_ids = out_facebook_hometown_location(facebook_ids);
            var hometown_location_ids_insight = hometown_location_ids && hometown_location_ids.length ? insight_facebook_hometown_and_location(hometown_location_ids) : false;
            out_facebook_user_hometown(facebook_ids);
            out_facebook_user_location(facebook_ids);

            out_user_location(hometown_location_ids_insight, facebook_ids);
            out_user_insight_hometown(hometown_location_ids_insight, facebook_ids);
        }
    }
})
/* END hometown location */