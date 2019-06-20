import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'multiselect',
    templateUrl: 'multiselect.component.html',
    styleUrls: ['multiselect.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MultiselectComponent),
        multi: true
    }]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };

    @ViewChild('checkboxList') checkboxList: any;
    indexStart: number = 0;
    indexEnd: number = 0;

    checked_all: any = false;
    show_check_all: any = true;
    @Input()
    set set_show_check_all(vl: any) {
        this.show_check_all = vl;
    }
    not_sort_data: any = false;
    show: any = false;
    @Input()
    set set_show(vl: any) {
        this.not_sort_data = false;
        this.id = 'multiselect' + new Date().getTime();
        this.show = vl;
        var that = this;
        if (this.show) {
            this.index = 0;
            setTimeout(function () {
                var obj = $('#' + that.id + ' .input-search input');
                if (obj.length) {
                    obj.focus();
                }
            }, 30);
            setTimeout(() => {
                this.initIndex();
            }, 250);
        }
    }

    show_tooltip: any = false;
    @Input()
    set set_show_tooltip(vl: any) {
        this.show_tooltip = vl;
    }

    show_label: any = true;
    @Input()
    set set_show_label(vl: any) {
        this.show_label = vl;
    }

    disable_checked_true: any = false;
    @Input()
    set set_disable_checked_true(vl: any) {
        this.disable_checked_true = vl;
    }

    @Input()
    set set_label_show(vl: any) {
        this.label_show = vl;
    }

    _check_data: boolean = false;
    _check_value: boolean = false;
    label_show: boolean = true;
    label: string = '';
    _data: any = [];
    data_old: any = [];
    @Input()
    set data(vl: any) {
        var value = [];
        var value_old = [];
        if(vl && GlobalFunction.is_array(vl) && vl.length) {
            for (var item of vl) {
                item.alias = GlobalFunction.stripUnicode(item.text, ' ');
                if (item.id) {
                    item.checked = item.checked_default = false;
                    item.show = true;
                    value.push(item);
                    value_old.push(Object.assign({}, item));
                }
            }

        }
        this.data_old = value_old;
        this._data = value;
        this._check_data = true;
        this.set_data_checked();
    }
    get data() {
        return this._data;
    }
    set_data_sort_by_checked() {
        if (!this.not_sort_data) {
            var data_true = [];
            var data_false = [];
            for (var item of this._data) {
                if (item.checked) {
                    data_true.push(item);
                } else {
                    data_false.push(item);
                }
            }
            this._data = data_true.concat(data_false);
        }
    }
    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }

    @Input()
    set placeholder(vl: any) {
        this._placeholder = vl;
    }
    get placeholder() {
        return this._placeholder;
    }
    _placeholder: any;
    cl: any;

    @Input()
    set hidden_search_box(value: boolean) {
        this._hidden_search_box = value;
    }
    _hidden_search_box: boolean = false;

    @ViewChild('input') _input: any;

    @Input()
    cssImport: any;

    @Input()
    width: any;

    _disabled: boolean = false;
    @Input()
    set disabled(vl: boolean) {
        this._disabled = vl;
    }

    _options: any = {
    };
    @Input()
    set options(vl: any) {
        this._options = vl;
    }
    get options() {
        return this._options;
    }

    label_const: any;
    @Input()
    set set_label_const(vl: any) {
        this.label_const = vl;
    }
    _class_a: any = '';
    @Input()
    set class_a(vl: any) {
        this._class_a = vl;
    }
    get class_a() {
        return this._class_a;
    }
    _icons: any = [];
    @Input()
    set icons(vl: any) {
        this._icons = vl;
    }
    get icons() {
        return this._icons;
    }

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
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
        if (!GlobalFunction.is_array(this._value)) {
            if (this._value) {
                this._value = [this._value];
            } else {
                this._value = [];
            }
        }
        this._check_value = true;
        this.set_data_checked();
        this.set_checked_all();
    }

    set_data_checked() {
        if (this._check_value && this._check_data) {
            for (var item of this._data) {
                item.checked = item.checked_default = GlobalFunction.contains(item.id, this._value);
            }
            this.set_label();
            this.set_data_sort_by_checked();
        }
    }

    set_checked_all() {
        if (this._check_value && this._check_data) {
            var length = this._data.length;
            var count = 0;
            for (var item of this._data) {
                if (item.checked) {
                    count++;
                }
            }
            if (count == 0) {
                this.checked_all = false;
            } else {
                this.checked_all = count == length ? true : false;
            }
        }
    }

    set_label() {
        var a = [];
        for (var item of this._data) {
            if (item.checked) {
                a.push(item.text);
            }
        }
        this.label = a.join(', ');
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

    show_button: boolean = false;
    @Input()
    set set_show_button(vl: any) {
        this.show_button = vl;
    }
    change_all(event) {
        this.not_sort_data = true;
        var that = this;
        setTimeout(function () {
            for (var item of that._data) {
                if (!((that.disable_checked_true && item.checked_default) || item.disable_display_column)) {
                    item.checked = that.checked_all;
                }
            }
            if (!that.show_button) {
                var value = [];
                for (var item of that._data) {
                    item.checked = that.checked_all;
                    item.checked_default = that.checked_all;
                    if (item.checked) {
                        value.push(item.id);
                    }
                }
                that._value = value;
                that.set_label();
                that.sendModelChange(that._value);
                that.set_data_old();
                that.set_checked_all();
                that.valueChanged.emit({
                    type: 'change',
                    event: event,
                });
            }
        }, 5);
    }
    change(event) {
        this.not_sort_data = true;
        if (!this.show_button) {
            var that = this;
            setTimeout(function () {
                var value = [];
                for (var item of that._data) {
                    if (item.checked) {
                        item.checked_default = true;
                        value.push(item.id);
                    } else {
                        item.checked_default = false;
                    }
                }
                that._value = value;
                that.set_label();
                that.sendModelChange(that._value);
                that.set_data_old();
                that.set_checked_all();
                that.valueChanged.emit({
                    type: 'change',
                    event: event,
                });
            }, 5);
        }
    }

    add() {
        if (this.show_button) {
            var that = this;
            setTimeout(function () {
                var value = [];
                var event = [];
                for (var item of that._data) {
                    if (item.checked) {
                        item.checked_default = true;
                        value.push(item.id);
                        event.push(item);
                    } else {
                        item.checked_default = false;
                    }
                }
                that._value = value;
                that.set_label();
                that.sendModelChange(that._value);
                that.set_data_old();
                that.show = false;
                that.set_checked_all();
                that.valueChanged.emit({
                    type: 'change',
                    event: event,
                });
            }, 5);
        }
    }
    searchString: string = '';
    search() {
        var alias = GlobalFunction.stripUnicode(this.searchString, ' ');
        for (var item of this._data) {
            if (!item.checked && !item.alias.includes(alias)) {
                item.show = false;
            } else {
                item.show = true;
            }
        }
    }
    id: any = 'multiselect';
    openList() {
        this.not_sort_data = false;
        this.id = 'multiselect' + new Date().getTime();
        // setTimeout(function(){
        //     var obj = $('#' + that.id + ' .input-search input');
        //     if(obj.length) {
        //         obj.focus();
        //     }
        // },10);
        var that = this;
        this.searchString = '';
        function click_func(e) {
            if (!e.target['closest']('#' + that.id) || e.target.className.match(/btn_secondary/gi)) {
                that.show = false;
                that.reset();
                document.body.removeEventListener('click', click_func);
                document.body.removeEventListener('touchstart', click_func);
            }
        }
        document.body.addEventListener('click', click_func);
        document.body.addEventListener('touchstart', click_func);
        this.show = !this.show;
        if (this.show) {
            this.set_data_sort_by_checked();
            setTimeout(() => {
                this.initIndex();
            }, 250);
        }
    }

    reset() {
        var value = [];
        for (var item of this.data_old) {
            value.push(Object.assign({}, item));
        }
        this._data = value;
        this.set_data_checked();
        this.set_checked_all();
    }
    set_data_old() {
        var value = [];
        for (var item of this._data) {
            value.push(Object.assign({}, item));
        }
        this.data_old = value;
    }

    /**
     * Init index star/end for pointer when it moved by use press up/down key.
     */
    initIndex() {
        if (this.checkboxList && this.checkboxList.nativeElement && this.checkboxList.nativeElement.children) {
            // this.indexEnd = this.checkboxList.nativeElement.children.length - 1;
            for (var i = 0; i <= this.indexEnd; i++) {
                if ($(this.checkboxList.nativeElement.children[i]).hasClass('disabled')) {
                    continue;
                }
                this.indexStart = i;
                break;
            }
            for (var i = this.checkboxList.nativeElement.children.length - 1; i >0; i--){
                if ($(this.checkboxList.nativeElement.children[i]).hasClass('disabled')) {
                    continue;
                }
                this.indexEnd = i;
                break;
            }
            this.index = this.indexStart;
        }
    }

    /**
     * Change focus checkbox when press key up/down
     * @param checkboxItems List checkbox items which used for remvoe focusing class
     * @param isUpping pointer move up or not. true is up.
     */
    changeFocus(checkboxItems, isUpping) {
        $(checkboxItems[this.index]).find('span').removeClass('focusing');
        var operator = isUpping ? '--' : '++';
        var compare = isUpping ? ' > this.indexStart' : ' < this.indexEnd';
        // check checkbox items which were disabled in middle list
        eval(operator + 'this.index');
        for (var i = this.index; eval('i'+compare); eval('i' + operator)) {
            if ($(checkboxItems[i]).hasClass('disabled')) {
                eval(operator + 'this.index');
            } else {
                break;
            }
        }
        $(checkboxItems[this.index]).find('span').addClass('focusing');
        $(checkboxItems[this.index]).find('input').focus();
    }

    /**
     * Remove focusing class for all item checkbox
     * @param checkboxItems List checkbox items which used for remvoe focusing class
     */
    removeFocus(checkboxItems) {
        for (var i = 0; i < checkboxItems.length; i++) {
            $(checkboxItems[i]).find('span').removeClass('focusing');
        }
    }

    index: number = 0;
    @ViewChild('findlabel') findlabel: any;
    UPKEY: any = 38;
    DOWNKEY: any = 40;
    ENTERKEY: any = 13;

    /**
     * handle event key up/down/enter press
     * @param event event of keypress
     */
    keyPress(event) {
        if (this.UPKEY == event.which || this.DOWNKEY == event.which || this.ENTERKEY == event.which) {
            event.preventDefault();
            if (this.checkboxList && this.checkboxList.nativeElement) {
                var checkboxItems = this.checkboxList.nativeElement.children;
                if ($(this.findlabel.nativeElement).is(':focus') && this.UPKEY != event.which) {
                    this.removeFocus(checkboxItems);
                    this.initIndex();
                    $(checkboxItems[this.index]).find('span').addClass('focusing');
                    $(checkboxItems[this.index]).find('input').focus();
                } else {
                    if (this.UPKEY == event.which && this.index > this.indexStart) {
                        this.changeFocus(checkboxItems, true);
                    } else if (this.DOWNKEY == event.which && this.index < this.indexEnd) {
                        this.changeFocus(checkboxItems, false);
                    }
                    if (this.ENTERKEY == event.which) {
                        $(checkboxItems[this.index]).find('input').click();
                    }
                }
            }
        }
    }

    /**
     * Handle mouse over event on checkbox list
     * @param event event of mouseover
     */
    mouseOver(event) {
        $(this.checkboxList.nativeElement.children[this.index]).find('span').removeClass('focusing');
    }

    /**
     * Handle mouse out event on checkbox list
     * @param event event of mouseout
     */
    mouseOut(event) {
        $(this.checkboxList.nativeElement.children[this.index]).find('span').addClass('focusing');
    }

    /**
     * Handle mouse click event on checkbox
     * @param event event of mouseclick
     */
    mouseClick(event) {
        var itemClicked = event.target;
        this.index = parseInt($(itemClicked).attr('index'));
        $(this.checkboxList.nativeElement.children[this.index]).find('span').addClass('focusing');
    }
}