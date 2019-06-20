db.system.js.save(
    {
        _id: "bulk_write_facebook_education_child_school_1",
        value: function (status = -1) {
            bulk_write_facebook_child_school('education','school_1',{ 
                alias: {$not:/dai hoc|daihoc|thsp|caodang|cao dang|hoc vien|hocvien|trungcap|trung cap|thpt|trung hoc pho thong|cap 3|thcs|trung hoc co so|cap 2|cap3|cap2/gi} 
            },status);
        }
    }
)