db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_work_job_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_job_keyword_mapping','facebook_insight_work_job','facebook_work_position',ids);
        }
    }
);