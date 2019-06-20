import { Component, OnInit, Input, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { ServiceGlobal } from 'app/common/services/service.global';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { GlobalFunction } from 'app/common/core/global_function';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { AdminPageCellService } from 'app/common/services/admin_page_cell.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';


@Component({
    selector: 'admin-page-cell',
    templateUrl: './admin.page.cell.component.html',
})
export class AdminPageCellComponent extends CommonAdminComponent {
    admin_page_cell: AdminPageCellService;
    @Input() admin_page: any;
    @Input()
    set model(value: any) {
        this.admin_page_cell = new AdminPageCellService(this.user_service._db, this.user_service.http);
        this.admin_page_cell.setAttributes(value);
    }
    constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
        super(route2, router2, user_service2, notification_service2);
    }

    ngOnInit() {
        var that = this;
    }

}