import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobDetailService extends ServiceGlobal {

    

    
    JOB_JOB_TYPE_MUL_ID: number;
    OBJECT_ID: string;
    STATUS: number;
    FINISHED_TIME: number;
    fk_table_job_job_type_mul_id: any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_detail'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "JOB_JOB_TYPE_MUL_ID": "Job Job Type Mul Id",
            "OBJECT_ID": "Object Id",
            "STATUS": "Status",
            "FINISHED_TIME": "Finished Time",
            "fk_table_job_job_type_mul_id": "fk_table_job_job_type_mul_id"
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
            "JOB_JOB_TYPE_MUL_ID": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "job_job_type_mul",
                    "ref_id": "id"
                }
            },
            "OBJECT_ID": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "size": 20
            },
            "STATUS": {
                "default": "0",
                "type": "tinyint",
                "require": {
                    "empty": true
                },
                "size": 1
            },
            "FINISHED_TIME": {
                "type": "int",
                "size": 11
            },
            "fk_table_job_job_type_mul_id": {
                "type": "any"
            }
        });
    }
}