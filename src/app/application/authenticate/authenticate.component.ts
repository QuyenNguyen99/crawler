import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../../common/services/authenticate.service';
import { GlobalFunction } from '../../common/core/global_function';
import { NotificationsService } from 'angular4-notifications';

@Component({
    selector: 'app-root',
    templateUrl: 'authenticate.component.html',
})

export class AuthenticateComponent {
    email_label = "<i class='icon icon-profile'></i>";
    password_label = "<i class='icon icon-padlock'></i>";
    errorValue = "";
    public loading = false;
    constructor(private route: ActivatedRoute,
        private router: Router,
        public authenticate_service: AuthenticateService, public notification_service: NotificationsService) {    
        document.title = 'crawlersystem';
        var token = GlobalFunction.readCookie('token');
        if (token && token !== undefined) {
            this.redirect();
        }
    }
    notifications_options: any = {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: true
    };
    redirect() {
        let object_search = GlobalFunction.searchToObject();
        window.location.href = object_search['urlb'] ? object_search['urlb'] : '/admin';
    }

    login() {
        var that = this;
        if (this.authenticate_service.validate()) {
            that.loading = true;
            this.authenticate_service.login().then(rs => {
                if (rs.code == 200) {
                    this.notification_service.success('Đăng nhập thành công','');
                    this.redirect();
                } else {
                    that.authenticate_service._error_api = rs.error;
                }
                that.loading = false;
            });
        }
    }

}