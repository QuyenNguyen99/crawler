db.system.js.save(
    {
        _id: "bulk_write_loc_user_khong_phai_viet",
        value: function (status = -1, ids = false) {

            var tu_dien_viet_obj = {};
            db.getCollection('tu_dien_viet').find({}).forEach(function (item) {
                tu_dien_viet_obj[item.alias] = 1;
                if (item._id != item.alias) {
                    tu_dien_viet_obj[item._id] = 10;
                }
            })
            db.getCollection('ref_city_keyword_mapping').find({}).forEach(function (item) {
                var a = item.keyword.split(" ");
                for (var it of a) {
                    if (!tu_dien_viet_obj[it]) {
                        tu_dien_viet_obj[it] = 1;
                    }
                }
            })

            tu_dien_viet_obj['vietnam'] = 100;
            function get_score(name, tu_dien_viet_obj) {
                var score = 0;
                var name = pretty_str_new(name);
                if (name && name != undefined) {
                    name = name.toLowerCase().replace(/[ ]+/gi, ' ').trim();
                    var a_name = name.split(' ');
                    for (var it of a_name) {
                        score += tu_dien_viet_obj[it] ? tu_dien_viet_obj[it] : 0;
                    }
                    return {
                        score: score,
                        total_score: a_name.length,
                    };
                }
            }

            var list = [];
            var search = {};
            if(status != -1) {
                search['status'] = status;
            }
            if(ids && ids.length) {
                search['_id'] = {$in: ids};
            }
            db.getCollection('facebook_profile_dif_vi_id').aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: "facebook_profile_dif_vi",
                        localField: "_id",
                        foreignField: "_id",
                        as: "profile",
                    },
                },
                { $unwind: "$profile" },
                {
                    $project: {
                        _id: 1, name: "$profile.name",
                        hometown: "$profile.hometown", location: "$profile.location",
                        education: "$profile.education", work: "$profile.work",
                    }
                }
            ]).forEach(function (item) {
                var score = 0;
                var total_score = 0;
                var score_obj = {};
                if (item.name) {
                    score_obj = get_score(item.name, tu_dien_viet_obj);
                    score += score_obj.score;
                    total_score += score_obj.total_score;
                }

                if (item.hometown && item.hometown.id) {
                    score_obj = get_score(item.hometown.name, tu_dien_viet_obj);
                    score += score_obj.score;
                    total_score += score_obj.total_score;
                }

                if (item.location && item.location.id) {
                    score_obj = get_score(item.location.name, tu_dien_viet_obj);
                    score += score_obj.score;
                    total_score += score_obj.total_score;
                }

                if (item.education && item.education.length) {
                    for (var it of item.education) {
                        if (it.school && it.school.name) {
                            score_obj = get_score(it.school.name, tu_dien_viet_obj);
                            score += score_obj.score;
                            total_score += score_obj.total_score;
                        }
                    }
                }

                if (item.work && item.work.length) {
                    for (var it of item.work) {
                        if (it.employer && it.employer.name) {
                            score_obj = get_score(it.employer.name, tu_dien_viet_obj);
                            score += score_obj.score;
                            total_score += score_obj.total_score;
                        }
                    }
                }
                list.push({
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            $set: {
                                _id: item._id,
                                score: score,
                                total_score: total_score,
                                pass: score && total_score && (score / total_score > 0.5) ? true : false
                            }
                        }
                    }
                });
                if (list.length == 10000) {
                    db.getCollection('facebook_profile_dif_vi_id').bulkWrite(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_profile_dif_vi_id').bulkWrite(list);
                list = [];
            }
        }
    }
);