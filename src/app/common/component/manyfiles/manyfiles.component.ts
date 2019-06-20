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
    selector: 'manyfiles',
    templateUrl: 'manyfiles.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ManyfilesComponent),
        multi: true
    }]
})
export class ManyfilesComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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

    @Input()
    cssImport: any;

    @Input()
    width: any;

    @Input()
    disabled: any;

    @Input()
    options: any;

    @Output()
    valueChanged = new EventEmitter<any>();

    @Input()
    classes: any;

    @Input()
    set showConfirm(vl) {
        this._showConfirm = vl;
    }
    _showConfirm: any;

    constructor(private route: ActivatedRoute, private router: Router, private db: Global_DB) { }

    ngOnInit() { }

    ngAfterViewInit() {
    }

    @Input()
    set position_button(vl: any) {
        this.pos = vl;
    }
    pos = false;

    disable = false;
    @Input()
    set disabled_button(vl: any) {
        this.disable = vl;
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
    obj_delete: any;
    handleDelete(item) {
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
            type: 'delete'
        });
        return Promise.resolve(true);
    }
    delete_file(item) {
        var that = this;
        if (this._showConfirm) {
            this.obj_delete.open({
                title: 'Xóa file',
                content: 'Bạn có chắc chắn muốn xóa file này không?',
                closeLabel: 'Hủy',
                confirm: function () {
                    return that.handleDelete(item);
                }
            });
        } else {
            this.handleDelete(item);
        }
    }

    click_broswer() {
        this._upload.nativeElement.click();
    }

    upload_one_file(file) {
        var that = this;
        var reader = new FileReader();
        var def = new Deferred();
        reader.onloadend = function () {
            that.db.post(that._link_api, Object.assign({ content: reader.result, name: file.name }, that._attribute_api)).then(r => {
                if (r.code == 200) {
                    r.attributes['link'] = that._link + r.attributes['name'];
                    that.list.unshift(r.attributes);
                    that._value = JSON.stringify(that.list);
                    def.resolve(r.attributes);
                } else {
                    def.resolve(r.error);
                }
            })
        }
        reader.readAsDataURL(file);
        return def.promise;
    }
    obj_message: any;
    limit_size = 10 * 1024 * 1024;
    check_file(file) {
        return GlobalFunction.check_file(file) || GlobalFunction.check_image(file);
    }
    upload_file(event) {
        var that = this;
        var flag = true;
        var rs_message = [];
        var list_file_upload = [];
        var length = event.target.files.length;
        if (length + this.list.length > this._limit) {
            this.obj_message.open({
                title: 'Lỗi tải tập tin',
                content: 'Bạn không được upload quá ' + this._limit + ' file',
                autoClose: true,
            });
            return false;
        }
        for (var i = 0; i < length; i++) {
            var file = event.target.files[i];
            var a = file.type.split('/');
            if (this.check_file(file)) {
                if (file.size < this.limit_size) {
                    list_file_upload.push(file);
                } else {
                    flag = false;
                    rs_message.push('File ' + file.name + ' > ' + 10 + 'M');
                }
            } else {
                flag = false;
                // on show this message once
                var a: any = ['.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.rtf', '.rar', '.zip', '.png', '.jpg', '.ico', '.jpeg', '.gif', '.svg'];
                let message = ' Hệ thống chỉ hỗ trợ định dạng tập tin ' + a.join(' ');
                if (rs_message.indexOf(message) < 0) {
                    rs_message.push(message);
                }
            }
        }
        if (list_file_upload.length) {
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
                        that.sendModelChange(that._value);
                        that.valueChanged.emit({
                            type: 'upload'
                        });
                        if (rs_message.length) {
                            this.obj_message.open({
                                title: 'Lỗi tải tập tin',
                                content: rs_message.join("\n"),
                                autoClose: true,
                            });
                        }
                    }
                });
            }
        } else {
            event.target.value = '';
            this.obj_message.open({
                title: 'Lỗi tải tập tin',
                content: rs_message.join("\n"),
                autoClose: true,
            });
        }
    }

}