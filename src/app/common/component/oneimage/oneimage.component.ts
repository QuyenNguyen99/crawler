import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { Global_DB } from '../../core/global_db';
declare var $: any;
declare var EXIF: any;

@Component({
    selector: 'oneimage',
    templateUrl: 'oneimage.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OneimageComponent),
        multi: true
    }]
})
export class OneimageComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    @ViewChild('button') _button: any;
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };
    @Input()
    data: any;

    _flag_upload: boolean = true;
    @Input()
    set flag_upload(vl: boolean) {
        this._flag_upload = vl;
    }
    get flag_upload() {
        return this._flag_upload;
    }

    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }
    theme: number = 1;
    @Input()
    set set_theme(vl: any) {
        this.theme = vl;
    }

    description: number = 1;
    @Input()
    set set_description(vl: any) {
        this.description = vl;
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
    initLoad = new EventEmitter<any>();

    @Output()
    finishLoad = new EventEmitter<any>();

    @Output()
    valueChanged = new EventEmitter<any>();

    _auto_rotate: boolean = false;
    @Input()
    set auto_rotate(vl: boolean) {
        this._auto_rotate = vl;
    }
    get auto_rotate() {
        return this._auto_rotate;
    }
    constructor(private route: ActivatedRoute, private router: Router, private db: Global_DB) { }
    ngOnInit() { }

    ngAfterViewInit() {
    }

    _orentation : number=0;
    loaded: boolean = false;
    fix_auto_rotate(e) {
        var that = this;
        if (this.auto_rotate && !this.loaded) {
            var path = e.path || (e.composedPath && e.composedPath());
            var img = path[0];
            var md = {};
            if(this._orentation) {
                GlobalFunction.loadImg(img, md, this._orentation);
                that.loaded = true;
            } else {
                EXIF.getData(img, function() {
                    var data = EXIF.getAllTags(img);
                    that._orentation = data.Orientation ?  data.Orientation : 1;
                    GlobalFunction.loadImg(img, md, that._orentation);
                    that.loaded = true;
                });
            }
        }
    }

    choice_image() {
        this._button.nativeElement.click();
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
            this.link_image = this._link + this._value;
        } else {
            this.link_image = '';
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
        if(!this.load_image) {
            this._upload.nativeElement.click();
        }
    }
    delete_image() {
        var that = this;
        that._value = '';
        that.sendModelChange(that._value);
        that.valueChanged.emit({
            type: 'change'
        });
    }
    obj_message: any;
    limit = 5 * 1024 * 1024;
    load_image: boolean = false;
    upload_image(event) {
        var that = this;
        var file = event.target.files[0];
        var a = file.type.split('/');
        if (a[0] == 'image') {
            if (file.size < this.limit) {
                this._orentation = 0;
                this.load_image = true;
                var reader = new FileReader();
                that.link_image = 'assets/image/loading-gear.gif';
                that.sendModelChange(that.link_image);
                this.initLoad.emit(true);
                var md = {};
                reader.onloadend = function () {
                    if(that._auto_rotate) {
                        EXIF.getData(file, function() {
                            var data = EXIF.getAllTags(file);
                            var orientation = data.Orientation ? data.Orientation : 1;
                            that._orentation = orientation;
                            that.loaded = false;
                        });
                    }
                    that.db.post(that._link_api, Object.assign({ content: reader.result, name: file.name }, that._attribute_api)).then(r => {
                        if (r.code == 200) {
                            that.link_image = r.attributes.link;
                            that._value = r.attributes.name;
                            that.sendModelChange(that._value);
                            event.target.value = '';
                            that.valueChanged.emit({
                                type: 'change',
                                attributes: r.attributes
                            });
                        } else {
                            event.target.value = '';
                            that.obj_message.open({
                                title: 'Lỗi file ảnh',
                                content: r.error,
                                autoClose: true,
                            });
                        }
                        that.finishLoad.emit(true);
                        that.load_image = false;
                    })
                }
                reader.readAsDataURL(file);
            } else {
                event.target.value = '';
                that.obj_message.open({
                    title: 'Lỗi file ảnh',
                    content: 'Không up ảnh > ' + (this.limit / (1024 * 1024)) + 'M',
                    autoClose: true,
                });
            }
        } else {
            event.target.value = '';
            that.obj_message.open({
                title: 'Lỗi file ảnh',
                content: 'File bạn tải lên không phải là file ảnh',
                autoClose: true,
            });
        }
    }

}