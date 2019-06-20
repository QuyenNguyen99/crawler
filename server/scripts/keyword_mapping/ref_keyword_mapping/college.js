db.system.js.save(
    {
        _id: "bulk_write_ref_college_keyword_mapping",
        value: function (_id = false) {
            if (!_id) {
                var list_ids = false;
                db.getCollection('ref_college_keyword_mapping').drop();
                db.getCollection('ref_college').aggregate([
                    { $unwind: "$list_search_default" },
                    {
                        $addFields: {
                            _id2: { $toString: "$_id" }
                        }
                    },
                    { $group: { _id: "$list_search_default", name: { $first: "$name" }, city_id: { $first: "$city_id" }, city_name: { $first: "$city_name" }, _id2: { $first: "$_id2" }, id1: { $first: "$_id" } } },
                    { $project: { _id: { $concat: ["$_id2", "_", "$_id"] }, name: 1, city_id: 1, city_name: 1, id: "$id1", keyword: "$_id", type: "search", status: { $literal: -1 }, is_delete: { $literal: 0 } } },
                    { $out: "ref_college_keyword_mapping" },
                ], { allowDiskUse: true })
                db.getCollection('ref_college_keyword_mapping').remove({ keyword: /^\^/gi });
                db.getCollection('ref_college_keyword_mapping').createIndex({ id: 1 });
                db.getCollection('ref_college_keyword_mapping').createIndex({ city_id: 1 });
                db.getCollection('ref_college_keyword_mapping').createIndex({ keyword: 1 });

            } else {
                var list_ids = typeof (_id) == 'object' ? _id : [parseInt(_id)];
                var list = [];
                db.getCollection('ref_college').aggregate([
                    { $match: { _id: { $in: list_ids } } },
                    { $unwind: "$list_search_default" },
                    {
                        $addFields: {
                            _id2: { $toString: "$_id" }
                        }
                    },
                    { $group: { _id: "$list_search_default", name: { $first: "$name" }, city_id: { $first: "$city_id" }, city_name: { $first: "$city_name" }, _id2: { $first: "$_id2" }, id1: { $first: "$_id" } } },
                    { $project: { _id: { $concat: ["$_id2", "_", "$_id"] }, name: 1, city_id: 1, city_name: 1, id: "$id1", keyword: "$_id", type: "search", status: { $literal: -1 }, is_delete: { $literal: 0 } } },
                ]).forEach(function (item) {
                    list.push(item);
                })
                insert_data_ignore_not_update(list, 'ref_college_keyword_mapping');

                var list_delete = [];
                db.getCollection('ref_college').find({ _id: { $in: list_ids }}).forEach(function (item) {
                    if (item.list_search_default && item.list_search_default.length) {
                        list_delete.push({
                            id: item._id,
                            type: "search",
                            keyword: { $nin: item.list_search_default },
                        });
                    }
                });
                for (var it of list_delete) {
                    db.getCollection('ref_college_keyword_mapping').update(it, { $set: { status: -1, is_delete: 1 } }, { multi: true });
                }
            }


            var list = [];
            var search = {};
            if (list_ids && list_ids.length) {
                search['_id'] = { $in: list_ids };
            }
            db.getCollection('ref_college').aggregate([
                { $match: search },
                { $unwind: "$list_search_full" },
                {
                    $addFields: {
                        _id2: { $toString: "$_id" }
                    }
                },
                { $group: { _id: "$list_search_full", name: { $first: "$name" }, city_id: { $first: "$city_id" }, city_name: { $first: "$city_name" }, _id2: { $first: "$_id2" }, id1: { $first: "$_id" } } },
                { $project: { _id: { $concat: ["$_id2", "_", "$_id"] }, name: 1, city_id: 1, city_name: 1, id: "$id1", keyword: "$_id", type: "search_full", status: { $literal: -1 }, is_delete: { $literal: 0 } } },
            ]).forEach(function (item) {
                list.push(item);
            })
            insert_data_ignore_not_update(list, 'ref_college_keyword_mapping');

            var list_delete = [];
            db.getCollection('ref_college').find(search).forEach(function (item) {
                if (item.list_search_full && item.list_search_full.length) {
                    list_delete.push({
                        id: item._id,
                        type: "search_full",
                        keyword: { $nin: item.list_search_full },
                    });
                }
            });
            for (var it of list_delete) {
                db.getCollection('ref_college_keyword_mapping').update(it, { $set: { status: -1, is_delete: 1 } }, { multi: true });
            }

        }
    }
);






