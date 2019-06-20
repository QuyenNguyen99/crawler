import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Select2Module } from 'ng2-select2';

import { TextpwdComponent } from './textpwd.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        Select2Module,
    ],
    exports: [
        TextpwdComponent
    ],
    declarations: [
        TextpwdComponent,
    ],
    providers: [
    ]
})

export class TextpwdModule { }