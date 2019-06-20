
// build keyword
db.system.js.save(
    {
        _id: "upd_keyword_school_3",
        value: function (id) {
            var listkw = [];
            var item = db.getCollection("ref_school_3").find({ _id: id })[0];
            if (item) {
                item['list_keyword'] = build_keyword_list([item.alias]);

                if (item.alias.includes("ban cong")) {
                    item['list_keyword'] = item['list_keyword'].concat(build_keyword_list([item.alias.replace("ban cong", "b c")]));
                }
                if (item.alias.includes("dan lap")) {
                    item['list_keyword'] = item['list_keyword'].concat(build_keyword_list([item.alias.replace("dan lap", "d l")]));
                }
                listkw.push({
                    updateOne: {
                        filter: { _id: id },
                        update: {
                            $set: {
                                list_keyword: item['list_keyword']
                            }
                        },
                        upsert: true,
                    }
                });
            }
            db.getCollection('ref_school_3').bulkWrite(listkw);
        }
    }
);


db.system.js.save(
    {
        _id: "upd_all_keyword_school_3",
        value: function () {
            db.getCollection("ref_school_3").find({}).forEach(function (item) {
                upd_keyword_school_3(item._id);
            });
            db.getCollection("ref_school_3").createIndex({ list_keyword: 1 });
        }
    }
);


db.system.js.save({
    _id: 'fn_list_common_word_school_3',
    value: function () {
var common_k = ["thpt",
            "t h p t",
            "th pt",
            "t h pt",
            "thp t",
            "trung hoc pho thong",
            "trung hoc phothong",
            "trung hoc pho t",
            "trung hoc phot",
            "trung hoc p thong",
            "trung hoc pthong",
            "trung hoc pt",
            "th pho thong",
            "th phothong",
            "th pho t",
            "th phot",
            "th p thong",
            "th pthong",
            "th pt",
            "t h pho thong",
            "t h phothong",
            "t h pho t",
            "t h phot",
            "t h p thong",
            "t h pthong",
            "t h pt",
            "thoc pho thong",
            "thoc phothong",
            "thoc pho t",
            "thoc phot",
            "thoc p thong",
            "thoc pthong",
            "thoc pt",
            "t hoc pho thong",
            "t hoc phothong",
            "t hoc pho t",
            "t hoc phot",
            "t hoc p thong",
            "t hoc pthong",
            "t hoc pt",
            "trungh pho thong",
            "trungh phothong",
            "trungh pho t",
            "trungh phot",
            "trungh p thong",
            "trungh pthong",
            "trungh pt",
            "trung h pho thong",
            "trung h phothong",
            "trung h pho t",
            "trung h phot",
            "trung h p thong",
            "trung h pthong",
            "trung h pt",
            "trung hocpho thong",
            "trung hocphothong",
            "trung hocpho t",
            "trung hocphot",
            "trung hocp thong",
            "trung hocpthong",
            "trung hocpt",
            "th phothong",
            "thphothong",
            "thpho t",
            "thphot",
            "thp thong",
            "t hpho thong",
            "t hphothong",
            "t hpho t",
            "t hphot",
            "t hp thong",
            "t hpthong",
            "t hpt",
            "thocpho thong",
            "thocphothong",
            "thocpho t",
            "thocphot",
            "thocp thong",
            "thocpthong",
            "thocpt",
            "t hocpho thong",
            "t hocphothong",
            "t hocpho t",
            "t hocphot",
            "t hocp thong",
            "t hocpthong",
            "t hocpt",
            "trunghpho thong",
            "trunghphothong",
            "trunghpho t",
            "trunghphot",
            "trunghp thong",
            "trunghpthong",
            "trunghpt",
            "trung hpho thong",
            "trung hphothong",
            "trung hpho t",
            "trung hphot",
            "trung hp thong",
            "trung hpthong",
            "trung hpt",
            "cap 3",
            "cap iii",
            "cap3",
            "capiii",
            "cap 2 3",
            "cap 23",
            "cap2 3",
            "cap23",
            "high school",
            "highschool"];
        var char_ = ["a", "b", "c", "d", "e", "g", "h", "i","j", "k", "l", "m", "n", "o","p","q","r","s","t","u","v","w","x","y","z"];
        for (var i = 10; i <= 12; i++) {
            common_k.push("khoi" + i);
            common_k.push("khoi " + i);
            for (var chr of char_) {
                common_k.push(i + chr);
                common_k.push(i + " " + chr);
                for (var j = 1; j <= 20; j++) {
                    common_k.push(i + chr + j);
                    common_k.push(i + " " + chr + j);
                    common_k.push(i + " " + chr + " " + j);
                }
            }
        }
        for (var i = 1950; i < 2017; i++) {
            var start = i < 2000 ? (i - 1900) : (i - 2000);
            if (start < 10) {
                start = '0' + start;
            }
            var end = (i + 3) < 2000 ? (i - 1897) : (i - 1997);
            if (end < 10) {
                end = '0' + end;
            }
            common_k.push(i + ' ' + (i + 3));
            common_k.push(start + ' ' + end);
        }
    return common_k;
    }
})


db.system.js.save(
    {
        _id: "build_keyword_list",
        value: function (arr) {
            for (var item of arr) {
                var indices = [];
                for (var i = 0; i < item.length; i++) {
                    if (item[i] === " ") indices.push(i);
                }

                for (var indx of indices) {
                    var str = item.substring(0, indx) + item.substring(indx + 1, item.length);
                    if (!arr.includes(str)) {
                        arr.push(str);
                    }
                }
            }
            return arr;
        }
    });
