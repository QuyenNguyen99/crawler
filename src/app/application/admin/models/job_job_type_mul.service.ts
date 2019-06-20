import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobJobTypeMulService extends ServiceGlobal {

    

    
    job_id: number;
    job_type_id: number;
    status: string;
    started_time: number;
    finished_time: number;
    fk_table_job_type_id: any;
    fk_table_job_id: any;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_job_type_mul'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "job_id": "Job Id",
            "job_type_id": "Job Type Id",
            "status": "Status",
            "started_time": "Started Time",
            "finished_time": "Finished Time",
            "fk_table_job_type_id": "fk_table_job_type_id",
            "fk_table_job_id": "fk_table_job_id"
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
            "job_id": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11,
                "fk": {
                    "table": "job",
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
            "started_time": {
                "type": "int",
                "size": 11
            },
            "finished_time": {
                "type": "int",
                "size": 11
            },
            "fk_table_job_type_id": {
                "type": "any"
            },
            "fk_table_job_id": {
                "type": "any"
            }
        });
    }
}