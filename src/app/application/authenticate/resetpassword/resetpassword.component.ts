import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from '../../../common/services/resetpassword.service';
import { GlobalFunction } from '../../../common/core/global_function';
import { NotificationsService } from 'angular4-notifications';

@Component({
    selector: 'resetpassword',
    templateUrl: 'resetpassword.component.html',
})
export class ResetpasswordComponent {
    email_label = "";
    password_label = "";
    errorValue = "";
    sub: any;
    access_token: any;
    public loading = false;
    notifications_options: any = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true
    };
    constructor(private route: ActivatedRoute,
        private router: Router,
        public resetpassword_service: ResetpasswordService, public notification_service: NotificationsService) {
            var that = this;
            this.sub = this.route.params.subscribe(params => {
                var params_obj = $.extend({}, params);
                if(params_obj['access_token']) {
                    this.access_token = params_obj['access_token'];
                    this.resetpassword_service.check_token(params_obj['access_token']).then(rs => {
                        if(rs.code == 200) {
                            that.resetpassword_service.id = rs.id;
                        } else {
                            this.redirect();
                        }
                    });
                } else {
                    this.redirect();
                }
            });
    }

    redirect() {
        let object_search = GlobalFunction.searchToObject();
        window.location.href = object_search['urlb'] ? object_search['urlb'] : '/';
    }

    resetpassword() {
        var that = this;
        if (this.resetpassword_service.validate()) {
            that.loading = true;
            this.resetpassword_service.resetpassword(this.access_token).then(rs => {
                if (rs.code == 200) {
                    this.notification_service.success('Lấy lại mật khẩu thành công','');
                    this.redirect();
                } else {
                    that.resetpassword_service._error_api = rs.error;
                }
                that.loading = false;
            });
        }
    }

}