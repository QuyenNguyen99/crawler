import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobScheduleJobTypeMulService extends ServiceGlobal {

    

    
    job_schedule_id: number;
    job_type_id: number;
    status: string;
    fk_table_job_type_id: any;
    fk_table_job_schedule_id: any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_schedule_job_type_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "job_schedule_id": "Job Schedule Id",
            "job_type_id": "Job Type Id",
            "status": "Status",
            "fk_table_job_type_id": "fk_table_job_type_id",
            "fk_table_job_schedule_id": "fk_table_job_schedule_id"
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
            "job_schedule_id": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "job_schedule",
                    "ref_id": "id"
                }
            },
            "job_type_id": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "job_type",
                    "ref_id": "id"
                }
            },
            "status": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "size": 20
            },
            "fk_table_job_type_id": {
                "type": "any"
            },
            "fk_table_job_schedule_id": {
                "type": "any"
            }
        });
    }
}