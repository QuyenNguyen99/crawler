import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageCloseComponent, MessageconfirmComponent } from './popup.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule.forRoot(),
    ],
    exports: [
        MessageCloseComponent,
        MessageconfirmComponent
    ],
    declarations: [
        MessageCloseComponent,
        MessageconfirmComponent
    ],
    providers: [
    ]
})

export class PopupModule { }