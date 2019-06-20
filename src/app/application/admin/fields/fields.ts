import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../../common/core/global_validate';
import { GlobalFunction } from '../../../common/core/global_function';
import { FieldComponent } from "../../../common/fields/fields";
import { CONFIG } from 'app/config/config';
import { API } from 'app/config/api';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';



@Component({
    selector: 'ftextuser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <input type="text" [(ngModel)]="model[attribute]" [tabindex]="tabindex||0" (keyup)="change_emit($event)" #input />
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Ftextuser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}

@Component({
    selector: 'fcheckbox',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <div class="check_item">
                <input type="checkbox" [(ngModel)]="model[attribute]" #input />
                <span class="o_check"></span>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fcheckbox extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}


@Component({
    selector: 'fpassworduser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_addstaff" #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <input type="password" [(ngModel)]="model[attribute]" #input />
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fpassworduser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}




@Component({
    selector: 'ftextpwduser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_addstaff" #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <input style="width:calc(100% - 30px)" [type]="_inputOptions.type" [(ngModel)]="model[attribute]" #input />
            <a style="font-size: 22px;
            cursor: pointer;
            display: inline-block;" (click)="fucku()"><i class="icon icon-eye" style="vertical-align: middle;"></i></a>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Ftextpwduser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '', type: 'password'};
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    fucku(value) {
        this._inputOptions.type = (this._inputOptions.type=='text'?'password':'text');
    }
}

@Component({
    selector: 'fselectuser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="cbs_style_select">
                <selectupdate [(ngModel)]="model[attribute]" [data]="model['fk_table_' + attribute]" [disabled]="_inputOptions.disabled" (valueChanged)="change_value()" [options]="_inputOptions"></selectupdate>
                <span class="dow" [hidden]="_inputOptions.hide_html_drop">
                    <i class="icon icon-dow"></i>
                </span>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fselectuser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '', disabled: false, hide_html_drop: false};
    _labelOptions: any = { class: '' ,'html_label_require':'<b>*</b>'};
    _html_label_require: string = '<b>*</b>';
    @Input()
    set disabled(value) {
        this._inputOptions.disabled = value;
    }
    @Input()
    set hide_html_drop(value) {
        this._inputOptions.hide_html_drop = value;
    }
    @Input()
    set html_label_require(value) {
        this._html_label_require = value;
        this._labelOptions.html_label_require = value;
    }
    @Output('changeValue') changeValue: any = new EventEmitter();
    change_value(){
        this.changeValue.emit({
            type: 'change',
            value: this.model
        });
        super.change_value();
    }
}

@Component({
    selector: 'ftextarea',
    template: `
    <div [hidden]="checkShow()" class="cbs_item_row row">
        <div class="col-5-ipad cbs_style_label col-xs-12 ftextarea-title col-lg-5">
            <label for="cbsform_stausnow2" #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 ftextarea-container col-lg-7">
            <textarea style="white-space: pre;" rows="4" cols="50" class="ftextarea-content" [(ngModel)]="model[attribute]" #input></textarea>
            <div #error>{{showError()}}</div>
        </div>
    </div>    
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Ftextarea extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}

@Component({
    selector: 'fradio',
    template: `
    <div [hidden]="checkShow()" class="cbs_item_row row"  #div>
        <div class="col-6-ipad cbs_style_label col-xs-12 col-lg-6" #label></div>
        <div class="col-6-ipad cbs_style_ip col-xs-12 col-lg-6">
            <div class="cbs_check">
                <div *ngFor="let item of model['fk_table_' + attribute];" class="cbs_check_item">
                    <input [(ngModel)]="model[attribute]" name="{{attribute}}" type="radio" (click)="change_value()" [value]="item.id">
                    <span class="o_check">{{item.text}}</span>
                </div>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fradio extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: 'col-6-ipad cbs_style_label col-xs-12 col-lg-6' };
    _html_label_require: string = '<b>*</b>';
}


@Component({
    selector: 'fdropdowndateuser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <dropdowndate [(ngModel)]="model[attribute]" [year]="_year" (valueChanged)="change_value()"></dropdowndate>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fdropdowndateuser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    @Input()
    set year(value) {
        this._year = value;
    }
    _year: any = null;
}



@Component({
    selector: 'fmultiselectuser',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="cbs_style_select">
                <multiselect [(ngModel)]="model[attribute]" [disabled]="_inputOptions.disabled" [data]="model['fk_table_' + attribute]" (valueChanged)="change_value()"></multiselect>
                <span class="dow" [hidden]="_inputOptions.hide_html_drop">
                    <i class="icon icon-dow"></i>
                </span>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fmultiselectuser extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { multiple: true,class: '', disabled: false, hide_html_drop: false};
    _labelOptions: any = { class: '', 'html_label_require':'<b>*</b>'};
    _html_label_require: string = '<b>*</b>';
    @Input()
    set disabled(value) {
        this._inputOptions.disabled = value;
    }
    @Input()
    set hide_html_drop(value) {
        this._inputOptions.hide_html_drop = value;
    }
    @Input()
    set html_label_require(value) {
        this._html_label_require = value;
        this._labelOptions.html_label_require = value;
    }
}


@Component({
    selector: 'fselectother',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="select-other">
                <div class="cbs_style_select">
                    <selectupdate [(ngModel)]="model[attribute]" [data]="model['fk_table_' + attribute]" (valueChanged)="change_value()"></selectupdate>
                    <span class="dow">
                        <i class="icon icon-dow"></i>
                    </span>
                </div>
                <div *ngIf="!checkShow2()" class="mg15">
                    <input [(ngModel)]="model[attribute + '_other']" />
                </div>
                
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fselectother extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    checkShow2() {
        return this.model[this.attribute] != 9999999;
    }

    showError() {
        if (this.model._error_api[this.attribute] !== undefined) {
            return this.model._error_api[this.attribute];
        } else {
            if (this.model[this.attribute] != 9999999) {
                return this.model.attr_validate[this.attribute] === true ? this.model._validate.error_value(this.attribute) : '';
            } else {
                return this.model._validate.error_value(this.attribute + '_other');
            }

        }
    }
}


@Component({
    selector: 'fcitycounty',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="citycounty row">
            <div class="col-lg-6 col-xs-12 col-12-ipad col-sm-12">
                <div class="cbs_style_select">
                <selectupdate [(ngModel)]="model[attribute + '_city']" [data]="model['fk_table_' + attribute + '_city']" (valueChanged)="change_city()"></selectupdate>
                <span class="dow">
                    <i class="icon icon-dow"></i>
                </span>
            </div>
            </div>
            <div class="col-lg-6 col-xs-12 col-12-ipad col-sm-12 mgt15-xs">
                <div class="cbs_style_select">
                <selectupdate [(ngModel)]="model[attribute + '_county']" [data]="model['fk_table_' + attribute + '_county']" (valueChanged)="change_county()"></selectupdate>
                <span class="dow">
                    <i class="icon icon-dow"></i>
                </span>
            </div>
            </div> 
               
                <div class="col-lg-12 mg15">
                <input [(ngModel)]="model[attribute]" #input />
                </div>
                
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fcitycounty extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    change_city() {
        this.model.attr_validate[this.attribute] = true;
        this.model.attr_validate[this.attribute + '_city'] = true;
        this.model.reload_fk(this.attribute + '_county', {
            pid: this.model[this.attribute + '_city']
        });
    }
    change_county() {
        this.model.attr_validate[this.attribute] = true;
        this.model.attr_validate[this.attribute + '_county'] = true;
    }

    

    showErrorCommon(attr) {
        if (this._model._error_api[attr] !== undefined) {
            return this._model._error_api[attr];
        } else {
            return this._model.attr_validate[attr] === true ? this._model._validate.error_value(attr) : '';
        }
    }


    showError() {
        var attr_city = this.showErrorCommon(this.attribute + '_city');
        if(attr_city) {
            return attr_city;
        }
        var attr_county = this.showErrorCommon(this.attribute + '_county');
        if(attr_county) {
            return attr_county;
        }
        var attr = this.showErrorCommon(this.attribute);
        if(attr) {
            return attr;
        }
        return "";
    }
}


@Component({
    selector: 'foneimage',
    template: `
    <div [hidden]="checkShow()" *ngIf="theme == 1" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="oneimage row">
                <oneimage [(ngModel)]="model[attribute]" [flag_upload]="flag_upload" [set_theme]="theme" [set_description]="description" [link]="link" [auto_rotate]="auto_rotate" [link_api]="link_api" [attribute_api]="attribute_api" (valueChanged)="change_value2()"></oneimage>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    <div #div *ngIf="theme == 2">
    <oneimage [(ngModel)]="model[attribute]" [flag_upload]="flag_upload" [set_theme]="theme" [set_description]="description" [link]="link"  [auto_rotate]="auto_rotate" [link_api]="link_api" [attribute_api]="attribute_api" (valueChanged)="change_value2()"></oneimage>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class FOneimage extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    theme: number = 1;
    link: string;
    description: string;
    link_api: string;
    attribute_api: {};

    _flag_upload: boolean = true;
    @Input()
    set flag_upload(vl: boolean) {
        this._flag_upload = vl;
    }
    get flag_upload() {
        return this._flag_upload;
    }

    @Input()
    set set_theme(vl: any) {
        this.theme = vl;
    }

    @Input()
    set set_description(vl: any) {
        this.description = vl;
    }

    change_value2(event) {
        this.change_value();
        this.change_emit(event);
    }

    _auto_rotate: boolean = false;
    @Input()
    set auto_rotate(vl: boolean) {
        this._auto_rotate = vl;
    }
    get auto_rotate() {
        return this._auto_rotate;
    }
    afterInit() {
        var link = CONFIG.LINK_IMAGE + this._model.tableName() + '/';
        // if(this._model.id) {
        //     link += this._model.id + '/';
        // } else {
        link += 'main/';
        // }
        var that = this;
        setTimeout(function () {
            that.link = link;
            that.link_api = API.IMAGE.replace('{dbname}', that._model.dbname());
            that.attribute_api = {
                table: that._model.tableName(),
                id: that._model.id,
            };
        }, 1);
    }
}


@Component({
    selector: 'fmanyimages',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-6-ipad cbs_style_label col-xs-12 col-lg-2" #div2>
            <div class="pdl10" #label>
            </div>
        </div>
        <div class="col-12-ipad col-xs-12 col-lg-10" #div_input_1>
            <div class="manyimages pdl40-lg" #div_input_2>
                <manyimages [(ngModel)]="model[attribute]" [limit]="_limit" [link]="link" [link_api]="link_api" [attribute_api]="attribute_api" (valueChanged)="change_value2($event)"></manyimages>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class FManyimages extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _div2Options: any = { class: 'col-md-12 cbs_style_label col-xs-12 col-lg-2' };
    _divInput1Options: any = { class: 'col-md-12 col-xs-12 col-lg-10' };
    _divInput2Options: any = { class: 'manyimages pdl40-lg' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: 'pdl10' };
    _html_label_require: string = '<b>*</b>';
    link: string;
    link_api: string;
    attribute_api: {};

    @Input()
    set limit(vl) {
        this._limit = vl;
    }
    _limit: 20;
    _div_2_class = 'div2';

    @Output()
    valueChanged = new EventEmitter<any>();



    @ViewChild('div2') _div2: any;
    @ViewChild('div_input_1') _div_input_1: any;
    @ViewChild('div_input_2') _div_input_2: any;
    change_value2(event) {
        this.valueChanged.emit(event);
    }
    afterInit() {
        if (this._div2) {
            this.renderOptions(this._div2, this._div2Options);
        }
        if (this._div_input_1) {
            this.renderOptions(this._div_input_1, this._divInput1Options);
        }
        if (this._div_input_2) {
            this.renderOptions(this._div_input_2, this._divInput2Options);
        }
        var link = CONFIG.LINK_IMAGE + this._model.tableName() + '/';
        // if(this._model.id) {
        //     link += this._model.id + '/';
        // } else {
        link += 'main/';
        // }
        var that = this;
        setTimeout(function () {
            that.link = link;
            that.link_api = API.IMAGE.replace('{dbname}', that._model.dbname());
            that.attribute_api = {
                table: that._model.tableName(),
                id: that._model.id,
            };
        }, 1);
    }
}


@Component({
    selector: 'fonefile',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="onefile">
                <onefile [(ngModel)]="model[attribute]" [link]="link" [link_api]="link_api" [attribute_api]="attribute_api" (valueChanged)="change_value($event)"></onefile>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})

export class FOnefile extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    link: string;
    link_api: string;
    attribute_api: {};
    afterInit() {
        var link = CONFIG.LINK_FILE + this._model.tableName() + '/';
        // if(this._model.id) {
        //     link += this._model.id + '/';
        // } else {
        link += 'main/';
        // }
        var that = this;
        setTimeout(function () {
            that.link = link;
            that.link_api = API.FILE.replace('{dbname}', that._model.dbname());
            that.attribute_api = {
                table: that._model.tableName(),
                id: that._model.id,
            };
        }, 1);
    }
}


@Component({
    selector: 'fmanyfiles',
    template: `
    <div [hidden]="checkShow()" #div>
        
        <div class="manyfiles">
            <manyfiles [(ngModel)]="model[attribute]" [showConfirm]="_showConfirm" [limit]="_limit" [disabled_button]="disable" [position_button]="pos" [link]="link" [classes]="_classes" [link_api]="link_api" [attribute_api]="attribute_api" (valueChanged)="change_value_emit($event)"></manyfiles>        
        </div>
   
        <div #error>{{showError()}}</div>
        
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})

export class FManyfiles extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    _classes: any = '';
    link: string;
    link_api: string;
    attribute_api: {};

    @Input()
    set showConfirm(vl){
        this._showConfirm = vl;
    }
    _showConfirm: any = true;
    @Input()
    set limit(vl) {
        this._limit = vl;
    }
    _limit = 20;
    @Input()
    set position_button(vl: any) {
        this.pos = vl;
    }
    disable = false;
    @Input()
    set disabled_button(vl: any) {
        this.disable = vl;
    }
    @Input()
    set classes(vl) {
        if (vl) {
            this._classes = vl;
        }
    }
    change_value_emit(event) {
        this.model.attr_validate[this.attribute] = true;
        this.valueChanged.emit(event);

    }
    pos = false;
    afterInit() {
        var link = CONFIG.LINK_FILE + this._model.tableName() + '/';
        // if(this._model.id) {
        //     link += this._model.id + '/';
        // } else {
        link += 'main/';
        // }
        var that = this;
        setTimeout(function () {
            that.link = link;
            that.link_api = API.FILE.replace('{dbname}', that._model.dbname());
            that.attribute_api = {
                table: that._model.tableName(),
                id: that._model.id,
            };
        }, 1);
    }
}






@Component({
    selector: 'farrayjson',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="onefile row">
                <arrayjson [(ngModel)]="model[attribute]" [list_type]="list_type" (valueChanged)="change_value($event)"></arrayjson>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})

export class FArrayjson extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';

    @Input()
    list_type: any;
}



@Component({
    selector: 'fdaterangepicker',
    template: `
    <div [hidden]="checkShow()" #div>
        <div class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label #label>
            </label>
        </div>
        <div class="cbs_style_ip col-7-ipad col-xs-12 col-lg-7">
            <div class="onefile row">
                <daterangepicker [(ngModel)]="model[attribute]" (valueChanged)="change_vl($event)"></daterangepicker>
            </div>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})

export class FDaterangepicker extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    

    change_vl(event) {
        this.change_value();
        this.change_emit(event);
    }
}


@Component({
    selector: 'fjsontext',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <jsontext [(ngModel)]="model[attribute]" (valueChanged)="change_value()"></jsontext>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fjsontext extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}


@Component({
    selector: 'ftaginput',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <taginput [(ngModel)]="model[attribute]" (valueChanged)="change_value()"></taginput>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Taginput extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
}


@Component({
    selector: 'ftokeninput',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <tokeninput [(ngModel)]="model[attribute]" *ngIf="flag_token" [data]="model[attribute + '_data']" [link]="link" (valueChanged)="change_value()"></tokeninput>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Tokeninput extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    link: any;
    flag_token = true;
    ngOnInit() {
        var table_name = this._model.rule()[this.attribute]['token_table_name'];
        var field = this._model.rule()[this.attribute]['token_field'];
        this.link = API.TOKENINPUT.replace('{dbname}','crawlersystem') + '?table_name=' + table_name + '&field=' + field + '&token=' + GlobalFunction.readCookie('token');
    }
    @Input()
    set data(vl: any) {
        this._data = vl;
        var that = this;
        if(this._data && this._data !== undefined && this._data.length) {
            this.flag_token = false;
            setTimeout(function(){
                that.flag_token = true;
            });
        }
    }
    get data() {
        return this._data;
    }
    _data: any;
}


@Component({
    selector: 'fselecttable',
    template: `
    <div [hidden]="checkShow()" #div>
        <div *ngIf="_display_label" class="col-5-ipad cbs_style_label col-xs-12 col-lg-5">
            <label for="cbsform_name" #label>
            </label>
        </div>
        <div class="col-7-ipad cbs_style_ip col-xs-12 col-lg-7">
            <selecttable [(ngModel)]="model[attribute]" *ngIf="flag_token" [data]="model[attribute + '_data']" [link]="link" (valueChanged)="change_value()"></selecttable>
            <div #error>{{showError()}}</div>
        </div>
    </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Selecttable extends FieldComponent {
    _options: any = { class: 'cbs_item_row row' };
    _inputOptions: any = { class: '' };
    _labelOptions: any = { class: '' };
    _html_label_require: string = '<b>*</b>';
    link: any;
    flag_token = true;
    ngOnInit() {
        var table_name = this._model.rule()[this.attribute]['token_table_name'];
        var field = this._model.rule()[this.attribute]['token_field'];
        this.link = API.TOKENINPUT.replace('{dbname}','crawlersystem') + '?table_name=' + table_name + '&field=' + field + '&token=' + GlobalFunction.readCookie('token');
    }
    @Input()
    set data(vl: any) {
        this._data = vl;
        var that = this;
        if(this._data && this._data !== undefined && this._data.length) {
            this.flag_token = false;
            setTimeout(function(){
                that.flag_token = true;
            });
        }
    }
    get data() {
        return this._data;
    }
    _data: any;
}