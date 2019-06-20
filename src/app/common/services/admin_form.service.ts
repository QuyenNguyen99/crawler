import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';

@Injectable()
export class AdminFormService extends ServiceGlobal {


    ids: any;
    name:string;
    description:string;
    content:string;
    table_name:string;
    status:number;
    odr:number;
    multi_add:number;
    list_admin_form_tab: any;
    create_name:string;
    edit_name:string;

    template: string = 'form1';
    fk_table_template: any = [
        { id: 'form1', text: 'form1' },
        { id: 'form2', text: 'form2' },
        { id: 'form3', text: 'form3' },
        { id: 'form4', text: 'form4' },
        { id: 'form5', text: 'form5' },
    ];
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_form'; }
    show_edit: boolean = false;
    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "description": "Description",
            "content": "Content",
            "table_name": "Table Name",
            "status": "Status",
            "odr": "Odr",
            "multi_add": "Multi Add",
            "create_name": "Create Name",
            "edit_name": "Edit Name",
            "template": "Template",
            "list_admin_form_tab": "list_admin_form_tab"
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
            "table_name": {
                "default": "0",
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "odr": {
                "default": "0",
                "type": "tinyint",
                "size": 3
            },
            "multi_add": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "create_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "edit_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "template": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            }
        });
    }

    get_create_name() {
        return this.create_name || ('Thêm ' + (this.name !== undefined ? this.name.toLowerCase() : ''));
    }

    get_update_name() {
        return this.create_name || ('Cập nhật ' + (this.name !== undefined ? this.name.toLowerCase() : ''));
    }

    get_update_all_name() {
        return this.create_name || ('Cập nhật đồng loạt ' + (this.name !== undefined ? this.name.toLowerCase() : ''));
    }
    reFindOneData = true;
    setAttributeTabFieldClass() {
        if(this.list_admin_form_tab && this.list_admin_form_tab !== undefined) {
            var list_admin_form_tab = [];
            for (let item_tab of this.list_admin_form_tab) {
                var tab = new AdminFormTabService(this._db, this.http);
                tab.setAttributesAndOldAttributes(item_tab);
                tab.setAttributesFieldClass();
                
                list_admin_form_tab.push(tab);
            }
            this.list_admin_form_tab = list_admin_form_tab;

        }
    }
}