db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_behavior_type_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_behavior_type_keyword_mapping','facebook_insight_group_behavior_type','facebook_group',ids);
        }
    }
);