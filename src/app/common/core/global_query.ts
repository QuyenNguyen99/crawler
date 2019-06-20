import { Global_DB } from './global_db';
import { API } from '../../config/api';

export class GlobalQuery {
    _where: any;
    _limit: number;
    _offset: number;
    _group: any;
    _table: string;
    _join: any;
    _params: any;
    _object: any;

    constructor(obj: any = null, private db: Global_DB) {
        this._object = obj;
    }

    reset() {
        this._where = undefined;
        this._limit = undefined;
        this._offset = undefined;
        this._group = undefined;
        this._table = undefined;
        this._join = undefined;
        this._params = undefined;
        this._object = undefined;
    }

    table(table_name: string): GlobalQuery {
        this._table = table_name;
        return this;
    }

    where(condition: any, params: any = {}): GlobalQuery {
        this._where = condition;
        this._params = params;
        return this;
    }
    limit(value: number): GlobalQuery {
        this._limit = value;
        return this;
    }
    offset(value: number): GlobalQuery {
        this._offset = value;
        return this;
    }
    group(group: any): GlobalQuery {
        this._group = group;
        return this;
    }
    join(condition: any): GlobalQuery {
        this._join = condition;
        return this;
    }
    getDataOptions() {
        let rs = {};
        if(this._where) {rs['where'] = this._where;}
        if(this._limit) {rs['limit'] = this._limit;}
        if(this._params) {rs['params'] = this._params;}
        if(this._offset) {rs['offset'] = this._offset;}
        if(this._group) {rs['group'] = this._group;}
        if(this._join) {rs['join'] = this._join;} 
        return rs;
    }
    all(as_object: boolean = false) {
        let rs = Object.assign({all: true,},this.getDataOptions());
        return this.db.post(API.READ,rs);
    }
    one(as_object: boolean = true) {
        let rs = Object.assign({all: false,},this.getDataOptions());
        return this.db.post(API.READ,rs);
    }
}