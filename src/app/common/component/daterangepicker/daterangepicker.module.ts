import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerComponent } from './daterangepicker.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        Daterangepicker,
    ],
    exports: [
        DaterangepickerComponent
    ],
    declarations: [
        DaterangepickerComponent,
    ],
    providers: [
    ]
})

export class DaterangepickerModule { }