db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_work_company_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common('company',ids,'list_facebook_work_id','facebook_insight_work_company');
        }
    }
);
