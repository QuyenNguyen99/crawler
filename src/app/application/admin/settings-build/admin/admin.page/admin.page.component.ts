import { Component, Input, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { ServiceGlobal } from 'app/common/services/service.global';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { GlobalFunction } from 'app/common/core/global_function';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { AdminPageService } from 'app/common/services/admin_page.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';

@Component({
    selector: 'admin-page',
    templateUrl: './admin.page.component.html',
})
export class AdminPageComponent extends CommonAdminComponent {
    admin_page: AdminPageService;
    list_admin_page_line: any = [];
    sub: any;
    admin_common_controller: any = false;
    constructor(private route2: ActivatedRoute,
        private router2: Router,
        public user_service2: UserService, public notification_service2: NotificationsService) {
        super(route2, router2, user_service2, notification_service2);
    }

    ngOnInit() {
        var that = this;
        this.admin_page = new AdminPageService(this.user_service._db, this.user_service.http);
        this.sub = this.route2.params.subscribe(params => {
            this.admin_common_controller = params.admin_common_controller;
            if(!GlobalFunction['controller_old'] || GlobalFunction['controller_old'] != params.admin_common_controller || !that.admin_page.id) {
                GlobalFunction['controller_old'] = params.admin_common_controller;
                if(!GlobalFunction['controller_old_data_' + params.admin_common_controller]) {
                    that.admin_page.findOneData({controller: params.admin_common_controller}).then(rs => {
                        GlobalFunction['controller_old_data_' + params.admin_common_controller] = rs;
                        that.list_admin_page_line = rs['list_admin_page_line'];
                    })
                } else {
                    that.admin_page.setAttributes(GlobalFunction['controller_old_data_' + params.admin_common_controller]);
                    that.list_admin_page_line = GlobalFunction['controller_old_data_' + params.admin_common_controller]['list_admin_page_line'];
                }
            }
        });
    }

    ngOnDestroy() {
        console.log('this.admin_common_controller', this.admin_common_controller);
        delete GlobalFunction['controller_old_data_' + this.admin_common_controller];
        this.sub.unsubscribe();
      }

}