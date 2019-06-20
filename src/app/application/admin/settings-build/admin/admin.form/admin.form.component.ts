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
import { GlobalFunction } from 'app/common/core/global_function';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';
import 'rxjs/add/operator/toPromise';
import { CommonTableService } from 'app/application/admin/settings-build/common.table.service';


@Component({
  selector: 'admin-form',
  templateUrl: './admin.form.component.html',
  styleUrls: ['./admin.form.component.scss']
})
export class AdminFormComponent extends CommonAdminComponent {

  @Output() save_done: any = new EventEmitter<any>();
  @Output() cancel_done: any = new EventEmitter<any>();
  @ViewChild('obj_popup_form_edit_field') obj_popup_form_edit_field: any = new EventEmitter<any>();
  @ViewChild('obj_popup_form_edit_tab') obj_popup_form_edit_tab: any = new EventEmitter<any>();

  admin_form: AdminFormService;
  admin_form_edit_field: AdminFormService;
  admin_form_table_column: AdminFormService;
  model_service: any;

  _show_admin_form: boolean = false;

  _save_label: String = 'Cập nhật';

  @Input()
  set save_label(value: String) {
    this._save_label = value;
  }

  _cancel_label: String = 'Hủy';

  @Input()
  set cancel_label(value: String) {
    this._cancel_label = value;
  }

  _save_disable: boolean = false;

  @Input()
  set save_disable(value: boolean) {
    this._save_disable = value;
  }

  @Input()
  set show_admin_form(value: boolean) {
    this._show_admin_form = value;
  }

  @Input()
  set model_admin_form(value: AdminFormService) {
    value.setAttributeTabFieldClass();
    this.admin_form = value;
    this.admin_form['this_parent'] = this;
  }

  @Input()
  set model(value: any) {
    this.model_service = value;
  }
  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService) {
    super(route2, router2, user_service2, notification_service2);
  }

  click_cancel() {
    this.cancel_done.emit();
  }

  save() {
    var that = this;
    var is_new_record = this.model_service.isNewRecord();
    var is_update_all = this.model_service.isUpdateAll();
    if (this._save_disable) {
      this.model_service.save_not_db().then(rs => {
        if (rs.code == 200) {
          that.save_done.emit(rs.attributes);
        } else if (rs.code == 400) {
          that.model_service._error_api = rs.error;
        }
      });
    } else {
      let msg;
      if (is_update_all) {
        msg = "Cập nhật đồng loạt " + that.admin_form.name.toLowerCase() + ' thành công';
        this.model_service.updateAll({id: this.model_service.ids}).then(rs => {
          if (rs.code == 200) {
            that.notification_service.success(msg, '');
            that.save_done.emit();
          } else if (rs.code == 400) {
            that.model_service._error_api = rs.error;
          }
        });
      } else {
        msg = (is_new_record ? 'Thêm' : 'Sửa') + ' ' + that.admin_form.name.toLowerCase() + ' thành công';
        this.model_service.save().then(rs => {
          if (rs.code == 200) {
            that.notification_service.success(msg, '');
            that.save_done.emit();
          } else if (rs.code == 400) {
            that.model_service._error_api = rs.error;
          }
        });
      }
    }
  }
  
  tab_update: AdminFormTabService;
  field_update: AdminFormFieldService;
  admin_form_edit_tab: AdminFormService;

  edit_tab(tab: AdminFormTabService) {
    this.admin_form['admin_form_tab'] = new AdminFormTabService(this.user_service._db, this.user_service.http);
    this.admin_form['admin_form_tab'].setAttributesAndOldAttributes(tab.getAttributes());
    this.admin_form['admin_form_tab'].get_fk_mul();
    this.tab_update = tab;
    this.admin_form_edit_tab = new AdminFormService(this.user_service._db, this.user_service.http);
    this.admin_form_edit_field = this.admin_form_edit_tab;
    this.callPopUpTab(3);
  }

  create_tab(line: number = null, parent_id: number = null) {
    this.admin_form['admin_form_tab'] = new AdminFormTabService(this.user_service._db, this.user_service.http);
    this.admin_form['admin_form_tab'].admin_form = this.admin_form.id;
    this.admin_form['admin_form_tab'].line = line;
    this.admin_form['admin_form_tab'].parent_id = parent_id;
    this.admin_form['admin_form_tab'].status = 1;
    this.admin_form['admin_form_tab'].get_fk_mul();
    this.admin_form['admin_form_tab']['list_admin_form_field'] = [];
    this.admin_form_edit_tab = new AdminFormService(this.user_service._db, this.user_service.http);
    this.admin_form_edit_field = this.admin_form_edit_tab;
    this.callPopUpTab(3);
  }

  delete_tab(tab: AdminFormTabService) {
    var list = [];
    for(var item_tab of this.admin_form.list_admin_form_tab) {
      if(item_tab.id != tab.id) {
        list.push(item_tab);
      }
    }
    if(tab.parent_id) {
      for(var item_tab of this.admin_form.list_admin_form_tab) {
        if(item_tab.id == tab.parent_id) {
          var list_tab = [];
          for(var item_field of item_tab.list) {
            if(!(item_field.tableName() == 'admin_form_tab' && item_field.id == tab.id)) {
              list_tab.push(item_field);
            }
          }
          list_tab.sort(function(item1, item2){
            return item1.priority - item2.priority;
          })
          item_tab.list = list_tab;
          break;
        }
      }
    }
    this.admin_form.list_admin_form_tab = list;
  }



  callPopUpTab(id) {
    var id_string = 'findOneData_' + id;
    if (!GlobalFunction[id_string]) {
      this.admin_form_edit_tab.findOneData({ id: id }).then(rs => {
        GlobalFunction[id_string] = rs;
        this.obj_popup_form_edit_tab.open({
          model: this.admin_form_edit_tab
        });
      })
    } else {
      this.admin_form_edit_tab.setAttributes(GlobalFunction[id_string]);
      this.admin_form_edit_tab._old_attributes = GlobalFunction[id_string];
      this.obj_popup_form_edit_tab.open({
        model: this.admin_form_edit_tab
      });
    }
  }


  admin_tab_save_done($event) {
    if ($event.is_new_record) {
      $event.model.id = 'tab_' + GlobalFunction.newDate().getTime();
      if($event.model.parent_id) {
        for(var i in this.admin_form.list_admin_form_tab) {
          if(this.admin_form.list_admin_form_tab[i].id == $event.model.parent_id) {
            $event.model.priority = this.admin_form.list_admin_form_tab[i].list.length + 1;
            this.admin_form.list_admin_form_tab[i].list.push($event.model);
          }
        }
      } else {
        $event.model.priority = this.admin_form.list_admin_form_tab.length + 1;
      }
      this.admin_form.list_admin_form_tab.push($event.model);
    } else {
      this.tab_update.setAttributes($event.model.getAttributesUpdate());
    }
    
    // this.reset_admin_form();
  }

  reset_admin_form() {
    var admin_form = new AdminFormService(this.user_service._db, this.user_service.http);
    admin_form.setAttributesAndOldAttributes(this.admin_form.getAttributes());
    for (var i in this.admin_form) {
      admin_form[i] = this.admin_form[i];
    }
    this.admin_form = admin_form;
  }



  saveForm() {
    var that = this;
    if(this.admin_form.show_edit) {
      return this.admin_form.save(false).then(rs => {
        if(rs.code == 200) {
          that.admin_form.setAttributeTabFieldClass();
          that.admin_form.show_edit = false;
          that.notification_service.success('Cập nhật admin form thành công','');
        } else if(rs.code == 400) {
          this.admin_form._error_api = rs.error;
        }
        return rs;
      })
    } else {
      return Promise.resolve({});
    }
  }



  edit_field(field: AdminFormFieldService) {
    this.admin_form['admin_form_field'] = new AdminFormFieldService(this.user_service._db, this.user_service.http);
    this.admin_form['admin_form_field'].setAttributesAndOldAttributes(field.getAttributes());
    this.admin_form['admin_form_field'].get_fk_mul();
    this.field_update = field;
    CommonTableService.get_list_class(this.user_service);
    this.admin_form['admin_form_field'].fk_table_attribute = CommonTableService.getAttributeSelect(this.admin_form.table_name);
    this.admin_form_table_column = new AdminFormService(this.user_service._db, this.user_service.http);
    this.admin_form_edit_field = this.admin_form_table_column;
    this.callPopUpTableColumn(4);
  }
  admin_form_tab_update:  AdminFormTabService;
  admin_form_field_priority: AdminFormFieldService;
  create_field(admin_form_tab: AdminFormTabService, admin_form_field: AdminFormFieldService) {
    this.admin_form_tab_update = admin_form_tab;
    if(!this.admin_form_tab_update['list_admin_form_tab']) {
      this.admin_form_tab_update['list_admin_form_tab'] = [];
    }
    this.admin_form_field_priority = admin_form_field;
    this.admin_form['admin_form_field'] = new AdminFormFieldService(this.user_service._db, this.user_service.http);
    this.admin_form['admin_form_field'].get_fk_mul();
    this.admin_form['admin_form_field'].admin_form_tab = admin_form_tab.id;
    CommonTableService.get_list_class(this.user_service);
    this.admin_form['admin_form_field'].fk_table_attribute = CommonTableService.getAttributeSelect(this.admin_form.table_name);
    this.admin_form_table_column = new AdminFormService(this.user_service._db, this.user_service.http);
    this.admin_form_edit_field = this.admin_form_table_column;
    this.callPopUpTableColumn(4);
  }

  delete_field(admin_form_field: AdminFormFieldService, admin_form_tab: AdminFormTabService) {
    var list = [];
    for(var item of admin_form_tab.list_admin_form_field) {
      if(item.id != admin_form_field.id) {
        list.push(item);
      }
    }
    var list_2 = [];
    for(var item of admin_form_tab['list']) {
      if(!(item.tableName() == 'admin_form_field' && item.id == admin_form_field.id)) {
        list_2.push(item);
      }
    }
    list_2.sort(function(item1, item2){
      return item1.priority - item2.priority;
    })
    admin_form_tab['list'] = list_2;
    admin_form_tab.list_admin_form_field = list;
  }

  callPopUpTableColumn(id) {
    var id_string = 'findOneData_' + id;
    if (!GlobalFunction[id_string]) {
      this.admin_form_table_column.findOneData({ id: id }).then(rs => {
        GlobalFunction[id_string] = rs;
        this.obj_popup_form_edit_field.open({
          model: this.admin_form_table_column
        });
      })
    } else {
      this.admin_form_table_column.setAttributes(GlobalFunction[id_string]);
      this.admin_form_table_column._old_attributes = GlobalFunction[id_string];
      this.obj_popup_form_edit_field.open({
        model: this.admin_form_table_column
      });
    }
  }


  admin_table_column_save_done($event) {
    if ($event.is_new_record) {
      if(!this.admin_form_tab_update['list_admin_form_field']) {
        this.admin_form_tab_update['list_admin_form_field'] = [];
      }
      $event.model.id = 'field_' + GlobalFunction.newDate().getTime();
      $event.model.priority = this.admin_form_tab_update['list_admin_form_field'].length + 1;
      this.admin_form_tab_update.list_admin_form_field.push($event.model);
      this.admin_form_tab_update['list'].push($event.model);
    } else {
      this.field_update.setAttributes($event.model.getAttributesUpdate());
    }
    // this.reset_admin_form();
  }
}