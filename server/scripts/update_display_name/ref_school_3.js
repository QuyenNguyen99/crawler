db.loadServerScripts();
var list = [];
db.getCollection('ref_school_3').find({}).forEach(function(item){
        var name_new_a = item.name.split(' ');
        var a_new = [];
        for(var str of name_new_a) {
                a_new.push(str.charAt(0).toUpperCase() + str.slice(1));
        }
        var display_name = item.content.toLowerCase().replace(' ' + item.name,' ' + a_new.join(' ')).replace(/.*?( - )/gi,'');
        display_name = display_name.charAt(0).toUpperCase() + display_name.slice(1);
        list.push({
                updateOne       : {
                        filter: {_id:item._id},
                        update: {$set:{display_name:display_name}}
                }
        });
})
db.getCollection('ref_school_3').bulkWrite(list);