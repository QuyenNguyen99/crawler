import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { JsonitemComponent } from './jsonitem.component';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SelectupdateModule,
    ],
    exports: [
        JsonitemComponent
    ],
    declarations: [
        JsonitemComponent,
    ],
    providers: [
    ]
})

export class JsonitemModule { }