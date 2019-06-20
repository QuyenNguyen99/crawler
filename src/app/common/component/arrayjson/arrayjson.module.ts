import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ArrayJsonComponent } from './arrayjson.component';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { JsonitemModule } from 'app/common/component/jsonitem/jsonitem.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        SelectupdateModule,
        JsonitemModule,
    ],
    exports: [
        ArrayJsonComponent
    ],
    declarations: [
        ArrayJsonComponent,
    ],
    providers: [
    ]
})

export class ArrayJsonModule { }