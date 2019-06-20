import { Component, ViewEncapsulation, AfterViewInit, Input, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';

import { GlobalFunction, Deferred } from '../../../common/core/global_function';
import { UserService } from 'app/common/services/user.service';
import { AdminTableService } from 'app/common/services/admin_table.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { MenuItems } from 'app/application/admin/shared/menu-items/menu-items';

@Component({
    selector: 'staff-management',
    templateUrl: './staff-management.component.html',
})

export class StaffManagementComponent extends AdminTableComponent {
    
  changeFilterModeWidth: number = 480;
  isMobile = false;

    constructor(private route3: ActivatedRoute, private router3: Router, public user_service3: UserService, public notification_service3: NotificationsService,
        public menuItems3: MenuItems) {
        super(route3, router3, user_service3, notification_service3, menuItems3);
        var that = this;
        this.route3.params.subscribe(params => {
            this.controller = params.admin_common_controller;
            setTimeout(() => {
              document.querySelector('.page_inner').scrollTop = 0;
              $('.cricle_totop').addClass('hide');
            }, 250);
        });
        this.reload_admin_table();
    }
    
    ngOnInit() {
      this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
    }
    
    @HostListener('window:click', ['$event'])
    onClick(event) {
      if (this.isOpen && !event.target['closest']('.filter_action_mobile') && !event.target['closest']('.div-filter-secondary')) {
        this.isOpen = false;
      }
    }

    reload_admin_table() {
        var that = this;
        var admin_table = new AdminTableService(this.user_service._db, this.user_service.http);
        GlobalFunction.DEFER.promise.then(rs => {
            admin_table.findOneData({ id: 12 }).then(rs => {
                that.set_model(rs);
            });
        })
    }

    index: any;
    user_service_update: UserService;
    editStaffInfo(row, i, table) {
        this.index = i;
        this.user_service_update = new UserService(this.user_service._db, this.user_service.http);
        this.user_service_update.findOne(row.id).then(rs => {
            if (rs) {
                $('#showEditStaff').trigger('click');
            } else {
                console.log('Id not found');
            }
        })
    }
    obj_delete: any;
    obj_confirm: any;
    deleteStaff(row, i, table) {
        var that = this;
        this.obj_delete.open({
            title: 'Xóa nhân viên',
            content: 'Bạn có chắc chắn muốn xóa nhân viên này không?',
            closeLabel: 'Hủy',
            confirm: function () {
                return that.user_service.delete(row.id).then(r => {
                    that.notification_service.success('Xóa nhân viên thành công', '');
                    that.reloadTable(row);
                    return Promise.resolve(true);
                });
            }
        });
    }

    changePasswordStaffInfo(row, i, table) {
        this.index = i;
        this.user_service_update = new UserService(this.user_service._db, this.user_service.http);
        this.user_service_update.findOne(row.id).then(rs => {
            if (rs) {
                this.user_service_update.password = '';
                $('#showChangepasswordStaff').trigger('click');
            } else {
                console.log('Id not found');
            }
        })
    }
    /**
     * 
     */
    addStaff() {
        $('#showAddStaff').trigger('click');
    }

    addFilterUserField(values) {
        super.addFilterUserField(values);
        var md = this.get_model_filter_by_type('update');
        this.model_filter_save_2(md, 'update','create');
    }
    
    filterHandle(event) {
        super.filterHandle(event);
        var md = this.get_model_filter_by_type('update');
        this.model_filter_save_2(md, 'update',event.type);
    }

    model_filter_save_2(model_filter_user, type, event_type: any) {
        var that = this;
        model_filter_user.save(false).then(rs => {
            switch(event_type) {
                case 'create': 
                for (var i in that.list_filter_user) {
                  that.list_filter_user[i].text = that.list_filter_user[i].name;
                  if (that.list_filter_user[i].id == model_filter_user.id) {
                    that.list_filter_user[i] = model_filter_user._old_attributes;
                  }
                }
                that.set_filter_user(model_filter_user.id);
                break;
                case 'change': 
                case 'delete': 
                    that.model_filter_user._old_attributes.list_filter_user_field = [];
                    for(var item of that.model_filter_user.list_filter_user_field) {
                        var obj = Object.assign({},item);
                        delete obj.column;
                        that.model_filter_user._old_attributes.list_filter_user_field.push(obj);
                    }
                break;
            }
            that.notification_service.success('Cập nhật filter thành công', '');
        });
      }
}