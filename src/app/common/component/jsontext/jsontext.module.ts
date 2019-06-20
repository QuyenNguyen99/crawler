import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';

import { JsontextComponent } from './jsontext.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        Select2Module,
    ],
    exports: [
        JsontextComponent
    ],
    declarations: [
        JsontextComponent,
    ],
    providers: [
    ]
})

export class JsontextModule { }