import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsMappingService extends ServiceGlobal {

    

    
    mapping_id:number;
    mapping_name:string;
    select_id:string;
    select_name:string;
    table_name:string;
    where:string;
    status:number;
    odr:string;
    cal_func:string;
    group_by:string;
    class:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_mapping'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "mapping_id": "Mapping Id",
            "mapping_name": "Mapping Name",
            "select_id": "Select Id",
            "select_name": "Select Name",
            "table_name": "Table Name",
            "where": "Where",
            "status": "Status",
            "odr": "Odr",
            "cal_func": "Cal Func",
            "group_by": "Group By",
            "class": "Class"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "mapping_id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 8
            },
            "mapping_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "select_id": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "select_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "table_name": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "where": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 4
            },
            "odr": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "cal_func": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "group_by": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "class": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            }
        });
    }
}