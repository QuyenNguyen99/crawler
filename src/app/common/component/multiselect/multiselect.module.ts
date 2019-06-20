import { NgModule } from '@angular/core';
import { MultiselectComponent } from 'app/common/component/multiselect/multiselect.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { TooltipModule } from 'ngx-tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        PerfectScrollbarModule
    ],
    exports: [
        MultiselectComponent
    ],
    declarations: [
        MultiselectComponent
    ],
    providers: [
    ]
})

export class MultiselectModule{}