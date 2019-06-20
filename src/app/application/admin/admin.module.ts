import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Global_DB } from '../../common/core/global_db';
import { AdminRouter } from './admin.route';

import { AdminComponent } from './admin.component';

import { SharedModule } from './shared/shared.module';

import { UserService } from '../../common/services/user.service';
import { AuthenticateService } from '../../common/services/authenticate.service';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { ChangePasswordService } from 'app/common/services/changepassword.service';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'ngx-loading';
import { TooltipModule } from 'ngx-tooltip';
import { RoleRoleItemMulService } from 'app/common/services/role_role_item_mul.service';
import { TooltipsModule } from '../../common/component/tooltip/tooltip.module';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

@NgModule({
    declarations: [
        AdminComponent,
        ChangePasswordComponent,
        StaffEditComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminRouter),
        FormsModule,
        SharedModule,
        HttpModule,
        HttpClientModule,
        FieldAdminModule,
        LoadingModule,
        TooltipModule,
        TooltipsModule,
        SimpleNotificationsModule.forRoot(),
        NgbModule.forRoot(),
        SidebarModule.forRoot(),
        Ng2DeviceDetectorModule.forRoot(),
        PerfectScrollbarModule

    ],
    providers: [Global_DB, UserService, AuthenticateService, ChangePasswordService,
        NotificationsService, RoleRoleItemMulService, 
    ],
    // bootstrap: [AppComponent]
})

export class AdminModule { }