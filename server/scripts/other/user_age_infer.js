var db_57 = connect("192.168.106.57/facebook");
var db_58 = connect("mongodb://root:x0dna%4086f59@192.168.106.58:27017/facebook?authSource=admin&authMechanism=SCRAM-SHA-1");
var list = [];
db_58.getCollection('user_infer').find({age_infer:{$ne:""}}).noCursorTimeout().forEach(function(item){
    list.push({
            _id : "" + item.face_id,
            age : item.age_infer,
            year: 2018 - item.age_infer,
    });
    if(list.length == 10000) {
        db_57.getCollection('user_age_infer').insertMany(list);
        list = [];
    }
})
if(list.length) {
    db_57.getCollection('user_age_infer').insertMany(list);
    list = [];
}