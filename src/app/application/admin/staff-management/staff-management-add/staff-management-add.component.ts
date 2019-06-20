import { Component, Input, Output, AfterViewInit, EventEmitter } from "@angular/core";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../../../common/services/user.service";
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from "angular4-notifications/src/notifications.service";
declare var $: any;
@Component({
    selector: 'staff-management-add',
    templateUrl: 'staff-management-add.component.html',
})

export class StaffManagementAddComponent implements AfterViewInit {

    closeResult: string;

    @Input()
    set model(value: Observable<any> | any) { 
        this._model = value; 
    }
    get model() { return this._model; }
    @Output()
    confirmDone = new EventEmitter<any>();

    _model: UserService;
    user_service: UserService;
    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, 
        public _user_service: UserService,
        public notification_service: NotificationsService) { 
        this.user_service = new UserService(this._user_service._db, this._user_service.http);
    }

    ngAfterViewInit() {

    }

    openPopupStatus(content) {
        this.user_service = new UserService(this._user_service._db, this._user_service.http);

        this.user_service.fk_table_user_role_mul = this._model.fk_table_user_role_mul;
        this.user_service['fk_table_user_role_mul_obj'] = this._model['fk_table_user_role_mul_obj'];

        this.user_service.fk_table_role = this._model.fk_table_role;
        this.user_service['fk_table_role_obj'] = this._model['fk_table_role_obj'];

        this.user_service.fk_table_assign_id = this._model.fk_table_assign_id;
        this.user_service['fk_table_assign_obj'] = this._model['fk_table_assign_obj'];
        
        this.user_service.scenario = 'create';
        this.modalService.open(content, { 'windowClass': 'add-staff' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    close() {
        $(document.querySelector('.modal-header .close')).click();
    }
    sub: any;
    create_user() {
        var that = this;
        if(this.user_service.validate()) {
            this.user_service.save().then(rs => {
                if(rs.code == 200) {
                    that.notification_service.success('Tạo tài khoản nhân viên thành công','');
                    that.confirmDone.emit(that.user_service.showAttributes());
                    that.close();
                } else {
                    console.log('loi roi', rs.error);
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
}