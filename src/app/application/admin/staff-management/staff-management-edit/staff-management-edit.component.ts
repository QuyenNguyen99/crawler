import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../../../common/services/user.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from "angular4-notifications/src/notifications.service";
import { CONFIG } from 'app/config/config';
declare var $: any;

@Component({
    selector: 'staff-management-edit',
    templateUrl: 'staff-management-edit.component.html',
})

export class StaffManagementEditComponent {

    closeResult: string;

    @Input()
    set user_service(value: Observable<any> | any) { this._model = value; }
    get user_service() { return this._model; }

    @Input()
    set id(value: Observable<any> | any) { this._id = value; }
    get id() { return this._id; }

    @Output()
    confirmDone = new EventEmitter<any>();

    _id: any;
    _model: UserService;
    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal,
        public notification_service: NotificationsService) {
    }
    openPopupStatus(content) {
        this._model.scenario = 'admin_update_staff';
        this.modalService.open(content, { 'windowClass': 'add-staff' }).result.then((result) => {
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
            this.user_service.save().then(rs => {
                if(rs.code == 200) {
                    that.notification_service.success('Thay đổi thông tin nhân viên thành công','');
                    that.confirmDone.emit(that.user_service.showAttributes());
                    that.close();
                    
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

    getLinkImage() {
        return CONFIG.LINK_IMAGE + this._model.tableName() + '/main/' + this._model.avartar;
    }
}