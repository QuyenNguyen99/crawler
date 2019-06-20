import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { PopupcomponentComponent } from 'app/common/component/popup/popup.component';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';

declare var $: any;
const CANCEL_RELEASE_CARD = 65;

@Component({
	selector: 'filterusername',
	templateUrl: 'filterusername.component.html',
	styleUrls: ['filterusername.component.scss']
})

export class FilterusernameComponent extends PopupcomponentComponent {
	constructor(private modalService1: NgbModal,
		public notification_service: NotificationsService) {
		super(modalService1);
	}
	customerTemp: any;
	_windowClass = 'edit-status';

	@Output() confirmDone: any = new EventEmitter<any>();

	open(option: any = false) {
		this.customerTemp = option.model;
		super.open(option);
	}

	save() {
		if(this.customerTemp.validate()) {
			this.click_cancel();
			this._message.confirmDone();
		}
	}
	
}