// function get_insight_ref_college
db.system.js.save({
    _id: "get_insight_ref_college",
    value: function (ids = false) {
        var rs = [];
        var search = ids && ids.length ? { _id: { $in: ids } } : {};
        db.getCollection('ref_college').find(search).sort({ length: -1 }).forEach(function (item) {
            var list_search_default_obj = {};
            for (var it of item.list_search_default) {
                list_search_default_obj[it] = it;
            }
            var list_search_full_obj = {};
            var list_search_full = [];
            if (item.list_search_full) {
                for (var it of item.list_search_full) {
                    list_search_full_obj[it] = it;
                    list_search_full.push(' ' + it + ' ');
                }
            }
            rs.push({
                _id: item._id,
                name: item.name,
                city_id: item.city_id,
                city_name: item.city_name,
                list_search_default: item.list_search_default,
                list_search_full: list_search_full,
                list_search_default_obj: list_search_default_obj,
                list_search_full_obj: list_search_full_obj,
            });
        });
        return rs;
    }
})


// function get_ref_insight_college_for_one_keyword
db.system.js.save(
    {
        _id: "get_ref_insight_college_for_one_keyword",
        value: function () {

            ref_insight_college_for_one_keyword_cache_list_search_other = {};
            ref_insight_college_for_one_keyword_cache_list_search_one_keyword = {};
            ref_insight_college_for_one_keyword_cache_list_search_full = {};
            ref_insight_college_for_one_keyword_cache_list_search_once = {};
            ref_insight_college_for_one_keyword_cache_list_search = {};
            var re_value_list_search = {};
            var re_value_list_search_once = {};
            db.getCollection('ref_college').aggregate([{ $project: { _id: 1, name: 1, alias: 1, list_name: 1, list_search: 1, list_search_one_keyword: 1, list_search_once: 1, list_search_other: 1, list_search_full: 1 } }]).forEach(function (item) {
                var list_search = item.list_search;

                var list_search_one_keyword = item.list_search_one_keyword;
                var list_search_once = item.list_search_once;
                var list_search_other = item.list_search_other || [];
                var list_search_full = item.list_search_full || [];

                for (var value of list_search_other) {
                    if (!ref_insight_college_for_one_keyword_cache_list_search_other[value]) {
                        ref_insight_college_for_one_keyword_cache_list_search_other[value] = {};
                    }
                    ref_insight_college_for_one_keyword_cache_list_search_other[value][item._id] = item;
                }
                for (var value of list_search_one_keyword) {
                    if (!ref_insight_college_for_one_keyword_cache_list_search_one_keyword[value]) {
                        ref_insight_college_for_one_keyword_cache_list_search_one_keyword[value] = {};
                    }
                    ref_insight_college_for_one_keyword_cache_list_search_one_keyword[value][item._id] = item;
                }
                for (var value of list_search_full) {
                    if (!ref_insight_college_for_one_keyword_cache_list_search_full[value]) {
                        ref_insight_college_for_one_keyword_cache_list_search_full[value] = {};
                    }
                    ref_insight_college_for_one_keyword_cache_list_search_full[value][item._id] = item;
                }
                for (var value of list_search_once) {
                    for (var a_value of value) {
                        for (var v_value of a_value) {
                            if (!ref_insight_college_for_one_keyword_cache_list_search_once[v_value]) {
                                ref_insight_college_for_one_keyword_cache_list_search_once[v_value] = {};
                            }
                            re_value_list_search_once[v_value.replace(/ /gi, '  ')] = v_value;
                            ref_insight_college_for_one_keyword_cache_list_search_once[v_value][item._id] = item;
                        }
                    }
                }
                for (var value of list_search) {
                    for (var v_value of value) {
                        if (!ref_insight_college_for_one_keyword_cache_list_search[v_value]) {
                            ref_insight_college_for_one_keyword_cache_list_search[v_value] = {};
                        }
                        re_value_list_search[v_value.replace(/ /gi, '  ')] = v_value;
                        ref_insight_college_for_one_keyword_cache_list_search[v_value][item._id] = item;
                    }
                }
            })

            var value_list_search = Object.keys(re_value_list_search);
            var value_list_search_once = Object.keys(re_value_list_search_once);
            var value_list_search_other = Object.keys(ref_insight_college_for_one_keyword_cache_list_search_other);
            var value_list_search_one_keyword = Object.keys(ref_insight_college_for_one_keyword_cache_list_search_one_keyword);

            value_list_search.sort(function (item1, item2) { return item2.length - item1.length; })
            value_list_search_once.sort(function (item1, item2) { return item2.length - item1.length; })
            value_list_search_other.sort(function (item1, item2) { return item2.length - item1.length; })
            value_list_search_one_keyword.sort(function (item1, item2) { return item2.length - item1.length; })

            ref_insight_college_for_one_keyword_cache_re_list_search_other = new RegExp(' ' + value_list_search_other.join(' | ') + ' ', 'gi');
            ref_insight_college_for_one_keyword_cache_re_list_search_one_keyword = new RegExp(' ' + value_list_search_one_keyword.join(' | ') + ' ', 'gi');
            ref_insight_college_for_one_keyword_cache_re_list_search_once = new RegExp(' ' + value_list_search_once.join(' | ') + ' ', 'gi');
            ref_insight_college_for_one_keyword_cache_re_list_search = new RegExp(' ' + value_list_search.join(' | ') + ' ', 'gi');
        }
    }
)



db.system.js.save({
    _id: "build_ref_common_college",
    value: function() {
        list_keyword_college = ['dai hoc', 'daihoc', 'dh', 'cao dang', 'cao dang', 'cd', 'hoc vien', 'hocvien', 'hv', 'trung cap', 'trungcap'];
        var a = 'abcdefghijklmnopqrstuvxy'.split('');
        var l = a.length;
        for(var i = 1; i < 80;i++) {
            list_keyword_college.push('k' + i);
            list_keyword_college.push('k ' + i);
            for(var j = 0; j < l;j++) {
                list_keyword_college.push('k' + i + a[j]);
                list_keyword_college.push('k ' + i + a[j]);
                for(var k = 0; k < 6;k++) {
                    list_keyword_college.push('k' + i + a[j] + a[k]);
                }
            }
        }
        
        db.getCollection('ref_common').bulkWrite([{
            updateOne:  {
                filter  : {_id: 12},
                update  : {$set:{_id:12,type:"college",keyword: list_keyword_college}},
                upsert  : true
            }
        }])
    }
})