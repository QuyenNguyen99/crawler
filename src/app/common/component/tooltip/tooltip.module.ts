import {NgModule} from'@angular/core';
import { TooltipsComponent } from 'app/common/component/tooltip/tooltip.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[
        CommonModule
    ],
    exports:[
        TooltipsComponent
    ],
    declarations:[
        TooltipsComponent
    ],
    providers: []
})

export class TooltipsModule{}