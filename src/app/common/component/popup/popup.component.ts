import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalFunction } from "app/common/core/global_function";
declare var $: any;

export class PopupcomponentComponent implements AfterViewInit {

    @Input()
    set message(vl) {
        this._message = vl;
    }
    get message() {
        return this._message;
    }
    @Input()
    set this_parent(vl) {
        this._this_parent = vl;
        this.set_this_parent_attribute();
    }
    @Input()
    set attribute(vl) {
        this._attribute = vl;
        this.set_this_parent_attribute();
    }

    set_this_parent_attribute() {
        if (this._this_parent !== undefined && this._attribute !== undefined) {
            this._this_parent[this._attribute] = this;
        }
    }

    _message: any = {};
    _this_parent: any;
    _attribute: any;
    _windowClass = 'message';
    @Output()
    confirm = new EventEmitter<any>();
    @Output()
    close = new EventEmitter<any>();
    @Output()
    init = new EventEmitter<any>();

    closeResult: string;

    @ViewChild('content') _content: any;
    constructor(private modalService: NgbModal) {
    }
    ngAfterViewInit() {
        this.init.emit(this);
        document.title = 'crawlersystem';
    }
    openPopupStatus(content) {
        this.modalService.open(content, { 'windowClass': this._windowClass }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    @ViewChild('acceptButton') acceptButton: any;
    open(options: any = false) {
        this.openPopupStatus(this._content);
        if (options && typeof (options) == 'object') {
            this._message = Object.assign({}, this._message, options);
        }
        setTimeout(() => {
            $('#accpetButton').focus();
        }, 250);
    }

    click_cancel() {
        $(document.querySelector('.modal-header .close')).click();
    }

    click_confirm() {
        var that = this;
        if (this._message.confirm) {
            var obj = this._message.confirm();
            if (typeof (obj) == 'object') {
                obj.then(r => {
                    that.click_cancel();
                })
            }
        } else if (this._message.autoClose) {
            that.click_cancel();
        }
        this.confirm.emit(true);
    }

    private getDismissReason(reason: any): string {
        this.close.emit(true);
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}

@Component({
    selector: 'messageconfirm',
    templateUrl: 'message_confirm.html',
})
export class MessageconfirmComponent extends PopupcomponentComponent {
    constructor(private modalService1: NgbModal) {
        super(modalService1);
    }

    // ngAfterViewInit(){
    //     var that = this;
    //     setTimeout(()=>{
    //         if(that.acceptButton && that.acceptButton.nativeElement){
    //             $(that.acceptButton.nativeElement).focus();
    //         }
    //     }, 250);
    // }

    click_cancel() {
        $(document.querySelector('#header_close')).click();
    }
}

@Component({
    selector: 'messageclose',
    templateUrl: 'message_close.html',
})
export class MessageCloseComponent extends PopupcomponentComponent {
    constructor(private modalService1: NgbModal) {
        super(modalService1);
    }

    click_cancel() {
        $(document.querySelector('#header_close')).click();
    }
    click_confirm() {
        var that = this;
        if (this._message.confirm) {
            var obj = this._message.confirm();
            if (typeof (obj) == 'object') {
                obj.then(r => {
                    that.click_cancel();
                })
            }
        } else {
            that.click_cancel();
        }
        this.confirm.emit(true);
    }
}