import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { ValueTransformer } from '@angular/compiler/src/util';
declare var $: any;

@Component({
    selector: 'tokeninputoperation',
    templateUrl: 'tokeninputoperation.component.html',
    styleUrls: ['tokeninputoperation.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TokeninputoperationComponent),
        multi: true
    }]
})
export class TokeninputoperationComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    // ControlValueAccessor props
    private propagateTouch = () => { };
    private propagateChange = (_: any) => { };
    total: any =[0];
    flagadd: any = false;

    @ViewChildren('tokeninputwrap') things: QueryList<any>;

    @Input()
    set value(vl: any) {
        this._value = vl;
    }
    get value() {
        return this._value;
    }
    @Input()
    set data(vl: any) {
        if(vl && vl.length) {
            for(var item of vl) {
                if(!item.id && item._id) {
                    item.id = item._id;
                }
            }
        }
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
        this.id = 'tokeninputoperation' + new Date().getTime();
    }

    ngAfterViewInit() {
        var that = this;
        this.things.changes.subscribe(t => {
            that._value = {};
            for(var index=0;index<this.total.length;index++)
            {
                if ($('#' + this.id + '_' + index).parent().find('ul').length==0)
                {
                    $('#' + this.id + '_' + index).tokenInput(this.link, {
                            "allowCreation": false,
                            "cacheResults": false,
                            "crossDomain": false,
                            "dataType": "json",
                            'appendTo': '#tokeninputoperation_' +  this.id + '_' + index,
                            "placeholder": $('#' + this.id + '_' + index).attr('placeholder'),
                            "id": this.id + '_' + index,
                            "prePopulate": this._data ? this._data : [],
                            "preventDuplicates": true,
                            "theme": "facebook",
                            "searchDelay": 300,
                            "queryParam": "term",
                            // "debug":  true,
                            "minChars": 1,
                            "hintText": "",
                            "animateDropdown": false,
                    });
                    $('#' + this.id + '_' + index).change(function(e){
                        var valuearr = $(this).val() && $(this).val() !== undefined ? $(this).val().split(',') : [];
                        if(valuearr.length>0)
                        {
                            var opt = $("#tkoperation_"+this.id).text();

                            var current = {};
                            current[opt] =valuearr;
                            that._value[index] = current;
                        }
                        else
                        {
                            delete that._value[index];
                        }
                        that.change(e);
                    })
                }
                var this_ = $('#' + this.id + '_' + index);
                var valuearr = this_.val() && this_.val() !== undefined ? this_.val().split(',') : [];
                if(valuearr.length>0)
                {

                    var opt = $("#tkoperation_"+this.id + '_' + index).text();
    
                    var current = {};
                    current[opt] =valuearr;
                    that._value[index] = current;
                    //that.change(e);
                }
                else
                {
                    delete that._value[index];
                }
            }
            that.change(false);
            
        });
        
    $('#' + this.id + '_0').tokenInput(this.link, {
        "allowCreation": false,
        "cacheResults": false,
        "crossDomain": false,
        "dataType": "json",
        'appendTo': '#tokeninputoperation_' +  this.id + '_0',
        "placeholder": $('#' + this.id + '_0').attr('placeholder'),
        "id": this.id + '_0',
        "prePopulate": this._data ? this._data : [],
        "preventDuplicates": true,
        "theme": "facebook",
        "searchDelay": 300,
        "queryParam": "term",
        // "debug":  true,
        "minChars": 1,
        "hintText": "",
        "animateDropdown": false,
    });
    $('#' + this.id + '_0').change(function(e){
        var valuearr = $(this).val() && $(this).val() !== undefined ? $(this).val().split(',') : [];
        //var opt = $("#tkoperation_"+this.id).text();
        if(valuearr.length>0)
        {
            var current = {};
            current['and'] =valuearr;
            that._value[0] = current;
        }
        else
        {
            delete that._value[0];
        }
        that.change(e);
    })
        
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
    
    /*
    toggle(index) {
        if($("#tkoperation_"+this.id+"_"+index).hasClass("and"))
        {
            $("#tkoperation_"+this.id+"_"+index).removeClass("and");
            $("#tkoperation_"+this.id+"_"+index).addClass("or");
            $("#tkoperation_"+this.id+"_"+index).text("or");
        }
        else
        {
            $("#tkoperation_"+this.id+"_"+index).removeClass("or");
            $("#tkoperation_"+this.id+"_"+index).addClass("and");
            $("#tkoperation_"+this.id+"_"+index).text("and");
        }
        var that = this;
        var valuearr = $("#"+this.id+"_"+index).val() && $("#"+this.id+"_"+index).val() !== undefined ? $("#"+this.id+"_"+index).val().split(',') : [];
        var opt = $("#tkoperation_"+this.id+"_"+index).text();
        
        if(valuearr.length>0)
        {
            var current = {};
            current[opt] =valuearr;
            that._value[index] = current;
            console.log(that._value);
        }
        //that.change(e);
    }
    */
    
    add(index) {
        this.total.splice(index + 1,0,{});
    }

    remove(index_) {
        if(this.total.length>1)
        {
            this.total.splice(index_, 1);
            $('#' + this.id + '_' + index_).val(undefined);
        }
    }
}