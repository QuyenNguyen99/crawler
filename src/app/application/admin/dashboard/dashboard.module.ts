import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'ngx-loading';

import { ComboBoxComponent } from 'ng2-combobox';

import { DashboardComponent } from './dashboard.component';
import { TableComponent } from '../../../common/component/table/table.component';
import { TableModule } from '../../../common/component/table/table.module';
import { PopupModule } from 'app/common/component/popup/popup.module';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { UserService } from 'app/common/services/user.service';
import { CommonpageModule } from 'app/application/admin/settings-build/common.page.module';
import { filterusernameModule } from 'app/application/admin/settings-build/admin/filterusername/filterusername.module';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { TooltipsModule } from 'app/common/component/tooltip/tooltip.module';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { DashboardService } from 'app/common/services/dashboard.service';

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
    DateTimePickerModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild([
      {
          path: '',
          component: DashboardComponent
      },
      {
          path: 'index',
          component: DashboardComponent
      },
    ]),
    TableModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [NotificationsService, UserService ],
})

export class DashboardModule { }