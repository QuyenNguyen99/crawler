import { Component, Input, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/common/services/user.service';
import { CommonAdminComponent } from 'app/application/admin/settings-build/common.admin.components';
import { ServiceGlobal } from 'app/common/services/service.global';
import { filter } from 'rxjs/operator/filter';
import { AdminTableService } from 'app/common/services/admin_table.service';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { PopupFormComponent } from 'app/application/admin/settings-build/admin/popup.form/popup.form.component';
import { AdminTableColumnService } from 'app/common/services/admin_table_column.service';
import { GlobalFunction, Deferred } from 'app/common/core/global_function';
import { CommonTableService } from 'app/application/admin/settings-build/common.table.service';
import { FilterUserService } from 'app/common/services/filter_user.service';
import { MenuItems } from 'app/application/admin/shared/menu-items/menu-items';
import { MessageconfirmComponent, MessageCloseComponent } from 'app/common/component/popup/popup.component';
import 'rxjs/add/operator/toPromise';
import { log } from 'util';
import { PopupSortComponent } from '../popup.sort/popup.sort.component';

declare var $: any;
@Component({
  selector: 'admin-table',
  templateUrl: './admin.table.component.html',
})
export class AdminTableComponent extends CommonAdminComponent {
  @ViewChild('table') table: any;
  @ViewChild('obj_message_confirm') obj_message_confirm: MessageconfirmComponent;
  @ViewChild('obj_message_close') obj_message_close: MessageCloseComponent;
  @ViewChild('obj_popup_form') _obj_popup_form: PopupFormComponent;
  @ViewChild('obj_popup_sort') _obj_popup_sort: PopupSortComponent;
  @ViewChild('obj_popup_form_update_all') _obj_popup_form_update_all: PopupFormComponent;
  @ViewChild('obj_popup_form_admin_table_column') obj_popup_form_admin_table_column: PopupFormComponent;
  @ViewChild('filterusername') filterusername: any;
  @Input() admin_page: any;

  _loading: any = false;
  @Input()
  set loading(vl: any) {
      this._loading = vl;
  }
  get loading() {
      return this._loading;
  }

  isShowDeleteAll: boolean = false;

  changeFilterModeWidth: number = 480;
  isMobile = false;
  action_list: any = [];
  model_service: any;
  model_service_add: any;

  show_list_staff_assign: boolean = false;

  disable_row_attribute: any;
  disable_row_value: any;
  disable_items: any;

  admin_table: AdminTableService;
  admin_form: AdminFormService;
  admin_from_create_name: String = '';
  admin_table_column: AdminTableColumnService;
  admin_form_table_column: AdminFormService;
  columns: any = [
  ];
  action = [
  ];
  action_read: string = '';
  action_create: string = '';
  action_edit: string = '';
  action_delete: string = '';
  action_copy: string = '';
  list_table: any = [];
  link_create: string = '';
  controller: String = '';
  list_column: any = {};
  list_admin_table_column: any;
  listStaffToAssign: any = [];
  assignStaff: any;
  listAssign: any = [];



  filter_user: any;
  filter_user_id: any;
  list_filter_user: any = [];
  list_filter_user_field: any = [];
  admin_table_load: boolean = false;
  data_column_filter: any = [];
  value_column_filter: any = [];
  data_column_display: any = [];
  value_column_display: any = [];


  LOAD_SUCCESS: any = new Deferred();
  COUNT_SUCCESS = 0;
  LENGTH_SUCCESS = 2;
  data_load_success: boolean = false;

  flag: boolean = false;
  model_filter_user: FilterUserService;
  filter_change_update: boolean = false;
  isOpen: boolean = false;


  constructor(private route2: ActivatedRoute, private router2: Router, public user_service2: UserService, public notification_service2: NotificationsService,
    public menuItems: MenuItems) {
    super(route2, router2, user_service2, notification_service2);
    this.route2.params.subscribe(params => {
      this.controller = params.admin_common_controller;
    });
  }
  @Input()
  set model(value: any) {
    this.set_model(value);
  }

  set_model(value: any) {
    var that = this;
    this.admin_table = new AdminTableService(this.user_service._db, this.user_service.http);
    this.admin_table.setAttributes(value);
    if(this.admin_table.default_update_status) {
      this.action_list = JSON.parse(this.admin_table.default_update_status);
    }
    this.action_read = this.admin_table.table_name + '_read';
    this.action_create = this.admin_table.table_name + '_create';
    this.action_edit = this.admin_table.table_name + '_update';
    this.action_delete = this.admin_table.table_name + '_delete';
    this.action_copy = this.admin_table.table_name + '_copy';
    if (value['fk_table_admin_form']) {
      this.admin_form = new AdminFormService(this.user_service._db, this.user_service.http);
      this.admin_form.setAttributes(value['fk_table_admin_form']);
      this.admin_from_create_name = this.admin_form.get_create_name();
    }
    this.link_create = '/admin/common/' + this.controller + '/' + this.admin_table.id + '/form';
    this.set_action(value);
    this.list_admin_table_column = value['list_admin_table_column'];
    this.set_column(value);
    this.model_service = this.get_model_by_table_name(this.admin_table.table_name);
    this.model_service_add = this.get_model_by_table_name(this.admin_table.table_name);

    that.user_service.setAttributesAndOldAttributes(GlobalFunction['user_infor']);
    this.set_list_filter_user(value);
    this.load_admin_table(value);
  }

  ngOnInit() {
    this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
  }
  
  @HostListener('window:click', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  onClick(event) {
    if (this.isOpen && !event.target['closest']('.filter_action_mobile') && !event.target['closest']('.div-filter-secondary')) {
      this.isOpen = false;
    }
  }

  sub: any;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    var that = this;
    document.querySelector('.page_inner').scrollTop = 0;
    that.LOAD_SUCCESS.promise.then(rs => {
      that.sub = that.route2.params.subscribe((params) => {
        if (params.admin_filter_user_id) {
          if (params.admin_filter_user_id != this.filter_user_id) {
            var obj_params = Object.assign({}, params);
            delete obj_params.admin_filter_user_id;
            delete obj_params.limit;
            delete obj_params.order_by;
            delete obj_params.page;
            that.set_filter_user(params.admin_filter_user_id, obj_params);
          }
          that.table.set_load_route_params(params);
        } else {
          // that.set_filter_user();
          // that.router2.navigate([location.pathname.replace(/(;|\?).*/gi, ''), that.model_filter_user.getParamsSearch()]);
        }
      })
    })
  }

  set_list_filter_user(value) {
    var that = this;
    if (value.list_filter_user) {
      for (var item of value.list_filter_user) {
        item.text = item.name;
      }
      that.list_filter_user = value.list_filter_user;
    } else {
      that.list_filter_user = [];
    }
  }

  load_admin_table(rs) {
    var that = this;
    if (that.route2.params['_value'].admin_filter_user_id) {
      var params = Object.assign({}, that.route2.params['_value']);
      delete params.admin_filter_user_id;
      delete params.limit;
      delete params.order_by;
      delete params.page;
      that.set_filter_user(that.route2.params['_value'].admin_filter_user_id, params);
    } else {
      that.set_filter_user();
      that.router2.navigate([location.pathname.replace(/(;|\?).*/gi, ''), that.model_filter_user.getParamsSearch()]);
    }
    that.admin_table_load = true;
  }

  table_load_true() {
    this.LOAD_SUCCESS.resolve(true);
  }

  set_filter_user(admin_filter_user_id: any = false, params: any = false) {
    var that = this;
    var filter_user: any = false;
    for (var item of that.list_filter_user) {
      if (item.id == admin_filter_user_id) {
        filter_user = item;
        break;
      }
    }
    if (!filter_user) {
      for (var item of that.list_filter_user) {
        if (item.default) {
          filter_user = item;
          break;
        }
      }
    }
    if (!filter_user) {
      for (var item of that.list_filter_user) {
          filter_user = item;
          break;
      }
    }
    that.filter_user = filter_user;
    that.filter_user_id = filter_user.id;
    if (!that.filter_user.list_filter_user_field || that.filter_user.list_filter_user_field === undefined) {
      that.filter_user.list_filter_user_field = [];
    }
    that.filter_user.page_db = 1;
    if (GlobalFunction['page'] && GlobalFunction['return_page'] == 1) {
      that.filter_user.page_db = GlobalFunction['page'];
      GlobalFunction['return_page'] = null;
      GlobalFunction['page'] = null;
    }
    // if(params) {
    //   for(var k in params) {
    //     if(this.model_service.hasAttribute(k)) {
    //       this.model_service[k] = params[k];
    //     }
    //   }
    // }
    that.set_model_filter_user(params);
    that.set_column_get_filter();
    this.set_filter_change_update();
    this.set_column_sort();
  }

  set_model_filter_user(params) {
    var that = this;
    that.model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    that.model_filter_user.setAttributesAndOldAttributes(that.filter_user);
    that.set_column_in_filter_user_field(params);
    if (params) {
      var list_add_field = [];
      for (var attr in params) {
        var flag = true;
        for (var filter_user_field of that.model_filter_user.list_filter_user_field) {
          if (attr == filter_user_field.column.attribute) {
            flag = false;
          }
        }
        if (flag && params[attr]) {
          for (var column of this.columns) {
            if (attr == column.attribute) {
              list_add_field.push({
                id: column.id,
                column: column,
                value: params[attr],
              })
            }
          }
        }
      }
      if (list_add_field.length) {
        this.addFilterUserField(list_add_field);
      }
    }
  }

  set_column_in_filter_user_field(params = false) {
    var that = this;
    for (var column of that.columns) {
      for (var item of that.model_filter_user.list_filter_user_field) {
        if (item.admin_table_column == column.id) {
          item.column = column;
          if (!item.column.filter) {
            item.column.filter = {};
          }
          if (item.column.filter.type != item.type) {
            item.column.filter.type = item.type;
          }
          var attr_value = {};
          attr_value[item.column.attribute] = params[item.column.attribute] ? params[item.column.attribute] : item.value;
          this.model_service.setAttributeSearchByAttributes(attr_value);
        }

      }
    }
  }

  set_column_get_filter() {
    var that = this;
    var data_column_filter = [];
    var value_column_filter = [];
    var data_column_display = [];
    var value_column_display = [];
    var label_attributes = this.model_service.attributeLabels();
    for (var column of that.columns) {
      column['checked'] = GlobalFunction.contains(column['id'], that.model_filter_user['filter_user_admin_table_column_mul']);
      if (column['checked']) {
        value_column_display.push(column.id);
      }
      for (var item of that.model_filter_user.list_filter_user_field) {
        if (item.admin_table_column == column.id) {
          value_column_filter.push(column.id);
          break;
        }
      }
      if (column.filter) {
        data_column_filter.push({
          id: column.id,
          text: column.label ? column.label : label_attributes[column.attribute],
          column: column,
          odr: column.odr,
        });
      }
      data_column_display.push({
        id: column.id,
        text: column.label ? column.label : label_attributes[column.attribute],
        column: column,
        disable_display_column: column.disable_display_column,
        odr: column.odr,
      });
    }
    this.data_column_filter = data_column_filter;
    this.data_column_filter.sort(function(item1, item2){
      return item1.odr - item2.odr;
    })
    this.value_column_filter = value_column_filter;
    this.data_column_display = data_column_display;
    this.data_column_display.sort(function(item1, item2){
      return item1.odr - item2.odr;
    })
    this.value_column_display = value_column_display;
    this.set_filter_change_update();
  }

  change_filter_user(event, type = true) {
    var that = this;
    this.set_filter_user(this.filter_user_id);
    if(type) {
      this.admin_table_load = false;
      setTimeout(function () {
        that.admin_table_load = true;
        setTimeout(function () {
          that.router2.navigate([location.pathname.replace(/(;|\?).*/gi, ''), that.model_filter_user.getParamsSearch()]);
        }, 10);
      }, 10);
    }
  }

  before_table_get_list(data) {
    var that = this;
    that.data_load_success = true;
  }

  copyItem() {

  }

  deleteItem(row, i, table) {
    var that = this;
    this.obj_message_confirm.open({
      title: 'Xóa bản ghi',
      content: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      closeLabel: 'Hủy',
      confirm: function () {
        return that.model_service.delete(row.id||row.ID).then(r => {
          that.notification_service.success('Xóa bản ghi thành công', '');
          that.reload();
          return Promise.resolve(true);
        });
      }
    });
  }

  addForm() {
    this._obj_popup_form.open();
  }

  is_show_delete_all(isShowDeleteAll) {
    this.isShowDeleteAll = isShowDeleteAll;
  }

  admin_table_column_update_click(column) {
    this.admin_table_column = new AdminTableColumnService(this.user_service._db, this.user_service.http);
    this.admin_table_column.id = column.id;
    this.admin_table_column.findOne(column.id);
    CommonTableService.get_list_class(this.user_service);
    this.admin_table_column.fk_table_attribute = CommonTableService.getAttributeSelect(this.admin_table.table_name);
    this.admin_form_table_column = new AdminFormService(this.user_service._db, this.user_service.http);
    this.callPopUpTableColumn();
  }

  callPopUpTableColumn() {
    if (!GlobalFunction['findOneData_8']) {
      this.admin_form_table_column.findOneData({ id: 8 }).then(rs => {
        GlobalFunction['findOneData_8'] = rs;
        this.obj_popup_form_admin_table_column.open({
          model: this.admin_form_table_column
        });
      })
    } else {
      this.admin_form_table_column.setAttributes(GlobalFunction['findOneData_8']);
      this.admin_form_table_column._old_attributes = GlobalFunction['findOneData_8'];
      this.obj_popup_form_admin_table_column.open({
        model: this.admin_form_table_column
      });
    }
  }

  reload_admin_table() {
    var that = this;
    var admin_table = new AdminTableService(this.user_service._db, this.user_service.http);
    GlobalFunction.DEFER.promise.then(rs => {
      admin_table.findOneData({ id: this.admin_table.id }).then(rs => {
        that.set_model(rs);
        that.reload();
      });
    })
  }

  admin_table_column_save_done($event) {
    var it = this.admin_table_column.getAttributes();
    this.list_column[it['id']] = this.admin_table.getColumnByItem(it);
    var l = [];
    var flag = false;
    for (var i in this.columns) {
      if (this.columns[i]['id'] == it['id']) {
        flag = true;
        this.columns[i] = this.list_column[it['id']];
        for (var j in this.list_admin_table_column) {
          if (this.list_admin_table_column[j]['id'] == it['id']) {
            this.list_admin_table_column[j] = it;
          }
        }
      }
      if (this.columns[i]['status']) {
        l.push(this.columns[i]);
      }
    }
    if (!flag && this.list_column[it['id']]['status']) {
      l.push(this.list_column[it['id']]);
    }
    l.sort(function (item1, item2) {
      return item1.odr - item2.odr;
    });
    this.columns = l;
    this.reload_admin_table();
  }

  addTableColumn() {
    var that = this;
    this.admin_table_column = new AdminTableColumnService(this.user_service._db, this.user_service.http);
    this.admin_table_column.get_fk_mul().then(rs => {
      that.admin_table_column.admin_table = that.admin_table.id;
    })
    CommonTableService.get_list_class(this.user_service);
    this.admin_table_column.fk_table_attribute = CommonTableService.getAttributeSelect(that.admin_table.table_name);
    this.admin_form_table_column = new AdminFormService(this.user_service._db, this.user_service.http);
    this.callPopUpTableColumn();
  }

  approveAll() {
    var that = this;
    var ids = this.table.getIdChecked();
    if(ids.length) {
      that.obj_message_confirm.open({
        title: 'Phê duyệt',
        content: 'Bạn có chắc chắn muốn phê duyệt những bản ghi đã chọn không?',
        confirmLabel: 'Ok',
        closeLabel: 'Hủy',
        confirm: function () {
          return that.model_service.approveAll({id: ids}).then(r => {
            that.notification_service.success('Phê duyệt bản ghi thành công', '');
            return that.reload();
          })
        }
      });
    } else {
      that.obj_message_close.open({
        title: '',
        content: 'Bạn chưa chọn bản ghi nào',
        closeLabel: 'Đóng',
      });     
    }
  }

  editAll() {
    // this.admin_from_create_name = this.admin_form.get_update_all_name();
    this._obj_popup_form_update_all.admin_form.ids = this.table.getIdChecked();
    this._obj_popup_form_update_all.open({
      model: this.admin_form
    });
  }

  set_action(value) {
    this.action = [];
    if (this.admin_table.item_update) {
      this.action.push({
        class_a: 'icon_action',
        class_icon: 'icon icon-pencil',
        name: 'Sửa',
        role: this.action_edit,
        link: '/admin/common/' + (this.admin_page ? this.admin_page.controller : this.admin_table.table_name) + '/' + this.admin_table.id + '/form'
      });
    }
    if (this.admin_table.item_delete) {
      this.action.push({
        class_a: 'icon_action',
        class_icon: 'icon icon-recycle-bin',
        name: 'Xóa',
        func: this.deleteItem,
        role: this.action_delete,
      });
    }
    if (this.admin_table.item_copy) {
      this.action.push({
        class_a: 'icon_action',
        class_icon: 'icon icon-copy',
        name: 'Copy',
        func: this.copyItem,
        role: this.action_copy,
      });
    }
    if (value.action) {
      var action_item = JSON.parse(value.action);      
      this.action = this.action.concat(action_item);
      
    }
  }

  set_column(value) {
    this.columns = [];
    this.list_column = {};
    for (let it of value['list_admin_table_column']) {
      this.list_column[it.id] = this.admin_table.getColumnByItem(it);
      if (this.list_column[it.id]['status']) {
        this.columns.push(this.list_column[it.id]);
      }
    }
  }

  set_column_sort() {
    if(this.columns && this.model_filter_user && this.model_filter_user.filter_user_admin_table_column_mul) {
      for(var item of this.columns) {
        item.priority = item.odr;
        for(var i in this.model_filter_user.filter_user_admin_table_column_mul) {
          if(item.id == this.model_filter_user.filter_user_admin_table_column_mul[i]) {
            item.priority = parseInt(i) + 1;
            continue;
          }
        }
      }
      this.columns.sort(function(item1, item2){
        return item1.priority - item2.priority;
      })
    }
  }

  filterHandle(event) {
    var that = this;
    if (event.type == 'delete') {
      var a = [];
      var value = [];
      for (var item of this.model_filter_user.list_filter_user_field) {
        if (item.column.id != event.model.column.id) {
          a.push(item);
          value.push(item.column.id);
        }
      }
      var data_column_filter = [];
      for (var item of this.data_column_filter) {
        item.checked = GlobalFunction.contains(item.id, value);
        item.checked_default = GlobalFunction.contains(item.id, value);
        data_column_filter.push(item);
      }
      this.data_column_filter = data_column_filter;
      this.value_column_filter = value;
      this.model_filter_user.list_filter_user_field = a;
      var attr_value = {};
      attr_value[event.model.column.attribute] = undefined;
      this.model_service.setAttributeSearchByAttributes(attr_value);
    }
    this.set_filter_change_update();
    this.table.filter(event)
  }

  updateSettingColumns(event) {
    for (var column of this.columns) {
      column.checked = GlobalFunction.contains(column.id, this.value_column_display);
    }
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.filter_user);
    model_filter_user.filter_user_admin_table_column_mul = this.get_column_ids_display();
    model_filter_user.save(false);
    this.model_filter_user._old_attributes.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
    this.model_filter_user.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
    for (var item of this.list_filter_user) {
      if (item.id == model_filter_user.id) {
        item.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
      }
    }
  }

  addFilterUserField(values) {
    var that = this;
    function add_value(event) {
      var flag = true;
      for (var item of that.model_filter_user.list_filter_user_field) {
        if (item.column.id == event.id) {
          flag = false;
        }
      }
      if (flag) {
        var item_filter_user_field = {
          filter_user: that.filter_user.id,
          admin_table_column: event.id,
          type: event.column.filter.type,
          fk_table_admin_table_column: event.column,
          column: event.column,
          show_popup: false,
          value: event.value ? event.value : '',
        };
        that.model_filter_user.list_filter_user_field.push(item_filter_user_field);
        that.set_filter_change_update();
      }
    }
    if (that.model_filter_user.list_filter_user_field) {
      if (GlobalFunction.is_array(values)) {
        for (var item of values) {
          add_value(item);
        }
      } else {
        add_value(values);
      }
    }
  }

  set_filter_change_update() {
    var model_filter_user = this.get_model_filter_by_type('update');
    var attr_value = model_filter_user.getAttributesUpdate();
    delete attr_value['filter_user_admin_table_column_mul'];
    delete attr_value['order_db'];
    delete attr_value['filter_default'];
    delete attr_value['limit_db'];
    var filter_change_update = Object.keys(attr_value).length ? true : false;
    this.filter_change_update = filter_change_update;
  }

  filter_expan_flag: boolean = false;
  filter_more_expan_flag: boolean = false;
  id_filter_expan: string = 'filter_expan';
  id_filter_more_expan: string = 'filter_more_expan';

  filter_expan() {
    this.id_filter_expan = 'filter_expan' + new Date().getTime();
    var that = this;
    function click_func(e) {
      if (!e.target['closest']('#' + that.id_filter_expan) || e.target.className.match(/field_save|save_new|save_cancel/gi)) {
        that.filter_expan_flag = false;
        document.body.removeEventListener('click', click_func);
      }
    }
    document.body.addEventListener('click', click_func);
    this.filter_expan_flag = !this.filter_expan_flag;
  }

  filter_more_expan() {
    this.id_filter_more_expan = 'filter_more_expan' + new Date().getTime();
    var that = this;
    function click_func(e) {
      if (!e.target['closest']('#' + that.id_filter_more_expan) || e.target.className.match(/save_default|save_delete|save_rename/gi)) {
        that.filter_more_expan_flag = false;
        document.body.removeEventListener('click', click_func);
      }
    }
    document.body.addEventListener('click', click_func);
    this.filter_more_expan_flag = !this.filter_more_expan_flag;
  }

  get_column_ids_display() {
    return this.value_column_display;
  }

  get_model_filter_by_type(type) {
    var that = this;
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.model_filter_user._old_attributes);
    var list_filter_user_field = [];
    for (var item of this.model_filter_user.list_filter_user_field) {
      var it = Object.assign({}, item);
      delete it.column;
      list_filter_user_field.push(it);
    }
    model_filter_user.list_filter_user_field = list_filter_user_field;
    model_filter_user.limit_db = that.route2.params['_value'].limit;
    model_filter_user.order_db = that.route2.params['_value'].order_by;
    if (type == 'create') {
      model_filter_user.default = 0;
      model_filter_user.filter_default = undefined;
      model_filter_user.id = undefined;
      model_filter_user.created_by = undefined;
      model_filter_user.created_time = undefined;
      model_filter_user.modified_time = undefined;
      model_filter_user.modified_by = undefined;
      model_filter_user._old_attributes = undefined;
    }
    return model_filter_user;
  }

  model_filter_save(model_filter_user, type) {
    var that = this;
    
    model_filter_user.save(false).then(rs => {
      if (type == 'create') {
        that.model_filter_user = model_filter_user;
        var attributes = that.model_filter_user._old_attributes;
        attributes.text = attributes.name;
        var a = []; for (var item of that.list_filter_user) { item.text = item.name; a.push(item); } a.push(attributes);
        that.list_filter_user = a;
        that.filter_user_id = model_filter_user.id;
      } else {
        that.model_filter_user = model_filter_user;
        for (var i in that.list_filter_user) {
          that.list_filter_user[i].text = that.list_filter_user[i].name;
          if (that.list_filter_user[i].id == that.model_filter_user.id) {
            that.list_filter_user[i] = that.model_filter_user._old_attributes;
          }
        }
      }
      that.set_column_sort();
      that.change_filter_user(model_filter_user.id, false);
      that.set_column_get_filter();
      that.notification_service.success('Cập nhật filter thành công', '');
    });
  }

  save_default(type) {
    var that = this;
    var md = this.get_model_filter_by_type('update');
    that.model_filter_user.default = 1;
    md.update_default().then(rs => {
      that.notification_service.success('Đặt làm mặc định thành công', '');
    })
    for (var item of that.list_filter_user) {
      item.default = item.id == md.id ? 1 : 0;
      item.text = item.name;
    }

  }

  rename() {
    var that = this;
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.model_filter_user._old_attributes);
    model_filter_user['list_filter_user'] = that.list_filter_user;
    this.filterusername.open({
      title: 'Đặt lại tên bộ lọc',
      model: model_filter_user,
      confirmDone: function () {
        model_filter_user.save(false).then(rs => {
          that.model_filter_user.name = model_filter_user.name;
          that.model_filter_user._old_attributes.name = model_filter_user.name;
          var a = [];
          for (var item of that.list_filter_user) {
            if (item.id == that.model_filter_user.id) {
              item.name = that.model_filter_user.name;
              item['aa'] = 1;
            }
            item.text = item.name;
            a.push(item);
          }
          a.push({ id: 999999999, text: '2' });
          that.list_filter_user = a;
          setTimeout(() => {
            var a = [];
            for (var item of that.list_filter_user) {
              if (item.id != 999999999) {
                a.push(item);
              }
            }
            that.list_filter_user = a;
          }, 30);
          that.notification_service.success('Cập nhật tên filter thành công', '');
        })
      }
    });

  }

  filter_save(type: string = '') {
    var that = this;
    if (!type) { type = this.filter_change_update ? 'save' : 'create'; }
    this.model_filter_user._old_attributes.filter_user_admin_table_column_mul = this.get_column_ids_display();
    switch (type) {
      case 'save':
        var md = this.get_model_filter_by_type('update');
        this.model_filter_save(md, 'update');
        break;
      case 'create':
        var md = this.get_model_filter_by_type('create');
        md.name += ' - copy';
        md['list_filter_user'] = that.list_filter_user;
        this.filterusername.open({
          model: md,
          confirmDone: function () {
            that.model_filter_save(md, 'create');
          }
        });
        break;
      case 'rename':
        that.rename();
        break;
      case 'cancel':
        this.change_filter_user(this.filter_user_id);
        break;
      case 'default':
        if (this.model_filter_user.default) {
          return false;
        }
        this.save_default(type);
        break;
      case 'delete':
        if (this.model_filter_user.default) {
          return false;
        }
        that.obj_message_confirm.open({
          title: 'Xóa bộ lọc',
          content: 'Bạn có chắc chắn muốn xóa bộ lọc "' + this.model_filter_user.name.toLowerCase() + '"?',
          confirmLabel: 'Ok',
          closeLabel: 'Hủy',
          confirm: function () {
            that.delete_filter();
            return Promise.resolve(true);
          }
        });
        break;
    }
  }

  delete_filter() {
    var that = this;
    var md = this.get_model_filter_by_type('update');
    if ((!md.default || md.default === undefined) && that.list_filter_user.length > 1) {
      md.delete();
      var a = [];
      var flag = true;
      for (var item of that.list_filter_user) {
        if (item.id != md.id) {
          a.push(item);
        }
      }
      that.list_filter_user = a;
      for (var item of that.list_filter_user) {
        if (item.default) {
          this.filter_user = item;
          break;
        }
      }
      this.filter_user_id = this.filter_user.id;
      that.change_filter_user(that.filter_user_id);
    }
  }

  count: any;
  settingValue(event) {
    this.listStaffToAssign = event.listStaffToAssign || [];
    this.count = event.count;
  }

  assignMulti(event) {
    this.table.assignMulti(this.assignStaff);
  }
  reload() {
    this.table.reload();
  }

  change_limit(limit) {
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.filter_user);
    model_filter_user.limit_db = limit;
    model_filter_user.save(false);
    this.model_filter_user._old_attributes.limit_db = model_filter_user.limit_db;
    this.model_filter_user.limit_db = model_filter_user.limit_db;
    for (var item of this.list_filter_user) {
      if (item.id == model_filter_user.id) {
        item.limit_db = model_filter_user.limit_db;
      }
    }
  }

  reloadTableAdd(row) {
    var that = this;
    that.isShowDeleteAll = false;
    this.model_service_add = this.get_model_by_table_name(this.admin_table.table_name);
    that.table.reload();
  }

  reloadTable(row) {
      this.table.reload();
  }

  sortDone(event) {
    var that = this;
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.filter_user);
    var filter_user_admin_table_column_mul = [];
    var a = this.get_column_ids_display();
    for(var item of event) {
      if(GlobalFunction.contains(item,a)) {
        filter_user_admin_table_column_mul.push(item);
      }
    }
    model_filter_user.filter_user_admin_table_column_mul = filter_user_admin_table_column_mul;
    model_filter_user.save(false).then(rs => {
      that.notification_service.success('Sắp xếp cột thành công', '');
      document.body.click();
    })
    this.model_filter_user._old_attributes.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
    this.model_filter_user.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
    for (var item of this.list_filter_user) {
      if (item.id == model_filter_user.id) {
        item.filter_user_admin_table_column_mul = model_filter_user.filter_user_admin_table_column_mul;
      }
    }
  }

  orderDone(event) {
    var that = this;
    var model_filter_user = new FilterUserService(this.user_service._db, this.user_service.http);
    model_filter_user.setAttributesAndOldAttributes(this.filter_user);
    model_filter_user.order_db = event.attribute + ' ' + event.sort_by;
    model_filter_user.save(false);
    this.model_filter_user._old_attributes.order_db = model_filter_user.order_db;
    this.model_filter_user.order_db = model_filter_user.order_db;
    for (var item of this.list_filter_user) {
      if (item.id == model_filter_user.id) {
        item.order_db = model_filter_user.order_db;
      }
    }
  }

  deleteAll() {
    var that = this;
    var ids = this.table.getIdChecked();
    if(ids.length) {
      that.obj_message_confirm.open({
        title: 'Xoá bản ghi',
        content: 'Bạn có chắc chắn muốn xóa những bản ghi đã chọn không?',
        confirmLabel: 'Ok',
        closeLabel: 'Hủy',
        confirm: function () {
          return that.model_service.deleteAll({id: ids}).then(r => {
            that.isShowDeleteAll = false;
            that.notification_service.success('Xóa bản ghi thành công', '');
            return that.reload();
          })
        }
      });
    } else {
      that.obj_message_close.open({
        title: '',
        content: 'Bạn chưa chọn bản ghi nào',
        closeLabel: 'Đóng',
      });     
    }
  }

  run_func_action_list(item_action_list) {
    
    var that = this;
    var ids = this.table.getIdChecked();
    if(ids.length || item_action_list.not_check) {
      var popup_options = Object.assign({},item_action_list.popup);
      if(popup_options['confirm']) {
        eval("popup_options['confirm'] = " + popup_options['confirm'] + ";");
      }
      if(item_action_list.call_popup) {
        if(that[item_action_list.call_popup]) {
          that[item_action_list.call_popup].open(popup_options);
        } else {
          that.obj_message_close.open({
            title: '',
            content: 'call_popup chưa được khai báo',
            closeLabel: 'Đóng',
          });   
        }
        
      } else {
        that.obj_message_confirm.open(popup_options);
      }
    } else {
      that.obj_message_close.open({
        title: '',
        content: 'Bạn chưa chọn bản ghi nào',
        closeLabel: 'Đóng',
      });     
    }
  }

}