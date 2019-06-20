db.system.js.save({
    _id: "out_user_insight_group_interest",
    value: function (status = -1, ref_ids = false) {
        out_user_insight_common('facebook_insight_group_interest','facebook_user_group_new','user_insight_group_interest','user_interest',status, ref_ids);
    }
})