import { Component, Input, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { AdminOtherService } from 'app/common/services/admin_other.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';


@Component({
    selector: 'admin-other',
    templateUrl: './admin.other.component.html',
    styleUrls: ['./admin.other.component.scss']
  })
export class AdminOtherComponent extends CommonAdminComponent {
  @ViewChild('table') _table: any;
  
  @Input()
  set model(value: any) {
    this.admin_other = new AdminOtherService(this.user_service._db,  this.user_service.http);
  }

  admin_other: AdminOtherService;
  
  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
      super(route2, router2, user_service2, notification_service2);
  }
}