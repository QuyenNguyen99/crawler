import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SortablejsModule } from 'angular-sortablejs';


import { ChangePasswordService } from 'app/common/services/changepassword.service';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'app/common/component/loading/loading.module';
import { TooltipModule } from 'ngx-tooltip';
import { TableModule } from 'app/common/component/table/table.module';
import { Global_DB } from 'app/common/core/global_db';
import { UserService } from 'app/common/services/user.service';
import { AuthenticateService } from 'app/common/services/authenticate.service';
import { AdminTableComponent } from 'app/application/admin/settings-build/admin/admin.table/admin.table.component';
import { AdminFormComponent } from 'app/application/admin/settings-build/admin/admin.form/admin.form.component';
import { PopupFormComponent } from 'app/application/admin/settings-build/admin/popup.form/popup.form.component';
import { PopupModule } from 'app/common/component/popup/popup.module';
import { AdminFormTabComponent } from 'app/application/admin/settings-build/admin/admin.form.tab/admin.form.tab.component';
import { AdminFormFieldComponent } from 'app/application/admin/settings-build/admin/admin.form.field/admin.form.field.component';
import { AdminTableToFormComponent } from 'app/application/admin/settings-build/admin/admin.table.to.form/admin.table.to.form.component';
import { AdminTableColumnService } from 'app/common/services/admin_table_column.service';
import { AdminFormTemplate1Component } from 'app/application/admin/settings-build/admin/admin.form/template/form1/form1.component';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { filterusernameModule } from 'app/application/admin/settings-build/admin/filterusername/filterusername.module';
import { PopupSortComponent } from './admin/popup.sort/popup.sort.component';

@NgModule({
    declarations: [
        AdminTableComponent,
        AdminFormComponent,
        PopupFormComponent,
        PopupSortComponent,
        AdminFormTabComponent,
        AdminFormFieldComponent,
        AdminTableToFormComponent,
        AdminFormTemplate1Component,
    ],
    exports: [
        AdminTableComponent,
        AdminFormComponent,
        PopupFormComponent,
        AdminFormTabComponent,
        AdminFormFieldComponent,
        AdminTableToFormComponent,
        AdminFormTemplate1Component,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
        ]),
        FormsModule,
        HttpModule,
        HttpClientModule,
        TableModule,
        FieldAdminModule,
        LoadingModule,
        TooltipModule,
        PopupModule,
        SelectupdateModule,
        filterusernameModule,
        MultiselectModule,
        SortablejsModule.forRoot({ animation: 150 }),
        SimpleNotificationsModule.forRoot() 
    ],
    providers: [Global_DB, UserService, AuthenticateService, ChangePasswordService, NotificationsService, AdminTableColumnService],
})

export class CommonpageModule { }