import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RotatepopupComponent } from './rotatepopup.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule.forRoot(),
    ],
    exports: [
        RotatepopupComponent,
    ],
    declarations: [
        RotatepopupComponent,
    ],
    providers: [
    ]
})

export class RotatepopupModule { }