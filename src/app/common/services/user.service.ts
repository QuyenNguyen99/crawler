import { ServiceGlobal } from './service.global';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalQuery } from '../core/global_query';
import { GlobalValidateModel } from '../core/global_validate';
import 'rxjs/add/operator/toPromise';
import { API } from '../../config/api';
import { GlobalFunction } from '../core/global_function';


@Injectable()
export class UserService extends ServiceGlobal {
    email:string;
    password:string;
    gender:number;
    status:number;
    avartar:string;
    access_token:string;
    auth_key:string;
    app_type:number;
    birthday:string;
    display_name:string;
    phone:string;
    firstname: string;
    lastname: string;
    plan_id:Number;
    address:string;
    role:any;
    confirm_password:string;
    user_role_mul:any;
    fk_table_user_role_mul:any;
    
    is_delete:number;
    
    fk_table_role:any;
    
    assign_id:number;
    fk_table_assign_id:any;
    
    notification:number;
    user_admin_table_column_mul:any;
    user_notification_settings_mul:any;
    dbname() {
        return 'crawlersystem';
    }
    loading: any = false;
    tableName() { return 'user'; }

    

    
    
    
    
    
    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "user_admin_table_column_mul": "user_admin_table_column_mul",
            "user_notification_settings_mul": "user_notification_settings_mul",
            "user_role_mul": "Vai trò",
            "id": "Mã nhân viên",
            "email": "Email đăng nhập",
            "password": "Mật khẩu",
            "gender": "Giới tính",
            "status": "Trạng thái",
            "avartar": "Ảnh đại diện",
            "access_token": "Access Token",
            "auth_key": "Auth Key",
            "app_type": "App Type",
            "birthday": "Ngày sinh",
            "display_name": "Họ và tên",
            "phone": "Điện thoại di động",
            "address": "Địa chỉ",
            "role": "Vai trò",
            "is_delete": "Is Delete",
            "assign_id": "Người quản lý",
            "notification": "Notification",
            "fk_table_assign_id": "fk_table_assign_id",
            "fk_table_role": "fk_table_role",
            "confirm_password": "Nhập lại mật khẩu",
            "firstname": "Firstname",
            "lastname": "Lastname",
            "plan_id": "Plan Id",
            "fk_table_user_role_mul": "fk_table_user_role_mul"
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
            "email": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "email": true,
                    "size": 255
                },
                "size": 255
            },
            "password": {
                "type": "varchar",
                "require": {
                    // "empty": true,
                    "password": true,
                    "regex": {
                        "value": "(?=.*[a-zA-Z])(?=.*[0-9])",
                        "message": "Mật khẩu phải bao gồm cả chữ và số"
                    },
                    "size": 255,
                    "min": 6
                },
                "size": 255
            },
            "confirm_password": {
                "type": "varchar",
                "require": {
                    "empty": {
                        "on": "change_password"
                    },
                    "password": true,
                    "size": 100,
                    "same": {
                        "attribute": "password"
                    }
                },
                "size": 100
            },
            "gender": {
                "default": "0",
                "type": "int",
                "size": 1
            },
            "status": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "avartar": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "access_token": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "auth_key": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255,
                "default": "NULL"
            },
            "app_type": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "birthday": {
                "type": "varchar",
                "require": {
                    "size": 20
                },
                "size": 20,
                "default": "NULL"
            },
            "display_name": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 500
                },
                "size": 500
            },
            "phone": {
                "type": "varchar",
                "require": {
                    "empty": {
                        "on": "update"
                    },
                    "phone": true,
                    "size": 20
                },
                "size": 20,
                "default": "NULL"
            },
            "address": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "role": {
                "type": "varchar",
                "size": 255,
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                },
                "require": {
                    "size": 255
                },
                "default": "NULL"
            },
            "is_delete": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "fk_table_role": {
                "type": "any"
            },
            "user_role_mul": {
                "type": "array",
                "size": 11,
                "require": {
                    "empty": {
                        "on": [
                            "create",
                            "admin_update_staff"
                        ]
                    }
                },
                "update_attr": "role",
                "mul_id": "user_id",
                "mul_id_fk": "role_id",
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                }
            },
            "fk_table_user_role_mul": {
                "type": "any"
            },
            "assign_id": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                },
                "default": "NULL"
            },
            "fk_table_assign_id": {
                "type": "any"
            },
            "notification": {
                "default": "1",
                "type": "tinyint",
                "size": 1
            },
            "user_admin_table_column_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "user_id",
                "mul_id_fk": "admin_table_column_id",
                "fk": {
                    "table": "admin_table_column",
                    "ref_id": "id"
                }
            },
            "user_notification_settings_mul": {
                "type": "array",
                "size": 11,
                "mul_id": "user_id",
                "mul_id_fk": "notification_settings_id",
                "fk": {
                    "table": "notification_settings",
                    "ref_id": "id"
                }
            },
            "created_by": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "modified_by": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
        });
    }

    obj_role: any;

    getRole() {
        var that = this;
        return this._db.get(API.ROLE).then(rs => {
            if(rs.code == 200) {
                that.obj_role = rs.role;
            }
            return Promise.resolve(rs);
        })
    }

    getInformation() {
        if(!GlobalFunction['userInformation'] && typeof(GlobalFunction['userInformation']) != 'object') {
            var that = this;
            this._db.dbname = this.dbname();
            return this._db.get(API.INFORMATION).then(rs => {
                GlobalFunction['userInformation'] = rs;
                if(rs.code == 200) {
                    that.setAttributes(rs.attributes);
                    that._old_attributes = rs.attributes;
                }
                return rs;
            })
        } else {
            this.setAttributes(GlobalFunction['userInformation'].attributes);
            this._old_attributes = GlobalFunction['userInformation'].attributes;
            return Promise.resolve(GlobalFunction['userInformation']);
        }
    }

    isFirstLogin() {
        var that = this;
        return that.created_time && (that.created_time === that.modified_time);
    }

    updateprofile() {
        var attributes = this.getAttributesUpdate();
        if (attributes && Object.keys(attributes).length) {
            return this._db.post(API.UPDATEPROFILE, {
                attributes: attributes,
            }).then(res => {
                if (res.code == 200) {
                    this.setAttributesAndOldAttributes(res.attributes);
                } else {
                    this._error_api = res.error;
                }
                return Promise.resolve(res);
            });
        } else {
            return Promise.resolve({ code: 200, attributes: this.getAttributes() });
        }
    }
}