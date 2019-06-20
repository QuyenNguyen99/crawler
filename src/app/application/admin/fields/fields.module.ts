import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    Ftextuser,
    Fpassworduser,
    Ftextpwduser,
    Fradio,
    Fselectuser,
    Ftextarea,
    Fdropdowndateuser,
    Fselectother,
    Fcitycounty,
    FOneimage, FManyimages, FOnefile, FManyfiles, Fmultiselectuser, FArrayjson, Fcheckbox, FDaterangepicker, Fjsontext, Taginput, Tokeninput, Selecttable
} from './fields';
import { SelectupdateModule } from 'app/common/component/selectupdate/selectupdate.module';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { DropdowndateModule } from 'app/common/component/dropdowndate/dropdowndate.module';
import { OneimgageModule } from 'app/common/component/oneimage/oneimage.module';
import { ManyimagesModule } from 'app/common/component/manyimages/manyimages.module';
import { OnefileModule } from 'app/common/component/onefile/onefile.module';
import { ManyfilesModule } from 'app/common/component/manyfiles/manyfiles.module';
import { ArrayJsonModule } from 'app/common/component/arrayjson/arrayjson.module';
import { DaterangepickerModule } from 'app/common/component/daterangepicker/daterangepicker.module';
import { MultiselectModule } from 'app/common/component/multiselect/multiselect.module';
import { JsontextModule } from 'app/common/component/jsontext/jsontext.module';
import { TextpwdModule } from 'app/common/component/textpwd/textpwd.module';
import { TaginputModule } from 'app/common/component/taginput/taginput.module';
import { TokeninputModule } from 'app/common/component/tokeninput/tokeninput.module';
import { SelecttableModule } from 'app/common/component/selecttable/selecttable.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DateTimePickerModule,
        SelectupdateModule,
        DropdowndateModule,
        OneimgageModule,
        ManyimagesModule,
        OnefileModule,
        ManyfilesModule,
        ArrayJsonModule,
        MultiselectModule,
        DaterangepickerModule,
        JsontextModule,
        TextpwdModule,
        TaginputModule,
        TokeninputModule,
        SelecttableModule,
    ],
    exports: [
        Ftextuser, Fpassworduser, Ftextpwduser, Fradio, Fselectuser, Ftextarea, Fdropdowndateuser, Fjsontext, Taginput, Tokeninput, Selecttable,
        Fselectother, Fcitycounty, FOneimage, FManyimages, FOnefile, FManyfiles, Fmultiselectuser, FArrayjson, Fcheckbox, FDaterangepicker,
    ],
    declarations: [
        Ftextuser, Fpassworduser, Ftextpwduser, Fradio, Fselectuser, Ftextarea, Fdropdowndateuser, Fjsontext, Taginput, Tokeninput, Selecttable,
        Fselectother, Fcitycounty, FOneimage, FManyimages, FOnefile, FManyfiles, Fmultiselectuser, FArrayjson, Fcheckbox, FDaterangepicker,
    ],
    providers: [
    ]
})

export class FieldAdminModule { }