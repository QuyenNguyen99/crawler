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
    selector: 'filterfieldchild',
    templateUrl: 'filterfieldchild.component.html',
})

export class FilterfieldchildComponent implements OnInit, AfterViewInit  {
    _value_html: string;
    column: any;
    value: any;
    model: any;
    show: boolean = false;
    label_show: boolean = true;

    @Input()
    set set_label_show(value: Observable<any> | any) { this.label_show = value; }

    @Input()
    set set_show(value: Observable<any> | any) { this.show = value; }

    @Input()
    set set_column(value: Observable<any> | any) { this.column = value; }

    @Input()
    set set_value(value: Observable<any> | any) { this.value = value; }

    @Input()
    set set_model(value: Observable<any> | any) { this.model = value; }

    @Output()
    valueChanged = new EventEmitter<string>();


    constructor(private route: ActivatedRoute, private router: Router, public notification_service: NotificationsService) { }

    ngOnInit() {

    }
    ngAfterViewInit() {
		setTimeout(() => {
			var objFocus = $('.filter-field-child-text, .filter-field-child-number');
			if (objFocus.length) { objFocus.eq(0).focus(); }
		},250);
    }
    typeof(obj) {
        return typeof (obj);
    }
    filter(event) {
        this.valueChanged.emit(event);

    }
    
    remove(i) {
        this.column.filter.operator.splice(i, 1);
        this.model.table_search_attribute[this.column.filter.attribute].splice(i, 1);
    }
}