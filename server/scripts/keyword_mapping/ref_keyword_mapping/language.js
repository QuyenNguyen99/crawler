db.system.js.save(
    {
        _id: "bulk_write_ref_languages_keyword_mapping",
        value: function (_id = false) {
            bulk_write_ref_other_common_keyword_mapping('languages',_id);
        }
    }
);

db.system.js.save(
    {
        _id: "bulk_write_ref_languages_keyword_language",
        value: function (_id = false) {
            bulk_write_ref_other_common_keyword_mapping('languages',_id,'keyword_for_language','ref_languages_keyword_language');
        }
    }
);