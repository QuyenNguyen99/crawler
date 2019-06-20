import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { Global_DB } from '../../core/global_db';
import { Deferred } from '../../core/global_function';
declare var $: any;

@Component({
    selector: 'manyimages',
    templateUrl: 'manyimages.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ManyimagesComponent),
        multi: true
    }]
})
export class ManyimagesComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };

    @Input()
    data: any;

    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }

    @Input()
    set link(vl: any) {
        this._link = vl;
        this.setListImage();
    }
    _link: string;

    @Input()
    set limit(vl: any) {
        this._limit = vl;
    }
    _limit: Number = 20;

    @Input()
    set link_api(vl: any) {
        this._link_api = vl;
    }
    _link_api: string;
    link_image: string;

    @Input()
    set attribute_api(vl: any) {
        this._attribute_api = vl;
    }
    _attribute_api: {};

    @ViewChild('input') _input: any;
    @ViewChild('upload') _upload: any;
    @ViewChild('button') _button: any;

    choice_image() {
        this._button.nativeElement.click();
    }

    @Input()
    cssImport: any;

    @Input()
    width: any;

    @Input()
    disabled: any;

    @Input()
    options: any;

    @Output()
    initLoad = new EventEmitter<any>();

    @Output()
    finishLoad = new EventEmitter<any>();

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router, private db: Global_DB) { }

    ngOnInit() { }

    ngAfterViewInit() {
    }
    _value: any = '';
    writeValue(value: any): void {
        if (value === undefined || value === null) {
            this._value = '';
        } else {
            this._value = value;
        }
        this.setListImage();
    }


    list: any = [];
    setListImage() {
        if (this._link && this._value) {
            var rs = [];
            if (typeof (this._value) == 'string' && this._value != '') {
                rs = JSON.parse(this._value);
            } else {
                rs = this._value;
            }
            for (var i in rs) {
                if (!rs[i]['link']) {
                    rs[i]['link'] = this._link + rs[i]['name'];
                }
            }
            this.list = rs;
        } else {
            this.list = [];
        }

    }
    private sendModelChange(val: any) {
        this.propagateChange(this.getValueValue(val));
    }

    private getValueValue(val: any) {
        let result: any = val;
        if (!val) {
            return val;
        }
        return result;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    delete_image(item) {
        var rs = [];
        for (var i in this.list) {
            if (this.list[i].id != item.id) {
                rs.push(this.list[i]);
            }
        }
        this.list = rs;
        this._value = JSON.stringify(this.list);
        // this._value = this.list;
        this.sendModelChange(this._value);
        this.valueChanged.emit({
            type: 'change'
        });
    }

    click_broswer() {
        this._upload.nativeElement.click();
    }

    


    rotate90(content) {
        var def = new Deferred();
        var img = new Image();
        img.src = content;
        img.onload = function() {
            var c = document.createElement("canvas");
            var ctx = c['getContext']("2d");
            c['width'] = img.naturalHeight;
            c['height'] = img.naturalWidth;
            ctx.rotate( Math.PI / 2);
            ctx.drawImage(img,0,-img.naturalHeight);
            ctx.save();
            def.resolve(c['toDataURL']("image/jpg"));
        }
        return def.promise;
    }

    rotate180(content) {
        var def = new Deferred();
        var img = new Image();
        img.src = content;
        img.onload = function() {
            var c = document.createElement("canvas");
            var ctx = c['getContext']("2d");
            c['width'] = img.naturalWidth;
            c['height'] = img.naturalHeight;
            ctx.rotate( Math.PI);
            ctx.drawImage(img,-img.naturalWidth,-img.naturalHeight);
            ctx.save();
            def.resolve(c['toDataURL']("image/jpg"));
        }
        return def.promise;
    }

    rotate270(content) {
        var def = new Deferred();
        var img = new Image();
        img.src = content;
        img.onload = function() {
            var c = document.createElement("canvas");
            var ctx = c['getContext']("2d");
            c['width'] = img.naturalHeight;
            c['height'] = img.naturalWidth;
            ctx.rotate( 3 * Math.PI / 2);
            ctx.drawImage(img,-img.naturalWidth,0);
            ctx.save();
            def.resolve(c['toDataURL']("image/jpg"));
        }
        return def.promise;
    }

    upload_one_file(file) {
        var that = this;
        var reader = new FileReader();
        var def = new Deferred();
        reader.onloadend = function () {
            var result = reader.result;
            // that.rotate270(result).then(result => {
                that.db.post(that._link_api, Object.assign({ content: result, name: file.name }, that._attribute_api)).then(r => {
                    if (r.code == 200) {
                        r.attributes['link'] = that._link + r.attributes['name'];
                        that.list.push(r.attributes);
                        that._value = JSON.stringify(that.list);
                        // that._value = that.list;
                        that.sendModelChange(that._value);
                        that.valueChanged.emit({
                            type        : 'change',
                            attributes  : r.attributes,
                        });
                        def.resolve(r.attributes);
                    } else {
                        def.resolve(r.error);
                    }
                })
            // })
        }
        reader.readAsDataURL(file);
        return def.promise;
    }
    obj_message: any;
    limit_size = 5 * 1024 * 1024;
    upload_image(event) {
        var that = this;
        var flag = true;
        var rs_message = [];
        var list_file_upload = [];
        var length = event.target.files.length;
        var count = length + this.list.length;
        if(count > this._limit) {
            this.obj_message.open({
                title: 'Up ảnh bị lỗi',
                content: 'Bạn chỉ được up ' + this._limit + ' ảnh',
                autoClose: true,
            });
            return false;
        }
        var msg_anh = '';
        for (var i = 0; i < length; i++) {
            var file = event.target.files[i];
            var a = file.type.split('/');
            if (a[0] == 'image') {
                if (file.size < this.limit_size) {
                    list_file_upload.push(file);
                } else {
                    flag = false;
                    rs_message.push('Ảnh ' + file.name + ' > ' + (this.limit_size / (1024 * 1024)) + 'M');
                    msg_anh = 'Ảnh upload không được lớn hơn ' + (this.limit_size / (1024 * 1024)) + 'M';
                }
            } else {
                flag = false;
                rs_message.push(file.name + ' không phải là ảnh');
            }
        }
        if (list_file_upload.length) {
            this.initLoad.emit(true);
            var COUNT_LIMIT = 0, LIMIT = list_file_upload.length;
            for (var i = 0; i < LIMIT; i++) {
                var file = list_file_upload[i];
                this.upload_one_file(file).then(r => {
                    COUNT_LIMIT++;
                    if (typeof (r) == 'string') {
                        rs_message.push(r);
                    }
                    event.target.value = '';
                    if (COUNT_LIMIT == LIMIT) {
                        this.finishLoad.emit(true);
                        if (rs_message.length) {
                            that.valueChanged.emit({
                                type: 'change_all'
                            });
                            this.obj_message.open({
                                title: 'Up ảnh bị lỗi',
                                content: rs_message.join("<br />"),
                                autoClose: true,
                            });
                        }
                    }
                });
            }
        } else {
            event.target.value = '';
            this.obj_message.open({
                title: 'Up ảnh bị lỗi',
                content: msg_anh + "<br />" + rs_message.join("<br />"),
                autoClose: true,
            });
        }
    }

}