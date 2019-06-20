import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-tooltip';
import { SelecttableComponent } from 'app/common/component/selecttable/selecttable.component';
import { TableModule } from 'app/common/component/table/table.module';

@NgModule({
    imports: [
        FormsModule,
        TooltipModule,
        TableModule,
    ],
    exports: [
        SelecttableComponent
    ],
    declarations: [
        SelecttableComponent
    ],
    providers: [
    ]
})

export class SelecttableModule{}