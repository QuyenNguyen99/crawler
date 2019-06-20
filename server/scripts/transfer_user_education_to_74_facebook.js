var db_57 = connect("192.168.106.57/facebook");

var db_74_facebook = connect("192.168.105.74/facebook");

var list = [];

db_57.getCollection('facebook_user_education').find({}).skip(62600000).forEach(function(item){

    item.data_length = item.data && item.data !== undefined && item.data.length ? item.data.length : 0;

    list.push(item);

    if(list.length == 100000) {

        db_74_facebook.getCollection('facebook_user_education').insertMany(list);

        list = [];

    }

})

if(list.length) {

        db_74_facebook.getCollection('facebook_user_education').insertMany(list);

        list = [];

    }