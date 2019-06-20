db.system.js.save(
    {
        _id: "bulk_write_user_profile",
        value: function (status = -1) {
            var list = [];
            var search = {};
            if(status != -2) {
                search['status'] = status;
            }
            db.getCollection('facebook_profile').aggregate([
                {$match:search},
                {$project:{_id:1,facebook_id:"$_id",name:1,gender:1,username:1,relationship_status:1,birthday:1}}
            ]).forEach(function(item){
                if(item._id.length < 16) {
                    if(item.gender) {
                        item.gender = stripUnicode(item.gender.replace(/\(.*/gi, '').trim(), ' ');
                    }
                    if(item.relationship_status) {
                        item.relationship_status = stripUnicode(item.relationship_status, ' ');
                    }
                    list.push(item);
                }
                if(list.length == 10000) {
                    insert_data_ignore(list,'user_profile');
                    list = [];
                }
            })
            if(list.length) {
                insert_data_ignore(list,'user_profile');
            }
        }
    }
);