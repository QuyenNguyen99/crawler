import { NgModule } from '@angular/core';
import { CheckboxLabelComponent } from 'app/common/component/checkboxlabel/checkboxlabel.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CheckboxLabelComponent
    ],
    declarations: [
        CheckboxLabelComponent
    ],
    providers: [
    ]
})

export class CheckboxLabelModule{}