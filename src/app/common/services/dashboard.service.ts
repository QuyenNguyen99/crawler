import { ServiceGlobal } from './service.global';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { API } from '../../config/api';
import { GlobalFunction } from '../core/global_function';


@Injectable()
export class DashboardService extends ServiceGlobal {
    data: any;
    fk_table_data: any;
    dbname() {
        return 'crawlersystem';
    }
    loading: any = false;
    tableName() { return 'dashboard'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "data": "data",
            "fk_table_data": "fk_table_data"
        });
    }

    async getTotalResult() {
            return this._db.get(API.JOB_TOTAL_RESULT);
    }

    async getTotalDailyResult() {
            return this._db.get(API.JOB_DAILY_RESULT);
    }

    async getTotalMonthlyResult() {
            return this._db.get(API.JOB_MONTHLY_RESULT);
    }

    async getTotalYearlyResult() {
            return this._db.get(API.JOB_YEARLY_RESULT);
    }

    async getErrorYearlyResult(id) {
        return this._db.get(API.JOB_ERROR_YEARLY,{
                typeid:id
        });
        }

        async getErrorMonthlyResult(id) {
                return this._db.get(API.JOB_ERROR_MONTHLY,{
                        typeid:id
                });
        }

        async getErrorDailyResult(id) {
            return this._db.get(API.JOB_ERROR_DAILY,{
                    typeid:id
            });
            }

            async getErrorTotallyResult(id) {
                return this._db.get(API.JOB_ERROR_TOTALLY,{
                        typeid:id
                });
        }

    async getTotalFromDateToDateResult(st,en) {
            return this._db.get(API.JOB_FROM_DATE_TO_DATE_RESULT,{
                    start:st,
                    end:en
            });
    }

    async getHeatchartdata() {
        return this._db.get(API.JOB_HEAT_CHART_DATA);
}

async getTotalExactlyDate(dat) {
    return this._db.get(API.JOB_EXACTLY_DATE,{
        data:dat
});
}

async getOptionKey() {
        return this._db.get(API.OPTION_KEY);
}

async updateOptionKey(optionkey) {
        return this._db.get(API.UPDATE_OPTION_KEY,{
                optionkey:optionkey
        });
}


    
}