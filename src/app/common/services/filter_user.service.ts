import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';
import { API } from 'app/config/api';

@Injectable()
export class FilterUserService extends ServiceGlobal {

    name:string;
    user:number;
    fk_table_user:any;

    default:number;
    filter_user_admin_table_column_mul:any;

    admin_table:number;
    fk_table_admin_table:any;

    filter_default:number;
    fk_table_filter_default:any;

    order_db:string;
    limit_db:number;
    page_db:number;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'filter_user'; }
    list_filter_user_field: any;
    reFindOneData: boolean = true;
    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "filter_user_admin_table_column_mul": "filter_user_admin_table_column_mul",
            "id": "Id",
            "name": "Tên bộ lọc",
            "user": "User",
            "default": "Default",
            "admin_table": "Admin Table",
            "filter_default": "Filter Default",
            "order_db": "Order Db",
            "limit_db": "Limit Db",
            "page_db": "Page Db",
            "fk_table_filter_default": "fk_table_filter_default",
            "fk_table_admin_table": "fk_table_admin_table",
            "fk_table_user": "fk_table_user",
            "list_filter_user_field": "list_filter_user_field"
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
            "user": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "fk_table_user": {
                "type": "any"
            },
            "default": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "filter_user_admin_table_column_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "filter_user_id",
                "mul_id_fk": "admin_table_column_id",
                "fk": {
                    "table": "admin_table_column",
                    "ref_id": "id"
                }
            },
            "admin_table": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "admin_table",
                    "ref_id": "id"
                }
            },
            "fk_table_admin_table": {
                "type": "any"
            },
            "filter_default": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "filter_default",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_filter_default": {
                "type": "any"
            },
            "order_db": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "limit_db": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            },
            "page_db": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            }
        });
    }

    getParamsSearch() {
        var params = { admin_filter_user_id: this.id };
        params['order_by'] = this.order_db;
        params['limit'] = this.limit_db;
        if (this.page_db) {
            params['page'] = this.page_db;
        }
        for (var filter_user_field of this.list_filter_user_field) {
            if(filter_user_field.value) {
                params[filter_user_field.column.attribute] = filter_user_field.value;
            }
        }
        return params;
    }

    update_default() {
        this.default = 1;
        return this._db.get(API.UPDATE_FILTER_DEFAULT, {
            table_name: this.tableName(),
            id: this.id
        });
    }
}