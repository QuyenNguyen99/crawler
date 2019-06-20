db.system.js.save(
    {
        _id: "bulk_write_facebook_group_child_dong_nien",
        value: function (status = -1) {
            var list_nam = [];
            for(var i = 1950; i < 2004;i++) {
                list_nam.push('' + i);
            }
            var list_nam_canh = [];
            var list_nam_canh_co_cach = [
                    "canh dan","ho vang","cop vang","tan mao","meo vang","nham thin","rong vang","qui ty","ran vang",
                    "giap ngo","ngua vang","at mui","de vang","binh than","khi vang","dinh dau","ga vang",
                    "mau tuat","cho vang","cun vang","ky hoi","lon vang","canh ty","chuot vang","tan suu","trau vang",
                    "nham dan","qui mao","giap thin","at ty","binh ngo","dinh mui","mau than","ky dau","canh tuat",
                    "tan hoi","nham ty","qui suu","giap dan","at mao","binh thin","dinh ty","mau ngo","ky mui",
                    "canh than","tan dau","nham tuat","quy hoi","giap ty","at suu","binh dan","dinh mao","mau thin",
                    "ky ty","canh ngo","tan mui","nham than","quy dau","giap tuat","at hoi","binh ty","dinh suu",
                    "mau dan","ky mao","canh thin","tan ty","nham ngo","quy mui","giap than","at dau","binh tuat","dinh hoi","mau ty","ky suu",
            ];

            for(var i = 0; i < list_nam_canh_co_cach.length;i++) {
                list_nam_canh.push(list_nam_canh_co_cach[i]);
                list_nam_canh.push(list_nam_canh_co_cach[i].replace(/ /gi,''));
            }
            var search = {
                $and: [
                    {$or: [
                        { list_keyword: { $in: [
                            'hoi dong nien','hoidongnien','hoidong nien','hoi dongnien','hoi dong lien',
                            'nhom dong nien','nhomdongnien','nhomdong nien','nhom dongnien','nhom dong lien',
                        ] } },
                        {
                            $and: [
                                {list_keyword: {$in: list_nam_canh}},
                                {
                                    list_keyword: {$in: ['tuoi','hoi','nam','nhom']}
                                }
                            ]

                        }
                    ]},
                    {list_keyword:{$in: list_nam}}
                ]
            };
            if(status != -2) {
                search['status'] = status;
            }
            var list = [];
            db.getCollection('facebook_group').aggregate([
                {$match:search},
                {$lookup:{
                    from        : "facebook_group_dong_nien",
                    localField  : "_id",
                    foreignField: "_id",
                    as          : "facebook_group_dong_nien",
                }},
                {$match:{facebook_group_dong_nien:[]}}
            ]).forEach(function (item) {
                item.status = -1;
                delete item.facebook_group_dong_nien;
                item.list_keyword = item.alias ? get_list_keyword_by_sentence(item.alias.trim()) : [];
                list.push(item);
                if (list.length == 10000) {
                    db.getCollection('facebook_group_dong_nien').insertMany(list);
                    list = [];
                }
            })
            if (list.length) {
                db.getCollection('facebook_group_dong_nien').insertMany(list);
            }
        }
    }
)