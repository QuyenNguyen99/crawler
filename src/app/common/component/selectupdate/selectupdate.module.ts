import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

import { SelectupdateComponent } from './selectupdate.component';

@NgModule({
    imports: [
        FormsModule,
        Select2Module,
        PerfectScrollbarModule
    ],
    exports: [
        SelectupdateComponent
    ],
    declarations: [
        SelectupdateComponent,
    ],
    providers: [
    ]
})

export class SelectupdateModule { }