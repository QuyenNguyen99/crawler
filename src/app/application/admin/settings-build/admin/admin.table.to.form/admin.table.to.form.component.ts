import { Component, Input, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { ServiceGlobal } from 'app/common/services/service.global';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { GlobalFunction } from 'app/common/core/global_function';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminTableService } from 'app/common/services/admin_table.service';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { AdminPageService } from 'app/common/services/admin_page.service';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';

@Component({
    selector: 'admin-table-to-form',
    templateUrl: './admin.table.to.form.component.html',
})
export class AdminTableToFormComponent extends CommonAdminComponent {
    admin_page: AdminPageService;
    admin_table: AdminTableService;
    admin_form: AdminFormService;
    admin_form_table_column: AdminFormService;
    model_service: any;
    admin_from_title_name: String;
    sub: any;
    is_new_record: boolean = true;
    constructor(private route2: ActivatedRoute,
        private router2: Router,
        public user_service2: UserService, public notification_service2: NotificationsService) {
        super(route2, router2, user_service2, notification_service2);
    }

    ngOnInit() {
        var that = this;
        this.admin_page = new AdminPageService(this.user_service._db, this.user_service.http);
        this.sub = this.route2.params.subscribe(params => {
            that.admin_page.findOneData({ controller: params.admin_common_controller }).then(rs => {
                for (let item_admin_page_line of rs['list_admin_page_line']) {
                    for (var item_admin_page_cell of item_admin_page_line['list_admin_page_cell']) {
                        if (item_admin_page_cell.type == 'table' && item_admin_page_cell.admin_table == params.admin_common_table_id) {
                            that.admin_table = new AdminTableService(that.user_service._db, that.user_service.http);
                            that.admin_table.setAttributesAndOldAttributes(item_admin_page_cell.fk_table_admin_table);
                            that.admin_form = new AdminFormService(that.user_service._db, that.user_service.http);
                            that.admin_form.setAttributesAndOldAttributes(that.admin_table.fk_table_admin_form);
                            that.model_service = that.get_model_by_table_name(that.admin_table.table_name);
                            if (params.id) {
                                that.model_service.findOne(params.id);
                                that.admin_from_title_name = that.admin_form.get_update_name();
                                that.is_new_record = false;
                            } else {
                                that.admin_from_title_name = that.admin_form.get_create_name();
                                that.model_service.get_fk_mul();
                            }
                            break;
                        }
                    }
                }
            })
        });
    }

    click_cancel() {
        if (this.admin_page.controller) {
            this.router2.navigate(['/admin/common/' + this.admin_page.controller + '/index']);
        }
    }
    save_done() {
        this.notification_service.success((this.is_new_record ? 'Thêm' : 'Sửa') + ' ' + this.admin_form.name.toLowerCase() + ' thành công', '');
        if (this.admin_page.controller) {
            if (!this.is_new_record) {
                GlobalFunction['return_page'] = 1;
            }
            this.router2.navigate(['/admin/common/' + this.admin_page.controller + '/index']);
        }
    }

    editAdminFormField() {
        if (this.admin_form.show_edit) {
            this.admin_form.show_edit = false;
            var admin_form = new AdminFormService(this.user_service._db, this.user_service.http);
            admin_form.setAttributesAndOldAttributes(this.admin_form._old_attributes);
            admin_form.setAttributeTabFieldClass();
            this.admin_form = admin_form;
        } else {
            this.admin_form.show_edit = true;
        }
    }

    saveAdminForm() {
        var that = this;
        this.admin_form['this_parent'].saveForm();
    }
}