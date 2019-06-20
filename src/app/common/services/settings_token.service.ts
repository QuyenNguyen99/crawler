import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsTokenService extends ServiceGlobal {

    

    
    token:string;
    obj_id:number;
    obj_table:string;
    expired:Date;
    type:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_token'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "token": "Token",
            "obj_id": "Obj Id",
            "obj_table": "Obj Table",
            "expired": "Expired",
            "type": "Type"
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
            "token": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "obj_id": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11
            },
            "obj_table": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "expired": {
                "type": "date",
                "default": "NULL"
            },
            "type": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "size": 20
            }
        });
    }
}