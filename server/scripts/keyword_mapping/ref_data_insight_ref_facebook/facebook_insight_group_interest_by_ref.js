db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_interest_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_interest_keyword_mapping','facebook_insight_group_interest','facebook_group',ids);
        }
    }
);