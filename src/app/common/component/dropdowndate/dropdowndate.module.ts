import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

import { DropdowndateComponent } from './dropdowndate.component';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        Select2Module,
        SelectupdateModule,
    ],
    exports: [
        DropdowndateComponent
    ],
    declarations: [
        DropdowndateComponent,
    ],
    providers: [
    ]
})

export class DropdowndateModule { }