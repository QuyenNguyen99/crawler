import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Ftext, Fpassword, FieldComponent } from './fields';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        Ftext, Fpassword,
    ],
    declarations: [
        Ftext, Fpassword, 
    ],
    providers: [
    ]
})

export class FieldModule { }