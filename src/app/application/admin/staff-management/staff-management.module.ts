import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'ngx-loading';


import { StaffManagementComponent } from './staff-management.component';
import { StaffManagementAddComponent } from './staff-management-add/staff-management-add.component';
import { StaffManagementEditComponent } from './staff-management-edit/staff-management-edit.component';
import { TableModule } from '../../../common/component/table/table.module';
import { StaffManagementchangepasswordComponent } from './staff-management-changepassword/staff-management-changepassword.component';
import { PopupModule } from 'app/common/component/popup/popup.module';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { UserService } from 'app/common/services/user.service';
import { CommonpageModule } from 'app/application/admin/settings-build/common.page.module';
import { filterusernameModule } from 'app/application/admin/settings-build/admin/filterusername/filterusername.module';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { TooltipsModule } from 'app/common/component/tooltip/tooltip.module';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FieldAdminModule,
    TooltipsModule,
    PopupModule,
    CommonpageModule,
    filterusernameModule,
    SelectupdateModule,
    MultiselectModule,
    LoadingModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild([
      {
          path: '',
          component: StaffManagementComponent
      },
      {
          path: 'index',
          component: StaffManagementComponent
      },
    ]),
    TableModule,
  ],
  declarations: [
    StaffManagementComponent,
    StaffManagementAddComponent,
    StaffManagementEditComponent,
    StaffManagementchangepasswordComponent,
  ],
  providers: [NotificationsService, UserService],
})

export class StaffManagementModule { }