import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordService } from '../../../common/services/changepassword.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/common/services/user.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';

declare var $: any;
@Component({
    selector: 'change-password',
    templateUrl: 'changepassword.component.html',
    styleUrls: ['changepassword.component.scss']
})
export class ChangePasswordComponent {
    closeResult: any;

    // _model: ChangePasswordService;

    // @Input()
    // set changePassModel(value: Observable<any> | any) { this._model = value; }
    // get changePassModel() { return this._model; }

    constructor(private modalService: NgbModal, public changePassModel: ChangePasswordService, public user: UserService, public notification_service: NotificationsService){}
    openPopup(content) {
        this.changePassModel = new ChangePasswordService(this.user._db, this.user.http);
        this.modalService.open(content, { 'windowClass': 'change-password' }).result.then((result) => {
            this.changePassModel.resetAttrs();
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.changePassModel.resetAttrs();
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    close() {
        $(document.querySelector('.modal-header .close')).click();
    }

    change_pasword() {
        var that = this;
        if(this.changePassModel.validate()){
            that.user.loading = true;
            this.changePassModel.changePassword().then(rs=>{
                if(rs.code == 200){
                    that.notification_service.success('Thay đổi mật khẩu thành công','');
                    that.changePassModel._error_api = {};
                    this.close();
                } else {
                    that.changePassModel._error_api = rs.error;
                }
                that.user.loading = false;
            });
        }
        // if(this.user_service.validate()) {
        //     this.user_service.save().then(rs => {
        //         if(rs.code == 200) {
        //             that.close();
        //         } else {
        //             that.user_service._error_api = rs.error;
        //         }
        //     })
        // } else {
        //     console.log('loi roi', this.user_service._validate.getErrors());
        // }
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