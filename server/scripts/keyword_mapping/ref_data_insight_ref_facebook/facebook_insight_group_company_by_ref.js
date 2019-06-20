db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_company_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common('company',ids,'list_facebook_group_id','facebook_insight_group_company');
        }
    }
);
