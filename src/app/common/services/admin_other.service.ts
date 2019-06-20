import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class AdminOtherService extends ServiceGlobal {

    

    
    name:string;
    status:number;
    
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'admin_other'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "status": "Status"
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
                    "size": 20
                },
                "size": 20
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}