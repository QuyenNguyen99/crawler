import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsTableService extends ServiceGlobal {

    

    
    table_id:number;
    name:string;
    table_name:string;
    status:number;
    condition:string;
    orderby:string;
    attrsearch:string;
    attrarange:string;
    checkview:number;
    checksearch:number;
    attrchoice:string;
    join:string;
    excel:string;
    beginimport:number;
    columncheck:number;
    columnaction:number;
    columnid:number;
    class:string;
    groupby:string;
    admin:number;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_table'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "table_id": "Table Id",
            "name": "Name",
            "table_name": "Table Name",
            "status": "Status",
            "condition": "Condition",
            "orderby": "Orderby",
            "attrsearch": "Attrsearch",
            "attrarange": "Attrarange",
            "checkview": "Checkview",
            "checksearch": "Checksearch",
            "attrchoice": "Attrchoice",
            "join": "Join",
            "excel": "Excel",
            "beginimport": "Beginimport",
            "columncheck": "Columncheck",
            "columnaction": "Columnaction",
            "columnid": "Columnid",
            "class": "Class",
            "groupby": "Groupby",
            "admin": "Admin"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "table_id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 11
            },
            "name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "table_name": {
                "type": "varchar",
                "require": {
                    "size": 30
                },
                "size": 30
            },
            "status": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "condition": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "orderby": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "attrsearch": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "attrarange": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "checkview": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "checksearch": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "attrchoice": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "join": {
                "type": "varchar",
                "require": {
                    "size": 400
                },
                "size": 400
            },
            "excel": {
                "type": "text",
                "require": {
                    "size": 65535
                }
            },
            "beginimport": {
                "default": "1",
                "type": "int",
                "size": 8
            },
            "columncheck": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "columnaction": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "columnid": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "class": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "groupby": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "admin": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}