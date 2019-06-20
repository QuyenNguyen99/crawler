import { NgModule } from '@angular/core';
import { PagingComponent } from 'app/common/component/paging/paging.component';
import { SelectupdateModule } from '../selectupdate/selectupdate.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectupdateModule
    ],
    exports: [
        PagingComponent
    ],
    declarations: [
        PagingComponent
    ],
    providers: [
    ]
})

export class PagingModule{}