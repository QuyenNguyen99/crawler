
// function out_user_college_by_ids
db.system.js.save({
    _id: "out_user_college_by_ids",
    value: function (facebook_ids) {
        var list_obj = {};
        db.getCollection("user_insight_education_college").find({ facebook_id: { $in: facebook_ids } }).forEach(function (item) {
            if (!list_obj[item.facebook_id]) {
                list_obj[item.facebook_id] = {};
            }
            if (!list_obj[item.facebook_id][item.college_id]) {
                list_obj[item.facebook_id][item.college_id] = {
                    education: [{
                        education_id: item.education_id,
                        education_name: item.education_name,
                    }],
                    college_id: item.college_id,
                    college_name: item.college_name,
                    college_city_id: item.college_city_id,
                    college_city_name: item.college_city_name,
                };
            } else {
                list_obj[item.facebook_id][item.college_id].education.push({
                    education_id: item.education_id,
                    education_name: item.education_name,
                });
            }
        })
        var list_group_obj = {};
        db.getCollection("user_insight_group_college").find({ facebook_id: { $in: facebook_ids } }).forEach(function (item) {
            if (!list_obj[item.facebook_id]) {
                if (!list_group_obj[item.facebook_id]) {
                    list_group_obj[item.facebook_id] = {};
                }
                if (!list_group_obj[item.facebook_id][item.college_id]) {
                    list_group_obj[item.facebook_id][item.college_id] = {
                        college_id: item.college_id,
                        college_name: item.college_name,
                        college_city_id: item.college_city_id,
                        college_city_name: item.college_city_name,
                        sum: 1,
                        groups: [
                            {
                                group_id: item.group_id,
                                group_name: item.group_name,
                            }
                        ]
                    };
                } else {
                    list_group_obj[item.facebook_id][item.college_id].sum++;
                    list_group_obj[item.facebook_id][item.college_id].groups.push({
                        group_id: item.group_id,
                        group_name: item.group_name,
                    });
                }
            }
        })
        var list_bulk_write = [];
        for (var facebook_id in list_obj) {
            list_bulk_write.push({
                updateOne: {
                    filter: { _id: facebook_id },
                    update: {
                        _id: facebook_id,
                        data: get_value_object(list_obj[facebook_id]),
                    },
                    upsert: true,
                }
            });
        }

        for (var facebook_id in list_group_obj) {
            var sum = 0;
            var dt = false;
            for (var college_id in list_group_obj[facebook_id]) {
                if (sum < list_group_obj[facebook_id][college_id].sum) {
                    sum = list_group_obj[facebook_id][college_id].sum;
                    dt = list_group_obj[facebook_id][college_id];
                }
            }
            list_bulk_write.push({
                updateOne: {
                    filter: { _id: facebook_id },
                    update: {
                        _id: facebook_id,
                        data: [dt],
                        infer: list_group_obj[facebook_id]
                    },
                }
            });
        }

        db.getCollection("user_college").bulkWrite(list_bulk_write);

    }
})


// function out_user_college
db.system.js.save({
    _id: "out_user_college",
    value: function (facebook_ids = false) {
        var search = facebook_ids && facebook_ids.length ? {_id: { $in: facebook_ids }} : {};
        var list_ids = [], i = 0;
        db.getCollection("user_college").find(search).forEach(function (item) {
            i++;
            list_ids.push(item._id);
            if (i % 10000 == 0) {
                out_user_college_by_ids(list_ids);
                list_ids = [];
            }
        })
        if (list_ids.length) {
            out_user_college_by_ids(list_ids);
            list_ids = [];
        }
    }
})




// function insight_college_by_alias
db.system.js.save(
    {
        _id: "insight_college_by_alias",
        value: function (alias = '') {
            if (typeof (ref_insight_college_for_one_keyword_cache_list_search) == 'undefined') {
                get_ref_insight_college_for_one_keyword();
            }
            alias = alias.trim();
            if (alias) {
                if (ref_insight_college_for_one_keyword_cache_list_search_full[alias]) {
                    return ref_insight_college_for_one_keyword_cache_list_search_full[alias];
                }
                alias = ' ' + alias.replace(/ /gi, '  ') + ' ';
                var v = alias.match(ref_insight_college_for_one_keyword_cache_re_list_search_one_keyword);
                if (v) {
                    return ref_insight_college_for_one_keyword_cache_list_search_one_keyword[v[0]];
                }
                var v = alias.match(ref_insight_college_for_one_keyword_cache_re_list_search_other);
                if (v) {
                    return ref_insight_college_for_one_keyword_cache_list_search_other[v[0]];
                }
                var v = alias.match(ref_insight_college_for_one_keyword_cache_re_list_search_once);
                if (v) {
                    for (var i in v) {
                        v[i] = v[i].replace(/[ ]+/gi, ' ').trim();
                    }
                    var v2 = ref_insight_college_for_one_keyword_cache_list_search_once[v[0]];
                    if (v.length != 1) {
                        if (Object.keys(v2).length > 1) {
                            var length = v.length;
                            for (var i = 1; i < length; i++) {
                                v2 = get_same_value_from_two_object(v2, ref_insight_college_for_one_keyword_cache_list_search_once[v[i]]);
                            }
                        }
                    }
                    if (Object.keys(v2).length > 1) {
                        var rs = {};
                        for (var i in v2) {
                            for (var it of v2[i].list_search_once) {
                                if (v.length == it.length) {
                                    var fl = true;
                                    for (var ii in it) {
                                        if (!contains(v[ii], it[ii])) {
                                            fl = false;
                                        }
                                    }
                                    if (fl) {
                                        rs[v2[i]._id] = v2[i];
                                    }
                                }
                            }
                        }
                        if (Object.keys(rs).length) {
                            v2 = rs;
                        }
                    }
                    if (Object.keys(v2).length && Object.keys(v2).length <= 5) {
                        return v2;
                    }
                }
                var v = alias.match(ref_insight_college_for_one_keyword_cache_re_list_search);
                if (v) {
                    for (var i in v) {
                        v[i] = v[i].replace(/[ ]+/gi, ' ').trim();
                    }
                    var v2 = ref_insight_college_for_one_keyword_cache_list_search[v[0]];
                    if (v.length != 1) {
                        if (Object.keys(v2).length > 1) {
                            var length = v.length;
                            for (var i = 1; i < length; i++) {
                                v2 = get_same_value_from_two_object(v2, ref_insight_college_for_one_keyword_cache_list_search[v[i]]);
                            }
                        }
                    }
                    if (Object.keys(v2).length > 1) {
                        var rs = {};
                        for (var i in v2) {
                            if (v.length == v2[i].list_search.length) {
                                var fl = true;
                                for (var ii in v2[i].list_search) {
                                    if (!contains(v[ii], it[ii])) {
                                        fl = false;
                                    }
                                }
                                if (fl) {
                                    rs[v2[i]._id] = v2[i];
                                }
                            }
                        }
                        if (Object.keys(rs).length) {
                            v2 = rs;
                        }
                    }
                    return Object.keys(v2).length > 5 ? false : v2;

                }
            }
            return false;

        }
    }
)

//function trigger_college_all
db.system.js.save(
    {
        _id: "trigger_education_college_all",
        value: function (facebook_ids = false) {
            if(!facebook_ids && !facebook_ids.length){return false;}
            var ids_obj = {};
            db.getCollection('facebook_user_education').aggregate([
                { $match: { _id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                if (item.data && item.data.length) {
                    for (var id of item.data) {
                        ids_obj[id] = 1;
                    }
                }
            })
            var ids = Object.keys(ids_obj);
            if (ids && ids.length) {
                var rs = out_facebook_education_college(ids);
                if (rs && rs.length) {
                    insight_facebook_education_college_by_education_ids(rs);
                }
                if ((facebook_ids && facebook_ids.length) && (ids && ids.length)) {
                    out_user_insight_education_college(ids, facebook_ids);
                    if (facebook_ids && facebook_ids.length) {
                        out_user_college(facebook_ids);
                    }
                }
            }
        }
    }
)

//function trigger_college_all
db.system.js.save(
    {
        _id: "trigger_group_college_all",
        value: function (facebook_ids = false) {
            if(!facebook_ids && !facebook_ids.length){return false;}
            var group_ids_obj = {};
            db.getCollection('facebook_user_group').aggregate([
                { $match: { _id: { $in: facebook_ids } } },
            ]).forEach(function (item) {
                if (item.data && item.data.length) {
                    for (var group_id of item.data) {
                        group_ids_obj[group_id] = 1;
                    }
                }
            })
            var group_ids = Object.keys(group_ids_obj);
            if (group_ids && group_ids.length) {
                var rs = out_facebook_group_college(group_ids);
                if (rs && rs.length) {
                    insight_facebook_group_college_by_group_ids(rs);
                }
                if ((facebook_ids && facebook_ids.length) && (group_ids && group_ids.length)) {
                    out_user_insight_group_college(group_ids, facebook_ids);
                    if (facebook_ids && facebook_ids.length) {
                        out_user_college(facebook_ids);
                    }
                }
            }
        }
    }
)