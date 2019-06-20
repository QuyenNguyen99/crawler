
// function out_facebook_insight_education_college_age
db.system.js.save({
    _id: 'out_facebook_insight_education_college_age',
    value: function (education_ids = false) {
        var list = [];
        var search = {
            $or: [
                { alias: / k[0-9]{1,2}(|[a-z]{1,2}) /gi },
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ]
        };
        if (education_ids && education_ids.length) {
            search['_id'] = { $in: education_ids };
        }
        var ref_college_list_obj = {};
        db.getCollection('ref_college').aggregate([
            { $project: {_id:1,start_year:1} },
        ]).forEach(function(item){
            ref_college_list_obj[item._id] = item.start_year;
        })
        db.getCollection('facebook_insight_education_college').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 18;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 18;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            } else if (item.alias.match(/ k[0-9]{1,2}(|[a-z]{1,2}) /gi)) {
                var v = item.alias.match(/ k[0-9]{1,2}(|[a-z]{1,2}) /gi);
                var k = parseInt(v[0].trim().replace(/^k|[a-z]+$/gi));
                if(ref_college_list_obj[item._id] && k > 0 && k < 100) {
                    item.year = ref_college_list_obj[item._id] + k - 1;
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_education_college_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_education_college_age');
            list = [];
        }
    }
})

// function out_user_insight_education_college_age
db.system.js.save({
    _id: "out_user_insight_education_college_age",
    value: function (data_ids = false, facebook_ids = false) {
        
        var list = [], list_user_age = [];
        var search = {  };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? { _id: { $in: data_ids } } : {};
            var list_ids = [];
            db.getCollection('facebook_insight_education_college_age').aggregate([
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
                    from: 'facebook_insight_education_college_age',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_insight_education_college_age',
                }
            },
        ]).forEach(function (item) {
            if(item.facebook_insight_education_college_age && item.facebook_insight_education_college_age.length) {
                for(var it of item.facebook_insight_education_college_age) {
                    list.push({
                        _id             : item._id + '_' + it._id,
                        facebook_id     : item._id, 
                        year            :it.year, 
                        keyword         : it.name, 
                        type            : "education_college",
                    });
                }
                list_user_age.push({
                    _id     : item._id,
                })
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'user_insight_education_college_age');
                insert_data_ignore(list_user_age, 'user_age');
                list = [];
                list_user_age = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'user_insight_education_college_age');
            insert_data_ignore(list_user_age, 'user_age');
            list = [];
            list_user_age = [];
        }
        return rs;
    }
})

// function out_facebook_insight_group_college_age
db.system.js.save({
    _id: 'out_facebook_insight_group_college_age',
    value: function (group_ids = false) {
        var list = [];
        var search = {
            $or: [
                { alias: / k[0-9]{1,2}(|[a-z]{1,2}) /gi },
                { alias: / [0-9]{4} /gi },
                { alias: / [0-9]{2,4} [0-9]{2,4} /gi },
            ]
        };
        if (group_ids && group_ids.length) {
            search['_id'] = { $in: group_ids };
        }
        var ref_college_list_obj = {};
        db.getCollection('ref_college').aggregate([
            { $project: {_id:1,start_year:1} },
        ]).forEach(function(item){
            ref_college_list_obj[item._id] = item.start_year;
        })
        db.getCollection('facebook_insight_group_college').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{2,4} [0-9]{2,4} /gi);
            if (a) {
                var year = a[0].trim().split(' ')[0];
                if (year.length == 2) {
                    year = parseInt(year) < 19 ? ('20' + year) : ('19' + year);
                }
                item.year = parseInt(year) - 18;
                list.push(item);
            } else if (item.alias.match(/ [0-9]{4} /gi)) {
                var year = parseInt(item.alias.match(/ [0-9]{4} /gi)[0].trim());
                if (item.alias.match(/lop [0-9]{1,2}/gi)) {
                    var y = parseInt(item.alias.match(/lop [0-9]{1,2}/gi)[0].split(' ')[1].trim());
                    year = year - y + 1;
                }
                item.year = year - 18;
                if(item.year > 1940 && item.year < 2010) {
                    list.push(item);
                }
            } else if (item.alias.match(/ k[0-9]{1,2}(|[a-z]{1,2}) /gi)) {
                var v = item.alias.match(/ k[0-9]{1,2}(|[a-z]{1,2}) /gi);
                var k = parseInt(v[0].trim().replace(/^k|[a-z]+$/gi));
                if(ref_college_list_obj[item._id] && k > 0 && k < 100) {
                    item.year = ref_college_list_obj[item._id] + k - 1;
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_insight_group_college_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_insight_group_college_age');
            list = [];
        }
    }
})



// function out_user_insight_group_college_age
db.system.js.save({
    _id: "out_user_insight_group_college_age",
    value: function (data_ids = false, facebook_ids = false) {

        var list = [], list_user_age = [];
        var search = {  };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? { _id: { $in: data_ids } } : {};
            var list_ids = [];
            db.getCollection('facebook_insight_group_college_age').aggregate([
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
                    from: 'facebook_insight_group_college_age',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_insight_group_college_age',
                }
            },
        ]).forEach(function (item) {
            if(item.facebook_insight_group_college_age && item.facebook_insight_group_college_age.length) {
                for(var it of item.facebook_insight_group_college_age) {
                    list.push({
                        _id             : item._id + '_' + it._id,
                        facebook_id     : item._id, 
                        year            : it.year, 
                        keyword         : it.name, 
                        type            : "group_college",
                    });
                }
                list_user_age.push({
                    _id     : item._id,
                })
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'user_insight_group_college_age');
                insert_data_ignore(list_user_age, 'user_age');
                list_user_age = [];
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'user_insight_group_college_age');
            insert_data_ignore(list_user_age, 'user_age');
            list_user_age = [];
            list = [];
        }
        return rs;
    }
})