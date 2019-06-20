db_73 = connect('192.168.106.57/db_insert');

db_57 = connect('192.168.106.57/facebook');

db_57.loadServerScripts();

var list = [];

db_57.getCollection('user_college').find().noCursorTimeout().forEach(function (item) {
        if (item.data && item.data.length) {

                list.push({

                        updateOne: {

                                filter: { _id: item._id },

                                update: {

                                        $set: {

                                                _id: item._id,

                                                college: indexArray(item.data, 'college_id'),

                                                // college_name: indexArray(item.data,'college_name'),

                                        }

                                },

                                upsert: true

                        },

                });
        }
        if (list.length == 10000) {

                db_73.getCollection('user_all').bulkWrite(list);

                list = [];

        }

})



if (list.length) {

        db_73.getCollection('user_all').bulkWrite(list);

        list = [];

}