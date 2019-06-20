import { Injectable } from '@angular/core';
import { AbstractService } from './service.abstract';
import { Http } from '@angular/http';
import { GlobalQuery } from '../core/global_query';
import { GlobalValidateModel } from '../core/global_validate';
import { Global_DB } from '../core/global_db';
import { GlobalFunction } from '../core/global_function';
import { API } from '../../config/api';
import 'rxjs/add/operator/toPromise';
import { CONFIG } from '../../config/config';

declare var $: any;

@Injectable()
export class ServiceGlobal extends AbstractService {
    id: any;
    ids: any;
    created_at: string;
    updated_at: string;
    updater_id: Number;
    creator_id: Number;
    created_time: Number;
    CREATED_TIME: Number;
    modified_time: Number;
    MODIFIED_TIME: Number;
    created_by: string;
    CREATED_BY: string;
    modified_by: string;
    MODIFIED_BY: string;
    _scenario: string;
    _validate: GlobalValidateModel;
    _query: GlobalQuery;
    _error_api: any = {};
    _old_attributes: any = {};
    _attr_submit: any = {};
    dbname() {
        return 'crawlersystem';
    }
    table_search_attribute: any = {};
    constructor(public _db: Global_DB, public http: Http) {
        super();
        this._db.dbname = this.dbname();
        this._validate = new GlobalValidateModel(this);
        this._query = new GlobalQuery(this, this._db);
        for (var i in this.attributeLabels()) {
            this.table_search_attribute[i] = [];
        }
    }
    set scenario(value: string) { this._scenario = value; }
    get scenario() { return this._scenario; }
    tableName() { return ''; }
    rule() {
        return {
            id: {
                type: 'int',
            },
            created_at: {
                type: 'int',
            },
            updated_at: {
                type: 'int',
            },
            updater_id: {
                type: 'int',
            },
            creator_id: {
                type: 'int',
            },
            created_time: {
                type: 'int',
            },
            CREATED_TIME: {
                type: 'int',
            },
            modified_time: {
                type: 'int',
            },
            MODIFIED_TIME: {
                type: 'int',
            },
            created_by: {
                type: 'int',
            },
            CREATED_BY: {
                type: 'int',
            },
            modified_by: {
                type: 'int',
            },
            MODIFIED_BY: {
                type: 'int',
            }
        };
    }
    fk_table_attribute: any = [];
    attr_validate: any = {};
    attr_not_save = ['id', 'created_at', 'updated_at', 'updater_id', 'creator_id', 'ip', 'lang'];
    attributeLabels() {
        return {
            id: 'Id',
            created_at: 'Thời gian tạo',
            updated_at: 'Thời gian cập nhật',
            updater_id: 'Người cập nhật',
            creator_id: 'Người tạo',
            created_time: 'Thời gian tạo',
            modified_time: 'Thời gian cập nhật',
            created_by: 'Người tạo',
            modified_by: 'Người cập nhật',
            CREATED_BY: 'Người tạo',
            CREATED_TIME: 'Thời gian tạo',
            MODIFIED_BY: 'Người sửa cuối',
            MODIFIED_TIME: 'Thời gian sửa cuối',
        };
    }

    attributeNotGet() {
        var obj_not_get = ['created_at', 'updated_at', 'updater_id', 'creator_id'];
        var list = this.attributeLabels();
        var rs = {};
        for (var i in list) {
            if (!GlobalFunction.contains(i, obj_not_get)) {
                rs[i] = list[i];
            }
        }
        return rs;
    }

    cloneTo(objToClone) {
        if (objToClone) {
            for (var attr in this) {
                objToClone[attr] = this[attr];
            }
        }
    }

    resetAttributes() {
        let attr = this.attributeLabels();
        for (let i in attr) {
            this[i] = undefined;
        }
        for (let i in this.table_search_attribute) {
            for (let j in this.table_search_attribute[i]) {
                if (this.table_search_attribute[i][j] && this.table_search_attribute[i][j]['value']) {
                    this.table_search_attribute[i][j]['value'] = undefined;
                }
            }
        }
    }

    resetAttributesNotFk() {
        let attr = this.attributeLabels();
        for (let i in attr) {
            if (!i.match(/^fk_table_/gi)) {
                this[i] = undefined;
            }
        }
    }

    resetAttribute(attr: any) {
        if (this.hasAttribute(attr)) {
            this[attr] = undefined;
        }
    }

    hasAttribute(attr: string) {
        return this.attributeLabels()[attr] ? true : false;
    }

    getAttributes() {
        let attr = this.attributeLabels();
        let rs = {};
        for (let i in attr) {
            if (this[i] !== undefined) {
                if (i.match(/^list_/gi) && !(this.rule()[i] && (this.rule()[i]['token_table_name'] || this.rule()[i]['not_list']))) {
                    var array_item = [];
                    if (this[i].length) {
                        for (var item of this[i]) {
                            if (typeof (item) == 'object' && typeof (item.getAttributes) == 'function') {
                                array_item.push(item.getAttributes());
                            } else {
                                array_item.push(item);
                            }
                        }
                    }
                    rs[i] = array_item;
                } else {
                    rs[i] = this[i];
                }
            }
        }
        return rs;
    }

    getAttributesNotEmpty() {
        let attr = this.attributeLabels();
        let rs = {};
        for (let i in attr) {
            if (this[i] && !i.match(/^fk_table_/gi)) {
                rs[i] = this[i];
            }
        }
        return rs;
    }

    setAttributesNotEmpty(rs) {
        Object.assign(this, rs);
        return true;
    }
    setAttributesNotEmptyThen(rs) {
        var that = this;
        return GlobalFunction.setTimeout(1).then(function () {
            that.setAttributesNotEmpty(rs);
            that.setAttributesSearch(rs);
            return Promise.resolve(true);
        })
    }
    showAttribuesSearch(i, j) {
        var that = this;
        function get_value(item) {
            if (item) {
                if (GlobalFunction.is_array(item.value)) {
                    var a = [];
                    for (var item_child of item.value) {
                        var v = that.showAttribute(i, item_child);
                        if (that.get_type(i, item_child) == 'datetime') {
                            v = v.replace(/ [0-9]{2}\:00$/, '');
                        }
                        a.push(v);
                    }
                    return a.join(', ');
                } else {
                    var v = that.showAttribute(i, item.value);
                    if (that.get_type(i, item.value) == 'datetime') {
                        v = v.replace(/ [0-9]{2}\:00$/, '');
                    }
                    return v;
                }
            }
            return "";
        }
        var vl = '';
        if (j !== undefined) {
            vl = get_value(this.table_search_attribute[i][j]);
        } else {
            var a = [];
            for (var item of this.table_search_attribute[i]) {
                a.push(get_value(item));
            }
            vl = a.join(', ');
        }
        return vl;
    }
    showAttribuesByValue(attr, value) {
        if (value) {
            value = value.replace(/\|/gi, '');
            if (value.match(/,/gi)) {
                value = value.split(',');
            }
            if (GlobalFunction.is_array(value)) {
                var a = [];
                for (var item of value) {
                    a.push(this.showAttribute(attr, item));
                }
                return a.join(', ');
            } else {
                return this.showAttribute(attr, value);
            }
        }
        return "";
    }

    setAttributeSearchByAttributes(rs) {
        for (var i in rs) {
            if (rs[i]) {
                var value = decodeURIComponent(rs[i]);
                var array_value = value.split('||');
                for (var j in array_value) {
                    var array_vl: any = array_value[j].split('|');
                    array_vl[0] = typeof (array_vl[0]) == 'string' && array_vl[0].match(/,/gi) ? array_vl[0].split(',') : array_vl[0];
                    if (array_vl.length == 3) {
                        this.table_search_attribute[i][array_vl[2]] = { value: array_vl[0], operator: array_vl[1] };
                    } else if (array_vl.length == 2) {
                        this.table_search_attribute[i][j] = { value: array_vl[0], operator: array_vl[1] };
                    } else {
                        this.table_search_attribute[i][j] = { value: array_vl[0] };
                    }
                }
            } else {
                for (let j in this.table_search_attribute[i]) {
                    if (this.table_search_attribute[i][j] && this.table_search_attribute[i][j]['value']) {
                        this.table_search_attribute[i][j]['value'] = undefined;
                    }
                }
            }
        }
    }

    setAttributesSearch(rs) {
        for (let i in this.table_search_attribute) {
            if (rs[i]) {
                var value = decodeURIComponent(rs[i]);
                var array_value = value.split('||');
                for (var j in array_value) {
                    var array_vl: any = array_value[j].split('|');
                    array_vl[0] = typeof (array_vl[0]) == 'string' && array_vl[0].match(/,/gi) ? array_vl[0].split(',') : array_vl[0];
                    if (array_vl.length == 3) {
                        this.table_search_attribute[i][array_vl[2]] = { value: array_vl[0], operator: array_vl[1] };
                    } else if (array_vl.length == 2) {
                        this.table_search_attribute[i][j] = { value: array_vl[0], operator: array_vl[1] };
                    } else {
                        this.table_search_attribute[i][j] = { value: array_vl[0] };
                    }
                }
            } else {
                for (let j in this.table_search_attribute[i]) {
                    if (this.table_search_attribute[i][j] && this.table_search_attribute[i][j]['value']) {
                        this.table_search_attribute[i][j]['value'] = undefined;
                    }
                }
            }
        }
    }
    getValueSearch(k, vl) {
        var rs = vl;
        switch (typeof (vl)) {
            case 'object':
                if (GlobalFunction.is_array(vl)) {
                    rs = vl.join(',');
                } else {
                    rs = GlobalFunction.formatDateTime(vl, 'y-m-d');
                }

                break;
        }
        return rs;
    }
    getAttributesSearch(k: any = undefined) {
        var that = this;
        function get_attr_value(i) {
            var item = [];
            for (var j in that.table_search_attribute[i]) {
                var vl = that.getValueSearch(i, that.table_search_attribute[i][j]['value']);
                if (vl) {
                    if (that.table_search_attribute[i][j]['operator']) {
                        vl += '|' + that.table_search_attribute[i][j]['operator'];
                        vl += '|' + j;
                    }
                    item.push(vl);
                }
            }
            return item.join("||");
        }
        var rs: any;
        if (k === undefined) {
            rs = {};
            for (var i in this.table_search_attribute) {
                var item: any = get_attr_value(i);
                if (item.length) {
                    rs[i] = item;
                }
            }
        } else {
            rs = get_attr_value(k);
        }
        return rs;
    }
    showAttributes() {
        let attr = this.attributeLabels();
        let rs = {};
        for (let i in attr) {
            if (this[i] !== undefined) {
                rs[i] = this.showAttribute(i, this[i]);
            }
        }
        console.log(rs);
        return rs;
    }
    showAttribute(attr: string, value: any, rs: any = false) {
        if (this['show_' + attr]) {
            return this['show_' + attr](attr, value);
        }
        var rule = this.rule()[attr];
        var type = rule ? rule['type'] : '';

        if (rule && rule['fk']) {
            if (attr.match(/_mul$/gi) && value && value !== undefined) {
                if (typeof (value) == 'string') {
                    value = value.split(',');
                } else if (typeof (value) == 'number') {
                    value = [value];
                }
                var a = [];
                for (var i in value) {
                    if (this['fk_table_' + attr + '_obj'] && this['fk_table_' + attr + '_obj'][value[i]]) {
                        a.push(this['fk_table_' + attr + '_obj'][value[i]]);
                    }
                }
                return a.join(', ');
            }
            if(rule['attr_ref']){
                return this['fk_table_' + rule['attr_ref'] + '_obj'] && this['fk_table_' + rule['attr_ref'] + '_obj'][value] ? this['fk_table_' + rule['attr_ref'] + '_obj'][value] : '';

            }
            return this['fk_table_' + attr + '_obj'] && this['fk_table_' + attr + '_obj'][value] ? this['fk_table_' + attr + '_obj'][value] : '';
            
        }
        if (attr.match(/image|file|avartar/gi)) {
            if (value !== undefined && value && typeof (value) == 'string') {
                if (value.match(/^\[(\{|\])/gi)) {
                    value = JSON.parse(value);
                    for (var i in value) {
                        value[i]['link'] = this.get_link_file(value[i]['name']);
                    }
                } else {
                    value = this.get_link_file(value);
                }
            }
        } else {
            if (GlobalFunction.contains(type, ['int', 'bigint'])) {
                if (GlobalFunction.contains(attr, ['modified_time', 'created_time','CREATED_TIME','FINISH_TIME','START_TIME','MODIFIED_TIME'])) {
                    var v = GlobalFunction.formatDateTime(value);
                    return v;
                } else {
                    if (value !== undefined && value) {
                        if (typeof (value) == 'string' && value.trim().match(/^[0-9]+$/gi)) {
                            return parseInt(value);
                        } else {
                            return value;
                        }
                    } else {
                        return '';
                    }
                }
            } else if (GlobalFunction.contains(type, ['float', 'double'])) {
                return value !== undefined ? parseFloat(value) : '';
            } else if (GlobalFunction.contains(type, ['string', 'varchar', 'longtext', 'text'])) {
                return value;
            } else if (GlobalFunction.contains(type, ['date', 'datetime'])) {
                return GlobalFunction.formatDateTime(value, type == 'datetime' ? 'd-t-y h:i' : 'd-t-y');
            }
        }
        return value;
    }

    get_type(attr, value) {
        var rule = this.rule()[attr];
        var type = rule ? rule['type'] : '';
        if (rule && rule['fk']) {
            if (attr.match(/_mul$/gi)) {
                return 'array';
            } else {
                return type;
            }
        }
        if (attr.match(/image|file|avartar/gi)) {
            if (value !== undefined && value && typeof (value) == 'string') {
                if (value.match(/^\[(\{|\])/gi)) {
                    return 'object';
                } else {
                    return 'string';
                }
            }
        } else {
            if (GlobalFunction.contains(type, ['int', 'bigint'])) {
                if (GlobalFunction.contains(attr, ['modified_time', 'created_time'])) {
                    return 'datetime';
                }
            } else if (GlobalFunction.contains(type, ['string', 'varchar', 'longtext', 'text'])) {
                return 'string';
            }
        }
        return type;
    }

    get_link_file(file_name) {
        return CONFIG.LINK_IMAGE + file_name;
    }

    setAttribute(attr: string, value: any): boolean {
        function get_value(vl) {
            if (vl && vl !== undefined && typeof (vl) == 'object') {
                if (GlobalFunction.is_array(vl)) {
                    var a = [];
                    for (var item of vl) {
                        a.push(get_value(item));
                    }
                    vl = a;
                } else {
                    vl = Object.assign({}, vl);
                }
            }
            return vl;
        }
        if (this.hasAttribute(attr)) {
            if (value !== undefined && value !== null) {
                var type = this.rule()[attr] ? this.rule()[attr]['type'] : '';
                if (GlobalFunction.contains(type, ['int', 'bigint'])) {
                    // value = parseInt(value);
                } else if (GlobalFunction.contains(type, ['float', 'double'])) {
                    // value = parseFloat(value);
                } else if (GlobalFunction.contains(type, ['string', 'varchar', 'longtext', 'text'])) {
                    // value = '' + value;
                } else if (GlobalFunction.contains(type, ['date', 'datetime'])) {
                    // value = GlobalFunction.newDate(value);
                }
            }

            this[attr] = get_value(value);
            return true;
        } else {
            
            this[attr] = value;
        }
        return false;
    }


    setAttributes(rs) {
        for (let i in rs) {
            this.setAttribute(i, rs[i]);
            if (i.match(/^fk_table_/gi)) {
                if (GlobalFunction.is_array(rs[i])) {
                    this[i + '_obj'] = GlobalFunction.indexObj(rs[i], 'id', 'text');
                }
            }
        }
    }

    setAttributesAndOldAttributes(rs) {
        this.setAttributes(rs);
        this._old_attributes = rs;
    }

    delete_attr_create(a) {
        delete a['id'];
        delete a['created_time'];
        delete a['modified_time'];
        delete a['created_by'];
        delete a['modified_by'];
    }

    getAttributesInsert() {
        let attr = this.attributeLabels();
        let rs = {};
        for (let i in attr) {
            if (!i.match(/^fk_table/gi) && !GlobalFunction.contains(i, this.attr_not_save) && this[i] !== undefined) {
                if (i.match(/^list_/gi) && i != 'list_keyword' && !(this.rule()[i] && (this.rule()[i]['token_table_name'] || this.rule()[i]['not_list']))) {
                    var array_item = { 'create': [] };
                    if (this[i].length) {
                        for (var item of this[i]) {
                            var a;
                            if (typeof (item) == 'object' && typeof (item.getAttributes) == 'function') {
                                a = item.getAttributes();
                            } else {
                                a = Object.assign({}, item);
                            }
                            this.delete_attr_create(a);
                            array_item['create'].push(a);
                        }
                    }
                    if (array_item['create'].length) {
                        rs[i] = array_item;
                    }
                } else {
                    rs[i] = this[i];
                }
            }
        }
        return rs;
    }
    getAttributesUpdate() {
        var attributes = {};
        for (let i in this.attributeLabels()) {
            if (this[i] !== undefined) {
                attributes[i] = this[i];
            }
        }
        var attributes_update = {};
        var attr: any;
        for (var k in attributes) {
            if (k.match(/^list_/gi) && k != 'list_keyword' && !(this.rule()[k] && (this.rule()[k]['token_table_name'] || this.rule()[k]['not_list']))) {
                // console.log(k, attributes[k]);
                var array_item = { 'delete': [], 'create': [], 'update': [] };
                if ((!this._old_attributes[k] || this._old_attributes[k] === undefined || !this._old_attributes[k].length)) {
                    if (attributes[k]) {
                        for (let item of attributes[k]) {
                            if (typeof (item) == 'object' && typeof (item.getAttributes) == 'function') {
                                attr = item.isNewRecord() ? item.getAttributesInsert() : item.getAttributesUpdate();
                            } else {
                                attr = Object.assign({}, item);
                            }
                            this.delete_attr_create(attr);
                            array_item['create'].push(attr);
                        }
                    }
                } else {
                    if (!attributes[k] || attributes[k] === undefined || !attributes[k].length) {
                        for (let item of this._old_attributes[k]) {
                            array_item['delete'].push(item['id']);
                        }
                    } else {
                        for (let item_old of this._old_attributes[k]) {
                            var type = 'delete';
                            for (let item_new of attributes[k]) {
                                if (item_old.id == item_new.id) {
                                    type = 'update';
                                    if (typeof (item_new) == 'object' && typeof (item_new.getAttributes) == 'function') {
                                        var attr = item_new.getAttributesUpdate();
                                        if (Object.keys(attr).length) {
                                            array_item['update'].push(Object.assign({ id: item_new.id }, attr));
                                        }
                                    } else {
                                        if (JSON.stringify(item_old) != JSON.stringify(item_new)) {
                                            array_item['update'].push(item_new);
                                        }
                                    }
                                }
                            }
                            if (type == 'delete') {
                                array_item['delete'].push(item_old.id);
                            }
                        }
                        for (let item_new of attributes[k]) {
                            var type = 'create';
                            for (let item_old of this._old_attributes[k]) {
                                if (item_old.id == item_new.id) {
                                    type = 'update';
                                }
                            }
                            if (type == 'create') {
                                if (typeof (item_new) == 'object' && typeof (item_new.getAttributes) == 'function') {
                                    attr = item_new.getAttributesInsert();
                                } else {
                                    attr = Object.assign({}, item_new);
                                }
                                this.delete_attr_create(attr);
                                array_item['create'].push(attr);
                            }
                        }
                    }
                }
                if (array_item['create'].length || array_item['update'].length || array_item['delete'].length) {
                    attributes_update[k] = array_item;
                }
            } else {
                if (!k.match(/^fk_table/gi) && this._old_attributes[k] != attributes[k] && !GlobalFunction.contains(k, ['created_time', 'modified_time', 'created_by', 'modified_by'])) {
                    attributes_update[k] = attributes[k];
                }
            }
        }
        return attributes_update;
    }

    validate() {
        var rs = this._validate.validate();
        return rs;
    }

    find(): GlobalQuery {
        return this._query;
    }

    delete(id = false): any {
        if (!id && this.id) {
            id = this.id;
        }
        if (id) {
            return this._db.delete(API.DELETE + '?table_name=' + this.tableName() + '&id=' + id);
        } else {
            return Promise.resolve();
        }

    }
    deleteAll(condition: any, params: any = false) {
        return this._db.post(API.DELETEALL, {
            table_name: this.tableName(),
            where: condition,
            params: params,
        });
    }
    approveAll(condition: any, params: any = false) {
        return this._db.post(API.APPROVEALL, {
            table_name: this.tableName(),
            where: condition,
            params: params,
        });
    }

    save(valid: boolean = true): any {
        if (!valid || this.validate()) {
            return this.id ? this.update() : this.insert();
        } else {
            console.log(this._validate.getErrors());
            return Promise.resolve({
                code: 400,
                attributes: this._validate.getErrors(),
            });
        }
    }

    save_not_db(valid: boolean = true): any {
        if (!valid || this.validate()) {
            return Promise.resolve({
                code: 200,
                attributes: this.id ? this.getAttributesUpdate() : this.getAttributesInsert(),
            });
        } else {
            console.log(this._validate.getErrors());
            return Promise.resolve({
                code: 400,
                attributes: this._validate.getErrors(),
            });
        }
    }

    validate_attributes(attributes) {
        if (GlobalFunction.is_array(attributes)) {
            var a = {};
            for (var item of attributes) {
                a[item] = true;
            }
            attributes = a;
        }
        return this._validate.validate(attributes);
    }

    update_attributes_many(attributes, ids, valid: boolean = true): any {
        var attr = {};
        for (var i in attributes) {
            attr[attributes[i]] = this[attributes[i]];
        }
        if (!valid || this.validate_attributes(attr)) {
            if (attr && Object.keys(attr).length) {
                return this._db.post(API.UPDATE_ATTRIBUTE_MANY, {
                    table_name: this.tableName(),
                    attributes: attr,
                    ids: ids,
                }).then(res => {
                    if (res.code != 200) {
                        this._error_api = res.error;
                    }
                    return Promise.resolve(res);
                });
            } else {
                return Promise.resolve({ code: 200, attributes: this.getAttributes() });
            }
        }
        var rs = { code: 400 };
        if (valid) {
            rs['error'] = this._validate.getErrors(attributes);
        }
        return Promise.resolve(rs);
    }

    update_attributes(attributes, valid: boolean = true): any {
        var attr = {};
        for (var i in attributes) {
            attr[attributes[i]] = this[attributes[i]];
        }
        if (!valid || this.validate_attributes(attr)) {
            if (attr && Object.keys(attr).length) {
                return this._db.post(API.UPDATE_ATTRIBUTE, {
                    table_name: this.tableName(),
                    attributes: attr,
                    id: this.id,
                }).then(res => {
                    if (res.code == 200) {
                        this.setAttributes(res.attributes);
                    } else {
                        this._error_api = res.error;
                    }
                    return Promise.resolve(res);
                });
            } else {
                return Promise.resolve({ code: 200, attributes: this.getAttributes() });
            }
        }
        var rs = { code: 400 };
        if (valid) {
            rs['error'] = this._validate.getErrors(attributes);
        }
        return Promise.resolve(rs);
    }

    insert() {
        var attributes = this.getAttributesInsert();
        if (this['reFindOneData'] && attributes && Object.keys(attributes).length) {
            attributes['reFindOneData'] = true;
        }
        return this._db.put(API.CREATE, {
            table_name: this.tableName(),
            attributes: attributes
        }).then(res => {
            if (res.code == 200) {
                this.setAttributes(res.attributes);
                this._old_attributes = res.attributes;
            } else {
                this._error_api = res.error;
            }
            return Promise.resolve(res);
        });
    }
    update() {
        var attributes = this.getAttributesUpdate();
        // console.log('attributes', attributes);
        if (this['reFindOneData'] && attributes && Object.keys(attributes).length) {
            attributes['reFindOneData'] = true;
        }
        if (attributes && Object.keys(attributes).length) {
            return this._db.post(API.UPDATE, {
                table_name: this.tableName(),
                attributes: attributes,
                id: this.id,
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

    updateAll(condition: any, params: any = false) {
        var attributes = this.getAttributesUpdate();
        if (this['reFindOneData'] && attributes && Object.keys(attributes).length) {
            attributes['reFindOneData'] = true;
        }
        if (attributes && Object.keys(attributes).length) {
            return this._db.post(API.UPDATE_ATTRIBUTE_MANY, {
                table_name: this.tableName(),
                attributes: attributes,
                ids: condition.id,
                params: params,
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
    reload_fk(attr, condition) {
        var that = this;
        var rs = [{ id: '', text: '--Chọn--' }];
        if (this.rule()[attr] && this.rule()[attr]['fk']) {
            condition['table_name'] = this.rule()[attr]['fk']['table'];
            condition['limit'] = 1000;
            condition['offset'] = 0;
            if (this.rule()[attr]['fk']['order_by']) {
                condition['order_by'] = this.rule()[attr]['fk']['order_by'];
            }
            return this._db.get(API.READ, condition).then(r => {
                if (r && r['list']) {
                    for (var i in r['list']) {
                        rs.push({
                            id: r['list'][i]['id'],
                            text: r['list'][i]['name'],
                        });
                    }
                }
                that['fk_table_' + attr] = rs;
                that['fk_table_' + attr + '_obj'] = GlobalFunction.indexObj(rs, 'id', 'text');
                return Promise.resolve(rs);
            })
        } else {
            that['fk_table_' + attr] = rs;
            that['fk_table_' + attr + '_obj'] = GlobalFunction.indexObj(rs, 'id', 'text');
            return Promise.resolve([]);
        }
    }
    findOne(id: any, condition: any = {}) {
        // if (!this.id) {
        this.id = id;
        // }
        condition = Object.assign({
            table_name: this.tableName(),
            id: this.id
        }, condition);
        return this.id ? this._db.get(API.VIEW, condition).then(rs => {
            if (rs) {
                this.setAttributes(rs);
                this._old_attributes = rs;
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }) : Promise.resolve(false);
    }
    findAll(condition: any = {}, limit = 1000, offset = 0) {
        var that = this;
        condition.table_name = this.tableName();
        condition.limit = limit;
        if (condition.limit > 1000) {
            condition.limit = 1000;
        }
        condition.offset = offset;
        return this._db.get(API.READ, condition).then(rs => {
            var list = rs.list;
            for (var i in rs) {
                if (!GlobalFunction.contains(i, ['list', 'count'])) {
                    that[i] = rs[i];
                    that[i + '_obj'] = GlobalFunction.indexObj(rs[i], 'id', 'text');
                }
            }
            for (var i in list) {
                var item = {};
                item['old_attributes'] = list[i];
                for (var j in list[i]) {
                    item[j] = that.showAttribute(j, list[i][j], list[i]);
                }
                list[i] = item;
            }
            rs.list = list;
            return Promise.resolve(rs);
        });
    }

    exportExcel(condition) {
        condition.table_name = this.tableName();
        var link = this._db.link(API.EXCEL, condition);
        console.log('link', link);
        window.location.href = link;
    }
    
    importExcel(base64data) {
        return this._db.post(API.IMPORT, {data : base64data,table_name: this.tableName()}).then(res => {
            return Promise.resolve(res);
        });
    }

    findOneData(condition) {
        condition.table_name = this.tableName();
        return this._db.get(API.FINDONEDATA, condition).then(rs => {
            this._old_attributes = rs;
            this.setAttributes(rs);
            return Promise.resolve(rs);
        })
    }

    findAllData(condition) {
        condition.table_name = this.tableName();
        return this._db.get(API.FINDALLDATA, condition).then(rs => {
            return Promise.resolve(rs);
        })
    }

    re_fk_by_attribute(attribute, cond) {
        var condition = {
            table_name: this.tableName(),
            attribute: attribute,
            condition: cond,
        };
        return this._db.post(API.RE_FK_ATTRIBUTE, condition).then(rs => {
            this['fk_table_' + attribute] = [{'id':'',text:'-- Chọn --'}].concat(rs);
            return Promise.resolve(rs);
        })
    }

    isNewRecord() {
        return this.id && this.id !== undefined ? false : true;
    }

    isUpdateAll() {
        return this.ids && this.ids !== undefined ? true : false;
    }

    get_fk_mul() {
        var condition = { table_name: this.tableName() };
        return this._db.get(API.GETFK, condition).then(rs => {
            this.setAttributes(rs);
            return Promise.resolve(rs);
        })
    }

    isUpdateAttribute(attr) {
        var _old_attributes = this._old_attributes;
        if (this[attr] && this[attr] != _old_attributes[attr]) {
            return true;
        }
        return false;
    }
}