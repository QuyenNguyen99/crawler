import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminPageLineService extends ServiceGlobal {
    
    class_col_sm: Number = 12;
    admin_page:number;
    status:number;
    priority:number;
    quantity:number;
    fk_table_admin_page:any;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_page_line'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "admin_page": "Admin Page",
            "status": "Status",
            "priority": "Priority",
            "quantity": "Quantity",
            "fk_table_admin_page": "fk_table_admin_page"
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
            "admin_page": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_page",
                    "ref_id": "id"
                }
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
            "quantity": {
                "default": "1",
                "type": "int",
                "size": 11
            },
            "fk_table_admin_page": {
                "type": "any"
            }
        });
    }
}