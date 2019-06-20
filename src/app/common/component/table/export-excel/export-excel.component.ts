import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupcomponentComponent } from "app/common/component/popup/popup.component";
declare var $: any;

@Component({
    selector: 'exportexcel',
    templateUrl: 'export-excel.component.html',
})

export class ExportExcelComponent extends PopupcomponentComponent {
    constructor(private modalService1: NgbModal) { 
        super(modalService1);
    }
    _selectExport: any = 2;
}