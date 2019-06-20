/*
db.loadServerScripts();
out_facebook_education_school_2();
insight_facebook_education_school_2();
out_user_insight_education_school_2();
*/
db.system.js.save(
    {
        _id: "out_facebook_education_school_2",
        value: function (ids = false) {
            var search = ids && ids.length ? { _id: { $in: ids } } : {};
            search['$and'] = [
                { 'list_keyword_tu_dien': { $in: db.getCollection('ref_common').find({ type: "school_2" })[0].keyword } },
                {'type': {$nin:['College','Graduate School']}},
            ];
            var list = [], i = 0;
            db.getCollection('facebook_education').find(search).forEach(function (item) {
                i++;
                if(!item.alias.match(/dai hoc|daihoc|thsp|caodang|cao dang|hoc vien|hocvien|trungcap|trung cap|thpt|trung hoc pho thong|cap 3|cap1|tieu hoc|primary school|tieuhoc/gi)) {
                    delete item.list_keyword;
                    list.push(item);
                }
                if (i % 10000 == 0) {
                    insert_data_ignore(list, 'facebook_education_school_2');
                    list = [];
                }
            })
            if (list.length) {
                insert_data_ignore(list, 'facebook_education_school_2');
            }
            return rs;
        }
    }
)



// function insight_facebook_education_school_2
db.system.js.save({
    _id: "insight_facebook_education_school_2",
    value: function (school_2_ids = false, education_ids = false) {
        var search_1 = education_ids && education_ids.length ? {_id:{$in: education_ids}} : {};
        var search_school_2 = {$and: [{"ref_school_2" : {$ne: []}},]};
        if(school_2_ids && school_2_ids.length) {
            search_school_2['$and'].push({'ref_school_2._id': {$in: school_2_ids}});
        }
        var list = [];
        db.getCollection('facebook_education_school_2').aggregate([
            {$match: search_1},
            {$lookup:{
                    from                : 'ref_school_2',
                    localField          : 'list_keyword_tu_dien',
                    foreignField        : 'list_keyword',
                    as                  : 'ref_school_2',
            }},
            {$project:{_id: 1, name:1, alias:1, sum:1, type: 1, list_keyword_tu_dien:1, city_id: 1, city_name: 1, ref_school_2:{
                $map: { 
                    "input": "$ref_school_2", 
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
            {$match:search_school_2}
        ]).forEach(function(item){
            if(item.city_id && item.city_id.length) {
                var city_ids = array_to_object(item.city_id);
                var ref_school_2 = [];
                for(var it_school_2 of item.ref_school_2) {
                    if(city_ids[it_school_2.city_id]) {
                        ref_school_2.push(it_school_2);
                    }
                }
                item.ref_school_2 = ref_school_2;
            }
            if(item.ref_school_2 && item.ref_school_2.length) {
                item.ref_school_2 = trim_school_name(item.ref_school_2,'list_keyword_tu_dien', item);
                list.push({
                    updateOne   : {
                        filter  : {_id: item._id},
                        update  : item,
                        upsert  : true
                    }
                });
            }
                
            if(list.length == 10000) {
                db.getCollection('facebook_insight_education_school_2').bulkWrite(list);
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('facebook_insight_education_school_2').bulkWrite(list);
            list = [];
        }
        return rs;
    }
})



// function out_user_insight_education_school_2
db.system.js.save({
    _id: "out_user_insight_education_school_2",
    value: function (data_ids = false, facebook_ids = false) {
        var list = [],i = 0;
        var search = {};
        if(facebook_ids && facebook_ids.length) {
            search['_id'] = {$in: facebook_ids};
        } else {
            var search_ref = data_ids && data_ids.length ? {_id: {$in: data_ids}} : {};
            var list_ids = [];
            db.getCollection('facebook_insight_education_school_2').find(search_ref).forEach(function(item){
                list_ids.push(item._id);
            })
            search['data'] = {$in: list_ids};
        }
        var list_user_school_2 = [];
        db.getCollection('facebook_user_education').aggregate([
            {$match: search},
            {$lookup:{
                    from                : 'facebook_insight_education_school_2',
                    localField          : 'data',
                    foreignField        : '_id',
                    as                  : 'facebook_insight_education_school_2',
            }},
            {$lookup:{
                from                : 'user_hometown',
                localField          : '_id',
                foreignField        : '_id',
                as                  : 'user_hometown',
            }},
            {$project:{_id: 1, facebook_insight_education_school_2:1, city_id:{$arrayElemAt:["$user_hometown.city_id",0]} }},
        ]).forEach(function(item){
            i++;
            if(item.facebook_insight_education_school_2.length)  {
                for(var it of item.facebook_insight_education_school_2) {
                    if(it.ref_school_2.length == 1) {
                        var id_update = it._id + '_' + item._id;
                        list.push({
                            updateOne   : {
                                filter  : {_id: id_update},
                                update  : {
                                    _id             : id_update,
                                    facebook_id     : item._id,
                                    school_2_id     : it.ref_school_2[0]._id,
                                    school_2_name   : it.ref_school_2[0].name,
                                    school_2_city_id  : it.ref_school_2[0].city_id,
                                    school_2_city_name : it.ref_school_2[0].city_name,
                                    education_name  : it.name,
                                    education_id    : it._id,
                                },
                                upsert  : true
                            }
                        })
                        list_user_school_2.push({
                            updateOne   : {
                                filter      : {_id: item._id},
                                update      : {$set: {_id: item._id}},
                                upsert      : true
                            }
                        });
                    } else if(item.city_id){
                        var r = [];
                        for(var it_ref_school_2 of it.ref_school_2) {
                            if(item.city_id == it_ref_school_2.city_id) {
                                r.push({
                                    school_2_id         : it_ref_school_2._id,
                                    school_2_name       : it_ref_school_2.name,
                                    school_2_city_id    : it_ref_school_2.city_id,
                                    school_2_city_name  : it_ref_school_2.city_name,
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
                                        school_2_id         : r[0].school_2_id,
                                        school_2_name       : r[0].school_2_name,
                                        school_2_city_id   : r[0].school_2_city_id,
                                        school_2_city_name  : r[0].school_2_city_name,
                                        education_name      : r[0].education_name,
                                        education_id        : r[0].education_id,
                                    },
                                    upsert  : true
                                }
                            })
                            list_user_school_2.push({
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
                db.getCollection('user_insight_education_school_2').bulkWrite(list);
                db.getCollection('user_school_2').bulkWrite(list_user_school_2);
                list_user_school_2 = [];
                list = [];
            }
        })
        if(list.length) {
            db.getCollection('user_insight_education_school_2').bulkWrite(list);
            db.getCollection('user_school_2').bulkWrite(list_user_school_2);
            list_user_school_2 = [];
            list = [];
        }
        return rs;
    }
})