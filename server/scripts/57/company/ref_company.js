

//function update_user_count_for_ref_company
db.system.js.save({
    _id     : "update_user_count_for_ref_company",
    value   : function(ids = false) {
        var search = {
                $or:[
                    {list_facebook_work_id:{$exists:true}},
                    {list_facebook_group_id:{$exists:true}},
                ],
                // user_count:{$exists:false}
        };
        if(ids && ids.length) {
            search['_id'] = {$in: ids};
        }
        db.getCollection('ref_company').aggregate([
            {$match:search},
        ]).forEach(function(item){
                db.getCollection('ref_company').update({_id: item._id},{$set:{user_count: db.getCollection('user_company').count({"data.company_id":item._id})}});
                
        })
    }
})