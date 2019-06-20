import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RlTagInputModule } from 'angular2-tag-input';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SidebarModule } from 'ng-sidebar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'angular-sortablejs';




import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ComboBoxModule } from 'ng2-combobox';
import { ChangePasswordService } from 'app/common/services/changepassword.service';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'app/common/component/loading/loading.module';
import { TooltipModule } from 'ngx-tooltip';
import { TableModule } from 'app/common/component/table/table.module';
import { Global_DB } from 'app/common/core/global_db';
import { UserService } from 'app/common/services/user.service';
import { AuthenticateService } from 'app/common/services/authenticate.service';
import { AdminPageComponent } from 'app/application/admin/settings-build/admin/admin.page/admin.page.component';
import { AdminPageLineComponent } from 'app/application/admin/settings-build/admin/admin.page.line/admin.page.line.component';
import { AdminPageCellComponent } from 'app/application/admin/settings-build/admin/admin.page.cell/admin.page.cell.component';
import { AdminOtherComponent } from 'app/application/admin/settings-build/admin/admin.other/admin.other.component';
import { PopupModule } from 'app/common/component/popup/popup.module';
import { AdminTableToFormComponent } from 'app/application/admin/settings-build/admin/admin.table.to.form/admin.table.to.form.component';
import { AdminTableColumnService } from 'app/common/services/admin_table_column.service';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { filterusernameModule } from 'app/application/admin/settings-build/admin/filterusername/filterusername.module';
import { CommonpageModule } from 'app/application/admin/settings-build/common.page.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AdminPageComponent,
        AdminPageLineComponent,
        AdminPageCellComponent,
        AdminOtherComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'menu/index',
            },
            {
                path: ':admin_common_controller/index',
                component: AdminPageComponent,
            },
            {
                path: ':admin_common_controller/:admin_common_table_id/form',
                component: AdminTableToFormComponent,
            },
        ]),
        FormsModule,
        RlTagInputModule,
        DateTimePickerModule,
        BsDatepickerModule,
        HttpModule,
        HttpClientModule,
        TableModule,
        SortablejsModule.forRoot({ animation: 150 }),
        FieldAdminModule,
        ComboBoxModule,
        LoadingModule,
        TooltipModule,
        CommonpageModule,
        PopupModule,
        SelectupdateModule,
        filterusernameModule,
        MultiselectModule,
        SimpleNotificationsModule.forRoot(),
        NgbModule.forRoot(),
        SidebarModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [Global_DB, UserService, AuthenticateService, ChangePasswordService, NotificationsService, AdminTableColumnService],
})

export class CommonAdminModule { }