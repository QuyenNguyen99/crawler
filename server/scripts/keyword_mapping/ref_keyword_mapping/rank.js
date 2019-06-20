db.system.js.save(
    {
        _id: "bulk_write_ref_rank_keyword_mapping",
        value: function (_id = false) {
            bulk_write_ref_other_common_keyword_mapping('rank',_id);
        }
    }
);