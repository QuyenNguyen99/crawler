import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class UserRoleMulService extends ServiceGlobal {

    

    
    user_id:number;
    role_id:number;
    fk_table_role_id:any;
    fk_table_user_id:any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user_role_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "user_id": "User Id",
            "role_id": "Role Id",
            "fk_table_role_id": "fk_table_role_id",
            "fk_table_user_id": "fk_table_user_id"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "user_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "role_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                }
            },
            "fk_table_role_id": {
                "type": "any"
            },
            "fk_table_user_id": {
                "type": "any"
            }
        });
    }
}