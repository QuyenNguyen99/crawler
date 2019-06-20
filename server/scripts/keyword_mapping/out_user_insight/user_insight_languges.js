db.system.js.save({
    _id: "out_user_insight_languages",
    value: function (status = -1, ref_ids = false) {
        out_user_insight_common('facebook_insight_languages','facebook_user_languages','user_insight_languages','user_languages',status, ref_ids);
    }
})