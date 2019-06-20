import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobScheduleDetailService extends ServiceGlobal {

    

    
    job_schedule_job_type_mul_id: number;
    object_id: string;
    status: number;
    fk_table_job_schedule_job_type_mul_id: any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_schedule_detail'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "job_schedule_job_type_mul_id": "Job Schedule Job Type Mul Id",
            "object_id": "Object Id",
            "status": "Status",
            "fk_table_job_schedule_job_type_mul_id": "fk_table_job_schedule_job_type_mul_id"
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
            "job_schedule_job_type_mul_id": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "job_schedule_job_type_mul",
                    "ref_id": "id"
                }
            },
            "object_id": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "size": 20
            },
            "status": {
                "default": "0",
                "type": "tinyint",
                "require": {
                    "empty": true
                },
                "size": 1
            },
            "fk_table_job_schedule_job_type_mul_id": {
                "type": "any"
            }
        });
    }
}