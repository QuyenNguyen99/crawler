import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceGlobal } from '../../../common/services/service.global';

@Injectable()
export class JobScheduleService extends ServiceGlobal {

    

    
    NAME: string;

    JOB_NAME:string;
    JOB_KEYWORD_SEARCH:string;
    JOB_FIELD:string;
    JOB_ALIAS:string;
    JOB_LINK_CRAWLER:string;
    
    JOB_CAREER_ID:number;
    
    JOB_SOURCE_TYPE: string;
    JOB_GROUP: string;
    JOB_BATCH_LIMIT: number;
    JOB_MULTI_LIMIT: number;
    JOB_PRIORITY: number;
    JOB_FILE_EXCEL: string;
    JOB_TEXTAREA: string;
    JOB_SQL: string;
    START_TIME: string;
    END_TIME: string;
    JOB_JOB_JOB_TYPE_MUL: any;
    fk_table_JOB_JOB_JOB_TYPE_MUL:any;
    fk_table_JOB_SOURCE_TYPE:any = [
        {id: 'excel',text: 'Excel'},
        {id: 'textarea',text: 'Textarea'},
        {id: 'sql',text: 'Sql'},
    ];
    fk_table_JOB_SOURCE_TYPE_obj: any = {'excel':'Excel','textarea':'Textarea','sql':'Sql'};

    PATTERN_SEC: string;
    fk_table_PATTERN_SEC:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '0',text: '0 giây'},
        {id: '1',text: '1 giây'},
        {id: '2',text: '2 giây'},
        {id: '3',text: '3 giây'},
        {id: '4',text: '4 giây'},
        {id: '5',text: '5 giây'},
        {id: '6',text: '6 giây'},
        {id: '7',text: '7 giây'},
        {id: '8',text: '8 giây'},
        {id: '9',text: '9 giây'},
        {id: '10',text: '10 giây'},
        {id: '11',text: '11 giây'},
        {id: '12',text: '12 giây'},
        {id: '13',text: '13 giây'},
        {id: '14',text: '14 giây'},
        {id: '15',text: '15 giây'},
        {id: '16',text: '16 giây'},
        {id: '17',text: '17 giây'},
        {id: '18',text: '18 giây'},
        {id: '19',text: '19 giây'},
        {id: '20',text: '20 giây'},
        {id: '21',text: '21 giây'},
        {id: '22',text: '22 giây'},
        {id: '23',text: '23 giây'},
        {id: '24',text: '24 giây'},
        {id: '25',text: '25 giây'},
        {id: '26',text: '26 giây'},
        {id: '27',text: '27 giây'},
        {id: '28',text: '28 giây'},
        {id: '29',text: '29 giây'},
        {id: '30',text: '30 giây'},
        {id: '31',text: '31 giây'},
        {id: '32',text: '32 giây'},
        {id: '33',text: '33 giây'},
        {id: '34',text: '34 giây'},
        {id: '35',text: '35 giây'},
        {id: '36',text: '36 giây'},
        {id: '37',text: '37 giây'},
        {id: '38',text: '38 giây'},
        {id: '39',text: '39 giây'},
        {id: '40',text: '40 giây'},
        {id: '41',text: '41 giây'},
        {id: '42',text: '42 giây'},
        {id: '43',text: '43 giây'},
        {id: '44',text: '44 giây'},
        {id: '45',text: '45 giây'},
        {id: '46',text: '46 giây'},
        {id: '47',text: '47 giây'},
        {id: '48',text: '48 giây'},
        {id: '49',text: '49 giây'},
        {id: '50',text: '50 giây'},
        {id: '51',text: '51 giây'},
        {id: '52',text: '52 giây'},
        {id: '53',text: '53 giây'},
        {id: '54',text: '54 giây'},
        {id: '55',text: '55 giây'},
        {id: '56',text: '56 giây'},
        {id: '57',text: '57 giây'},
        {id: '58',text: '58 giây'},
        {id: '59',text: '59 giây'}
    ];
    fk_table_PATTERN_SEC_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '0':'0 giây',
        '1':'1 giây',
        '2':'2 giây',
        '3':'3 giây',
        '4':'4 giây',
        '5':'5 giây',
        '6':'6 giây',
        '7':'7 giây',
        '8':'8 giây',
        '9':'9 giây',
        '10':'10 giây',
        '11':'11 giây',
        '12':'12 giây',
        '13':'13 giây',
        '14':'14 giây',
        '15':'15 giây',
        '16':'16 giây',
        '17':'17 giây',
        '18':'18 giây',
        '19':'19 giây',
        '20':'20 giây',
        '21':'21 giây',
        '22':'22 giây',
        '23':'23 giây',
        '24':'24 giây',
        '25':'25 giây',
        '26':'26 giây',
        '27':'27 giây',
        '28':'28 giây',
        '29':'29 giây',
        '30':'30 giây',
        '31':'31 giây',
        '32':'32 giây',
        '33':'33 giây',
        '34':'34 giây',
        '35':'35 giây',
        '36':'36 giây',
        '37':'37 giây',
        '38':'38 giây',
        '39':'39 giây',
        '40':'40 giây',
        '41':'41 giây',
        '42':'42 giây',
        '43':'43 giây',
        '44':'44 giây',
        '45':'45 giây',
        '46':'46 giây',
        '47':'47 giây',
        '48':'48 giây',
        '49':'49 giây',
        '50':'50 giây',
        '51':'51 giây',
        '52':'52 giây',
        '53':'53 giây',
        '54':'54 giây',
        '55':'55 giây',
        '56':'56 giây',
        '57':'57 giây',
        '58':'58 giây',
        '59':'59 giây',
    };
    PATTERN_MIN: string;
    fk_table_PATTERN_MIN:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '0',text: '0 phút'},
        {id: '1',text: '1 phút'},
        {id: '2',text: '2 phút'},
        {id: '3',text: '3 phút'},
        {id: '4',text: '4 phút'},
        {id: '5',text: '5 phút'},
        {id: '6',text: '6 phút'},
        {id: '7',text: '7 phút'},
        {id: '8',text: '8 phút'},
        {id: '9',text: '9 phút'},
        {id: '10',text: '10 phút'},
        {id: '11',text: '11 phút'},
        {id: '12',text: '12 phút'},
        {id: '13',text: '13 phút'},
        {id: '14',text: '14 phút'},
        {id: '15',text: '15 phút'},
        {id: '16',text: '16 phút'},
        {id: '17',text: '17 phút'},
        {id: '18',text: '18 phút'},
        {id: '19',text: '19 phút'},
        {id: '20',text: '20 phút'},
        {id: '21',text: '21 phút'},
        {id: '22',text: '22 phút'},
        {id: '23',text: '23 phút'},
        {id: '24',text: '24 phút'},
        {id: '25',text: '25 phút'},
        {id: '26',text: '26 phút'},
        {id: '27',text: '27 phút'},
        {id: '28',text: '28 phút'},
        {id: '29',text: '29 phút'},
        {id: '30',text: '30 phút'},
        {id: '31',text: '31 phút'},
        {id: '32',text: '32 phút'},
        {id: '33',text: '33 phút'},
        {id: '34',text: '34 phút'},
        {id: '35',text: '35 phút'},
        {id: '36',text: '36 phút'},
        {id: '37',text: '37 phút'},
        {id: '38',text: '38 phút'},
        {id: '39',text: '39 phút'},
        {id: '40',text: '40 phút'},
        {id: '41',text: '41 phút'},
        {id: '42',text: '42 phút'},
        {id: '43',text: '43 phút'},
        {id: '44',text: '44 phút'},
        {id: '45',text: '45 phút'},
        {id: '46',text: '46 phút'},
        {id: '47',text: '47 phút'},
        {id: '48',text: '48 phút'},
        {id: '49',text: '49 phút'},
        {id: '50',text: '50 phút'},
        {id: '51',text: '51 phút'},
        {id: '52',text: '52 phút'},
        {id: '53',text: '53 phút'},
        {id: '54',text: '54 phút'},
        {id: '55',text: '55 phút'},
        {id: '56',text: '56 phút'},
        {id: '57',text: '57 phút'},
        {id: '58',text: '58 phút'},
        {id: '59',text: '59 phút'}
    ];
    fk_table_PATTERN_MIN_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '0':'0 phút',
        '1':'1 phút',
        '2':'2 phút',
        '3':'3 phút',
        '4':'4 phút',
        '5':'5 phút',
        '6':'6 phút',
        '7':'7 phút',
        '8':'8 phút',
        '9':'9 phút',
        '10':'10 phút',
        '11':'11 phút',
        '12':'12 phút',
        '13':'13 phút',
        '14':'14 phút',
        '15':'15 phút',
        '16':'16 phút',
        '17':'17 phút',
        '18':'18 phút',
        '19':'19 phút',
        '20':'20 phút',
        '21':'21 phút',
        '22':'22 phút',
        '23':'23 phút',
        '24':'24 phút',
        '25':'25 phút',
        '26':'26 phút',
        '27':'27 phút',
        '28':'28 phút',
        '29':'29 phút',
        '30':'30 phút',
        '31':'31 phút',
        '32':'32 phút',
        '33':'33 phút',
        '34':'34 phút',
        '35':'35 phút',
        '36':'36 phút',
        '37':'37 phút',
        '38':'38 phút',
        '39':'39 phút',
        '40':'40 phút',
        '41':'41 phút',
        '42':'42 phút',
        '43':'43 phút',
        '44':'44 phút',
        '45':'45 phút',
        '46':'46 phút',
        '47':'47 phút',
        '48':'48 phút',
        '49':'49 phút',
        '50':'50 phút',
        '51':'51 phút',
        '52':'52 phút',
        '53':'53 phút',
        '54':'54 phút',
        '55':'55 phút',
        '56':'56 phút',
        '57':'57 phút',
        '58':'58 phút',
        '59':'59 phút',
    };
    PATTERN_HOUR: string;
    fk_table_PATTERN_HOUR:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '0',text: '0 giờ'},
        {id: '1',text: '1 giờ'},
        {id: '2',text: '2 giờ'},
        {id: '3',text: '3 giờ'},
        {id: '4',text: '4 giờ'},
        {id: '5',text: '5 giờ'},
        {id: '6',text: '6 giờ'},
        {id: '7',text: '7 giờ'},
        {id: '8',text: '8 giờ'},
        {id: '9',text: '9 giờ'},
        {id: '10',text: '10 giờ'},
        {id: '11',text: '11 giờ'},
        {id: '12',text: '12 giờ'},
        {id: '13',text: '13 giờ'},
        {id: '14',text: '14 giờ'},
        {id: '15',text: '15 giờ'},
        {id: '16',text: '16 giờ'},
        {id: '17',text: '17 giờ'},
        {id: '18',text: '18 giờ'},
        {id: '19',text: '19 giờ'},
        {id: '20',text: '20 giờ'},
        {id: '21',text: '21 giờ'},
        {id: '22',text: '22 giờ'},
        {id: '23',text: '23 giờ'},
    ];
    fk_table_PATTERN_HOUR_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '0':'0 giờ',
        '1':'1 giờ',
        '2':'2 giờ',
        '3':'3 giờ',
        '4':'4 giờ',
        '5':'5 giờ',
        '6':'6 giờ',
        '7':'7 giờ',
        '8':'8 giờ',
        '9':'9 giờ',
        '10':'10 giờ',
        '11':'11 giờ',
        '12':'12 giờ',
        '13':'13 giờ',
        '14':'14 giờ',
        '15':'15 giờ',
        '16':'16 giờ',
        '17':'17 giờ',
        '18':'18 giờ',
        '19':'19 giờ',
        '20':'20 giờ',
        '21':'21 giờ',
        '22':'22 giờ',
        '23':'23 giờ',
    };
    PATTERN_DAY: string;
    fk_table_PATTERN_DAY:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '1',text: 'Mùng 1'},
        {id: '2',text: 'Mùng 2'},
        {id: '3',text: 'Mùng 3'},
        {id: '4',text: 'Mùng 4'},
        {id: '5',text: 'Mùng 5'},
        {id: '6',text: 'Mùng 6'},
        {id: '7',text: 'Mùng 7'},
        {id: '8',text: 'Mùng 8'},
        {id: '9',text: 'Mùng 9'},
        {id: '10',text: 'Mùng 10'},
        {id: '11',text: 'Ngày 11'},
        {id: '12',text: 'Ngày 12'},
        {id: '13',text: 'Ngày 13'},
        {id: '14',text: 'Ngày 14'},
        {id: '15',text: 'Ngày 15'},
        {id: '16',text: 'Ngày 16'},
        {id: '17',text: 'Ngày 17'},
        {id: '18',text: 'Ngày 18'},
        {id: '19',text: 'Ngày 19'},
        {id: '20',text: 'Ngày 20'},
        {id: '21',text: 'Ngày 21'},
        {id: '22',text: 'Ngày 22'},
        {id: '23',text: 'Ngày 23'},
        {id: '24',text: 'Ngày 24'},
        {id: '25',text: 'Ngày 25'},
        {id: '26',text: 'Ngày 26'},
        {id: '27',text: 'Ngày 27'},
        {id: '28',text: 'Ngày 28'},
        {id: '29',text: 'Ngày 29'},
        {id: '30',text: 'Ngày 30'},
        {id: '31',text: 'Ngày 31'},
    ];
    fk_table_PATTERN_DAY_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '1':'Mùng 1',
        '2':'Mùng 2',
        '3':'Mùng 3',
        '4':'Mùng 4',
        '5':'Mùng 5',
        '6':'Mùng 6',
        '7':'Mùng 7',
        '8':'Mùng 8',
        '9':'Mùng 9',
        '10':'Mùng 10',
        '11':'Ngày 11',
        '12':'Ngày 12',
        '13':'Ngày 13',
        '14':'Ngày 14',
        '15':'Ngày 15',
        '16':'Ngày 16',
        '17':'Ngày 17',
        '18':'Ngày 18',
        '19':'Ngày 19',
        '20':'Ngày 20',
        '21':'Ngày 21',
        '22':'Ngày 22',
        '23':'Ngày 23',
        '24':'Ngày 24',
        '25':'Ngày 25',
        '26':'Ngày 26',
        '27':'Ngày 27',
        '28':'Ngày 28',
        '29':'Ngày 29',
        '30':'Ngày 30',
        '31':'Ngày 31',
    };
    PATTERN_MON: string;
    fk_table_PATTERN_MON:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '1',text: 'Tháng 1'},
        {id: '2',text: 'Tháng 2'},
        {id: '3',text: 'Tháng 3'},
        {id: '4',text: 'Tháng 4'},
        {id: '5',text: 'Tháng 5'},
        {id: '6',text: 'Tháng 6'},
        {id: '7',text: 'Tháng 7'},
        {id: '8',text: 'Tháng 8'},
        {id: '9',text: 'Tháng 9'},
        {id: '10',text: 'Tháng 10'},
        {id: '11',text: 'Tháng 11'},
        {id: '12',text: 'Tháng 12'},
    ];
    fk_table_PATTERN_MON_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '1':'Tháng 1',
        '2':'Tháng 2',
        '3':'Tháng 3',
        '4':'Tháng 4',
        '5':'Tháng 5',
        '6':'Tháng 6',
        '7':'Tháng 7',
        '8':'Tháng 8',
        '9':'Tháng 9',
        '10':'Tháng 10',
        '11':'Tháng 11',
        '12':'Tháng 12',
    };
    PATTERN_WEEK: string;
    fk_table_PATTERN_WEEK:any = [
        {id: '',text: '-- Chọn --'},
        {id: '*',text: '*'},
        {id: '1',text: 'Thứ 2'},
        {id: '2',text: 'Thứ 3'},
        {id: '3',text: 'Thứ 4'},
        {id: '4',text: 'Thứ 5'},
        {id: '5',text: 'Thứ 6'},
        {id: '6',text: 'Thứ 7'},
        {id: '7',text: 'Chủ nhật'},
    ];
    fk_table_PATTERN_WEEK_obj: any = {
        '' : '-- Chọn --',
        '*': '*',
        '1':'Thứ 2',
        '2':'Thứ 3',
        '3':'Thứ 4',
        '4':'Thứ 5',
        '5':'Thứ 6',
        '6':'Thứ 7',
        '7':'Chủ nhật'
    };
    IS_DELETE: number;
    dbname() {
        return 'crawlersystem';
    }
    tableName() { return 'job_schedule'; }

    attributeLabels() {
        return Object.assign(super.attributeLabels(), {
            "id": "Id",
            "NAME": "Name",
            "JOB_NAME": "Job Name",
            "JOB_SOURCE_TYPE": "Source Type",
            "JOB_GROUP": "Group",
            "JOB_BATCH_LIMIT": "Batch Limit",
            "JOB_MULTI_LIMIT": "Multi Limit",
            "JOB_PRIORITY": "Priority",
            "JOB_SCHEDULE_JOB_TYPE_MUL": "JOB JOB TYPE MUL",
            "JOB_SQL": "Sql",
            "JOB_FILE_EXCEL": "Excel",
            "JOB_TEXTAREA": "Textarea",
            "JOB_LINK_CRAWLER": "Link Crawler",
            "fk_table_JOB_SCHEDULE_JOB_TYPE_MUL": "fk_table_JOB_SCHEDULE_JOB_TYPE_MUL",
            "JOB_FIELD": "Field",
            "JOB_ALIAS": "Alias",
            "PATTERN_SEC": "Pattern sec",
            "PATTERN_MIN": "Pattern min",
            "PATTERN_HOUR": "Pattern hour",
            "PATTERN_DAY": "Pattern day",
            "PATTERN_MON": "Pattern mon",
            "PATTERN_WEEK": "Pattern week",
            "START_TIME": "Start time",
            "END_TIMAE": "End time",
            "IS_DELETE": "Is Delete"
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
            "JOB_NAME": {
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
            "JOB_FIELD": {
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "JOB_ALIAS": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "JOB_LINK_CRAWLER": {
                "default": "NULL",
                "type": "varchar",
                "require": {
                    "size": 255
                },
                "size": 255
            },
            "JOB_CAREER_ID": {
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
            "JOB_IS_DELETE": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            },
            "JOB_SOURCE_TYPE": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 20
                },
                "size": 20
            },
            "JOB_GROUP": {
                "type": "varchar",
                "require": {
                    "empty": true,
                    "size": 255
                },
                "size": 255
            },
            "JOB_BATCH_LIMIT": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11
            },
            "JOB_MULTI_LIMIT": {
                "type": "int",
                "require": {
                    "empty": true
                },
                "size": 11
            },
            "JOB_SCHEDULE_JOB_TYPE_MUL": {
                "type": "array",
                "size": 255,
                "mul_id": "JOB_SCHEDULE_ID",
                "mul_id_fk": "JOB_TYPE_ID",
                "fk":{
                    "table":"job_type",
                    "ref_id":"ID"
                },
            },
            "fk_table_JOB_SCHEDULE_JOB_TYPE_MUL": {
                "type": "any"
            },
            "JOB_PRIORITY": {
                "default": "1",
                "type": "int",
                "size": 11
            },
            "JOB_FILE_EXCEL": {
                "type": "varchar",
                "display": "this.JOB_SOURCE_TYPE == 'excel'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'excel' && (!this.FILE_EXCEL || this.FILE_EXCEL === undefined) ? 'Excel không được để trống' : '';
                    },
                }
            },
            "JOB_TEXTAREA": {
                "type": "varchar",
                "display": "this.JOB_SOURCE_TYPE == 'textarea'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'textarea' && (!this.TEXTAREA || this.TEXTAREA === undefined) ? 'Textarea không được để trống' : '';
                    },
                }
            },
            "JOB_SQL": {
                "type": "varchar",
                "display": "this.JOB_SOURCE_TYPE == 'sql'",
                "require": {
                    "func": function() {
                        return this.SOURCE_TYPE == 'sql' && (!this.SQL || this.SQL === undefined) ? 'Sql không được để trống' : '';
                    },
                }
            },
            "PATTERN_SEC": {
                "type": "varchar",
                "size": 2,
                "fk"    : {
                    "table" : "PATTERN_SEC",
                    "ref_id":"ID"
                }
            },
            "PATTERN_MIN": {
                "type": "varchar",
                "size": 2,
                "fk"    : {
                    "table" : "PATTERN_MIN",
                    "ref_id":"ID"
                }
            },
            "PATTERN_HOUR": {
                "type": "varchar",
                "size": 2,
                "fk"    : {
                    "table" : "PATTERN_HOUR",
                    "ref_id":"ID"
                }
            },
            "PATTERN_DAY": {
                "type": "varchar",
                "size": 2,
                "fk"    : {
                    "table" : "PATTERN_DAY",
                    "ref_id":"ID"
                }
            },
            "PATTERN_MON": {
                "type": "varchar",
                "size": 2,
                "fk"    : {
                    "table" : "PATTERN_MON",
                    "ref_id":"ID"
                }
            },
            "PATTERN_WEEK": {
                "type": "varchar",
                "size": 1,
                "fk"    : {
                    "table" : "PATTERN_WEEK",
                    "ref_id":"ID"
                }
            },
            "START_TIME": {
                "type": "varchar",
                "size": 20
            },
            "END_TIME": {
                "type": "varchar",
                "size": 20
            },
            "IS_DELETE": {
                "default": "0",
                "type": "tinyint",
                "size": 1
            }
        });
    }
}