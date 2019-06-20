db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_languages_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_languages_keyword_language','facebook_insight_languages','facebook_languages',ids);
        }
    }
);