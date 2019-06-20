import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';
import { AdminFormService } from 'app/common/services/admin_form.service';


@Component({
    selector: 'admin-form-tab',
    templateUrl: './admin.form.tab.component.html',
  })
export class AdminFormTabComponent extends CommonAdminComponent {

  admin_form: AdminFormService;
  admin_form_tab: AdminFormTabService;
  model_service: any;
  hidden: boolean = false;
  list: any;

  @Input()
  set set_admin_form(value: AdminFormService) {
    this.admin_form = value;
    this.set_list();
  }

  
  @Input()
  set model_admin_form_tab(value: any) {
    this.admin_form_tab = value;
    var that = this;
    this.set_list();
  }

  @Input()
  set model(value: any) {
    this.model_service = value;
  }

  set_list() {
    if(this.admin_form && this.admin_form_tab) {
      this.admin_form_tab['list'] = [];
      for(var i in this.admin_form_tab.list_admin_form_field) {
        this.admin_form_tab['list'].push(this.admin_form_tab.list_admin_form_field[i]);
      }
      for(var i in this.admin_form.list_admin_form_tab) {
        if(this.admin_form.list_admin_form_tab[i].parent_id == this.admin_form_tab.id) {
          this.admin_form_tab['list'].push(this.admin_form.list_admin_form_tab[i]);
        }
      }
      this.admin_form_tab['list'].sort(function(item1, item2){
        return item1.priority - item2.priority;
      })
    
    }
  }

  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
      super(route2, router2, user_service2, notification_service2);
  }

  typeof(value) {
    return typeof(value);
  }

  editAdminFormField() {
    this.admin_form['this_parent'].edit_tab(this.admin_form_tab);
  }

  createAdminFormField() {
      this.admin_form['this_parent'].create_field(this.admin_form_tab);
  }

  deleteAdminFormTab() {
    this.admin_form['this_parent'].delete_tab(this.admin_form_tab);
  }

  sortAdminFormField() {
    var that = this;
    return {
      onEnd   : function(e) {
        for(var i in that.admin_form_tab['list']) {
          that.admin_form_tab['list'][i].priority = parseInt(i) + 1;
        }
      }
    };
  }

  createAdminFormTab() {
    this.admin_form['this_parent'].create_tab(this.admin_form_tab.line, this.admin_form_tab.id);

  }
}