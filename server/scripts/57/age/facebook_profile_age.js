// funcion out_facebook_profile_age
db.system.js.save({
    _id: 'out_facebook_profile_age',
    value: function () {
        db.getCollection('facebook_profile').aggregate([
            {
                $match: {
                    $or: [
                        { birthday: /[0-9]{4}$/gi },
                        { username: /[0-9]{4,8}$/gi },
                        { email: /[0-9]{4,8}$/gi },
                    ]
                }
            },
            { $project: { _id: 1, birthday: 1, username: 1, email: 1 } },
            { $out: "facebook_profile_age" }
        ])
    }
})

// function get_year_from_username_or_email
db.system.js.save({
    _id: 'get_year_from_username_or_email',
    value: function (username) {
        var rs = '';
        var str = '';
        if (username && username !== undefined) {
            var a = username.match(/[0-9]{2,8}$/gi);
            if (a) {
                var str = a[0];
                if (str.length == 2) {
                    var year = parseInt(str);
                    if (year >= 80 && year <= 99) {
                        rs = '19' + year;
                    }
                } else if (str.length == 8) {
                    var date = str[0] + str[1];
                    var month = str[2] + str[3];
                    var year = str[4] + str[5] + str[6] + str[7];
                    if (new Date(year + '-' + month + '-' + date).toString() != 'Invalid Date') {
                        rs = year;
                    }
                } else if (str.length == 6) {
                    var date = str[0] + str[1];
                    var month = str[2] + str[3];
                    var year = parseInt(str[4] + str[5]);
                    if (year > 65 && year <= 99) {
                        year = '19' + year;
                        if (new Date(year + '-' + month + '-' + date).toString() != 'Invalid Date') {
                            rs = year;
                        }
                    }
                } else if (str.length == 5) {
                    var date = str[0] + str[1];
                    var month = '0' + str[2];
                    var year = parseInt(str[3] + str[4]);
                    if (year > 65 && year <= 99) {
                        year = '19' + year;
                        if (new Date(year + '-' + month + '-' + date).toString() != 'Invalid Date') {
                            rs = year;
                        }
                    }

                } else if (str.length == 4) {
                    if (str[0] + str[1] == '19' || str[0] + str[1] == '20') {
                        year = parseInt(str);
                        if (year >= 1965 && year <= 2010) {
                            rs = year;
                        }
                    } else {
                        var date = '0' + str[0];
                        var month = '0' + str[1];
                        var year = parseInt(str[2] + str[3]);
                        if (year > 65 && year <= 99) {
                            year = '19' + year;
                            if (year.length == 4 && new Date(year + '-' + month + '-' + date).toString() != 'Invalid Date') {
                                rs = year;
                            }
                        }
                    }
                }
            }
        }
        if (str && rs) {
            return {
                year: rs,
                keyword: str,
            };
        } else {
            return false;
        }
    }
})

// function out_user_insight_profile_age
db.system.js.save({
    _id: 'out_user_insight_profile_age',
    value: function (facebook_ids = false) {
        var search = facebook_ids && facebook_ids.length ? { _id: { $in: facebook_ids } } : {};
        var list = [], i = 0, list_user_age = [];
        db.getCollection('facebook_profile_age').aggregate([
            { $match: search },
        ]).forEach(function (item) {
            i++;
            if (item.birthday) {
                var a_birthday = item.birthday.split('/');
                if (a_birthday.length == 3 && a_birthday[2].length == 4) {
                    if(parseInt(a_birthday[2]) > 1940 && parseInt(a_birthday[2]) < 2010) {
                        list.push({
                            _id: item._id + '_birthday',
                            facebook_id: item._id,
                            year: parseInt(a_birthday[2]),
                            keyword: item.birthday,
                            type: 'birthday',
                        })
                        list_user_age.push({
                            _id     : item._id,
                        })
                    }
                }
                if (item.email) {
                    var email_remove_a = item.email.replace(/\@.*/gi,'');
                    if(email_remove_a.match(/[0-9]{4,8}$/gi)) {
                        var rs = get_year_from_username_or_email(email_remove_a);
                        if(rs) {
                            list.push({
                                _id     : item._id + '_email',
                                facebook_id: item._id,
                                year    : parseInt(rs.year),
                                keyword : item.email,
                                type    : 'email',
                            })
                            list_user_age.push({
                                _id     : item._id,
                            })
                        }
                    }
                }
                if (item.username && item.username.match(/[0-9]{4,8}$/gi)) {
                    var rs = get_year_from_username_or_email(item.username);
                    if(rs) {
                        list.push({
                            _id     : item._id + '_username',
                            facebook_id: item._id,
                            year    : parseInt(rs.year),
                            keyword : item.username,
                            type    : 'username',
                        })
                        list_user_age.push({
                            _id     : item._id,
                        })
                    }
                }
                if(i % 10000 == 0) {
                    insert_data_ignore(list,'user_insight_profile_age');
                    insert_data_ignore(list_user_age, 'user_age');
                    list_user_age = [];
                    list = [];
                }
            }
        })
        if(list.length) {
            insert_data_ignore(list,'user_insight_profile_age');
            insert_data_ignore(list_user_age, 'user_age');
            list_user_age = [];
            list = [];
        }
    }
})