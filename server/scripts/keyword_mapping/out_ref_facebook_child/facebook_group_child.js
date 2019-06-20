db.system.js.save(
    {
        _id: "bulk_write_facebook_group_child",
        value: function (status = -1) {
            bulk_write_facebook_group_child_college(status);
            bulk_write_facebook_group_child_school_1(status);
            bulk_write_facebook_group_child_school_2(status);
            bulk_write_facebook_group_child_school_3(status);
            bulk_write_facebook_group_child_hometown(status);
            bulk_write_facebook_group_child_dong_nien(status);
            bulk_write_facebook_insight_group_nation(status);
            bulk_write_facebook_insight_group_regilion(status);
            bulk_write_facebook_insight_group_languages(status);
            bulk_write_facebook_insight_group_hometown(status);
            if(status == -1) {
                build_status_collection_name_by_status_1('facebook_group',100000);
            }
        }
    }
)