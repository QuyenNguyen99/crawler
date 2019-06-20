import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsMessageService extends ServiceGlobal {

    

    
    name:string;
    message_key:string;
    message_value:string;
    lang:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_message'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "message_key": "Message Key",
            "message_value": "Message Value",
            "lang": "Lang"
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
            "message_key": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "message_value": {
                "type": "text",
                "require": {
                    "empty": true,
                    "size": 65535
                }
            },
            "lang": {
                "type": "varchar",
                "require": {
                    "size": 5
                },
                "size": 5,
                "default": "NULL"
            }
        });
    }
}