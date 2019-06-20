db.system.js.save(
    {
        _id: "bulk_write_ref_school_common_keyword_mapping",
        value: function (type = 'school_1', _id = false) {
            var collection_name = 'ref_' + type;
            var collection_name_mapping = 'ref_' + type + '_keyword_mapping';
            if (!_id) {
                var list = [];
                db.getCollection(collection_name).find().forEach(function (item) {
                    if (item.list_keyword && item.list_keyword.length) {
                        var l_obj = {};
                        for (var it of item.list_keyword) {
                            if (it) {
                                it = pretty_str_new(it.toLowerCase().trim());
                                _id = item._id + "_" + it;
                                if(!l_obj[_id]) {
                                    l_obj[_id] = 1;
                                    list.push({
                                        _id: _id,
                                        id: item._id,
                                        name: item.name,
                                        city_id: item.city_id,
                                        city_name: item.city_name,
                                        keyword: it,
                                        status: -1,
                                        is_delete: 0
                                    });
                                }
                            }
                        }Z
                    }
                })
                db.getCollection(collection_name_mapping).drop();
                db.getCollection(collection_name_mapping).insertMany(list);
                db.getCollection(collection_name_mapping).createIndex({ id: 1 }, { background: true });
                db.getCollection(collection_name_mapping).createIndex({ city_id: 1 }, { background: true });
                db.getCollection(collection_name_mapping).createIndex({ keyword: 1 }, { background: true });
                db.getCollection(collection_name_mapping).createIndex({ status: 1 }, { background: true });
                db.getCollection(collection_name_mapping).createIndex({ is_delete: 1 }, { background: true });
            } else {
                var list_ids = typeof (_id) == 'object' ? _id : [_id];
                var list = [], list_delete = [], list_delete_all = [];
                db.getCollection(collection_name).find({ _id: { $in: list_ids } }).forEach(function (item) {
                    if (item.is_delete != 1) {
                        if (item.list_keyword && item.list_keyword.length) {
                            var l = [];
                            var l_obj = {};
                            for (var it of item.list_keyword) {
                                if (it) {
                                    it = pretty_str_new(it.toLowerCase().trim());
                                    _id = item._id + "_" + it;
                                    if(!l_obj[_id]) {
                                        l_obj[_id] = 1;
                                        l.push(it);
                                        list.push({
                                            _id: _id,
                                            id: item._id,
                                            name: item.name,
                                            city_id: item.city_id,
                                            city_name: item.city_name,
                                            keyword: it,
                                            status: -1,
                                            is_delete: 0
                                        });
                                    }
                                }
                            }
                            list_delete.push({ id: item._id, keyword: { $nin: l } });
                        } else {
                            list_delete_all.push(item._id);
                        }
                    } else {
                        list_delete_all.push(item._id);
                    }
                })
                if (list.length) {
                    db.getCollection(collection_name_mapping).remove({ is_delete: 1 });
                    insert_data_ignore_not_update(list, collection_name_mapping);
                    for (var item of list_delete) {
                        db.getCollection(collection_name_mapping).update(item, { $set: { status: -1, is_delete: 1 } }, { multi: true });
                    }
                }
                if (list_delete_all.length) {
                    db.getCollection(collection_name_mapping).update({ id: { $in: list_delete_all } }, { $set: { status: -1, is_delete: 1 } }, { multi: true });
                }
            }
        }
    }
);



db.system.js.save(
    {
        _id: "bulk_write_ref_other_common_keyword_mapping",
        value: function (type = 'regilion', _id = false, field = 'keyword_search',collection_name_mapping = false) {
            var collection_name = 'ref_' + type;
            var collection_name_mapping = collection_name_mapping ? collection_name_mapping : ('ref_' + type + '_keyword_mapping');
            var search = {};
            if (_id) {
                search['_id'] = { $in: typeof (_id) == 'object' ? _id : [_id] };
                db.getCollection(collection_name_mapping).remove({ is_delete: 1 });
            } else {
                db.getCollection(collection_name_mapping).drop();
                db.getCollection(collection_name_mapping).createIndex({ id: 1 });
                db.getCollection(collection_name_mapping).createIndex({ keyword: 1 });
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
                                it = pretty_str_new(it.toLowerCase().trim());
                                _id = item._id + "_" + it;
                                if(!l_obj[_id]) {
                                    l_obj[_id] = 1;
                                    l.push(it);
                                    list.push({
                                        _id: _id,
                                        id: item._id,
                                        name: item.name,
                                        keyword: it,
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
                    } else {
                        list_delete_all.push(item._id);
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


db.system.js.save(
    {
        _id: "bulk_write_ref_common_delete_keyword_mapping",
        value: function (type = 'school_1', _id = false) {
            var collection_name_mapping = 'ref_' + type + '_keyword_mapping';
            var search = {};
            if (_id) {
                var list_ids = typeof (_id) == 'object' ? _id : [_id];
                search['_id'] = { $in: list_ids };
            }
            db.getCollection(collection_name_mapping).update({ id: { $in: list_ids } }, { $set: { is_delete: 1 } }, { multi: true });
        }
    }
);