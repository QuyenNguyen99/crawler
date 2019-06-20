import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'jsonitem',
    templateUrl: 'jsonitem.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => JsonitemComponent),
        multi: true
    }]
})
export class JsonitemComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };
    _list_type: any = [];

    
    @Input() type: string = '';
    @Input() name: string = '';
    @Input() item_block: any = {};
    @Input() item_type: any = {};

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
            this._value = '';
        } else {
            this._value = value;
        }
    }

    private sendModelChange(val: any) {
        this.propagateChange(this.getValueValue(val));
    }

    private getValueValue(val: any) {
        return val;
    }

    change_value() {
        this.sendModelChange(this._value);
        this.valueChanged.emit({type: 'change'});
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

}