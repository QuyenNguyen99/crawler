import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';
import { GlobalFunction } from '../../common/core/global_function';
import { API } from 'app/config/api';

@Injectable()
export class SystemSettingService extends ServiceGlobal {
    option_key:string;
    option_value:string;
    lang:string;
    type:string;

    
    email:string;
    mail_server_host:string;
    mail_server_port:number;
    mail_server_mailer:string;
    mail_server_smtp_secure:string;
    mail_server_email:string;
    mail_server_password:string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'system_setting'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "option_key": "Option Key",
            "option_value": "Option Value",
            "lang": "Lang",
            "type": "Type",
            "email": "Email đích",
            "mail_server_host": "Mail server",
            "mail_server_port": "Port",
            "mail_server_mailer": "Mail server emailer",
            "mail_server_smtp_secure": "Protocol",
            "mail_server_email": "Mail server email",
            "mail_server_password": "Password",
            "id_email": "Email đích",
            "id_mail_server_host": "Mail server",
            "id_mail_server_port": "Port",
            "id_mail_server_mailer": "Mail server emailer",
            "id_mail_server_smtp_secure": "Protocol",
            "id_mail_server_email": "Mail server email",
            "id_mail_server_password": "Password"
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
            "option_key": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "option_value": {
                "type": "longtext",
                "require": {
                    "size": 4294967295
                },
                "default": "NULL"
            },
            "lang": {
                "default": "'en'",
                "type": "varchar",
                "require": {
                    "size": 20
                },
                "size": 20
            },
            "type": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "email": {
                "type": "string",
                "require": {
                    "empty": true,
                    "size": 100,
                    "email": true
                }
            },
            "mail_server_host": {
                "type": "string",
                "require": {
                    "empty": true
                }
            },
            "mail_server_port": {
                "type": "number",
                "require": {
                    "empty": true,
                    "integer": true,
                    "minmax": [
                        0,
                        65563
                    ]
                }
            },
            "mail_server_mailer": {
                "type": "string"
            },
            "mail_server_smtp_secure": {
                "type": "string"
            },
            "mail_server_email": {
                "type": "string",
                "require": {
                    "empty": true,
                    "email": true
                }
            },
            "mail_server_password": {
                "type": "string"
            }
        });
    }

    getKeyByFormIndex(formIndex){
        return[
            ["email"],
            ["mail_server_host",
            "mail_server_port",
            "mail_server_mailer",
            "mail_server_smtp_secure",
            "mail_server_email",
            "mail_server_password"]
        ][formIndex];
    }

    getSystemSetting(){
        var that = this;
        return this._db.get(API.SYSTEM_SETTING).then(rs => {
            return Promise.resolve(rs);
        });
    }

    getAttributesbyFormIndex(formIndex){
        var attr = {};
        var attrs = this.getAttributes();
        var keys = this.getKeyByFormIndex(formIndex);
        for(var i in keys){
            attr[keys[i]] = attrs[keys[i]];
        }
        return attr;
    }

    getAttributes() {
        let attr = this.attributeLabels();
        let rs = {};
        for (let i in attr) {
            if (this[i] !== undefined && '' !== this[i]) {
                rs[i] = this[i];
            }
        }
        return rs;
    }

    getAttributesUpdateByFormIndex(formIndex){
        var attrs = this.getAttributes();
        var oldConfig = JSON.parse(sessionStorage.getItem('configOld'));
        var updateAttrs = {};
        if(oldConfig && 0 < Object.keys(oldConfig).length){
            var keyOfForm = this.getKeyByFormIndex(formIndex);
            for(var i in attrs){
                if(-1 != keyOfForm.indexOf(i) && attrs[i] != oldConfig[i]){
                    updateAttrs[i] = attrs[i];
                }
            }
        }else{
            updateAttrs = attrs;
        }
        return updateAttrs;
    }

    updateSystemSetting(formIndex){
        return this._db.post(API.SYSTEM_SETTING_UPDATE, this.getAttributesUpdateByFormIndex(formIndex)).then(rs=>{
            return Promise.resolve(true);
        });
    }
}