import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { SortablejsModule } from 'angular-sortablejs';

import { TableComponent } from './table.component';
import { SelectupdateModule } from '../selectupdate/selectupdate.module';
import { PagingModule } from '../paging/paging.module';
import { Fselecttable, Fchecktable, Fmultiselecttable} from './field_table';
import { ExportExcelComponent } from "./export-excel/export-excel.component";
import { ImportExcelComponent } from "./import-excel/import-excel.component";
import { PopupModule } from "../popup/popup.module";
import { TooltipModule } from "ngx-tooltip";
import { SimpleNotificationsModule } from 'angular4-notifications/src/simple-notifications.module';
import { FilterfieldComponent } from 'app/common/component/table/filterfield/filterfield.component';
import { FilterfieldchildComponent } from 'app/common/component/table/filterfieldchild/filterfieldchild.component';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { HeaderTableComponent } from 'app/common/component/table/header.table/header.table.component';
import { Global_DB } from '../../core/global_db';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DateTimePickerModule,
        SelectupdateModule,
        PagingModule,
        PopupModule,
        MultiselectModule,
        SortablejsModule.forRoot({ animation: 150 }),
        SimpleNotificationsModule.forRoot(),
        TooltipModule,
        LoadingModule
    ],
    exports: [
        TableComponent,
        FilterfieldComponent,
        FilterfieldchildComponent,
    ],
    declarations: [
        TableComponent,
        Fselecttable,
        Fchecktable,
        Fmultiselecttable,
        ExportExcelComponent,
        ImportExcelComponent,
        FilterfieldComponent,
        FilterfieldchildComponent,
        HeaderTableComponent,
    ],
    providers: [
        Global_DB,
    ]
})

export class TableModule { }