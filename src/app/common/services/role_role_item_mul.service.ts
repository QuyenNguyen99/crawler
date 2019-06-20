import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from './service.global';
import { API } from 'app/config/api';

@Injectable()
export class RoleRoleItemMulService extends ServiceGlobal {




    role_id: Number;
    role_item_id: Number;
    fk_table_role_item_id: any;
    fk_table_role_id: any;

    label_new: any = {};
    rule_new: any = {};

    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'role_role_item_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "role_id": "Role Id",
            "role_item_id": "Role Item Id",
            "fk_table_role_item_id": "fk_table_role_item_id",
            "fk_table_role_id": "fk_table_role_id"
        }, this.label_new);
    }

    rule() {
        return Object.assign(super.rule(), {
            "role_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "role",
                    "ref_id": "id"
                }
            },
            "role_item_id": {
                "type": "int",
                "primary_key": true,
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "role_item",
                    "ref_id": "id"
                }
            },
            "fk_table_role_item_id": {
                "type": "any"
            },
            "fk_table_role_id": {
                "type": "any"
            }
        }, this.rule_new);
    }

    get_header_role() {
        var that = this;
        return this._db.get(API.HEADER_ROLE).then(rs => {
            that.label_new = {};
            that.rule_new = {};
            for (var i in rs) {
                that.label_new[rs[i]['attribute']] = rs[i]['attribute'];
                that.rule_new[rs[i]['attribute']] = { "type": "any" };
            }
            for (var i in that.attributeLabels()) {
                that.table_search_attribute[i] = [];
            }
            return Promise.resolve(rs);
        })
    }

    findAll(condition: any = {}) {
        return this._db.get(API.LIST_ROLE, condition).then(rs => {
            for (var i in rs.list) {
                rs.list[i]['old_attributes'] = rs.list[i];
            }
            return Promise.resolve(rs);
        });
    }

    update_attributes(attributes, valid: boolean = true): any {
        var attr = { 'role_item_id': this.id };
        for (var i in attributes) {
            attr['role_id'] = attributes[i];
        }
        if (this[attr['role_id']]) {
            return this._db.put(API.CREATE, {
                table_name: this.tableName(),
                attributes: attr,
            }).then(res => {
                return Promise.resolve({
                    code    : 200,
                    disable_reload: true,
                    message : 'Cập nhật phân quyền thành công',
                });
            });
        } else {
            attr['table_name'] = this.tableName();
            return this._db.delete(API.DELETE, attr).then(res => {
                return Promise.resolve({
                    code    : 200,
                    disable_reload: true,
                    message : 'Cập nhật phân quyền thành công',
                });
            })
        }
    }
}