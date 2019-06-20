db.system.js.save(
    {
        _id: "out_facebook_education_school_1",
        value: function (ids = false) {
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['$and'] = [
                { 'list_keyword_tu_dien': { $in: db.getCollection('ref_common').find({ type: "school_1" })[0].keyword } },
                {'type': {$nin:['College','Graduate School']}},
            ];
            var list = [], i = 0;
            db.getCollection('facebook_education').find(search).forEach(function (item) {
                i++;
                if(!item.alias.match(/dai hoc|daihoc|thsp|caodang|cao dang|hoc vien|hocvien|trungcap|trung cap|thpt|trung hoc pho thong|cap 3|thcs|trung hoc co so|cap 2|cap3|cap2/gi)) {
                    delete item.list_keyword;
                    list.push(item);
                }
                if (i % 10000 == 0) {
                    insert_data_ignore(list, 'facebook_education_school_1');
                    list = [];
                }
            })
            if (list.length) {
                insert_data_ignore(list, 'facebook_education_school_1');
            }
            return rs;
        }
    }
)



// function insight_facebook_education_school_1
db.system.js.save({
    _id: "insight_facebook_education_school_1",
    value: function (school_1_ids = false, education_ids = false) {
        var search_1 = education_ids && education_ids.length ? {_id:{$in: education_ids}} : {};
        var search_school_1 = {$and: [{"ref_school_1" : {$ne: []}},]};
        if(school_1_ids && school_1_ids.length) {
            search_school_1['$and'].push({'ref_school_1._id': {$in: school_1_ids}});
        }
        var list = [];
        db.getCollection('facebook_education_school_1').aggregate([
            {$match: search_1},
            {$lookup:{
                    from                : 'ref_school_1',
                    localField          : 'list_keyword_tu_dien',
                    foreignField        : 'list_keyword',
                    as                  : 'ref_school_1',
            }},
            {$project:{_id: 1, name:1, alias:1, sum:1, type: 1, list_keyword_tu_dien:1, city_id: 1, city_name: 1, ref_school_1:{
                $map: { 
                    "input": "$ref_school_1", 
                    "as": "m", 
                    "in": { 
                        "_id": "$$m._id", 
                        "name": "$$m.name" ,  
                        "city_id": "$$m.city_id" , 
                        "city_name": "$$m.city_name" ,
                        "list_keyword": "$$m.list_keyword"
                    } 
                } 
            }}},
            {$match:search_school_1}
        ]).forEach(function(item){
            if(item.city_id && item.city_id.length) {
                var city_ids = array_to_object(item.city_id);
                var ref_school_1 = [];
                for(var it_school_1 of item.ref_school_1) {
                    if(city_ids[it_school_1.city_id]) {
                        ref_school_1.push(it_school_1);
                    }
                }
                item.ref_school_1 = ref_school_1;
            }
            if(item.ref_school_1 && item.ref_school_1.length) {
                item.ref_school_1 = trim_school_name(item.ref_school_1,'list_keyword_tu_dien', item);
                list.push({
                    updateOne   : {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true
                    }
                });
            }
                
            if(list.length == 10000) {
                db.getCollection('facebook_insight_education_school_1').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_insight_education_school_1').bulkWrite(list);
            list = [];
        }
        return rs;
    }
})



// function out_user_insight_education_school_1
db.system.js.save({
    _id: "out_user_insight_education_school_1",
    value: function (data_ids = false, facebook_ids = false) {
        var list = [],i = 0;
        var search = {};
        if(facebook_ids && facebook_ids.length) {
            search['_id'] = {$in: facebook_ids};
        } else {
            var search_ref = data_ids && data_ids.length ? {_id: {$in: data_ids}} : {};
            var list_ids = [];
            db.getCollection('facebook_insight_education_school_1').find(search_ref).forEach(function(item){
                list_ids.push(item._id);
            })
            search['data'] = {$in: list_ids};
        }
        var list_user_school_1 = [];
        db.getCollection('facebook_user_education').aggregate([
            {$match: search},
            {$lookup:{
                    from                : 'facebook_insight_education_school_1',
                    localField          : 'data',
                    foreignField        : '_id',
                    as                  : 'facebook_insight_education_school_1',
            }},
            {$lookup:{
                from                : 'user_hometown',
                localField          : '_id',
                foreignField        : '_id',
                as                  : 'user_hometown',
            }},
            {$project:{_id: 1, facebook_insight_education_school_1:1, city_id:{$arrayElemAt:["$user_hometown.city_id",0]} }},
        ]).forEach(function(item){
            i++;
            if(item.facebook_insight_education_school_1.length)  {
                for(var it of item.facebook_insight_education_school_1) {
                    if(it.ref_school_1.length == 1) {
                        var id_update = it._id + '_' + item._id;
                        list.push({
                            updateOne   : {
                                filter  : {_id: id_update},
                                update  : {
                                    _id             : id_update,
                                    facebook_id     : item._id,
                                    school_1_id     : it.ref_school_1[0]._id,
                                    school_1_name   : it.ref_school_1[0].name,
                                    school_1_city_id  : it.ref_school_1[0].city_id,
                                    school_1_city_name : it.ref_school_1[0].city_name,
                                    education_name  : it.name,
                                    education_id    : it._id,
                                },
                                upsert  : true
                            }
                        })
                        list_user_school_1.push({
                            updateOne   : {
                                filter      : {_id: item._id},
                                update      : {$set: {_id: item._id}},
                                upsert      : true
                            }
                        });
                    } else if(item.city_id){
                        var r = [];
                        for(var it_ref_school_1 of it.ref_school_1) {
                            if(item.city_id == it_ref_school_1.city_id) {
                                r.push({
                                    school_1_id         : it_ref_school_1._id,
                                    school_1_name       : it_ref_school_1.name,
                                    school_1_city_id    : it_ref_school_1.city_id,
                                    school_1_city_name  : it_ref_school_1.city_name,
                                    education_name      : it.name,
                                    education_id        : it._id,
                                })
                            }
                        }
                        if(r.length == 1) {
                            var id_update = r[0].education_id + '_' + item._id;
                            list.push({
                                updateOne   : {
                                    filter  : {_id: id_update},
                                    update  : {
                                        _id                 : id_update,
                                        facebook_id         : item._id,
                                        school_1_id         : r[0].school_1_id,
                                        school_1_name       : r[0].school_1_name,
                                        school_1__city_id   : r[0].school_1_city_id,
                                        school_1_city_name  : r[0].school_1_city_name,
                                        education_name      : r[0].education_name,
                                        education_id        : r[0].education_id,
                                    },
                                    upsert  : true
                                }
                            })
                            list_user_school_1.push({
                                updateOne   : {
                                    filter      : {_id: item._id},
                                    update      : {$set: {_id: item._id}},
                                    upsert      : true
                                }
                            });
                        }
                    }
                }
            }
                
            if(i % 10000 == 0) {
                db.getCollection('user_insight_education_school_1').bulkWrite(list);
                db.getCollection('user_school_1').bulkWrite(list_user_school_1);
                list_user_school_1 = [];
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('user_insight_education_school_1').bulkWrite(list);
            db.getCollection('user_school_1').bulkWrite(list_user_school_1);
            list_user_school_1 = [];
            list = [];
        }
        return rs;
    }
})