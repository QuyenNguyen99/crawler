db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_hometown",
        value: function (status = -1) {
            bulk_write_facebook_insight_common('ref_city_keyword_mapping','facebook_group_hometown','facebook_insight_group_hometown',status, function(item){
                var re = new RegExp('(hoi|nhom) dong huong ' + item.keyword,'gi');
                return item.alias.match(re);
            });
        }
    }
);