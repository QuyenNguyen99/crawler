import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-tooltip';
import { RlTagInputModule } from 'angular2-tag-input';
import { TokeninputoperationComponent } from 'app/common/component/tokeninputoperation/tokeninputoperation.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        RlTagInputModule,
    ],
    exports: [
        TokeninputoperationComponent
    ],
    declarations: [
        TokeninputoperationComponent
    ],
    providers: [
    ]
})

export class TokeninputoperationModule{}