import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminPageService extends ServiceGlobal {
    
    
    pid:number;
    name:string;
    link:string;
    icon:string;
    odr:number;
    status:number;
    controller:string;
    
    fk_table_pid:any;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_page'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "pid": "Pid",
            "name": "Name",
            "link": "Link",
            "icon": "Icon",
            "odr": "Odr",
            "status": "Status",
            "controller": "Controller",
            "fk_table_pid": "fk_table_pid"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 5
            },
            "pid": {
                "default": "NULL",
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_page",
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
            "link": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "icon": {
                "type": "varchar",
                "require": {
                    "size": 50
                },
                "size": 50,
                "default": "NULL"
            },
            "odr": {
                "type": "int",
                "size": 5,
                "default": "NULL"
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "controller": {
                "type": "varchar",
                "require": {
                    "size": 50
                },
                "size": 50,
                "default": "NULL"
            },
            "fk_table_pid": {
                "type": "any"
            }
        });
    }
}