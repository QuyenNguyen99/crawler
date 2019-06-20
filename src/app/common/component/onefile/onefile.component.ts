import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { Global_DB } from '../../core/global_db';
declare var $: any;

@Component({
    selector: 'onefile',
    templateUrl: 'onefile.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OnefileComponent),
        multi: true
    }]
})
export class OnefileComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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
        this.setLinkImage();
    }
    _link: string;

    @Input()
    set link_api(vl: any) {
        this._link_api = vl;
    }
    _link_api: string;
    link_file: string;

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
        this.setLinkImage();
    }
    setLinkImage() {
        if (this._link && this._value) {
            this.link_file = this._link + this._value;
        } else {
            this.link_file = '';
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

    click_broswer() {
        this._upload.nativeElement.click();
    }
    delete_file() {
        var that = this;
        that._value = '';
        that.sendModelChange(that._value);
        that.valueChanged.emit({
            type: 'change'
        });
    }
    obj_message: any;
    limit = 40 * 1024 * 1024;
    check_file(file) {
        var a = file.type.split('/');
        var flag = false;
        if(a.length == 2 && GlobalFunction.contains(a[1],['vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'])) {
            flag = true;
        }
        return flag;
    }
    upload_image(event) {
        var that = this;
        var file = event.target.files[0];
        if (this.check_file(file)) {
            if (file.size < this.limit) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    that.db.post(that._link_api, Object.assign({ content: reader.result, name: file.name }, that._attribute_api)).then(r => {
                        if (r.code == 200) {
                            that.link_file = r.attributes.link;
                            that._value = r.attributes.name;
                            that.sendModelChange(that._value);
                            event.target.value = '';
                            that.valueChanged.emit({
                                type: 'change'
                            });
                        } else {
                            event.target.value = '';
                            that.obj_message.open({
                                title: 'Lỗi file',
                                content: r.error,
                                autoClose: true,
                            });
                        }
                    })
                }
                reader.readAsDataURL(file);
            } else {
                event.target.value = '';
                that.obj_message.open({
                    title: 'Lỗi file',
                    content: 'Không up file > ' + 40 + 'M',
                    autoClose: true,
                });
            }
        } else {
            event.target.value = '';
            that.obj_message.open({
                title: 'Lỗi file',
                content: 'File bạn tải lên không phải là file xls,xlsx',
                autoClose: true,
            });
        }
    }

}