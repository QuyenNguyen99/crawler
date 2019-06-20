import { Component, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { GlobalFunction } from 'app/common/core/global_function';
import { AdminPageService } from 'app/common/services/admin_page.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminTableColumnService } from 'app/common/services/admin_table_column.service';
import { CommonTableService } from 'app/application/admin/settings-build/common.table.service';



export class CommonAdminComponent implements OnInit, OnDestroy, AfterViewInit {
  notifications_options: any = {
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private route: ActivatedRoute,private router: Router,public user_service: UserService, public notification_service: NotificationsService) {
  }


  ngOnInit() {

  }

  ngOnDestroy() {
    let page: any;
    page = this.route.snapshot.params['page'];
    if (page) {
      GlobalFunction['page'] = page;
    }
  }

  ngAfterViewInit() {

  }

  role(action) {
    return GlobalFunction.ROLE[action] ? true : false;
  }

  get_model_by_table_name(table_name) {
    // var model_serivce = GlobalFunction.get_model_service_by_table_name(table_name);
    var b;
    var src = '../../../../../src/app/';
    if(GlobalFunction.contains(table_name,GlobalFunction.LIST_TABLE_CORE)) {
      src += 'common/services/';
    } else {
      src += 'application/admin/models/';
    }
    eval('b = __webpack_require__("' + src + table_name + '.service.ts")["a"];');
    return new b(this.user_service._db,  this.user_service.http);
  }
}
