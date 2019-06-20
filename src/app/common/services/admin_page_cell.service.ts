import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminPageCellService extends ServiceGlobal {
    
    
    admin_page_line:number;
    admin_template:Number;
    admin_table:number;
    admin_form:number;
    type:string = 'table';
    status:number;
    priority:number;
    fk_table_admin_template:any;
    fk_table_admin_table:any;
    fk_table_admin_form:any;
    fk_table_admin_page_line:any;
    
    admin_other:number;
    fk_table_admin_other:any;
    fk_table_type: any = [
        {id: 'table',text: 'table'},
        {id: 'form',text: 'form'},
        {id: 'other',text: 'other'},
    ];
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_page_cell'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "admin_page_line": "Admin Page Line",
            "admin_other": "Admin Other",
            "admin_table": "Admin Table",
            "admin_form": "Admin Form",
            "type": "Type",
            "status": "Status",
            "priority": "Priority",
            "fk_table_admin_other": "fk_table_admin_other",
            "fk_table_admin_table": "fk_table_admin_table",
            "fk_table_admin_form": "fk_table_admin_form",
            "fk_table_admin_page_line": "fk_table_admin_page_line"
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
            "admin_page_line": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_page_line",
                    "ref_id": "id"
                }
            },
            "admin_table": {
                "type": "int",
                "size": 11,
                "display": "this.type == 'table'",
                "fk": {
                    "table": "admin_table",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "admin_form": {
                "type": "int",
                "size": 11,
                "display": "this.type == 'form'",
                "fk": {
                    "table": "admin_form",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "type": {
                "type": "varchar",
                "require": {
                    "size": 20
                },
                "size": 20,
                "default": "NULL"
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "priority": {
                "default": "0",
                "type": "int",
                "size": 11
            },
            "fk_table_admin_table": {
                "type": "any"
            },
            "fk_table_admin_form": {
                "type": "any"
            },
            "fk_table_admin_page_line": {
                "type": "any"
            },
            "admin_other": {
                "type": "int",
                "size": 11,
                "display": "this.type == 'other'",
                "fk": {
                    "table": "admin_other",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_admin_other": {
                "type": "any"
            }
        });
    }
}