import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';

@Injectable()
export class AdminFormTabService extends ServiceGlobal {

    

    
    name:string;
    description:string;
    content:string;
    admin_form:number;
    status:number;
    hidden:number;
    line:number;
    odr:number;
    fk_table_admin_form:any;
    list_admin_form_field: any;
    priority:number;
    
    parent_id:number;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_form_tab'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "description": "Description",
            "content": "Content",
            "admin_form": "Admin Form",
            "status": "Status",
            "hidden": "Hidden",
            "line": "Line",
            "priority": "Priority",
            "parent_id": "Parent Id",
            "fk_table_admin_form": "fk_table_admin_form",
            "odr": "Odr",
            "list_admin_form_field": "list_admin_form_field"
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "id": {
                "type": "int",
                "auto_increment": true,
                "primary_key": true,
                "size": 8
            },
            "name": {
                "default": "''",
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "description": {
                "type": "varchar",
                "require": {
                    "size": 1000
                },
                "size": 1000,
                "default": "NULL"
            },
            "content": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "admin_form": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_form",
                    "ref_id": "id"
                },
                "default": "NULL"
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
            "fk_table_admin_form": {
                "type": "any"
            },
            "priority": {
                "default": "0",
                "type": "tinyint",
                "size": 3
            },
            "parent_id": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            }
        });
    }

    setAttributesFieldClass() {
        var list_admin_form_field = [];
        if (this.list_admin_form_field && this.list_admin_form_field.length) {
            for (var item_field of this.list_admin_form_field) {
                var field = new AdminFormFieldService(this._db, this.http);
                field.setAttributesAndOldAttributes(item_field);
                list_admin_form_field.push(field);
            }
        }
        this.list_admin_form_field = list_admin_form_field;
    }
}