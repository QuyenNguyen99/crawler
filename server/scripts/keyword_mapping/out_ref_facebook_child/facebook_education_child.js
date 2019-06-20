db.system.js.save(
    {
        _id: "bulk_write_facebook_education_child",
        value: function (status = -1) {
            bulk_write_facebook_education_child_college(status);
            bulk_write_facebook_education_child_school_1(status);
            bulk_write_facebook_education_child_school_2(status);
            bulk_write_facebook_education_child_school_3(status);
            if(status == -1) {
                build_status_collection_name_by_status_1('facebook_education');
            }
        }
    }
)