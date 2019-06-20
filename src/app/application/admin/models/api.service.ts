import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class ApiService extends ServiceGlobal {

    

    
    NAME:string;
    LINK:string;
    TYPE:string;
    HEADER:string;
    INPUT:string;
    IS_DELETE:number;
    fk_table_TYPE:any = [
        {id: 'GET',text: 'GET'},
        {id: 'POST',text: 'POST'},
        {id: 'PUT',text: 'PUT'},
        {id: 'DELETE',text: 'DELETE'},
    ];
    fk_table_TYPE_obj: any = {'GET':'GET','POST':'POST','PUT':'PUT','DELETE':'DELETE'};
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'api'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "NAME": "Name",
            "LINK": "Link",
            "TYPE": "Type",
            "HEADER": "Header",
            "INPUT": "Input",
            "IS_DELETE": "Is Delete"
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
            "NAME": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "LINK": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "TYPE": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "HEADER": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "INPUT": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "IS_DELETE": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}