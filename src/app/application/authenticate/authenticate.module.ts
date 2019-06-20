import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'ngx-loading';
import { Global_DB } from '../../common/core/global_db';


import { AuthenticateComponent } from '../authenticate/authenticate.component';
import { AuthenticateService } from '../../common/services/authenticate.service';
import { ForgotpasswordComponent } from 'app/application/authenticate/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from 'app/application/authenticate/resetpassword/resetpassword.component';
import { FieldModule } from 'app/common/fields/fields.module';
import { ForgotpasswordService } from 'app/common/services/forgotpassword.service';
import { ResetpasswordService } from 'app/common/services/resetpassword.service';
import { PopupModule } from 'app/common/component/popup/popup.module';


@NgModule({
    imports: [
        HttpModule,
        HttpClientModule,
        PopupModule,
        SimpleNotificationsModule.forRoot(),
        LoadingModule,
        FormsModule,
        CommonModule,
        FieldModule,
        RouterModule.forChild([
            {
                path: '',
                component: AuthenticateComponent
            },
        ])
    ],
    declarations: [
        AuthenticateComponent,
        ForgotpasswordComponent,
        ResetpasswordComponent,
    ],
    providers: [AuthenticateService, Global_DB, ForgotpasswordService, ResetpasswordService, NotificationsService],
})

export class AuthenticateModule {

}