db.system.js.save(
    {
        _id: "bulk_write_facebook_education_child_college",
        value: function (status = -1) {
            bulk_write_facebook_child_school('education','college',{ type: { $in: ['College', 'Graduate School'] } },status);
        }
    }
)