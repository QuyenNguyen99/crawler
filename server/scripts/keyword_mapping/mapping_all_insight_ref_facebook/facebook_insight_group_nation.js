db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_nation",
        value: function (status = -1) {
            bulk_write_facebook_insight_common('ref_nation_keyword_mapping','facebook_group','facebook_insight_group_nation',status);
        }
    }
);