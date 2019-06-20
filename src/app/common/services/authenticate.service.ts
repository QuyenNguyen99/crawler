import { ServiceGlobal } from './service.global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalQuery } from '../core/global_query';
import { GlobalValidateModel } from '../core/global_validate';
import 'rxjs/add/operator/toPromise';
import { API } from '../../config/api';
import { GlobalFunction } from '../core/global_function';


@Injectable()

export class AuthenticateService extends ServiceGlobal {
    email: string;
    password: string;
    remember_me: boolean = false;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            email: 'Email',
            password: 'Password',
            remember_me: 'Remember Me',
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "email": {
                "type": "string",
                "require": {
                    "empty": true,
                    "size": 100,
                    "email": true,
                },
            },
            "password": {
                "type": "string",
                "require": {
                    "empty": true,
                    "size": 100,
                    // "password": true,
                },
            },
            "remember_me": {
                "type": "int",
            },
        });
    }

    login() {
        return this._db.post(API.LOGIN, this.getAttributesNotEmpty()).then(res => {
            if(res.code == 200) {
                let days = this.remember_me ? 30 : 0;
                GlobalFunction.createCookie('token',res.token, days);
                GlobalFunction.removeCookie('userInfo');
                GlobalFunction.createCookie('userInfo', JSON.stringify(res.userInfo), days);
            }
            return Promise.resolve(res);
        });
    }

    logout() {
        return this._db.get(API.LOGOUT).then(res => {
            GlobalFunction.removeCookie('token');
            return Promise.resolve(res);
        });
    }
}