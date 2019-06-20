var list = [], list_company_obj = {}, list_company_block_obj = {};
db.getCollection('ref_company_block').find().forEach(function(item){
    list_company_block_obj[item._id] = item;
})
db.getCollection('ref_company').find({$or:[
        {$and:[
                {list_facebook_group_id:{$exists:true}},
                {list_facebook_group_id:{$ne:[]}},
        ]},
        {$and:[
                {list_facebook_work_id:{$exists:true}},
                {list_facebook_work_id:{$ne:[]}},
        ]},
]}).forEach(function(item){
    if(list_company_block_obj[item.company_block]) {
        list_company_obj[item._id] = list_company_block_obj[item.company_block];
    }
})
db.getCollection('user_company').find().forEach(function(item){
    if(item.data && item.data.length) {
        for(var it of item.data) {
            var data = [];
            if(list_company_obj[it.company_id]) {
                data.push({
                    company_block_id         : list_company_obj[it.company_id]._id,
                    company_block_name       : list_company_obj[it.company_id].name
                });
            }
        }
        list.push({
            _id         : item._id,
            data        : data,        
        });
        if(list.length == 10000) {
            db.getCollection('user_company_block').insertMany(list);
            list = [];
        }
    }
})
if(list.length) {
    db.getCollection('user_company_block').insertMany(list);
    list = [];
}