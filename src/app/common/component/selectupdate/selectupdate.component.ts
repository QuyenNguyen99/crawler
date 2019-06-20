import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'selectupdate',
    templateUrl: 'selectupdate.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectupdateComponent),
        multi: true
    }]
})
export class SelectupdateComponent implements ControlValueAccessor {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };

    @Input()
    set ignoreValue(value: any) {
        this._ignoreValue = value;
    }
    get ignoreValue() {
        return this._ignoreValue;
    }
    _ignoreValue: any = false;
    @Input()
    set hidden_search_box(value: boolean) {
        this._hidden_search_box = value;
    }
    _hidden_search_box: boolean = false;


    @Input()
    set set_flag_show_label(value: any) {
        this.flag_show_label = value;
    }
    get set_flag_show_label() {
        return this.flag_show_label;
    }
    flag_show_label: any = true;

    @Input()
    set show_value_default(value: any) {
        this._show_value_default = value;
    }
    get show_value_default() {
        return this._show_value_default;
    }
    _show_value_default: any = false;

    _obj_show_data_value: any = {};
    @Input()
    set show_data_value(value: any) {
        this._show_data_value = value;
        this._obj_show_data_value = this._show_data_value ? GlobalFunction.index(this._show_data_value, 'id') : {};
    }
    get show_data_value() {
        return this._show_data_value;
    }
    _show_data_value: any = false;


    _obj: any = {};
    _data: any = [];
    @Input()
    set data(vl: any) {
        this.set_data(vl);
        this.set_label();
    }
    get data() {
        return this._data;
    }

    set_data(vl) {
        var a = [];
        if (vl && vl.length) {
            for (var item of vl) {
                item.text = item.label ? item.label : (item.name ? item.name : item.text);
                item.alias = GlobalFunction.stripUnicode(item.text, ' ');
                item.show = true;
                item.show_search = false;
                a.push(item);
                this._obj[item.id] = item;
            }
        } else {
            this._obj = {};
        }
        this._data = a;
    }

    show: any = false;
    @Input()
    set set_show(vl: any) {
        var that = this;
        this.show = vl;
        if (this.show) {
            setTimeout(function () {
                var obj = $('#' + that.id + ' .input-search input');
                if (obj.length) {
                    obj.focus();
                }
            }, 10);
        }
    }

    @Input()
    set value(vl: any) {
        this._value = vl;
        this.set_label();
    }
    get value() {
        return this._value;
    }
    label: string = '';
    set_label() {
        if (this._value !== undefined && this._value !== null && this._value !== '' && this._data && this._obj[this._value]) {
            this.label = this._obj[this._value].text;
        } else {
            this.label = '';
        }
    }

    @Input()
    set placeholder(vl: any) {
        this._placeholder = vl;
    }
    get placeholder() {
        return this._placeholder;
    }
    _placeholder: any = '-- Chọn --';
    id: string = 'selectupdate';
    searchString: string = '';
    @Output('closed') closed: any = new EventEmitter();
    @Output('opened') opened: any = new EventEmitter();
    open() {
        var that = this;
        function click_func(e) {
            if (!e.target['closest']('#' + that.id)) {
                that.show = false;
                that.closed.emit({ type: 'closed' });
                document.body.removeEventListener('mousedown', click_func);
                document.body.removeEventListener('touchstart', click_func);
            }
        }
        if (!this._disabled) {
            this.id = 'selectupdate' + new Date().getTime();
            setTimeout(function () {
                var obj = $('#' + that.id + ' .input-search input');
                if (obj.length) {
                    obj.focus();
                }
            }, 10);
            var that = this;
            this.searchString = '';
            document.body.addEventListener('mousedown', click_func);
            document.body.addEventListener('touchstart', click_func);
            this.show = !this.show;
            if (this.show) {
                this.opened.emit({ type: 'opened', id: that.id });
                setTimeout(()=>{
                    if(this.droplist && this.droplist.nativeElement && this.droplist.nativeElement.children) {
                        var droplistItems =  $(this.droplist.nativeElement.children);
                        for (var i = 0; i < droplistItems.length; i++) {
                            if ($(droplistItems[i]).hasClass('active')) {
                                $(droplistItems[i]).find('input').focus();
                                break;
                            }
                        }

                    }
                });
            }
        }
    }

    search(event) {
        var code = event.which || event.keyCode;
        var alias = GlobalFunction.stripUnicode(this.searchString, ' ');
        for (var item of this._data) {
            if (!item.alias.includes(alias)) {
                item.show_search = false;
            } else {
                item.show_search = true;
            }
        }
    }



    @Input()
    cssImport: any;

    @Input()
    width: any;
    _disabled: boolean = false;
    @Input()
    set disabled(vl: any) {
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

    @Output()
    valueChanged = new EventEmitter<any>();

    constructor(private route: ActivatedRoute, private router: Router) { }

    _value: any = '';
    _old_value: any = '';
    writeValue(value: any): void {
        if (value === undefined || value === null) {
            this._value = '';
        } else {
            this._value = value;
        }
        this._old_value = this._value;
        this.set_label();
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
        this.droplist.nativeElement.children
        if (that._value !== event.id) {
            that._value = event.id;
            that.sendModelChange(that._value);
            that.set_label();
            that.valueChanged.emit({
                type: 'change',
                value: that._value,
                text: event.text,
                model: event,
            });
        }
        this.show = false;
    }

    check_show(model) {
        return model.show && (!this._ignoreValue || !GlobalFunction.is_array(this._ignoreValue) || !GlobalFunction.contains(model.id, this._ignoreValue)) && (!this.searchString || (this.searchString && model.show_search)) && (!this._show_data_value || this._obj_show_data_value[model.id] || (this._show_data_value && !this._obj_show_data_value[model.id] && this._show_value_default && model.id == this._old_value));
    }

    /**
     * Change active item
     * @param droplistItems : list items
     * @param isUp : check move pointer up
     */
    changeActive(droplistItems, isUp) {
        for (var i = 0; i < droplistItems.length; i++) {
            if ($(droplistItems[i]).hasClass('active')) {
                if (isUp) {
                    if (i > 0) {
                        $(droplistItems[i]).removeClass('active');
                        $(droplistItems[i - 1]).addClass('active');
                        $(droplistItems[i - 1]).find('input').focus();
                        this.index = i-1;
                    }
                } else {
                    if (i < droplistItems.length - 1) {
                        $(droplistItems[i]).removeClass('active');
                        $(droplistItems[i + 1]).addClass('active');
                        $(droplistItems[i + 1]).find('input').focus();
                        this.index = i+1;
                    }
                }
                return;
            }
        }
        this.index = 0;
        $(droplistItems[0]).addClass('active');
        $(droplistItems[0]).find('input').focus();
    }

    index: number = 0;
    UPKEY: any = 38;
    DOWNKEY: any = 40;
    ENTERKEY: any = 13;
    @ViewChild('droplist') droplist: any;

    /**
     * handle event key up/down/enter press
     * @param event event of keypress
     */
    keyPress(event) {
        if (this.UPKEY == event.which || this.DOWNKEY == event.which || this.ENTERKEY == event.which) {
            event.preventDefault();
            if (this.droplist && this.droplist.nativeElement) {
                var droplistItems = this.droplist.nativeElement.children;
                if (this.UPKEY == event.which) {
                    this.changeActive(droplistItems, true);
                } else if (this.DOWNKEY == event.which) {
                    this.changeActive(droplistItems, false);
                }
                if(this.ENTERKEY == event.which){
                    this.change({id: $(droplistItems[this.index]).attr('model')});
                }
            }
        }
    }

}