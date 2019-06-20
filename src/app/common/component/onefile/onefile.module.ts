import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OnefileComponent } from './onefile.component';
import { Global_DB } from 'app/common/core/global_db';
import { PopupModule } from 'app/common/component/popup/popup.module';
import {TooltipModule} from "ngx-tooltip";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PopupModule,
        TooltipModule
    ],
    exports: [
        OnefileComponent
    ],
    declarations: [
        OnefileComponent,
    ],
    providers: [
        Global_DB,
    ]
})

export class OnefileModule { }