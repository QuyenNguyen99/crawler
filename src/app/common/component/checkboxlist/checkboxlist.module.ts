import { NgModule } from '@angular/core';
import { CheckboxListComponent } from 'app/common/component/checkboxlist/checkboxlist.component';
import { CheckboxLabelComponent } from 'app/common/component/checkboxlabel/checkboxlabel.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CheckboxLabelComponent,
        CheckboxListComponent
    ],
    declarations: [
        CheckboxLabelComponent,
        CheckboxListComponent
    ],
    providers: [
    ]
})

export class CheckboxListModule{}