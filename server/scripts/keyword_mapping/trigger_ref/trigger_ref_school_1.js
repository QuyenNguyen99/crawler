db.system.js.save({
    _id: "trigger_ref_school_1_create_update",
    value: function (ids = false) {
        bulk_write_ref_school_1_keyword_mapping(ids);
        bulk_write_facebook_insight_education_school_1_by_ref(ids);
        bulk_write_facebook_insight_group_school_1_by_ref(ids);

        db.getCollection('ref_school_1_keyword_mapping').remove({id:{$in: ids},is_delete:1});

        out_user_insight_education_school_1(-1,ids);
        out_user_insight_group_school_1(-1,ids);

        bulk_write_out_user_school_1(-1);

        db.getCollection('facebook_insight_education_school_1').remove({ref_id:{$in: ids},is_delete:1});
        db.getCollection('facebook_insight_group_school_1').remove({ref_id:{$in: ids},is_delete:1});

        db.getCollection('user_insight_education_school_1').remove({ref_id:{$in: ids},is_delete:1});
        db.getCollection('user_insight_group_school_1').remove({ref_id:{$in: ids},is_delete:1});
    }
})