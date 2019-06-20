db.getCollection('facebook_id').aggregate([
    {$match:{mobile_phone:{$exists:true}}},
    {$project:{_id:1,mobile_phone:{$cond:["$mobile_phone","$mobile_phone",""]}}},
    {$project:{_id:{$concat:["$_id","_","$mobile_phone"]},facebook_id:"$_id",mobile_phone:1}},
    {$out:"facebook_id_mobile_phone"}
])