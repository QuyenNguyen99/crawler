import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminFormFieldService extends ServiceGlobal {
    
    
    admin_form:number;
    attribute:string;
    name:string;
    field_type:string;
    field_options:string;
    status:number;
    require:string;
    admin_form_tab:number;
    fk_table_attribute: any = [];
    fk_table_admin_form:any;
    fk_table_admin_form_tab:any;
    fk_table_field_type: any = [
        {id: '', text: '-- Chọn --'},
        {id: 'text', text: 'text'},
        {id: 'select', text: 'select'},
        {id: 'password', text: 'password'},
        {id: 'textarea', text: 'textarea'},
        {id: 'radio', text: 'radio'},
        {id: 'checkbox', text: 'checkbox'},
        {id: 'dropdowndate', text: 'dropdowndate'},
        {id: 'multiselect', text: 'multiselect'},
        {id: 'selectother', text: 'selectother'},
        {id: 'citycounty', text: 'citycounty'},
        {id: 'oneimage', text: 'oneimage'},
        {id: 'manyimages', text: 'manyimages'},
        {id: 'onefile', text: 'onefile'},
        {id: 'manyfiles', text: 'manyfiles'},
        {id: 'arrayjson', text: 'arrayjson'},
        {id: 'view', text: 'view'},
        {id: 'daterangepicker', text: 'daterangepicker'},
        {id: 'jsontext', text: 'jsontext'},
        {id: 'textpwd', text: 'textpwd'},
        {id: 'taginput', text: 'taginput'},
        {id: 'tokeninput', text: 'tokeninput'},
    ];
    data:string;
    
    priority:number;
    
    
    event_trigger: string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_form_field'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "attribute": "Attribute",
            "field_type": "Field Type",
            "field_options": "Field Options",
            "status": "Status",
            "require": "Require",
            "admin_form_tab": "Admin Form Tab",
            "data": "Data",
            "priority": "Priority",
            "event_trigger": "Event Trigger",
            "fk_table_admin_form_tab": "fk_table_admin_form_tab",
            "admin_form": "Admin Form",
            "fk_table_admin_form": "fk_table_admin_form"
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
            "admin_form": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_form",
                    "ref_id": "id"
                }
            },
            "attribute": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "name": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            },
            "field_type": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "field_options": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "require": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "admin_form_tab": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "admin_form_tab",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_admin_form": {
                "type": "any"
            },
            "fk_table_admin_form_tab": {
                "type": "any"
            },
            "data": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "priority": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            },
            "event_trigger": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                }
            }
        });
    }
}