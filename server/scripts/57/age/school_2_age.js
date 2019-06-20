
// function out_facebook_insight_education_school_2_age_raw
db.system.js.save({
    _id: 'out_facebook_insight_education_school_2_age_raw',
    value: function (education_ids = false) {
        var list = [];
        var list_keyword = db.getCollection('ref_common').find({ type: "school_2" })[0].keyword;
        var list_search = [];
        for(var item of list_keyword) {
            if(!item.match(/^([0-9]{2}|[0-9]{4}) ([0-9]{2}|[0-9]{4})$/gi)) {
                list_search.push(item);
            }
        }
        var search = {
            $or: [
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ],
            list_keyword_tu_dien:{$in: list_search}
        };
        if (education_ids && education_ids.length) {
            search['_id'] = { $in: education_ids };
        }
        db.getCollection('facebook_education_school_2').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 11;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 11;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_education_school_2_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_education_school_2_age');
            list = [];
        }
    }
})




// function out_facebook_insight_education_school_2_age
db.system.js.save({
    _id: 'out_facebook_insight_education_school_2_age',
    value: function (education_ids = false) {
        var list = [];
        var search = {
            $or: [
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ]
        };
        if (education_ids && education_ids.length) {
            search['_id'] = { $in: education_ids };
        }
        db.getCollection('facebook_insight_education_school_2').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 11;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 11;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_education_school_2_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_education_school_2_age');
            list = [];
        }
    }
})

// function out_user_insight_education_school_2_age
db.system.js.save({
    _id: "out_user_insight_education_school_2_age",
    value: function (data_ids = false, facebook_ids = false) {
        var list = [], list_user_age = [];
        var search = {  };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? { _id: { $in: data_ids } } : {};
            var list_ids = [];
            db.getCollection('facebook_insight_education_school_2_age').aggregate([
                {$match:search_ref},
                {$project:{_id:1}}
            ]).forEach(function (item) {
                list_ids.push(item._id);
            })
            search['data'] = { $in: list_ids };
        }
        db.getCollection('facebook_user_education').aggregate([
            { $match: search },
            {
                $lookup: {
                    from: 'facebook_insight_education_school_2_age',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_insight_education_school_2_age',
                }
            },
        ]).forEach(function (item) {
            if(item.facebook_insight_education_school_2_age && item.facebook_insight_education_school_2_age.length) {
                for(var it of item.facebook_insight_education_school_2_age) {
                    list.push({
                        _id             : item._id + '_' + it._id,
                        facebook_id     : item._id, 
                        year            :it.year, 
                        keyword         : it.name, 
                        type            : "education_school_2",
                    });
                }
                list_user_age.push({
                    _id     : item._id,
                })
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'user_insight_education_school_2_age');
                insert_data_ignore(list_user_age, 'user_age');
                list_user_age = [];
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'user_insight_education_school_2_age');
            insert_data_ignore(list_user_age, 'user_age');
            list_user_age = [];
            list = [];
        }
        return rs;
    }
})





// function out_facebook_insight_group_school_2_age_raw
db.system.js.save({
    _id: 'out_facebook_insight_group_school_2_age_raw',
    value: function (group_ids = false) {
        var list = [];
        var list_keyword = db.getCollection('ref_common').find({ type: "school_2" })[0].keyword;
        var list_search = [];
        for(var item of list_keyword) {
            if(!item.match(/^([0-9]{2}|[0-9]{4}) ([0-9]{2}|[0-9]{4})$/gi)) {
                list_search.push(item);
            }
        }
        var search = {
            $or: [
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ],
            list_keyword_tu_dien:{$in: list_search}
        };
        if (group_ids && group_ids.length) {
            search['_id'] = { $in: group_ids };
        }
        db.getCollection('facebook_group_school_2').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 11;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 11;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_group_school_2_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_group_school_2_age');
            list = [];
        }
    }
})




// function out_facebook_insight_group_school_2_age
db.system.js.save({
    _id: 'out_facebook_insight_group_school_2_age',
    value: function (group_ids = false) {
        var list = [];
        var search = {
            $or: [
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ]
        };
        if (group_ids && group_ids.length) {
            search['_id'] = { $in: group_ids };
        }
        db.getCollection('facebook_insight_group_school_2').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 11;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 11;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_group_school_2_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_group_school_2_age');
            list = [];
        }
    }
})



// function out_user_insight_group_school_2_age
db.system.js.save({
    _id: "out_user_insight_group_school_2_age",
    value: function (data_ids = false, facebook_ids = false) {

        var list = [], list_user_age = [];
        var search = {  };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? { _id: { $in: data_ids } } : {};
            var list_ids = [];
            db.getCollection('facebook_insight_group_school_2_age').aggregate([
                {$match:search_ref},
                {$project:{_id:1}}
            ]).forEach(function (item) {
                list_ids.push(item._id);
            })
            search['data'] = { $in: list_ids };
        }
        
        db.getCollection('facebook_user_group').aggregate([
            { $match: search },
            { $lookup: {
                    from: 'facebook_insight_group_school_2_age',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_insight_group_school_2_age',
                }
            },
        ]).forEach(function (item) {
            if(item.facebook_insight_group_school_2_age && item.facebook_insight_group_school_2_age.length) {
                for(var it of item.facebook_insight_group_school_2_age) {
                    list.push({
                        _id             : item._id + '_' + it._id,
                        facebook_id     : item._id, 
                        year            : it.year, 
                        keyword         : it.name, 
                        type            : "group_school_2",
                    });
                }
                list_user_age.push({
                    _id     : item._id,
                })
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'user_insight_group_school_2_age');
                insert_data_ignore(list_user_age, 'user_age');
                list_user_age = [];
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'user_insight_group_school_2_age');
            insert_data_ignore(list_user_age, 'user_age');
            list_user_age = [];
            list = [];
        }
        return rs;
    }
})