import { Component, Input, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'fcheckboxlabel',
    templateUrl: 'checkboxlabel.component.html',
    styleUrls: ['checkboxlabel.component.scss']
})

export class CheckboxLabelComponent{
    _model: any;
    @Input()
    set model(vl: any){
        if(vl){
            this._model = vl;
        }
    }
    get model(){
        return this._model;
    }

    @Output('changeValue') changeValue: EventEmitter<any> = new EventEmitter;

    @ViewChild('checkbox') checkbox;

    chooseCheckbox(){
        if(this.checkbox && this.checkbox.nativeElement){
            this.model.checked = this.checkbox.nativeElement.checked;
            this.changeValue.emit(this.model);
        }
    }
}