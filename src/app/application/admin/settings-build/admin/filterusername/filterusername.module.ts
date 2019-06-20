import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { ComboBoxComponent } from 'ng2-combobox';
import { SimpleNotificationsModule, NotificationsService } from 'angular4-notifications';
import { LoadingModule } from 'app/common/component/loading/loading.module';


import { PopupModule } from 'app/common/component/popup/popup.module';
import { TooltipsModule } from 'app/common/component/tooltip/tooltip.module';
import { UserService } from 'app/common/services/user.service';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { FilterusernameComponent } from 'app/application/admin/settings-build/admin/filterusername/filterusername.component';
import { FieldAdminModule } from 'app/application/admin/fields/fields.module';

@NgModule({
    imports: [
        HttpModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        FieldAdminModule,
        TooltipsModule,
        PopupModule,
        LoadingModule,
        MultiselectModule,
        SimpleNotificationsModule.forRoot(),
    ],
    exports: [
        FilterusernameComponent,
    ],
    declarations: [
        FilterusernameComponent,
    ],
    providers: [NotificationsService],
})

export class filterusernameModule {

}