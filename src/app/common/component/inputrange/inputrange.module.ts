import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-tooltip';
import { RlTagInputModule } from 'angular2-tag-input';
import { InputrangeComponent } from 'app/common/component/inputrange/inputrange.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        RlTagInputModule,
    ],
    exports: [
        InputrangeComponent
    ],
    declarations: [
        InputrangeComponent
    ],
    providers: [
    ]
})

export class InputrangeModule{}