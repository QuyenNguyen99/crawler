import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'arrayjson',
    templateUrl: 'arrayjson.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ArrayJsonComponent),
        multi: true
    }]
})
export class ArrayJsonComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };
    _list_type: any = [];

    @Input()
    set list_type(value: any) {
        if(typeof(value) == 'string') {
            value = JSON.parse(value);
        }
        this._list_type = value;
    }
    get list_type() {
        return this._list_type;
    }

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


    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() { }

    ngAfterViewInit() {
    }
    _value: any = [];
    writeValue(value: any): void {
        if (value === undefined || value === null) {
            this._value = [];
        } else {
            if(typeof(value) == 'string') {
                value = JSON.parse(value);
            }
            this._value = value;
        }
    }

    private sendModelChange(val: any) {
        this.propagateChange(this.getValueValue(val));
    }

    private getValueValue(val: any) {
        return val;
    }

    change() {
        this.sendModelChange(this._value);
        this.valueChanged.emit({type: 'change'});
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    add_block(index) {
        var list = [];
        var item = {};
        for(let it of this._list_type) {
            item[it.attribute] = null;
        }
        this._value.splice(index + 1,0,item);
        this.change();
    }

    remove_block(index) {
        this._value.splice(index,1);
        this.change();
    }

}