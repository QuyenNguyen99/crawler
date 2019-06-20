import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';
import { GlobalFunction } from 'app/common/core/global_function';


@Component({
  selector: 'admin-form-field',
  templateUrl: './admin.form.field.component.html',
})
export class AdminFormFieldComponent extends CommonAdminComponent {
  admin_form: AdminFormService;
  admin_form_tab: AdminFormTabService;
  admin_form_field: AdminFormFieldService;
  model_service: any;

  @Input()
  set set_admin_form(value: AdminFormService) {
    this.admin_form = value;
  }

  @Input()
  set set_admin_form_tab(value: AdminFormTabService) {
    this.admin_form_tab = value;
  }

  @Input()
  set model_admin_form_field(value: any) {
    this.admin_form_field = value;
  }

  @Input()
  set model(value: any) {
    this.model_service = value;
  }

  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
    super(route2, router2, user_service2, notification_service2);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.model_service || !this.model_service.id) {
      this.change_value_by_attribute();
    }
  }

  edit_field_fast() {
    this.admin_form['this_parent'].edit_field(this.admin_form_field);
  }

  delete_field_fast() {
    this.admin_form['this_parent'].delete_field(this.admin_form_field, this.admin_form_tab);
  }

  change_value_by_attribute() {
    if(this.admin_form_field['event_trigger']) {
      eval(this.admin_form_field['event_trigger']);
    }
  }
  
}