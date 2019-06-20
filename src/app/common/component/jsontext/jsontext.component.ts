import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'jsontext',
    templateUrl: 'jsontext.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => JsontextComponent),
        multi: true
    }]
})
export class JsontextComponent implements ControlValueAccessor {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router) { }
    data: any = [];
    _value: any = '';
    writeValue(value: any): void {
        if (value === undefined || value === null || !value) {
            this._value = {};
        } else {
            this._value = typeof(value) == 'string' ? JSON.parse(value) : {};
        }
        for(var k in this._value) {
            this.data.push({
                key     : k,
                value   : this._value[k],
            });
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

    add_item(i: any = 0) {
        var item = {key: '', value: ''};
        this.data.splice(i,0, item);
        this.change();
    }

    delete_item(i: any = 0) {
        this.data.splice(i,1);
        this.change();

    }

    change() {
        var that = this;
        var value = {};
        for(var item of this.data) {
            value[item.key] = item.value;
        }
        that._value = value;
        that.sendModelChange(that._value ? JSON.stringify(that._value) : '');
        that.valueChanged.emit({
            type: 'change'
        });
    }

}