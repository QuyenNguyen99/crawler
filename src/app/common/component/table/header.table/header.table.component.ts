import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceGlobal } from 'app/common/services/service.global';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';

import 'rxjs/add/operator/toPromise';
import { AdminTableService } from 'app/common/services/admin_table.service';
import { TableComponent } from 'app/common/component/table/table.component';


declare var $: any;


@Component({
    selector: 'headertable',
    templateUrl: 'header.table.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => HeaderTableComponent),
        multi: true
    }]
})
export class HeaderTableComponent  {
    this_parent: TableComponent;
    @Input() set set_this_parent(value: TableComponent) { this.this_parent = value; }
    column: any;
    @Input() set set_column(value: any) { this.column = value; }
}