import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminTableService extends ServiceGlobal {
    
    
    name:string;
    table_name:string;
    status:number;
    condition:string;
    default_search:string;
    default_arrange:string;
    default_update_status:string;
    join:string;
    status_excel:number;
    status_import:number;
    columnstt:number;
    groupby:string;
    action:string;
    admin_form:number;
    fk_table_admin_form:any;
    list_admin_table_column:any;
    
    show_form_is_popup:number;
    
    item_update:number;
    item_delete:number;
    item_copy:number;
    
    item_add:number;
    
    columncheck:number;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_table'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "table_name": "Table Name",
            "status": "Status",
            "condition": "Condition",
            "default_search": "Default Search",
            "default_arrange": "Default Arrange",
            "default_update_status": "Default Update Status",
            "join": "Join",
            "status_excel": "Status Excel",
            "status_import": "Status Import",
            "columnstt": "Columnstt",
            "groupby": "Groupby",
            "action": "Action",
            "admin_form": "Admin Form",
            "show_form_is_popup": "Show Form Is Popup",
            "item_update": "Item Update",
            "item_delete": "Item Delete",
            "item_copy": "Item Copy",
            "item_add": "Item Add",
            "columncheck": "Columncheck",
            "fk_table_admin_form": "fk_table_admin_form",
            "list_admin_table_column": "list_admin_table_column"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 11
            },
            "name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "table_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "status": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "condition": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "default_search": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            },
            "default_arrange": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            },
            "default_update_status": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            },
            "join": {
                "type": "varchar",
                "require": {
                    "size": 400
                },
                "size": 400,
                "default": "NULL"
            },
            "status_excel": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "status_import": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "columnstt": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "groupby": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "action": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "admin_form": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_form",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_admin_form": {
                "type": "any"
            },
            "list_admin_table_column": {
                "type": "any"
            },
            "show_form_is_popup": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "item_update": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "item_delete": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "item_copy": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "item_add": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "columncheck": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            }
        });
    }

    getListColumn() {
        var rs = [];
        for(var item of this.list_admin_table_column) {
            rs.push(this.getColumnByItem(item));
        }
        return rs;
    }

    getColumnByItem(it: any) {
        var item = {
          id: it.id,
          attribute: it.attribute,
          sort: it.sort,
          default_sort: it.default_sort,
          disable_display_column: it.disable_display_column,
          status: it.status,
          odr: it.odr,
          view: it.view,
          link: it.link
        };
        if (it.name) {
          item['label'] = it.name;
        }
        if (it.headeroptions) {
          item['styleHeader'] = JSON.parse(it.headeroptions);
        }
        if (it.column_update) {
          item['update'] = JSON.parse(it.column_update);
        }
        if (it.filter) {
          item['filter'] = JSON.parse(it.filter);
        }
        return item;
    
      }
}