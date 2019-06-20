import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class LogService extends ServiceGlobal {

    JOB_ID:string;
    ACTION:string;
    MESSAGE:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'log'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id":"ID",
            "JOB_ID":"Job id",
            "ACTION":"Action",
            "MESSAGE":"Message"
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
            "JOB_ID": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11
            },
            "ACTION": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 50
                },
                "size": 50
            },
            "MESSAGE": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            }
        });
    }
}
