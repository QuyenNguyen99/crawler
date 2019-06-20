import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobTypeService extends ServiceGlobal {

    

    
    NAME: string;
    DB_MONGO: string;
    DB_COLLECTION: string;
    CRAWLER_TYPE: string;
    IS_PAGE: number;
    PRIORITY: number;
    IS_DELETE: number;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_type'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "NAME": "Name",
            "DB_MONGO": "Db Mongo",
            "DB_COLLECTION": "Db Collection",
            "CRAWLER_TYPE": "Crawler Type",
            "IS_PAGE": "Is Page",
            "PRIORITY": "Priority",
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
            "DB_MONGO": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "DB_COLLECTION": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "CRAWLER_TYPE": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "fk":{
                    "table":"api",
                    "ref_id":"ID"
                },
                "size": 255
            },
            "IS_PAGE": {
                "default": "0",
                "type": "tinyint",
                "require": {
                    "empty": true
                },
                "size": 1
            },
            "PRIORITY": {
                "default": "1",
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11
            },
            "IS_DELETE": {
                "default": "0",
                "type": "int",
                "size": 1
            }
        });
    }
}