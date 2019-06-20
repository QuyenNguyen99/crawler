import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'dropdowndate',
    templateUrl: 'dropdowndate.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdowndateComponent),
        multi: true
    }]
})
export class DropdowndateComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };
    @Input()
    data: any;

    @Input()
    set year(value) {
        this._year = value;
        this.setYear();
    }
    _year: any = null;

    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }

    @ViewChild('input') _input: any;

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
    data_date: any = [
    ];
    data_month: any = [

    ];
    data_year: any = [

    ];
    _value_date: string;
    _value_month: string;
    _value_year: string;
    _value_date2: string;
    _value_month2: string;
    _value_year2: string;

    setDate(date_end) {
        var data: any = [{id: '', text: 'Ngày'}];
        for (var i = 1; i <= date_end; i++) {
            data.push({
                id: '' + (i < 10 ? '0' : '') + i,
                text: '' + (i < 10 ? '0' : '') + i,
            });
        }
        this.data_date = data;
    }

    setMonth() {
        this.data_month = [{id: '', text: 'Tháng'}];
        for (var i = 1; i <= 12; i++) {
            this.data_month.push({
                id: '' + (i < 10 ? '0' : '') + i,
                text: '' + (i < 10 ? '0' : '') + i,
            });
        }
    }

    setYear() {
        this.data_year = [{id: '', text: 'Năm'}];
        var year = new Date().getFullYear() - 18;
        if(this._year == 'now') {
            year = new Date().getFullYear();
        }
        for (var i = year; i >= 1960; i--) {
            this.data_year.push({
                id: '' + i,
                text: '' + i,
            });
        }
    }


    constructor(private route: ActivatedRoute, private router: Router) {
        this.setDate(this.getDateMax());
        this.setMonth();
        this.setYear();
    }

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
        this.setValue();
    }

    setValue() {
        if (this._value) {
            var date = this._value;
            if (typeof (this._value) != 'object') {
                date = new Date(this._value);
            }
            this._value_date = (isNaN(date.getDate())) ? null : ('' + (date.getDate() < 10 ? '0' : '') + date.getDate());
            this._value_month = (isNaN(date.getMonth())) ? null : ('' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1));
            this._value_year = (isNaN(date.getFullYear())) ? null : ('' + date.getFullYear());
            this._value_date2 = this._value_date;
            this._value_month2 = this._value_month;
            this._value_year2 = this._value_year;
        }
    }

    change_date($event) {
        this._value_date = $event.value;
        this.change();
    }

    getDateMax() {
        if(this._value_year && this._value_month) {
            if(this._value_month == '02') {
                if(new Date(this._value_year + '-02-29').getDate() != 29) {
                    return 28;
                } else {
                    return 29;
                }
            } else {
                if(new Date(this._value_year + '-' + this._value_month + '-31').getDate() != 31) {
                    return 30;
                }
            }
        }
        return 31;
    }

    change_month($event) {
        var that = this;
        this._value_month = $event.value;
        if(this.data_date.length != this.getDateMax() + 1) {
            this.setDate(this.getDateMax());
        }
        this.change();
    }

    change_year($event) {
        this._value_year = $event.value;
        if(this.data_date.length != this.getDateMax() + 1) {
            this.setDate(this.getDateMax());
        }
        this.change();
    }

    change() {
        var that = this;
        setTimeout(function () {
            var value_old = that._value;
            var flag = false;
            if (that._value_date || that._value_month || that._value_year) {
                that._value = that._value_year + '-' + that._value_month + '-' + that._value_date;
                flag = true;
            } else if (value_old && value_old !== undefined) {
                that._value = '';
                flag = true;
            }
            that.sendModelChange(that._value);
            that.valueChanged.emit({
                type: 'change'
            });
        }, 1);
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

}