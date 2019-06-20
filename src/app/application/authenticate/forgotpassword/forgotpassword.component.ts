import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunction } from '../../../common/core/global_function';
import { ForgotpasswordService } from 'app/common/services/forgotpassword.service';

@Component({
    selector: 'app-root',
    templateUrl: 'forgotpassword.component.html',
})

export class ForgotpasswordComponent {
    email_label = "";
    public loading = false;
    constructor(private route: ActivatedRoute,
        private router: Router,
        public forgotpassword_service: ForgotpasswordService) {
            
            var token = GlobalFunction.readCookie('token');
            if (token && token !== undefined) {
                this.redirect();
            }
    }
    back_link() {
        location.href = '/authenticate';
    }
    redirect() {
        window.location.href = '/authenticate';
    }
    message_close: any;
    forgotpassword() {
        var that = this;
        if (this.forgotpassword_service.validate()) {
            that.loading = true;
            this.forgotpassword_service.forgot().then(rs => {
                if (rs.code == 200) {
                    that.forgotpassword_service._error_api = {};
                    that.message_close.open({
                        'title'     : 'Lấy lại mật khẩu',
                        'content'   : 'Mật khẩu mới đã được gửi vào email của bạn. Vui lòng kiểm tra hòm thư và đăng nhập lại với mật khẩu mới để đăng nhập vào hệ thống.',
                        'closeLabel': 'Đóng',
                        'confirm'   : function() {
                            that.redirect();
                        }
                    });
                } else {
                    that.forgotpassword_service._error_api = rs.error;
                }
                that.loading = false;
            });
        }
    }

}