

db.system.js.save({
    _id: "bulk_write_out_user_nation",
    value: function (status = -1, ids = false) {
        if (ids) {
            ids = typeof (ids) == 'object' ? ids : [ids];
        }
        var search = {};
        if (status == -2) {
            reset_user_common('user_nation','','user_insight_group_nation');
        } else {
            search['status'] = status;
            if(ids && ids.length) {
                search['_id'] = {$in: ids};
            }
        }
        bulk_write_user_common_by_search('user_nation','','user_insight_group_nation',search);
    }
})