import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class FilterDefaultFieldService extends ServiceGlobal {

    

    
    admin_table_column:number;
    filter_default:number;
    value:string;
    fk_table_admin_table_column:any;
    fk_table_filter_default:any;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'filter_default_field'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "admin_table_column": "Admin Table Column",
            "filter_default": "Filter Default",
            "value": "Value",
            "fk_table_admin_table_column": "fk_table_admin_table_column",
            "fk_table_filter_default": "fk_table_filter_default"
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
            "admin_table_column": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_table_column",
                    "ref_id": "id"
                }
            },
            "filter_default": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "filter_default",
                    "ref_id": "id"
                }
            },
            "value": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "fk_table_admin_table_column": {
                "type": "any"
            },
            "fk_table_filter_default": {
                "type": "any"
            }
        });
    }
}