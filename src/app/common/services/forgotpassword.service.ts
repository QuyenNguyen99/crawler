import { ServiceGlobal } from './service.global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalQuery } from '../core/global_query';
import { GlobalValidateModel } from '../core/global_validate';
import 'rxjs/add/operator/toPromise';
import { API } from '../../config/api';
import { GlobalFunction } from '../core/global_function';


@Injectable()

export class ForgotpasswordService extends ServiceGlobal {
    email: string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            email: 'Email',
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
        });
    }

    forgot() {
        return this._db.post(API.FORGOTPASSWORD, {attributes:this.getAttributesNotEmpty()}).then(res => {
            return Promise.resolve(res);
        });
    }
}