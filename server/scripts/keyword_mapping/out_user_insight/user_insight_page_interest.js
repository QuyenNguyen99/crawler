db.system.js.save({
    _id: "out_user_insight_page_interest",
    value: function (status = -1, ref_ids = false) {
        out_user_insight_common('facebook_insight_page_interest','facebook_user_page','user_insight_page_interest','user_interest',status, ref_ids);
    }
})