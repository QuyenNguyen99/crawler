 db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_languages",
        value: function (status = -1) {
            bulk_write_facebook_insight_common('ref_languages_keyword_language','facebook_languages','facebook_insight_languages',status);
        }
    }
);