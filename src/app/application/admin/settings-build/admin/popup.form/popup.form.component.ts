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


@Component({
    selector: 'popup-form',
    templateUrl: './popup.form.component.html',
})
export class PopupFormComponent extends PopupcomponentComponent {

    constructor(private modalService1: NgbModal,
        public notification_service: NotificationsService, public user_service: UserService) {
        super(modalService1);
    }
    _windowClass: string = 'add-staff';
    
    admin_from_create_name: any;
    admin_form: AdminFormService;
    model_service: ServiceGlobal;
    is_new_record: boolean = true;

    _save_label: String = 'Cập nhật';

    @Input()
    set save_label(value: String) {
        this._save_label = value;
    }

    _cancel_label: String = 'Hủy';

    @Input()
    set cancel_label(value: String) {
        this._cancel_label = value;
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
            this.is_new_record = this.model_service.isNewRecord();
        }
    }

    @Input()
    set model_admin_form(value: any) {
        this.admin_form = new AdminFormService(this.user_service._db, this.user_service.http);
        this.admin_form.setAttributes(value);
        this.admin_from_create_name = this.admin_form.get_create_name();
    }

    @Input()
    set model_admin_form_update_all(value: any) {
        this.admin_form = new AdminFormService(this.user_service._db, this.user_service.http);
        this.admin_form.setAttributes(value);
        this.admin_from_create_name = this.admin_form.get_update_all_name();
    } 

    open(options: any = false) {
        if(this.is_new_record) {
            this.model_service.get_fk_mul();
            this.model_service.ids = this.admin_form.ids;
        }
        super.open(options);
        if(options.model) {
            this.admin_form = options.model;
        }
    }

    @Output() confirmDone: any = new EventEmitter<any>();
    
    save_done() {
        this.confirmDone.emit({
            is_new_record: this.is_new_record,
            model       : this.model_service,
        });
        this.click_cancel();
    }

}