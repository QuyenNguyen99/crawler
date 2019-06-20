import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class RoleGroupService extends ServiceGlobal {

    

    
    name:string;
    status:number;
    role_item:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'role_group'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "status": "Status",
            "role_item": "Role Item"
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
            "role_item": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                }
            }
        });
    }
}