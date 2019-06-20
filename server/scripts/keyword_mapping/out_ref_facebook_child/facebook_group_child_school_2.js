db.system.js.save(
    {
        _id: "bulk_write_facebook_group_child_school_2",
        value: function (status = -1) {
            bulk_write_facebook_child_school('group','school_2',{ 
                alias: {$not:/dai hoc|daihoc|thsp|caodang|cao dang|hoc vien|hocvien|trungcap|trung cap|thpt|trung hoc pho thong|cap 3|cap1|tieu hoc|primary school|tieuhoc/gi}
            },status);
        }
    }
)