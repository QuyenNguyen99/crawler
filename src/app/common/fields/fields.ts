import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../core/global_validate';
import { GlobalFunction } from '../core/global_function';

export class FieldComponent implements OnInit, AfterViewInit {
    @Output()
    onInitValue = new EventEmitter<string>();
    @Output()
    valueChanged = new EventEmitter<string>();
    change_emit($event) {
        this.valueChanged.emit($event);
    }
    _tabindex: any;
    @Input()
    set tabindex(val){this._tabindex = val;}
    get tabindex(){return this._tabindex;}
    @Input()
    set readonly(value: Observable<any> | any) { this._readonly = value; }
    get readonly() { return this._readonly; }
    @Input()
    set model(value: Observable<any> | any) { this._model = value; }
    get model() { return this._model; }
    @Input()
    set list(value: Observable<any> | any) { this._list = value; }
    get list() { return this._list; }
    @Input()
    set attribute(value: string) { this._attribute = value; }
    get attribute() { return this._attribute; }
    @Input()
    set id(value: string) { this._id = value; }
    get id() {
        if (this._id) { return this._id; }
        if (this._model) {
            this._id = this._model.constructor.name.toLowerCase() + '-' + this.attribute.toLowerCase();
            return this._id;
        }
        return '';
    }
    @Input()
    set options(value: any) { this._options = value; }
    get options() { return this._options; }
    @Input()
    set div_outer(value: boolean) { this._div_outer = value; }
    get div_outer() { return this._div_outer; }
    @Input()
    set inputOptions(value: any) { this._inputOptions = value; }
    get inputOptions() { return this._inputOptions; }
    @Input()
    set errorOptions(value: any) { this._errorOptions = value; }
    get errorOptions() { return this._errorOptions; }
    @Input()
    set labelOptions(value: any) { this._labelOptions = value; }
    get labelOptions() {
        if (!this._labelOptions.for && this._model && this._attribute) {
            this._labelOptions.for = this.id;
        }
        return this._labelOptions;
    }
    _display_label: boolean = true;
    @Input()
    set display_label(value: any) { this._display_label = value; }
    
    @Input()
    set html_label_require(value: any) { this._html_label_require = value; }
    get html_label_require() {
        return this._html_label_require;
    }
    @Input()
    set labelValue(value: any) {
        this._labelValue = value;
        this.setLabelHtml();
    }
    get labelValue() {
        if (!this._labelValue && this._model && this._model.attributeLabels()[this.attribute]) {
            this._labelValue = this._model.attributeLabels()[this.attribute];
        }
        return this._labelValue;
    }
    @Input()
    set placeHolder(value: any){
        this._placeholder = value;
    }
    get placeHolder(){
        return this._placeholder;
    }
    _readonly: any = false;
    _list: any;
    _model: any;
    _attribute: string;
    _id: string;
    _options: any = { class: 'form-group' };
    _div_outer = true;
    _inputOptions: any = { class: 'form-control' };
    _errorOptions: any = { class: 'help-block' };
    _labelOptions: any = { class: 'control-label' };
    _labelValue: string;
    _errorValue: string;
    _placeholder: string;


    @ViewChild('input') _input: any;
    @ViewChild('label') _label: any;
    @ViewChild('div') _div: any;
    @ViewChild('error') _error: any;
    @ViewChild('hint') _hint: any;

    constructor() { }

    ngOnInit() {}

    _html_label_require: string = '<b>*</b>';

    setReadonly() {
        if(this._input) {
            if(this._readonly) {
                this._input.nativeElement.setAttribute('readonly', true);
            } else {
                this._input.nativeElement.removeAttribute('readonly');
            }
        }
    }
    setPlaceHolder(){
        if(this._input){
            if(this._placeholder){
                this._input.nativeElement.setAttribute('placeholder', this._placeholder);
            }else{
                this._input.nativeElement.removeAttribute('placeholder');
            }
        }
    }

    setLabelHtml() {
        let rule_attribute = this._model.rule()[this.attribute];
        if(this._label) {
            this._label.nativeElement.innerHTML = this.labelValue;
        }
        if (rule_attribute && typeof (rule_attribute) == 'object' && rule_attribute.require && (typeof (rule_attribute.require) != 'object' || rule_attribute.require.empty) && this._label) {
            this._label.nativeElement.innerHTML += ' ' + this._html_label_require;
        }
    }

    ngAfterViewInit() {
        var self = this;
        let rule_attribute = this._model.rule()[this.attribute];
        if (this._div) { this.renderOptions(this._div, this.options); }
        if (this._label) {
            this.renderOptions(this._label, this.labelOptions);
            if(typeof(this.labelOptions.html_label_require)!= undefined && this.labelOptions.html_label_require) {
                this._html_label_require = this.labelOptions.html_label_require;
            }
            this.setLabelHtml();
        }
        if (this._input) {
            this.setReadonly();
            this.setPlaceHolder();
            this.renderOptions(this._input, this.inputOptions);
            this._input.nativeElement.addEventListener('change', function () { self.model.attr_validate[self.attribute] = true;self.model._attr_submit[self.attribute] = false; this.removeEventListener('change'); });
            this._input.nativeElement.addEventListener('focus', function () { self.model.attr_validate[self.attribute] = true;self.model._attr_submit[self.attribute] = false; this.removeEventListener('focus'); });
            this._input.nativeElement.setAttribute('name', this.attribute);
            this._input.nativeElement.addEventListener('change', function () { self.model._error_api[self.attribute] = undefined;self.model._attr_submit[self.attribute] = false; });
            if (GlobalFunction.contains(this._input.nativeElement.getAttribute('type'), ['text', 'password'])) {
                this._input.nativeElement.addEventListener('keydown', function () { self.model._error_api[self.attribute] = undefined;self.model._attr_submit[self.attribute] = false; self.model.attr_validate[self.attribute] = true; });
            }

            if (rule_attribute && typeof (rule_attribute) == 'object' && rule_attribute.require && typeof (rule_attribute.require) == 'object' && rule_attribute.require.size && rule_attribute.require.size !== undefined) {
                if(typeof(rule_attribute.require.size) == 'object') {
                    this._input.nativeElement.setAttribute('maxlength', rule_attribute.require.size.value);
                } else {
                    if(rule_attribute.require.size === true) {
                        this._input.nativeElement.setAttribute('maxlength', rule_attribute.size);
                    } else {
                        this._input.nativeElement.setAttribute('maxlength', rule_attribute.require.size);
                    }
                    
                }
                
            }
        }
        if (this._error) { this.renderOptions(this._error, this.errorOptions); }
        if (this._hint) { this.renderOptions(this._hint, this.labelOptions); }
        this.afterInit();
    }

    change_value() {
        this._model.attr_validate[this.attribute] = true;
        this._model._attr_submit[this.attribute] = false;
    }

    afterInit() {

    }
    renderOptions(el, options) {
        if (el && el.nativeElement && options) {
            for (var i in options) {
                el.nativeElement.setAttribute(i, options[i]);
            }
        }
    }

    showError() {
        var m = '';
        if(this.attribute) {
            if(!this._model._error_api) {
                this._model._error_api = {};
            }
            if (this._model._error_api[this.attribute] !== undefined) {
                m = this._model._error_api[this.attribute];
            } else {
                if(!this._model.attr_validate) {
                    this._model.attr_validate = {};
                }
                m = this._model.attr_validate[this.attribute] === true ? this._model._validate.error_value(this.attribute) : '';
            }
        }
        return m;
    }

    checkShow() {
        let attr = this._model._validate.rule[this.attribute];
        return attr && attr.display && !this._model._validate.evalCondition(attr.display);
    }
}

@Component({
    selector: 'ftext',
    template: `
        <div [hidden]="checkShow()" #div>
        <label #label></label>
        <input type="text" [(ngModel)]="model[attribute]" #input />
        <div #error>{{showError()}}</div>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Ftext extends FieldComponent {
}

@Component({
    selector: 'fpassword',
    template: `
        <div [hidden]="checkShow()" #div>
        <label #label></label>
        <input type="password" [(ngModel)]="model[attribute]" #input />
        <div #error>{{showError()}}</div>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fpassword extends FieldComponent {
}