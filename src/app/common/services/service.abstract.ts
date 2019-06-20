import {GlobalQuery} from '../core/global_query';

export abstract class AbstractService {
    abstract tableName(): string;
    abstract rule(): any;
    abstract attributeLabels(): any;
    abstract validate(): boolean;
    abstract getAttributes(): any;

    abstract delete(validate: boolean): any;
    abstract deleteAll(condition: any, params: any): any;

    abstract save(valid: boolean): void;

    abstract insert(): any;
    abstract update(): any;
    abstract updateAll(attributes: any, where: any, params: any): any;

    abstract find(): GlobalQuery;
    abstract findOne(condition: any): any;
    abstract findAll(condition: any): any;

    abstract hasAttribute(attr: string): boolean;
    abstract setAttribute(attr, string, value: any): boolean;
    abstract setAttributes(res: any): void;
}