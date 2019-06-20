db.system.js.save(
    {
        _id: "bulk_write_facebook_insight_group_hometown_by_ref",
        value: function (ids = false) {
            bulk_write_facebook_insight_common_by_ref('ref_city_keyword_mapping','facebook_insight_group_hometown','facebook_group_hometown',ids, function(item){
                var re = new RegExp('(hoi|nhom) dong huong ' + item.keyword,'gi');
                return item.alias.match(re);
            });
        }
    }
);