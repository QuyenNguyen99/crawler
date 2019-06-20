import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsFormService extends ServiceGlobal {

    

    
    form_id:number;
    form_name:string;
    form_description:string;
    fields:string;
    table_id:number;
    status:number;
    hidden:number;
    line:number;
    odr:number;
    multi_add:number;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_form'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "form_id": "Form Id",
            "form_name": "Form Name",
            "form_description": "Form Description",
            "fields": "Fields",
            "table_id": "Table Id",
            "status": "Status",
            "hidden": "Hidden",
            "line": "Line",
            "odr": "Odr",
            "multi_add": "Multi Add"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "form_id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 8
            },
            "form_name": {
                "default": "",
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "form_description": {
                "default": "",
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 1000
                },
                "size": 1000
            },
            "fields": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "table_id": {
                "default": "0",
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 8
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "hidden": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "line": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "odr": {
                "default": "0",
                "type": "tinyint",
                "size": 3
            },
            "multi_add": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}