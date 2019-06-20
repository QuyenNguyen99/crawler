import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsIconService extends ServiceGlobal {

    

    
    name:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_icon'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name"
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
                "default": "",
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 50
                },
                "size": 50
            }
        });
    }
}