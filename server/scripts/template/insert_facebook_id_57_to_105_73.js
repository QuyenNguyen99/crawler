var db_57 = connect('192.168.105.73/db_insert');
var db_104_70 = connect('admin:root@192.168.104.70:32217/targetting?authSource=admin');
var list = [];
var status = {status};
db_57.getCollection('user_all').find({search}).limit({limit}).skip({skip}).forEach(function(item){
    list.push({mobile_phone:item._id,status:status});
    if(list.length == 10000) {
        db_104_70.getCollection('{collection_name}').insertMany(list);
        status++;
        list = [];
    }
})
if(list.length) {
    db_104_70.getCollection('{collection_name}').insertMany(list);
}