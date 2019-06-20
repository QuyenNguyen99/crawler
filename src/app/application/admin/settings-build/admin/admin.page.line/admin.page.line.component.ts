import { Component, OnInit, Input, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { ServiceGlobal } from 'app/common/services/service.global';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { GlobalFunction } from 'app/common/core/global_function';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { AdminPageLineService } from 'app/common/services/admin_page_line.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';


@Component({
    selector: 'admin-page-line',
    templateUrl: './admin.page.line.component.html',
})
export class AdminPageLineComponent extends CommonAdminComponent {
    admin_page_line: AdminPageLineService;
    list_admin_page_cell: any = [];
    constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
        super(route2, router2, user_service2, notification_service2);
    }

    @Input() admin_page: any;

    @Input()
    set model(value: any) {
        this.admin_page_line = new AdminPageLineService(this.user_service._db, this.user_service.http);
        this.admin_page_line.setAttributes(value);
        this.list_admin_page_cell = value['list_admin_page_cell'];
        switch(this.admin_page_line.quantity) {
            case 1: this.admin_page_line.class_col_sm = 12; break;
            case 2: this.admin_page_line.class_col_sm = 6; break;
            case 3: this.admin_page_line.class_col_sm = 4; break;
            case 4: this.admin_page_line.class_col_sm = 3; break;
            case 6: this.admin_page_line.class_col_sm = 2; break;
            default: this.admin_page_line.class_col_sm = 12; break;
        }
    }

    ngOnInit() {
        var that = this;
    }

}