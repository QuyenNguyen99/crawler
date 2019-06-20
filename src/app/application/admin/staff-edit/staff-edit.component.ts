import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../../common/services/user.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from "angular4-notifications/src/notifications.service";
import { CONFIG } from 'app/config/config';
import { GlobalFunction } from '../../../common/core/global_function';
declare var $: any;

@Component({
    selector: 'staff-edit',
    templateUrl: 'staff-edit.component.html',
    styleUrls: ['staff-edit.component.scss']
})

export class StaffEditComponent {

    closeResult: string;

    @Input()
    set user_service(value: Observable<any> | any) { this._model = value; }
    get user_service() { return this._model; }

    @Input()
    set id(value: Observable<any> | any) { this._id = value; }
    get id() { return this._id; }

    @Input()
    set parent(value: Observable<any> | any) { this._parent = value; }
    get parent() { return this._parent; }

    @Output()
    confirmDone = new EventEmitter<any>();

    _id: any;
    _model: UserService;
    _parent: any;
    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
        public notification_service: NotificationsService, public user_info: UserService) {
    }
    openPopupStatus(content) {
        this._model = new UserService(this.user_info._db, this.user_info.http);
        this._model.setAttributes(this.user_info.getAttributes());
        this._model._old_attributes = this.user_info._old_attributes;
        this._model.scenario = 'update';
        this.modalService.open(content, { 'windowClass': 'add-staff', 'backdrop': !this.user_info.isFirstLogin()}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    close() {
        $(document.querySelector('.modal-header .close')).click();
    }
    get_path_name() {
        return location.pathname.replace(/;.*/gi, '');
    }
    save_user() {
        var that = this;
        if(this.user_service.validate()) {
            this.user_service.updateprofile().then(rs => {
                if(rs.code == 200) {
                    that.close();
                    that.notification_service.success('Cập nhật thông tin thành công','');
                    that.user_info.setAttributes(this.user_service);
                    that.parent.image_avatar = that.user_info.showAttribute('image', that.user_info.avartar);
                    GlobalFunction['userInformation'].attributes = that.user_info.getAttributes();
                    that.confirmDone.emit(that.user_service.showAttributes());
                } else {
                    that.user_service._error_api = rs.error;
                }
            })
        } else {
            console.log('loi roi', this.user_service._validate.getErrors());
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    isFirstLogin() {
        return this._model.created_time === this._model.modified_time;
    }
}