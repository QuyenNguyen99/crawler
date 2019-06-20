import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class FilterDefaultService extends ServiceGlobal {
    
    
    admin_table:number;
    name:string;
    value:string;
    role:number;
    fk_table_admin_table:any;
    fk_table_role:any;
    
    order_db:string;
    limit_db:number;
    
    priority:number;
    
    default:number;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'filter_default'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "admin_table": "Admin Table",
            "name": "Name",
            "role": "Role",
            "order_db": "Order Db",
            "limit_db": "Limit Db",
            "priority": "Priority",
            "default": "Default",
            "fk_table_admin_table": "fk_table_admin_table",
            "fk_table_role": "fk_table_role",
            "value": "Value"
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
            "admin_table": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_table",
                    "ref_id": "id"
                }
            },
            "name": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "value": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                }
            },
            "role": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                }
            },
            "fk_table_admin_table": {
                "type": "any"
            },
            "fk_table_role": {
                "type": "any"
            },
            "order_db": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "limit_db": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            },
            "priority": {
                "default": "0",
                "type": "int",
                "size": 11
            },
            "default": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}