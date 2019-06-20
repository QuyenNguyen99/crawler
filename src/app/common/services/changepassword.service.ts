import { Injectable } from "@angular/core";
import { ServiceGlobal } from "./service.global";
import { API } from "app/config/api";

@Injectable()

export class ChangePasswordService extends ServiceGlobal {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'user'; }

    rule() {
        return Object.assign(super.rule(), {
            "oldPassword": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "password": true,
                    "size": 255
                },
                "size": 255
            },
            "newPassword": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "password": true,
                    "size": 100
                },
                "size": 100
            },
            "confirmPassword": {
                "type": "varchar",
                "require": {
                    "empty": {
                        "on": "create"
                    },
                    "password": true,
                    "size": 100,
                    "same": {
                        "attribute": "newPassword"
                    }
                },
                "size": 100
            }
        });
    }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            oldPassword: 'Mật khẩu cũ',
            newPassword: 'Mật khẩu mới',
            confirmPassword: 'Mật khẩu xác nhận',
        });
    }

    resetAttrs() {
        let attr = this.attributeLabels();
        for (let i in attr) {
            this[i] = undefined;
        }
    }

    changePassword(){
        return this._db.post(API.CHANGEPASSWORD, {attributes:this.getAttributesNotEmpty()}).then(res=>{
            return Promise.resolve(res);
        });
    }
}