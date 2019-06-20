import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalFunction } from "app/common/core/global_function";
import { PopupcomponentComponent } from "app/common/component/popup/popup.component";
declare var $: any;

@Component({
    selector: 'rotatepopup',
    templateUrl: 'rotatepopup.component.html',
})
export class RotatepopupComponent extends PopupcomponentComponent {
    _list_files: any = [];
    @Input()
    set_listFile(vl: any) {
        this._list_files = vl;
    }

    constructor(private modalService1: NgbModal) { 
        super(modalService1);
    }

    click_cancel() {
        $(document.querySelector('#header_close')).click();
    }
}