db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_work_rank",
        value: function (status = -1) {
            bulk_write_facebook_insight_common('ref_rank_keyword_mapping','facebook_work_position','facebook_insight_work_rank',status);
        }
    }
);