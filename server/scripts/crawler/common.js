db.system.js.save({
    "_id": "trigger_facebook_profile_from_crawler_to_raw",
    "value": function (input_connection_str, output_connection_str) {
        var db_output = connect(output_connection_str);

        var db_input = connect(input_connection_str);

        var list = [], list_ids = [], list_facebook_ids = [];
        db_input.getCollection('facebook_crawler_facebook_profile').find({ status: -1 }).forEach(function (item) {
            list_ids.push(item._id);
            if (item.data && item.data.id) {
                item.data._id = item.data.id;
                list_facebook_ids.push({
                    updateOne: {
                        filter: { _id: item.data._id },
                        update: {
                            $set: {
                                _id: item.data._id,
                                status: -1,

                                status_facebook_education: -1,
                                status_facebook_user_education: -1,

                                status_facebook_user_hometown: -1,
                                status_facebook_user_location: -1,
                                status_facebook_hometown_location: -1,

                                status_facebook_user_profile: -1,
                                status_facebook_user_email: -1,

                                status_facebook_user_languages: -1,
                                status_facebook_facebook_languages: -1,

                                status_facebook_facebook_work: -1,
                                status_facebook_user_work: -1,
                                status_facebook_facebook_work_position: -1,
                            }
                        },
                        upsert: true
                    }
                });
                list.push({
                    updateOne: {
                        filter: { _id: item.data._id },
                        update: { $set: item.data },
                        upsert: true
                    }
                });
            }
            if (list_facebook_ids.length == 10000) {
                db_output.getCollection('facebook_profile_status').bulkWrite(list_facebook_ids);
                list_facebook_ids = [];
            }
            if (list.length == 10000) {
                db_output.getCollection('facebook_profile').bulkWrite(list);
                list = [];
            }
            if (list_ids.length == 10000) {
                db_input.getCollection('facebook_crawler_facebook_profile').update({ _id: { $in: list_ids } }, { $set: { status: 0 } }, { multi: true });
                list_ids = [];
            }
        })
        if (list_facebook_ids.length) {
            db_output.getCollection('facebook_profile_status').bulkWrite(list_facebook_ids);
        }
        if (list.length) {
            db_output.getCollection('facebook_profile').bulkWrite(list);
        }
        if (list_ids.length) {
            db_input.getCollection('facebook_crawler_facebook_profile').update({ _id: { $in: list_ids } }, { $set: { status: 0 } }, { multi: true });
        }
    }
});