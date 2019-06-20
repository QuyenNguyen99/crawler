db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_common",
        value: function (type = 'company', _id = false, field = 'list_facebook_group_id',collection_name_mapping = 'facebook_insight_group_company') {
            var collection_name = 'ref_' + type;
            var search = {};
            if (_id) {
                search['_id'] = { $in: typeof (_id) == 'object' ? _id : [_id] };
                db.getCollection(collection_name_mapping).remove({ is_delete: 1 });
            } else {
                db.getCollection(collection_name_mapping).drop();
                db.getCollection(collection_name_mapping).createIndex({ id: 1 });
                db.getCollection(collection_name_mapping).createIndex({ status: 1 }, { background: true });
                db.getCollection(collection_name_mapping).createIndex({ is_delete: 1 }, { background: true });
            }
            var list = [], list_delete = [], list_delete_all = [];
            db.getCollection(collection_name).find(search).forEach(function (item) {
                if (item.is_delete != 1) {
                    if (item[field] && item[field].length) {
                        var l = [];
                        var l_obj = {};
                        for (var it of item[field]) {
                            if (it) {
                                _id = item._id + "_" + it;
                                if(!l_obj[_id]) {
                                    l_obj[_id] = [];
                                    l.push(it);
                                    list.push({
                                        _id: _id,
                                        ref_id: item._id,
                                        ref_name: item.name,
                                        source_id: it,
                                        status: -1,
                                        is_delete: 0
                                    });
                                }
                            }
                        }
                        list_delete.push({ id: item._id, keyword: { $nin: l } });
                        if(list.length >= 10000) {
                            insert_data_ignore_not_update(list, collection_name_mapping);
                            list = [];
                        }
                        if(list_delete.length >= 100) {
                            for (var item_delete of list_delete) {
                                db.getCollection(collection_name_mapping).update(item_delete, { $set: { status: -1, is_delete: 1 } }, { multi: true });
                            }
                            list_delete = [];
                        }
                    }
                } else {
                    list_delete_all.push(item._id);
                }
            })
            if (list_delete_all.length) {
                db.getCollection(collection_name_mapping).update({ id: { $in: list_delete_all } }, { $set: { status: -1, is_delete: 1 } }, { multi: true });
            }
            for (var item of list_delete) {
                db.getCollection(collection_name_mapping).update(item, { $set: { status: -1, is_delete: 1 } }, { multi: true });
            }
            if(list.length) {
                insert_data_ignore_not_update(list, collection_name_mapping);
            }
        }
    }
);