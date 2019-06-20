import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-tooltip';
import { RlTagInputModule } from 'angular2-tag-input';
import { TokeninputComponent } from 'app/common/component/tokeninput/tokeninput.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        RlTagInputModule,
    ],
    exports: [
        TokeninputComponent
    ],
    declarations: [
        TokeninputComponent
    ],
    providers: [
    ]
})

export class TokeninputModule{}