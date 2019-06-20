import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API } from 'app/config/api';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class UserAdminTableColumnMulService extends ServiceGlobal {




    user_id:number;
    admin_table_column_id:number;
    fk_table_user_id:any;
    fk_table_admin_table_column_id:any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user_admin_table_column_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "user_id": "User Id",
            "admin_table_column_id": "Admin Table Column Id",
            "fk_table_user_id": "fk_table_user_id",
            "fk_table_admin_table_column_id": "fk_table_admin_table_column_id"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "user_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "user",
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
            "fk_table_user_id": {
                "type": "any"
            },
            "fk_table_admin_table_column_id": {
                "type": "any"
            }
        });
    }

    save(data) {
        return this._db.post(API.USER_COLUMN, data).then(rs => {
            return Promise.resolve(true);
        });
    }
}