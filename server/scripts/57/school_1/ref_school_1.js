db.system.js.save({
    _id: 'build_list_keyword_school_1',
    value: function () {
        var list = [];
        db.getCollection('ref_school_1').find().forEach(function (item) {
            var alias = item.alias.trim();
            var a = alias.split(' ');
            var list_keyword = [];
            list_keyword.push(alias);
            if (a.length > 1) {
                var vt = a.join('');
                var c = db.getCollection('tu_dien_anh').count({ _id: vt });
                var d = db.getCollection('tu_dien_viet').count({ _id: vt });
                if (!c && !d) {
                    list_keyword.push(vt);
                }
            }
            if (a.length > 2) {
                var vt = viet_tat(alias);
                var c = db.getCollection('tu_dien_anh').count({ _id: vt });
                var d = db.getCollection('tu_dien_viet').count({ _id: vt });
                if (!c && !d) {
                    list_keyword.push(vt);
                }
            }
            list.push({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { list_keyword: list_keyword } }
                }
            })
        })
        db.getCollection('ref_school_1').bulkWrite(list);
    }
});




db.system.js.save({
    _id: "build_ref_common_school_1",
    value: function() {
        list_keyword_school_1 = ['cap 1', 'tieu hoc', 'tieuhoc', 'cap1', 'cap 1 2', 'primary school'];
        var a = 'abcdefghijklmnopqrstuvxyz'.split('');
        for (var i = 1; i <= 5; i++) {
            for (var l of a) {
                list_keyword_school_1.push('lop ' + i + l);
                list_keyword_school_1.push('lop ' + i);
            }
        }
        for(var i = 1950; i < 2017;i++) {
            var start = i < 2000 ? (i - 1900) : (i - 2000);
            if(start < 10) {
                start = '0' + start;
            }
            var end = (i + 5) < 2000 ? (i - 1895) : (i - 1995);
            if(end < 10) {
                end = '0' + end;
            }
            list_keyword_school_1.push(i + ' ' + (i + 5));
            list_keyword_school_1.push(start + ' ' + end);
        }

        list_keyword_school_1.sort(function(item1,item2){
            return item2.length - item1.length;
        })
        db.getCollection('ref_common').bulkWrite([{
            updateOne:  {
                filter  : {_id: 11},
                update  : {$set:{_id:11,type:"school_1",keyword: list_keyword_school_1}},
                upsert  : true
            }
        }])
    }
})