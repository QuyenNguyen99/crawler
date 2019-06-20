db.system.js.save(
    {
        _id: "bulk_write_facebook_group_child_college",
        value: function (status = -1) {
            bulk_write_facebook_child_school('group','college',{ type: { $in: ['College', 'Graduate School'] } },status);
        }
    }
)