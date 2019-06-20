import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminTableColumnService extends ServiceGlobal {
    
    
    name:string;
    attribute:string;
    headeroptions:string;
    contentoptions:string;
    sortlinkoptions:string;
    view:string;
    filter:string;
    sort:number;
    default_sort:string;
    admin_table:number;
    link:string;
    status:number;
    odr:number;
    fk_table_admin_table:any;
    
    column_update:string;
    
    user_admin_table_column_mul:any;
    
    disable_display_column:number;
    filter_user_admin_table_column_mul:any;
    
    priority_display:number;
    checked:number;
    
    columncheck:number;
    show_mobile:number;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_table_column'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "filter_user_admin_table_column_mul": "filter_user_admin_table_column_mul",
            "user_admin_table_column_mul": "user_admin_table_column_mul",
            "id": "Id",
            "name": "Name",
            "attribute": "Attribute",
            "headeroptions": "Headeroptions",
            "contentoptions": "Contentoptions",
            "sortlinkoptions": "Sortlinkoptions",
            "view": "View",
            "filter": "Filter",
            "column_update": "Update",
            "sort": "Sort",
            "default_sort": "Default Sort",
            "admin_table": "Admin Table",
            "link": "Link",
            "status": "Status",
            "odr": "Odr",
            "disable_display_column": "Disable Display Column",
            "priority_display": "Priority Display",
            "checked": "Checked",
            "columncheck": "Columncheck",
            "show_mobile": "Show Mobile",
            "fk_table_admin_table": "fk_table_admin_table"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 8
            },
            "name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "attribute": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "headeroptions": {
                "type": "varchar",
                "require": {
                    "size": 500
                },
                "size": 500,
                "default": "NULL"
            },
            "contentoptions": {
                "type": "varchar",
                "require": {
                    "size": 500
                },
                "size": 500,
                "default": "NULL"
            },
            "sortlinkoptions": {
                "type": "varchar",
                "require": {
                    "size": 500
                },
                "size": 500,
                "default": "NULL"
            },
            "view": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "filter": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "column_update": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "sort": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "default_sort": {
                "type": "varchar",
                "size": 255,
                "require": {
                    "size": 255
                },
                "default": "NULL"
            },
            "admin_table": {
                "default": "NULL",
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_table",
                    "ref_id": "id"
                }
            },
            "link": {
                "default": "''",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "odr": {
                "default": "0",
                "type": "int",
                "size": 8
            },
            "fk_table_admin_table": {
                "type": "any"
            },
            "user_admin_table_column_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "admin_table_column_id",
                "mul_id_fk": "user_id",
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "disable_display_column": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "filter_user_admin_table_column_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "admin_table_column_id",
                "mul_id_fk": "filter_user_id",
                "fk": {
                    "table": "filter_user",
                    "ref_id": "id"
                }
            },
            "priority_display": {
                "default": "0",
                "type": "int",
                "size": 11
            },
            "checked": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "columncheck": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "show_mobile": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}