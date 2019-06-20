db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_nation_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_nation_keyword_mapping','facebook_insight_group_nation','facebook_group',ids);
        }
    }
);