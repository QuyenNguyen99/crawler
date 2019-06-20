import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'taginput',
    templateUrl: 'taginput.component.html',
    // styleUrls: ['taginput.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TaginputComponent),
        multi: true
    }]
})
export class TaginputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
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
        this.id = 'taginput' + new Date().getTime();
        console.log(this["_value"]);
    }

    ngAfterViewInit() {
    }
    _value: any = [];
    writeValue(value: any): void {
        if (value === undefined || value === null) {
            this._value = [];
        } else {
            this._value = value;
        }
        if(this._value && typeof(this._value) == 'string' && ((this._value.match(/^\[/gi) && this._value.match(/\]$/gi)) || (this._value.match(/^\{/gi) && this._value.match(/\}$/gi)))) {
            this._value = JSON.parse(this._value);
        }
        if (!GlobalFunction.is_array(this._value)) {
            if (this._value) {
                this._value = this._value.split(',');
            } else {
                this._value = [];
            }
        }
        if(this._value.length) {
            this.valueOnlyInValue();
        }
        //console.log(this._value.toString());
        $("#"+this.id+"_paste").html(this._value.toString());
    }

    valueOnlyInValue() {
        if(this._value && this._value.length) {
            var obj = {};
            for(var item of this._value) {
                obj[item] = 1;
            }
            this._value = Object.keys(obj);
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
        if(this._value.length) {
            this.valueOnlyInValue();
        }
        setTimeout(function () {
            that.sendModelChange(that._value);
            that.valueChanged.emit({
                type: 'change',
                event: event,
            });
        });
    }
}