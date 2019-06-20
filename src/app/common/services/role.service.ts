import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class RoleService extends ServiceGlobal {

    

    
    name:string;
    status:number;
    role_group:string;
    role_group_item:string;
    type:string;
    description:string;
    
    alias:string;
    
    role_item:string;
    
    filter:string;
    
    priority:number;
    
    code:string;
    
    role_role_item_mul:any;
    user_role_mul:any;
    
    notification_settings_role_mul: any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'role'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "notification_settings_role_mul": "notification_settings_role_mul",
            "role_role_item_mul": "role_role_item_mul",
            "user_role_mul": "user_role_mul",
            "id": "Id",
            "name": "Name",
            "status": "Status",
            "role_group": "Role Group",
            "role_group_item": "Role Group Item",
            "type": "Type",
            "description": "Description",
            "alias": "Alias",
            "role_item": "Role Item",
            "filter": "Filter",
            "priority": "Priority",
            "code": "Code"
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
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "role_group": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "role_group_item": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
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
            "description": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "alias": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "role_item": {
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
            "priority": {
                "default": "0",
                "type": "int",
                "size": 11
            },
            "code": {
                "type": "varchar",
                "require": {
                    "size": 20
                },
                "size": 20,
                "default": "NULL"
            },
            "role_role_item_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "role_id",
                "mul_id_fk": "role_item_id",
                "fk": {
                    "table": "role_item",
                    "ref_id": "id"
                }
            },
            "user_role_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "role_id",
                "mul_id_fk": "user_id",
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "notification_settings_role_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "role_id",
                "mul_id_fk": "notifcation_settings_id",
                "fk": {
                    "table": "notification_settings",
                    "ref_id": "id"
                }
            }
        });
    }
}