db.system.js.save(
    {
        _id: "bulk_write_facebook_child_school",
        value: function (type = 'education', collection_type = 'school_1', search_and = {}, status = -1) {
            var collection_name = "facebook_" + type + "_" + collection_type;
            var search = {
                list_keyword_tu_dien: { $in: db.getCollection('ref_common').find({ type: collection_type })[0].keyword },
            };
            Object.assign(search,search_and);
            if(status != -2) {
                search['status'] = status;
            }
            var list = [];
            db.getCollection('facebook_' + type).aggregate([
                {$match:search},
                {$lookup:{
                    from        : collection_name,
                    localField  : "_id",
                    foreignField: "_id",
                    as          : collection_name,
                }},
                {$match:{facebook_education_school_1:[]}}
            ]).forEach(function (item) {
                if(typeof(global_tu_dien_word_one_instance) == 'undefined' && type == 'group') {
                    build_facebook_education_list_keyword_tu_dien();
                }
                item.list_keyword_tu_dien = global_tu_dien_get_list_array_sentence(item.alias);
                item.status = -1;
                delete item[collection_name];
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection(collection_name).insertMany(list);
                    list = [];
                }
            })
            if (list.length) {
                    db.getCollection(collection_name).insertMany(list);
            }
        }
    }
)