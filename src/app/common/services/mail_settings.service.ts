import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';

@Injectable()
export class MailSettingsService extends ServiceGlobal {

    

    
    mail_key:string;
    mail_title:string;
    mail_subject:string;
    mail_msg:string;
    mail_attribute:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'mail_settings'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "mail_key": "Mail Key",
            "mail_title": "Mail Title",
            "mail_subject": "Mail Subject",
            "mail_msg": "Mail Msg",
            "mail_attribute": "Mail Attribute"
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
            "mail_key": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "mail_title": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "mail_subject": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "mail_msg": {
                "type": "longtext",
                "require": {
                    "empty": true,
                    "size": 4294967295
                }
            },
            "mail_attribute": {
                "type": "text",
                "require": {
                    "size": 65535
                },
                "default": "NULL"
            }
        });
    }
}