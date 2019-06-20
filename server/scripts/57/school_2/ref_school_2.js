db.system.js.save({
    _id: 'build_list_keyword_school_2',
    value: function () {
        var list = [];
        db.getCollection('ref_school_2').find().forEach(function (item) {
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
        db.getCollection('ref_school_2').bulkWrite(list);
    }
});
