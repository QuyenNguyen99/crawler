import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../../common/core/global_validate';
import { GlobalFunction } from '../../../common/core/global_function';
import { FieldComponent } from "../../../common/fields/fields";
import { CONFIG } from 'app/config/config';
import { API } from 'app/config/api';

declare var $: any;

class FieldtableComponent extends FieldComponent {
    @Output()
    valueChanged = new EventEmitter<any>();

    constructor() {
        super();
    }
    ngOnInit() { }

    change_value(event: any = false) {
        this.valueChanged.emit(event);
    }
}

@Component({
    selector: 'fchecktable',
    template: `
        <div class="check_item {{checked ? 'active' : ''}}">
            <input name="" type="checkbox" [checked]="model[attribute]" (change)="change_value($event)" />
            <span class="o_check"></span>
        </div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fchecktable extends FieldtableComponent {
    checked: any = false;
    change_value(event: any = false) {
        this.checked = true;
        this.model[this.attribute] = !this.model[this.attribute];;
        super.change_value(event);
    }
}

@Component({
    selector: 'fselecttable',
    template: `
    <selectupdate #selectupdate [(ngModel)]="model[attribute]" 
    [show_value_default]="_show_value_default" 
    [show_data_value]="_show_data_value" 
    [ignoreValue]="_ignoreValue" 
    [data]="model['fk_table_' + attribute]"
    [placeholder]="'-- Chọn --'" 
    (valueChanged)="change_value($event)" 
    (closed)="close()"
    (opened)="handleShowDropdownContent()"></selectupdate>
    <div #error>{{showError()}}</div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fselecttable extends FieldtableComponent implements AfterViewInit {

    _ignoreValue: any = [];
    _model: any;
    _attribute: any;

    _show_data_value: any = false;
    @Input()
    set show_data_value(vl: any) {
        this._show_data_value = vl;
    }
    get show_data_value() {
        return this._show_data_value;
    }

    _show_value_default: any = false;
    @Input()
    set show_value_default(vl: any) {
        this._show_value_default = vl;
    }
    get show_value_default() {
        return this._show_value_default;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        var that = this;
        if (this._openselect) {
            setTimeout(function () {
                that.open();
            });
        }
    }

    @Input()
    set ignoreValue(vl) {
        this._ignoreValue = vl;
    }
    @Input()
    set model(vl) {
        this._model = vl;
    }
    get model() {
        return this._model;
    }
    @Input()
    set attribute(vl) {
        this._attribute = vl;
    }
    get attribute() {
        return this._attribute;
    }

    _openselect: any = false;
    @Input()
    set openselect(vl) {
        this._openselect = vl;
    }

    _rownumber: any = 0;
    @Input()
    set rownumber(vl) {
        if (vl) {
            this._rownumber = vl;
        }
    }
    get rownumber() {
        return this._rownumber;
    }

    _numberrows: any = 0;
    @Input()
    set numberrows(vl) {
        this._numberrows = vl;
    }
    get numberrows() {
        return this._numberrows;
    }


    @ViewChild('selectupdate') _selectupdate: any;

    rowHeight: any = 0;
    tableCss: any = null;
    handleShowDropdownContent() {
        var that = this;
        setTimeout(() => {
            // that.tableCss = $('#table-container').attr('style');
            var title = $('#' + that._selectupdate.id);
            var offsetTopTitle = title.offset().top;
            var offsetLeftTitle = title.offset().left;
            var titleHeight = title.outerHeight(true);

            var content = $('#' + that._selectupdate.id + ' .selectupdate-toggle');

            var contentHeight = content.outerHeight(true);

            if (0 == that.rowHeight) {
                that.rowHeight = $('#table-container tbody tr').outerHeight();
            }
            var limitRow = Math.floor(contentHeight / that.rowHeight) + 1;

            // if(that.numberrows < 2 * limitRow){
            //     $('#table-container').css({'overflow': 'hidden'});
            // }

            var isUp = false;// dropdown content no display up
            // case last rows of table but little than limit row
            if (limitRow > that.numberrows - that.rownumber) {
                isUp = true;
            } else {
                isUp = false;
            }
            // case first rows of table but little than limit row. This case is highest priority. Using for table has rows is little than limit row
            if (that.rownumber < limitRow) {
                isUp = false;
            }

            var css = {};

            if (that.numberrows >= 2 * limitRow) {
                if (isUp) {
                    css['bottom'] = '100%';
                    css['margin-bottom'] = '3px';
                } else {
                    css['top'] = '100%';
                    css['margin-top'] = '3px';
                }
            } else {
                css['margin-top'] = '3px';
                css['position'] = 'fixed';
                css['top'] = (offsetTopTitle + titleHeight) + 'px';
                css['width'] = title.width() + 'px';
                css['left'] = offsetLeftTitle + 'px';
            }
            content.css(css);
        });
    }
    open() {
        // if (this._model['fk_table_' + this._attribute] && 0 < this._model['fk_table_' + this._attribute].length) {
        //     for (var index in this._model['fk_table_' + this._attribute]) {
        //         if (-1 != this._ignoreValue.indexOf(this._model['fk_table_' + this._attribute][index]['text'])) {
        //             this._model['fk_table_' + this._attribute].splice(index, 1);
        //         }
        //     }
        // }
        // this.tableCss = $('#table-container').css(['overflow-x', 'overflow-y']);

        this._selectupdate.open();
    }

    close() {
        // $('#table-container').attr('style', this.tableCss);
    }
}



@Component({
    selector: 'fmultiselecttable',
    template: `
    <selectupdate #selectupdate [(ngModel)]="model[attribute]" [options]="_inputOptions" [data]="model['fk_table_' + attribute]" (valueChanged)="change_value($event)"></selectupdate>
    <div #error>{{showError()}}</div>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FieldComponent),
        multi: true
    }]
})
export class Fmultiselecttable extends FieldtableComponent {
    _inputOptions: any = { multiple: true };
}