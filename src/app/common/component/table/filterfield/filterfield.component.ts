import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../../core/global_validate';
import { GlobalFunction } from '../../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceGlobal } from 'app/common/services/service.global';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
declare var $: any;

@Component({
    selector: 'filterfield',
    templateUrl: 'filterfield.component.html',
})

export class FilterfieldComponent implements OnInit, AfterViewInit {
    column: any;
    show_popup: boolean = false;
    value: any;
    model: any;
    filter_field: any;
    value_old: any;
    value_field_old: any;
    label: string = '';
    attribute: string = '';
    @Input()
    set set_filter_field(value: Observable<any> | any) {
        if (value) {
            this.filter_field = value;
            this.column = this.filter_field.column;
            if (this.column) {
                this.attribute = this.column.filter.attribute ? this.column.filter.attribute : this.column.attribute;
            }
            this.set_value();
        }
    }

    @Input()
    set set_model(value: Observable<any> | any) {
        this.model = value;
        this.set_value();

    }

    @Output()
    valueChanged = new EventEmitter<string>();


    constructor(private route: ActivatedRoute, private router: Router, public notification_service: NotificationsService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    typeof(obj) {
        return typeof (obj);
    }

    id: any = 'filterfield';
    open_popup() {
        this.column.filter.operator = [];
        this.model.table_search_attribute[this.column.filter.attribute].forEach(element => {
            this.column.filter.operator.push("and");
        });
        this.id = 'filterfield' + new Date().getTime();
        var that = this;
        function click_func(e) {
            if (!e.target['closest']('#' + that.id) || e.target.className.match(/btn_secondary/gi)) {
                that.reset();
                that.filter_field.show_popup = false;
                document.body.removeEventListener('click', click_func);
                document.body.removeEventListener('touchstart', click_func);
            }
        }
        document.body.addEventListener('click', click_func);
        document.body.addEventListener('touchstart', click_func);
        this.filter_field.show_popup = !this.filter_field.show_popup;
    }

    filter(event) {
        this.filter_field.value = this.model.getAttributesSearch(this.attribute);
        if ((event && (13 == event.which || event.code == 13)) || this.column.filter.type == 'select') {
            this.add();
        } else if (GlobalFunction.contains(this.column.filter.type, ['multiselect'])) {
            this.add(true);
        }
    }

    reset() {
        this.filter_field.value = this.value_field_old;
        if (GlobalFunction.is_array(this.value_old)) {
            var a: any = [];
            for (var item of this.value_old) {
                if (typeof (item) == 'object') {
                    a.push(Object.assign({}, item));
                } else {
                    a.push(item);
                }
            }
            this.model.table_search_attribute[this.attribute] = a;
        } else {
            this.model.table_search_attribute[this.attribute] = this.value_old;
        }
    }

    cancel() {
        this.reset();
        this.filter_field.show_popup = false;
    }
    
    and() {
        var ls = this.filter_field.value.split("||");
        if(ls.length>0)
        {
            ls[0] = ls[0]+"|and|0";
            ls.forEach(element => {
                var arr = element.split("|");
                this.model.table_search_attribute[this.column.filter.attribute][arr[2]].value = arr[0];
                this.model.table_search_attribute[this.column.filter.attribute][arr[2]].operator = arr[1];
                this.value_old[arr[2]] = {value: arr[0], operator: arr[1]};
            });
        }
        this.column.filter.operator.push("and");
        this.column.filter.operator.forEach(element => {
            element = "and";
        }); 
        this.model.table_search_attribute[this.column.filter.attribute].push(
            {value: "",operator:"and"}
        );
        //this.column.filter.attribute.push();
    }

    add(flag: boolean = false) {
        this.filter_field.show_popup = flag;
        this.set_value();
        var event: any = { type: 'change' };
        this.valueChanged.emit(event);
    }

    set_value_old() {
        this.value_field_old = this.filter_field.value;
        if (GlobalFunction.is_array(this.model.table_search_attribute[this.attribute])) {
            var a: any = [];
            for (var item of this.model.table_search_attribute[this.attribute]) {
                if (typeof (item) == 'object') {
                    a.push(Object.assign({}, item));
                } else {
                    a.push(item);
                }
            }
            this.value_old = a;
        } else {
            this.value_old = this.model.table_search_attribute[this.attribute];
        }
    }

    set_value() {
        if (this.model && this.column) {
            this.set_value_old();
            this.value = this.model.showAttribuesSearch(this.attribute);
            if (!this.value) {
                this.value = 'tất cả';
            } else if (typeof (this.value) == 'string') {
                var a = this.value.split(',');
                if (a.length > 1) {
                    var flag = true;
                    for (var item of a) {
                        if (item.trim()) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        this.value = 'tất cả';
                    }
                }
            }
            this.label = this.column.label ? this.column.label : this.model.attributeLabels()[this.attribute];
        }
    }

    delete_event() {
        var event: any = { type: 'delete', model: this.filter_field };
        this.valueChanged.emit(event);
    }
}