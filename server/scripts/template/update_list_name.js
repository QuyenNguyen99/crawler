db.loadServerScripts();

var list = [];

db.getCollection('user_all').find({}).limit(1000000).skip({skip}).noCursorTimeout().forEach(function (item) {
        if (!item.list_name && item.name) {
                list.push({

                        updateOne: {

                                filter: { _id: item._id },

                                update: { $set: { list_name: get_list_keyword_by_name(item.name) } }

                        }

                });
        }

        if (list.length == 100) {

                db.getCollection('user_all').bulkWrite(list);

                list = [];

        }

})



if (list.length) {

        db.getCollection('user_all').bulkWrite(list);

        list = [];

}