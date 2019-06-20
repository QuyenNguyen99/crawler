import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';


export class AdminTemplateCommonComponent extends CommonAdminComponent {


  admin_form: AdminFormService;
  model_service: any;
  
  @Input()
  set set_admin_form(value: AdminFormService) {
    this.admin_form = value;
  }

  @Input()
  set set_model_service(value: any) {
    this.model_service = value;
  }

  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
      super(route2, router2, user_service2, notification_service2);
  }

  createAdminFormTab() {
      this.admin_form['this_parent'].create_tab();
  }

}