import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'daterangepicker',
    templateUrl: 'daterangepicker.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DaterangepickerComponent),
        multi: true
    }]
})
export class DaterangepickerComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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

    @ViewChild('input') _input: any;

    @Output()
    valueChanged = new EventEmitter<any>();

    public daterange: any = {};

    public options: any = {
        locale: { format: 'DD-MM-YYYY' },
        alwaysShowCalendars: false,
    };

    public selectedDate(value: any, datepicker?: any) {
        datepicker.start = value.start;
        datepicker.end = value.end;

        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
        this._value = value.start.format('DD-MM-YYYY')  + ' - ' + value.end.format('DD-MM-YYYY');
        this.sendModelChange(this._value);
        this.valueChanged.emit({
            type: 'change'
        });
    }



    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() { }
    datepicker: any;
    ngAfterViewInit() {
    }
    _value: any = '';
    writeValue(value: any): void {
        value = '01-02-2012 - 31-12-2013';
        if (value === undefined || value === null) {
            this._value = '';
        } else {
            this._value = value;
            var a = this._value.split(' - ');
            this.options['startDate'] = a[0];
            this.options['endDate'] = a[1];
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

    

}