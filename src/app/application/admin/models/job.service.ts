import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';
import { API } from 'app/config/api';
import { GlobalFunction } from 'app/common/core/global_function';

@Injectable()
export class JobService extends ServiceGlobal {

    

    
    NAME:string;
    KEYWORD_SEARCH:string;
    LIST_FACEBOOK_GROUP_ID:string;
    FIELD:string;
    ALIAS:string;
    LINK_CRAWLER:string;
    
    CAREER_ID:number;
    IS_DELETE:number;
    
    SOURCE_TYPE: string;
    GROUP: string;
    BATCH_LIMIT: number;
    MULTI_LIMIT: number;
    START_TIME: number;
    FINISH_TIME: number;
    STATUS: string;
    PRIORITY: number;
    FILE_EXCEL: string;
    TEXTAREA: string;
    SQL: string;
    JOB_JOB_TYPE_MUL: any;
    fk_table_JOB_JOB_TYPE_MUL:any;
    fk_table_SOURCE_TYPE:any = [
        {id: 'excel',text: 'Excel'},
        {id: 'textarea',text: 'Textarea'},
        {id: 'sql',text: 'Sql'},
    ];
    fk_table_SOURCE_TYPE_obj: any = {'excel':'Excel','textarea':'Textarea','sql':'Sql'};
    fk_table_STATUS:any = [
        {id: 'initialing',text: 'Khởi tạo'},
        {id: 'new',text: 'Mới'},
        {id: 'pending',text: 'Đã khởi tạo và chờ chạy'},
        {id: 'running',text: 'Đang chạy'},
        {id: 'paused',text: 'Pause'},
        {id: 'waiting',text: 'Đang chờ'},
        {id: 'canceled',text: 'Đã hủy'},
        {id: 'finished',text: 'Hoàn thành'}
    ];
    fk_table_STATUS_obj: any = {
        'initialing':'Khởi tạo',
        'new':'Mới',
        'pending':'Đã khởi tạo và chờ chạy',
        'running':'Đang chạy',
        'paused':"Đang dừng",
        'waiting':'Đang chờ',
        'canceled':'Đã hủy',
        'finished':'Hoàn thành'
    };
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "NAME": "Name",
            "SOURCE_TYPE": "Source Type",
            "GROUP": "Group",
            "BATCH_LIMIT": "Batch Limit",
            "MULTI_LIMIT": "Multi Limit",
            "START_TIME": "Started Time",
            "FINISH_TIME": "Finished Time",
            "STATUS": "Status",
            "PRIORITY": "Priority",
            "IS_DELETE": "Is Delete",
            "CAREER_ID": "Career Id",
            "KEYWORD_SEARCH": "Keyword Search",
            "LIST_FACEBOOK_GROUP_ID": "List Facebook Group Id",
            "FIELD": "Field",
            "ALIAS": "Alias",
            "LINK_CRAWLER": "Link Crawler",
            "JOB_JOB_TYPE_MUL": "Job Type",
            "fk_table_JOB_JOB_TYPE_MUL": "fk_table_JOB_JOB_TYPE_MUL",
            "FILE_EXCEL": "File excel",
            "TEXTAREA": "Textarea",
            "SQL": "Sql"
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
            "NAME": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "keyword_search": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 1000
                },
                "size": 1000
            },
            "FIELD": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "ALIAS": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "LINK_CRAWLER": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "CAREER_ID": {
                "default": "NULL",
                "type": "bigint",
                "require": {
                    "size": 20
                },
                "size": 20,
                "fk": {
                    "table": "company_block",
                    "ref_id": "id"
                }
            },
            "LIST_FACEBOOK_GROUP_ID": {
                "default": "NULL",
                "token_table_name": "facebook_group",
                "token_field": "list_keyword",
                "type": "longtext",
                "require": {
                    "size": 4294967295
                }
            },
            "IS_DELETE": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "CREATED_BY": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "MODIFIED_BY": {
                "type": "int",
                "size": 11,
                "fk": {
                    "table": "user",
                    "ref_id": "id"
                }
            },
            "SOURCE_TYPE": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "fk":{
                    "table":"SOURCE_TYPE",
                    "ref_id":"ID"
                },
                "size": 20
            },
            "GROUP": {
                "type": "varchar",
                "size": 255
            },
            "BATCH_LIMIT": {
                "type": "int",
                "require": {
                    "empty": true,
                    "regex": {
                        "value"   : '^[0-9]+$',
                        "message" : 'Không phải là 1 số',
                    },
                    "maxnumber": 10000,
                },
                "size": 11
            },
            "MULTI_LIMIT": {
                "type": "int",
                "require": {
                    "empty": true,
                    "regex": {
                        "value"   : '^[0-9]+$',
                        "message" : 'Không phải là 1 số',
                    },
                    "maxnumber": 1000,
                },
                "size": 11
            },
            "START_TIME": {
                "type": "int",
                "size": 11
            },
            "FINISH_TIME": {
                "type": "int",
                "size": 11
            },
            "JOB_JOB_TYPE_MUL": {
                "type": "array",
                "size": 255,
                "require": {
                    "empty": true
                },
                "mul_id": "JOB_ID",
                "mul_id_fk": "JOB_TYPE_ID",
                "fk":{
                    "table":"job_type",
                    "ref_id":"ID"
                },
            },
            "fk_table_JOB_JOB_TYPE_MUL": {
                "type": "any"
            },
            "STATUS": {
                "type": "varchar",
                "require": {
                    "size": 20
                },
                "size": 20
            },
            "PRIORITY": {
                "default": "1",
                "type": "int",
                "size": 11
            },
            "FILE_EXCEL": {
                "type": "varchar",
                "display": "this.SOURCE_TYPE == 'excel'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'excel' && (!this.FILE_EXCEL || this.FILE_EXCEL === undefined) ? 'Excel không được để trống' : '';
                    },
                }
            },
            "TEXTAREA": {
                "type": "varchar",
                "display": "this.SOURCE_TYPE == 'textarea'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'textarea' && (!this.TEXTAREA || this.TEXTAREA === undefined || !this.TEXTAREA.trim()) ? 'Textarea không được để trống' : '';
                    },
                }
            },
            "SQL": {
                "type": "varchar",
                "display": "this.SOURCE_TYPE == 'sql'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'sql' && (!this.SQL || this.SQL === undefined) ? 'Sql không được để trống' : '';
                    },
                }
            },
        });
    }

    async waitingApi(id) {
        if (!id && this.id) {
            id = this.id;
        }
        if (id) {
            return this._db.get(API.JOB_WAITING,{
                table_name: this.tableName(),
                id: id,
            });
        } else {
            return Promise.resolve();
        }
    }

    async initialApi(id) {
        if (!id && this.id) {
            id = this.id;
        }
        if (id) {
            return this._db.get(API.JOB_INITIAL,{
                table_name: this.tableName(),
                id: id,
            });
        } else {
            return Promise.resolve();
        }
    }

    async pauseApi(id) {
        if (!id && this.id) {
            id = this.id;
        }
        if (id) {
            return this._db.get(API.JOB_PAUSED,{
                table_name: this.tableName(),
                id: id,
            });
        } else {
            return Promise.resolve();
        }
    }

    async cancelApi(id) {
        if (!id && this.id) {
            id = this.id;
        }
        if (id) {
            return this._db.get(API.JOB_CANCELED,{
                table_name: this.tableName(),
                id: id,
            });
        } else {
            return Promise.resolve();
        }
    }

    
    async get(JOB_ID) {
        if (JOB_ID) {
            return this._db.get(API.JOB_RESULT,{
                id: JOB_ID
            });
        } else {
            return Promise.resolve();
        }
    }

    async update_list_sort(list_update) {
        return this._db.post(API.JOB_UPDATE_SORT, {
            table: this.tableName(),
            list_update: list_update
        });
    }

    async findOne(id: any, condition: any = {}) {
        var r = await super.findOne(id,condition);
        if(this.TEXTAREA) {
            this.TEXTAREA = this.TEXTAREA.replace(/\\n/gi,"\n");
        }
        if(this.SQL) {
            this.SQL = this.SQL.replace(/\\n/gi,"\n");
        }

        return r;
    }
}
