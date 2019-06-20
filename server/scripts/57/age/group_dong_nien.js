//function out_facebook_group_dong_nien
db.system.js.save(
    {
        _id: "out_facebook_group_dong_nien",
        value: function (ids = false) {
            var list_nam = [];
            for(var i = 1950; i < 2004;i++) {
                list_nam.push('' + i);
            }
            var list_nam_canh = [];
            var list_nam_canh_co_cach = [
                    "canh dan","ho vang","cop vang","tan mao","meo vang","nham thin","rong vang","qui ty","ran vang",
                    "giap ngo","ngua vang","at mui","de vang","binh than","khi vang","dinh dau","ga vang",
                    "mau tuat","cho vang","cun vang","ky hoi","lon vang","canh ty","chuot vang","tan suu","trau vang",
                    "nham dan","qui mao","giap thin","at ty","binh ngo","dinh mui","mau than","ky dau","canh tuat",
                    "tan hoi","nham ty","qui suu","giap dan","at mao","binh thin","dinh ty","mau ngo","ky mui",
                    "canh than","tan dau","nham tuat","quy hoi","giap ty","at suu","binh dan","dinh mao","mau thin",
                    "ky ty","canh ngo","tan mui","nham than","quy dau","giap tuat","at hoi","binh ty","dinh suu",
                    "mau dan","ky mao","canh thin","tan ty","nham ngo","quy mui","giap than","at dau","binh tuat","dinh hoi","mau ty","ky suu",
            ];

            for(var i = 0; i < list_nam_canh_co_cach.length;i++) {
                list_nam_canh.push(list_nam_canh_co_cach[i]);
                list_nam_canh.push(list_nam_canh_co_cach[i].replace(/ /gi,''));
            }
            var search = {
                $and: [
                    {$or: [
                        { list_keyword: { $in: [
                            'hoi dong nien','hoidongnien','hoidong nien','hoi dongnien','hoi dong lien',
                            'nhom dong nien','nhomdongnien','nhomdong nien','nhom dongnien','nhom dong lien',
                        ] } },
                        {
                            $and: [
                                {list_keyword: {$in: list_nam_canh}},
                                {
                                    list_keyword: {$in: ['tuoi','hoi','nam','nhom']}
                                }
                            ]

                        }
                    ]},
                    {list_keyword:{$in: list_nam}}
                ]
            };
            if (ids && ids.length) {
                search['_id'] = { $in: ids };
            }
            var list = [], i = 0, rs = [];
            db.getCollection('facebook_group').find(search).forEach(function (item) {
                i++;
                item.list_keyword = item.alias ? get_list_keyword_by_sentence(item.alias.trim()) : [];
                list.push(item);
                if (i % 10000 == 0) {
                    if (!ids || !ids.length) {
                        insert_data_ignore_not_update(list, 'facebook_group_dong_nien');
                    } else {
                        rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_group_dong_nien'));
                    }
                    list = [];
                }
            })
            if (list.length) {
                if (!ids || !ids.length) {
                    insert_data_ignore_not_update(list, 'facebook_group_dong_nien');
                } else {
                    rs = rs.concat(insert_data_ignore_not_update(list, 'facebook_group_dong_nien'));
                }
            }
            return rs;
        }
    }
)

// function out_facebook_insight_group_dong_nien_age
db.system.js.save({
    _id: 'out_facebook_insight_group_dong_nien_age',
    value: function (education_ids = false) {
        var list = [];
        var search = {};
        if (education_ids && education_ids.length) {
            search['_id'] = { $in: education_ids };
        }
        db.getCollection('facebook_group_dong_nien').aggregate([{ $match: search },]).forEach(function (item) {
            var a = item.alias.match(/ [0-9]{4} /gi);
            if (a) {
                var year = parseInt(a[0].trim());
                if(year > 1950 && year < 2004) {
                    item.year = year;
                    list.push(item);
                }
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'facebook_group_dong_nien_age');
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'facebook_group_dong_nien_age');
            list = [];
        }
    }
})




// function out_user_insight_group_dong_nien_age
db.system.js.save({
    _id: "out_user_insight_group_dong_nien_age",
    value: function (data_ids = false, facebook_ids = false) {
        var list = [], list_user_age = [];
        var search = { };
        if (facebook_ids && facebook_ids.length) {
            search['_id'] = { $in: facebook_ids };
        } else {
            var search_ref = data_ids && data_ids.length ? { _id: { $in: data_ids } } : {};
            var list_ids = [];
            var list_obj_ids = {};
            db.getCollection('facebook_group_dong_nien_age').find(search_ref).forEach(function (item) {
                list_ids.push(item._id);
                list_obj_ids[item._id] = item;
            })
            search['data'] = { $in: list_ids };
        }
        db.getCollection('facebook_user_group').aggregate([
            { $match: search },
            { $lookup: {
                    from: 'facebook_group_dong_nien_age',
                    localField: 'data',
                    foreignField: '_id',
                    as: 'facebook_group_dong_nien_age',
                }
            },
        ]).forEach(function (item) {
            if(item.facebook_group_dong_nien_age && item.facebook_group_dong_nien_age.length) {
                for(var it of item.facebook_group_dong_nien_age) {
                    list.push({
                        _id             : item._id + '_' + it._id,
                        facebook_id     : item._id, 
                        year            : it.year, 
                        keyword         : it.name, 
                        type            : "group_dong_nien_age",
                    });
                }
                list_user_age.push({
                    _id     : item._id,
                })
            }
            if (list.length == 10000) {
                insert_data_ignore(list, 'user_insight_group_dong_nien_age');
                insert_data_ignore(list_user_age, 'user_age');
                list_user_age = [];
                list = [];
            }
        })
        if (list.length) {
            insert_data_ignore(list, 'user_insight_group_dong_nien_age');
            insert_data_ignore(list_user_age, 'user_age');
            list_user_age = [];
            list = [];
        }
        return rs;
    }
})