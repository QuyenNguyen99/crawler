import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'selecttable',
    templateUrl: 'selecttable.component.html',
    styleUrls: ['selecttable.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelecttableComponent),
        multi: true
    }]
})
export class SelecttableComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };

    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }
    @Input()
    set data(vl: any) {
        this._data = vl;
    }
    get data() {
        return this._data;
    }
    _data: any;
    _link: any;
    @Input()
    set link(vl: any) {
        this._link = vl;
    }
    get link() {
        return this._link;
    }

    @Input()
    set placeholder(vl: any) {
        this._placeholder = vl;
    }
    get placeholder() {
        return this._placeholder;
    }
    _placeholder: any;

    @ViewChild('input') _input: any;

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router) { }
    id: any;
    ngOnInit() {
        this.id = 'tokeninput' + new Date().getTime();
    }

    ngAfterViewInit() {
        var that = this;
        // $('#' + this.id).tokenInput(this.link, {
        //         "allowCreation": false,
        //         "cacheResults": false,
        //         "crossDomain": false,
        //         "dataType": "json",
        //         "placeholder": $('#' + this.id).attr('placeholder'),
        //         "id": this.id + '1',
        //         "prePopulate": this._data ? this._data : [],
        //         "preventDuplicates": true,
        //         "theme": "facebook",
        //         "searchDelay": 300,
        //         "queryParam": "term",
        //         "minChars": 1,
        //         "hintText": "",
        //         "animateDropdown": false,
        // });
        // $('#' + this.id).change(function(e){
        //     that._value = $(this).val() && $(this).val() !== undefined ? $(this).val().split(',') : [];
        //     that.change(e);
        // })
    }
    _value: any = [];
    writeValue(value: any): void {
        if (value === undefined || value === null) {
            this._value = [];
        } else {
            this._value = value;
        }
        if (!GlobalFunction.is_array(this._value)) {
            if (this._value) {
                this._value = [this._value];
            } else {
                this._value = [];
            }
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

    change(event) {
        var that = this;
        setTimeout(function () {
            that.sendModelChange(that._value);
            that.valueChanged.emit({
                type: 'change',
                event: event,
            });
        });
    }
}