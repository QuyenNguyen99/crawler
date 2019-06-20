db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_hometown_location_by_ref",
        value: function (ids = false, status = -1) {
            if (ids) { ids = typeof (ids) == 'object' ? ids : [parseInt(ids)]; }
            if (!ids) {
                db.getCollection('facebook_insight_hometown_location').drop();
                db.getCollection('facebook_insight_hometown_location').createIndex({ status: 1 }, { background: true });
                db.getCollection('facebook_insight_hometown_location').createIndex({ ref_id: 1 }, { background: true });
                db.getCollection('facebook_insight_hometown_location').createIndex({ source_id: 1 }, { background: true });
                db.getCollection('facebook_insight_hometown_location').createIndex({ keyword: 1 }, { background: true });
            }
            var search = { status: status };
            var ids_obj = {};
            var flag_ids = false;
            if (ids) {
                flag_ids = true;
                search['id'] = { $in: ids };
                for (var id of ids) {
                    ids_obj[id] = 1;
                }
            }
            var list_delete = {};
            db.getCollection('ref_city_keyword_mapping').find(Object.assign({ is_delete: 1 }, search)).forEach(function (item) {
                if (!list_delete[item.id]) {
                    list_delete[item.id] = { ref_id: item.id, keyword: { $in: [item.keyword] } };
                } else {
                    list_delete[item.id].keyword['$in'].push(item.keyword);
                }
            })
            for (var key in list_delete) {
                db.getCollection('facebook_insight_hometown_location').update(list_delete[key], { $set: { status: -1, is_delete: 1 } }, { multi: true });
            }
            var list_search_keyword = [];
            db.getCollection('ref_city_keyword_mapping').find(Object.assign({ is_delete: 0 }, search)).forEach(function (item) {
                list_search_keyword.push(item.keyword);
            })

            var list_city_obj = {};
            db.getCollection('ref_city').aggregate([{ $project: { _id: 1, name: 1, alias: 1 } }]).forEach(function (item) {
                item.alias = stripUnicode(item.name);
                list_city_obj[item.alias] = item;
                list_city_obj[item.alias.replace(/ /gi, '')] = item;
                if (item.alias == 'ho chi minh') {
                    list_city_obj['tp ho chi minh'] = list_city_obj['hcm'] = list_city_obj['thcm'] = list_city_obj['tphcm'] = list_city_obj['sai gon'] = list_city_obj['saigon'] = item;
                }
            })

            var list = [];
            var count = 0;
            db.getCollection('facebook_hometown_location').aggregate([
                { $match: { list_keyword: { $in: list_search_keyword } } },
                {
                    $lookup: {
                        from: 'ref_city_keyword_mapping',
                        localField: 'list_keyword',
                        foreignField: 'keyword',
                        as: 'ref',
                    }
                },
                { $match: { ref: { $ne: [] } } },
            ]).forEach(function (item) {
                var obj = {};
                var flag = false;
                var max = 0;
                var item_now = false;
                for (var it of item.ref) {
                    if (!flag_ids || (flag_ids && it.id)) {
                        if (it.is_delete == 0) {
                            if (list_city_obj[it.keyword]) {
                                flag = true;
                                list.push({
                                    _id: item._id + "_" + it.id + "_" + it.keyword,
                                    source_id: item._id,
                                    source_name: item.name,
                                    keyword: it.keyword,
                                    ref_id: it.id,
                                    ref_name: it.name,
                                    status: -1,
                                    is_delete: 0,
                                });
                                break;
                            } else {
                                var keyword = stripUnicode(it.keyword);
                                if (!obj[keyword]) {
                                    obj[keyword] = {
                                        item: {
                                            _id: item._id + "_" + it.id + "_" + keyword,
                                            source_id: item._id,
                                            source_name: item.name,
                                            keyword: keyword,
                                            ref_id: it.id,
                                            ref_name: it.name,
                                            status: -1,
                                            is_delete: 0,
                                        },
                                        count: 0
                                    };
                                }
                                obj[keyword].count++;
                                if (max < obj[keyword].count) {
                                    item_now = obj[keyword].item;
                                    max = obj[keyword].count;
                                }
                            }
                        }
                    }
                }
                if (!flag) {
                    var m = 0;
                    for (var k in obj) {
                        if (obj[k].count == max) {
                            m++;
                        }
                    }
                    if (m == 1) {
                        list.push(item_now);
                    }
                }

                if (list.length == 10000) {
                    insert_data_ignore(list, 'facebook_insight_hometown_location');
                    count += list.length;
                    list = [];
                }
            })


            if (list) {
                insert_data_ignore(list, 'facebook_insight_hometown_location');
                count += list.length;
            }
            return count;
        }
    }
);