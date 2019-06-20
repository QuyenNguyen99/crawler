import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-tooltip';
import { RlTagInputModule } from 'angular2-tag-input';
import { TaginputComponent } from 'app/common/component/taginput/taginput.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        RlTagInputModule,
    ],
    exports: [
        TaginputComponent
    ],
    declarations: [
        TaginputComponent
    ],
    providers: [
    ]
})

export class TaginputModule{}