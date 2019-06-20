import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class RoleItemService extends ServiceGlobal {

    

    
    name:string;
    action:string;
    status:number;
    table:string;
    
    priority:number;
    
    role_role_item_mul:any;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'role_item'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "role_role_item_mul": "role_role_item_mul",
            "id": "Id",
            "name": "Name",
            "action": "Action",
            "status": "Status",
            "table": "Table",
            "priority": "Priority"
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
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "action": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "table": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "priority": {
                "default": "1000",
                "type": "int",
                "size": 11
            },
            "role_role_item_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "role_item_id",
                "mul_id_fk": "role_id",
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                }
            }
        });
    }
}