var db_57 = connect('192.168.106.57/facebook');

var db_73 = connect('192.168.105.73/db_insert');

db_57.loadServerScripts();

var list = [];

db_57.getCollection('user_interest').find().limit(1000000).skip({skip}).noCursorTimeout().forEach(function(item){

    if(item.data && item.data.length) {

        list.push({

                updateOne: {

                    filter: {_id: item._id},

                    update: {

                            $set: {interest:indexArray(item.data,'interest_id')}

                    }

                }

        });

    }

    if(list.length == 10000) {

        db_73.getCollection('user_all').bulkWrite(list);

        list = [];

    }

})

if(list.length) {

    db_73.getCollection('user_all').bulkWrite(list);

    list = [];

}