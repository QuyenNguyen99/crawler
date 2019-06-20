import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { PopupcomponentComponent } from 'app/common/component/popup/popup.component';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { GlobalFunction } from 'app/common/core/global_function';

declare var $: any;

@Component({
    selector: 'popupsort',
    templateUrl: './popup.sort.component.html',
})
export class PopupSortComponent extends PopupcomponentComponent {

    constructor(private modalService1: NgbModal,
        public notification_service: NotificationsService, public user_service: UserService) {
        super(modalService1);
    }
    _windowClass: string = 'add-staff';
    
    admin_from_create_name: any;
    admin_form: AdminFormService;
    model_service: ServiceGlobal;
    is_new_record: boolean = true;


    @Input()
    set this_parent(vl) {
        this._this_parent = vl;
        this.set_this_parent_attribute();
    }
    _this_parent: any;
    set_this_parent_attribute() {
        if (this._this_parent !== undefined && this._attribute !== undefined) {
            this._this_parent[this._attribute] = this;
        }
    }

    _save_disable: boolean = false;
    @Input()
    set save_disable(value: boolean) {
        this._save_disable = value;
    }

    @Input()
    set model(value: ServiceGlobal) {
        if(value) {
            this.model_service = value;
        }
    }

    rs_list:any = {};
    list_obj:any = {};
    open(options: any = false) {
        var that = this;
        that.list_obj = {};
        that.rs_list = {};
        that._this_parent.loading = true;
        this.model_service.findAll(options.condition).then(r => {
            that._this_parent.loading = false;
            that.rs_list = r;
            for(var item of that.rs_list.list) {
                that.list_obj[item.ID] = item;
            }
        })
        super.open(options);
        if(options.model) {
            this.admin_form = options.model;
        }
    }

    popup_sort_row() {
        var that = this;
        return {
        onEnd   : function(e) {
                if(e.newIndex != e.oldIndex) {
                    var i = $('.popup-table-sort > tbody > tr[id]').length;
                    $('.popup-table-sort > tbody > tr[id]').each(function(e){
                        var id:any = $(this).attr('id');
                        if(id && ('' + id).match(/^[0-9]+$/gi)) {
                            id = parseInt(id);
                            that.list_obj[id].PRIORITY = i;
                        }
                        i--;
                    })
                    setTimeout(function(){
                        document.body.click();
                    })
                }
            }
        };
    }

    async submit() {
        var that = this;
        var list_update = [];
        for(var item of this.rs_list.list) {
            if(item.PRIORITY != item.old_attributes.PRIORITY) {
                list_update.push({
                    id:item.ID,
                    PRIORITY: item.PRIORITY
                });
            }
        }
        if(list_update.length) {
            that._this_parent.loading = true;
            return this.model_service['update_list_sort'](list_update).then(r => {
                that._this_parent.loading = false;
                that._this_parent.notification_service.success('Cập nhật mức độ ưu tiên thành công', '');
                that._this_parent.reloadTable();
                this.click_cancel();
                return Promise.resolve(true);    
            })
        } else {
            that._this_parent.notification_service.success('Cập nhật mức độ ưu tiên thành công', '');
            this.click_cancel();
            return Promise.resolve(true);
        }
    }

}