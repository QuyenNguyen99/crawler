db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_page_interest",
        value: function (status = -1) {
            bulk_write_facebook_insight_common('ref_interest_keyword_mapping','facebook_page','facebook_insight_page_interest',status);
        }
    }
);