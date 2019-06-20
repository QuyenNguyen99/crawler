import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'ngx-loading';


import { TableModule } from '../../../common/component/table/table.module';
import { PopupModule } from 'app/common/component/popup/popup.module';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { UserService } from 'app/common/services/user.service';
import { JobComponent } from 'app/application/admin/job/job.component';
import { JobService } from '../models/job.service';
import { LogService } from '../models/log.service';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FieldAdminModule,
    PopupModule,
    LoadingModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild([
      {
          path: '',
          component: JobComponent
      },
      {
          path: 'view',
          component: JobComponent
      },
    ]),
    TableModule,
  ],
  declarations: [
    JobComponent,
  ],
  providers: [NotificationsService, UserService, JobService, LogService],
})

export class JobModule { }