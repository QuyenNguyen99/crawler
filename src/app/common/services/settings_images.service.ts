import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class SettingsImagesService extends ServiceGlobal {

    

    
    name:string;
    link:string;
    baseurl:string;
    did:number;
    image_thumb:string;
    table_name:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'settings_images'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "name": "Name",
            "link": "Link",
            "baseurl": "Baseurl",
            "did": "Did",
            "image_thumb": "Image Thumb",
            "table_name": "Table Name"
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
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "link": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "baseurl": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "did": {
                "type": "int",
                "size": 11,
                "default": "NULL"
            },
            "image_thumb": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "table_name": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            }
        });
    }
}