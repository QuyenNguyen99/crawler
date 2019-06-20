import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class ApiServerService extends ServiceGlobal {

    
    
    NAME:string;
    TYPE:string;
    IS_DELETE:number;

    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'api_server'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "NAME": "Name",
            "TYPE": "Type",
            "STATUS": "Status",
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
            "TYPE": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "STATUS": {
                "type": "int",
                "require": {
                    "size": 11
                },
                "size": 11
            },
            "IS_DELETE": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}