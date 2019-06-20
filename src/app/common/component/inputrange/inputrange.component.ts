import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'inputrange',
    templateUrl: 'inputrange.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputrangeComponent),
        multi: true
    }]
})
export class InputrangeComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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

    _options: any = {};
    @Input()
    set options(vl: any) {
        this._options = vl;
    }
    get options() {
        return this._options;
    }

    @ViewChild('input') _input: any;

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router) { }
    id: any;
    ngOnInit() {
        this.id = 'inputrange' + new Date().getTime();
    }

    ngAfterViewInit() {
        var that = this;
        if(this._value && this._value.indexof(',') >= 0) {
            this._options.value = this._value.split(',');
        }
        $('#' + this.id).slider(this._options);
        $('#' + this.id).change(function(e){
            that._value = $(this).val() && typeof($(this).val()) == 'object' ?  $(this).val().join(',') : $(this).val();
            that.change(e);
        })
    }
    _value: any = [];
    writeValue(value: any): void {
        this._value = value;
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