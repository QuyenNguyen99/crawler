import { Injectable } from '@angular/core';
import { GlobalFunction } from 'app/common/core/global_function';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  page: string;
  role: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}



@Injectable()
export class MenuItems {
  MENUITEMS = [
    {
      state: '/admin/dashboard/index',
      name: 'Thống kê',
      type: 'link',
      icon: 'icon icon-char',
      iconpush: 'icon-char',
      icondock: 'icon-char',
      page: 'role',
      role: 'dashboard_read',
      filter: false,
    },
    {
      state: '/admin/common/job/index',
      name: 'Job',
      type: 'link',
      icon: 'icon icon-database',
      iconpush: 'icon-database',
      icondock: 'icon-database',
      page: 'role',
      role: 'job_read',
      filter: false,
    },
    {
      state: '/admin/common/job_type/index',
      name: 'Loại Job',
      type: 'link',
      icon: 'icon icon-list',
      iconpush: 'icon-list',
      icondock: 'icon-list',
      page: 'role',
      role: 'job_type_read',
      filter: false,
    },
    {
      state: '/admin/common/job_schedule/index',
      name: 'Lập lịch chạy Job',
      type: 'link',
      icon: 'icon icon-calendar-date',
      iconpush: 'icon-calendar-date',
      icondock: 'icon-calendar-date',
      page: 'role',
      role: 'job_schedule_read',
      filter: false,
    },
    {
      state: '/admin/common/api/index',
      name: 'Danh sách Api',
      type: 'link',
      icon: 'icon icon-box',
      iconpush: 'icon-box',
      icondock: 'icon-box',
      page: 'role',
      role: 'api_read',
      filter: false,
    },
    {
      state: '/admin/common/api_server/index',
      name: 'Danh sách Api Server',
      type: 'link',
      icon: 'icon icon-place',
      iconpush: 'icon-place',
      icondock: 'icon-place',
      page: 'role',
      role: 'api_server_read',
      filter: false,
    },
    {
      state: '',
      name: 'Thiết lập',
      type: 'sub',
      class: 'main-tab-label',
      icon: '',
      iconpush: '',
      icondock: '',
      page: '',
      role: 'role_role_item_mul_read',
      role_2: 'user_read',
      filter: false,
    },
    {
      state: '/admin/staffmanagement/index',
      name: 'Nhân viên',
      type: 'link',
      iconpush: 'icon-manager-avatar',
      icondock: 'icon-manager-avatar',
      icon: 'icon icon-manager-avatar',
      page: 'staffmanagement',
      role: 'user_read',
      filter: false,
    },
    {
      state: '/admin/rolefull/index',
      name: 'Phân quyền',
      type: 'link',
      icon: 'icon-key',
      iconpush: 'icon-key',
      icondock: 'icon-key',
      page: 'rolefull',
      role: 'role_role_item_mul_read',
      filter: false,
      role2: "role_read",
      children: [
        {
          state: '/admin/common/role/index',
          name: 'Vai trò',
          type: 'link',
          icon: 'icon icon-key',
          iconpush: 'icon-key',
          icondock: 'icon-key',
          page: 'role',
          role: 'role_read',
          filter: false,
        },
        {
          state: '/admin/common/role_item/index',
          name: 'Role item',
          type: 'link',
          icon: 'icon icon-key',
          iconpush: 'icon-key',
          icondock: 'icon-key',
          page: 'role_item',
          role: 'role_item_read',
          filter: false,
        },
      ]
    },
    // {
    //   state: '/admin/configure/index',
    //   name: 'Hệ thống',
    //   type: 'link',
    //   iconpush: 'icon-database',
    //   icondock: 'icon-database',
    //   icon: 'icon icon-database',
    //   page: 'configure',
    //   role: 'system_setting_read',
    //   filter: false,
    // },
    {
      state: 'common',
      name: 'Cấu hình',
      type: 'sub',
      icon: 'icon-settings4',
      iconpush: 'icon-settings4',
      icondock: 'icon-settings4',
      page: 'admin_page',
      role: 'admin_page_read',
      filter: false,
      role2: "admin_page_read",
      children: [
        {
          state: '/admin/common/admin_page/index',
          name: 'Admin page',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_page',
          role: 'admin_page_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_page_line/index',
          name: 'Admin page line',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_page_line',
          role: 'admin_page_line_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_page_cell/index',
          name: 'Admin page cell',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_page_cell',
          role: 'admin_page_cell_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_table/index',
          name: 'Admin table',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_table',
          role: 'admin_table_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_table_column/index',
          name: 'Admin table column',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_table_column',
          role: 'admin_table_column_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_form/index',
          name: 'Admin form',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_form',
          role: 'admin_form_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_form_tab/index',
          name: 'Admin form tab',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_form_tab',
          role: 'admin_form_tab_read',
          filter: false,
        },
        {
          state: '/admin/common/admin_form_field/index',
          name: 'Admin form field',
          type: 'link',
          icon: 'icon icon-key',
          page: 'admin_form_field',
          role: 'admin_form_field_read',
          filter: false,
        },
        {
          state: '/admin/common/filter_default/index',
          name: 'Filter default',
          type: 'link',
          icon: 'icon icon-key',
          page: 'filter_default',
          role: 'filter_default_read',
          filter: false,
        },
        {
          state: '/admin/common/filter_default_field/index',
          name: 'Filter default field',
          type: 'link',
          icon: 'icon icon-key',
          page: 'filter_default_field',
          role: 'filter_default_field_read',
          filter: false,
        }
      ]
    },
  ];
}
