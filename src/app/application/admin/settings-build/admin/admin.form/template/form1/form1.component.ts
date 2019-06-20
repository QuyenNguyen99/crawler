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
import { AdminTemplateCommonComponent } from 'app/application/admin/settings-build/admin/admin.form/template/admin.template.common';


@Component({
    selector: 'form-template-1',
    templateUrl: './form1.component.html',
  })
export class AdminFormTemplate1Component extends AdminTemplateCommonComponent {


  constructor(private route3: ActivatedRoute, private router3: Router, public user_service3: UserService, public notification_service3: NotificationsService) {
      super(route3, router3, user_service3, notification_service3);
  }

  sortAdminFormTab() {
    for(var i in this.admin_form.list_admin_form_tab) {
      this.admin_form.list_admin_form_tab[i].priority = i + 1;
    }
  }

}