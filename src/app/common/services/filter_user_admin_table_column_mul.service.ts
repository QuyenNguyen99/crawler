import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class FilterUserAdminTableColumnMulService extends ServiceGlobal {

    

    
    filter_user_id:number;
    admin_table_column_id:number;
    fk_table_filter_user_id:any;
    fk_table_admin_table_column_id:any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'filter_user_admin_table_column_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "filter_user_id": "Filter User Id",
            "admin_table_column_id": "Admin Table Column Id",
            "fk_table_filter_user_id": "fk_table_filter_user_id",
            "fk_table_admin_table_column_id": "fk_table_admin_table_column_id"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "filter_user_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "filter_user",
                    "ref_id": "id"
                }
            },
            "admin_table_column_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_table_column",
                    "ref_id": "id"
                }
            },
            "fk_table_filter_user_id": {
                "type": "any"
            },
            "fk_table_admin_table_column_id": {
                "type": "any"
            },
            "id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 11
            }
        });
    }
}