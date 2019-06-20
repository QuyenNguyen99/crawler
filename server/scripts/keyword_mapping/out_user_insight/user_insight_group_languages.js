db.system.js.save({
    _id: "out_user_insight_group_languages",
    value: function (status = -1, ref_ids = false) {
        out_user_insight_common('facebook_insight_group_languages','facebook_user_group_new','user_insight_group_languages','user_languages',status, ref_ids);
    }
})