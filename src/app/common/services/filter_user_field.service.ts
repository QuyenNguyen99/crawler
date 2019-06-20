import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class FilterUserFieldService extends ServiceGlobal {
    
    
    filter_user:number;
    admin_table_column:number;
    value:string;
    fk_table_filter_user:any;
    fk_table_admin_table_column:any;
    
    type:string;
    
    filter_default_field:number;
    fk_table_filter_default_field:any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'filter_user_field'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "filter_user": "Filter User",
            "admin_table_column": "Admin Table Column",
            "value": "Value",
            "type": "Type",
            "filter_default_field": "Filter Default Field",
            "fk_table_filter_user": "fk_table_filter_user",
            "fk_table_admin_table_column": "fk_table_admin_table_column",
            "fk_table_filter_default_field": "fk_table_filter_default_field"
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
            "filter_user": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "filter_user",
                    "ref_id": "id"
                }
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
            "value": {
                "type": "longtext",
                "require": {
                    "empty": true,
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "fk_table_filter_user": {
                "type": "any"
            },
            "fk_table_admin_table_column": {
                "type": "any"
            },
            "type": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "filter_default_field": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "filter_default_field",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_filter_default_field": {
                "type": "any"
            }
        });
    }
}