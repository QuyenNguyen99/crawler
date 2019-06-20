var db_57 = connect("192.168.106.57/facebook");
db_57.loadServerScripts();
var db_58 = connect('mongodb://root:x0dna%4086f59@192.168.106.58:27017/facebook?authSource=admin'); 
var list = [];
ref_city = index(db_57.getCollection('ref_city').find().toArray(),'name');
ref_city['Thanh Hoá'] = ref_city['Thanh Hóa'];
ref_city['TP Hồ Chí Minh'] = ref_city['Hồ Chí Minh'];
db_58.getCollection('user_infer').find({location_infer:{$ne:""}}).noCursorTimeout().forEach(function(item){
    list.push({
            _id : "" + item.face_id,
            city_id : ref_city[item.location_infer]._id,
            city_name: ref_city[item.location_infer].name,
    });
    if(list.length == 10000) {
        db_57.getCollection('user_location_infer').insertMany(list);
        list = [];
    }
})

if(list.length) {
    db_57.getCollection('user_location_infer').insertMany(list);
    list = [];

}
