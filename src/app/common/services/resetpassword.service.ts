import { ServiceGlobal } from './service.global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalQuery } from '../core/global_query';
import { GlobalValidateModel } from '../core/global_validate';
import 'rxjs/add/operator/toPromise';
import { API } from '../../config/api';
import { GlobalFunction } from '../core/global_function';


@Injectable()

export class ResetpasswordService extends ServiceGlobal {
    password: string;
    confirm_password: string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            password: 'Mật khẩu mới',
            confirm_password: 'Nhập lại mật khẩu mới',
        });
    }

    rule() {
        return Object.assign(super.rule(), {
            "password": {
                "type": "string",
                "require": {
                    "empty": true,
                    "size": 100,
                    "password": true,
                },
            },
            "confirm_password": {
                "type": "string",
                "require": {
                    "empty": true,
                    "size": 100,
                    "password": true,
                    "same": {
                        "attribute": "password"
                    }
                },
            },
        });
    }

    resetpassword(token) {
        return this._db.post(API.RESETPASSWORD, {attributes:this.getAttributesNotEmpty(),id: this.id, access_token: token}).then(res => {
            if(res.code == 200) {
                GlobalFunction.createCookie('token',res.token, 0);
                GlobalFunction.removeCookie('userInfo');
                GlobalFunction.createCookie('userInfo', JSON.stringify(res.userInfo), 0);
            }
            return Promise.resolve(res);
        });
    }

    check_token(access_token) {
        return this._db.get(API.CHECK_TOKEN_RESET.replace('{access_token}', access_token)).then(res => {
            return Promise.resolve(res);
        });
    }
}