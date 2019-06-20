import { GlobalFunction } from './global_function';
export class GlobalValidateModel {
    model: any;
    attribute: string;
    rule: any;
    attributeLabels: any;
    submit: boolean = false;
    _validate_on_change :boolean = false;

    constructor(_model: any, _attribute: string = '') {
        this.model = _model;
        this.rule = this.model.rule();
        this.attributeLabels = this.model.attributeLabels();
        this.attribute = _attribute;
    }

    checkShow(attribute: string = '') {
        if (!attribute) {
            attribute = this.attribute;
        }
        return !(!this.rule[attribute] || !this.rule[attribute].display || this.evalCondition(this.rule[attribute].display));
    }

    validateAttribute(attribute: string = '', type: string, options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        if (typeof (options) != 'object' || !options.require_by || this.evalCondition(options.require_by)) {
            if(GlobalFunction.contains(type,['empty','date','datePast','email','phone','password', 'integer'])) {
                options = this.set_options_disable_auto_require(options);
            }
            var func = 'validate' + GlobalFunction.capitalizeFirstLetter(type);
            return this[func](attribute, options);
        }
        return '';
    }

    set_options_disable_auto_require(options) {
        if(typeof(options) == 'string') {
            options = {message: options};
        }
        if(typeof(options) == 'boolean') {
            options = {};
        }
        options['disable_auto_require'] = true;
        return options;
    }

    evalCondition(str: string) {
        return eval(str.replace(/this\./gi, 'this.model.'));
    }

    validScenario(on: string, scenario:any) {
        if (typeof(scenario) == 'string') {
            return on == scenario;
        }
        return (typeof(scenario) == 'object') &&  ( scenario.filter(e => {return e == on;}).length > 0 );
    }
    getErrorMsg(attribute: string = '', msg: string, options: any) {
        var that = this;
        if (!attribute) {
            attribute = this.attribute;
        }
        switch (typeof (options)) {
            case 'string':
                msg = options;
                break;
            case 'object':
                if (!options.on ||
                    (typeof (options.on) == 'object' && options.on.filter(e => { 
                        return that.validScenario(e, this.model.scenario) }).length)
                    ||
                    (typeof (options.on) == 'string' && options.on == this.model.scenario)) {
                    msg = options.message ? options.message : msg;
                } else {
                    msg = '';
                }
                break;
        }
        if(msg === undefined) {
            msg = '';
        }
        if(typeof(msg) == 'number') {
            msg = '' + msg;
        }
        var m: any = msg.replace('{attribute}', this.attributeLabels[attribute]);
        return m;
    }

    error_value(attribute: string = '') {
        if (!attribute) {
            attribute = this.attribute;
        }
        let require = this.rule[attribute] ? this.rule[attribute].require : false;
        let rs = '';
        if (require) {
            if (typeof (require) == 'object') {
                for (let k in require) {
                    let v = require[k];
                    rs = this.validateAttribute(attribute, k, v);
                    if (rs) {
                        break;
                    }
                }
            } else {
                rs = this.validateAttribute(attribute, 'empty', require);
            }
        }
        return rs;
    }

    getErrors(attributes: any = false) {
        let rs = [];
        var rs_attributes = !attributes || attributes === undefined ? this.rule : attributes;
        for (let i in rs_attributes) {
            this.model._attr_submit[i] = true;
            let msg = this.error_value(i);
            if (msg) {
                rs.push(msg);
            }
        }
        return rs;
    }

    validate(attributes: any = false) {
        let rs = true;
        var rs_attributes = !attributes || attributes === undefined ? this.rule : attributes;
        for (let i in rs_attributes) {
            this.model._attr_submit[i] = true;
            if (this.error_value(i)) {
                this.model.attr_validate[i] = true;
                rs = false;
            }
        }
        return rs;
    }

    validateEmpty(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (vl !== undefined) { 
            if(GlobalFunction.is_array(vl)) {
                vl = vl.length ? '1' : '';
            } else if(typeof(vl) == 'object' && vl != null) {
                vl = Object.keys(vl).length ? '1' : '';
            } else {
                vl += ''; 
            }
        }
        if ((vl === undefined || !vl || !vl.trim() || vl == 'null') && vl !== '0' && vl !== 0) { msg = this.getErrorMsg(attribute, '{attribute} không được để trống', options); }
        return msg;
    }

    validateEmail(attribute: string = '', options: any) {
        // console.log('options: ', options);
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateEmail(vl)) { msg = this.getErrorMsg(attribute, '{attribute} không đúng định dạng', options); }
        return msg;
    }

    validatePhone(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validatePhone(vl)) { msg = this.getErrorMsg(attribute, '{attribute} không đúng định dạng', options); }
        return msg;
    }

    validateSame(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        let attribute_2 = typeof (options) == 'object' ? options.attribute : options;
        if (vl && vl != this.model[attribute_2]) {
            let msg_base = '{attribute} không trùng với ' + this.attributeLabels[attribute_2].toLowerCase();
            msg = this.getErrorMsg(attribute, msg_base, options);
        }
        return msg;
    }

    validatePassword(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateMin(vl, 6)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải >= 6 kí tự', options);
        }
        if (!msg && !GlobalFunction.validateRegex(vl, '(?=.*[a-zA-Z])(?=.*[0-9])')) {
            msg = this.getErrorMsg(attribute, '{attribute} phải bao gồm chữ và số', options);
        }
        return msg;
    }

    validateSize(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        let size = 0;
        if (typeof (options) == 'object') {
            size = options.value;
        } else if (options === true) {
            size = this.model.rule()[attribute].size;
        } else {
            size = options;
        }
        if (!GlobalFunction.validateSize(vl, size)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải <= {maxsize} kí tự', options).replace('{maxsize}', size);
        }
        return msg;
    }

    validateDate(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        var msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateDate(vl)) {
            msg = this.getErrorMsg(attribute, '{attribute} không đúng định dạng', options);
        }
        return msg;
    }

    validateDatePast(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateDatePast(vl)) { msg = this.getErrorMsg(attribute, '{attribute} phải <= ngày hiện tại', options); }
        return msg;
    }

    validatePositiveNumber(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        console.log('validatePositiveNumber',vl, GlobalFunction.validatePositiveNumber(vl));
        if (!GlobalFunction.validatePositiveNumber(vl)) { msg = this.getErrorMsg(attribute, '{attribute} phải >= 0', options); }
        return msg;
    }

    validateMin(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        var min = typeof (options) == 'object' ? options.value : options;
        if (!GlobalFunction.validateMin(vl, min)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải >= {min} kí tự', options).replace('{min}', min);
        }
        return msg;
    }

    validateMaxnumber(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        var max = typeof (options) == 'object' ? options.value : options;
        if (!GlobalFunction.validateMaxnumber(vl, max)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải <= {max}', options).replace('{max}', max);
        }
        return msg;
    }

    validateMinnumber(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        var max = typeof (options) == 'object' ? options.value : options;
        if (!GlobalFunction.validateMinnumber(vl, max)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải >= {max}', options).replace('{max}', max);
        }
        return msg;
    }

    validateRegex(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        var regex = typeof (options) == 'object' ? options.value : options;
        if (!GlobalFunction.validateRegex(vl, regex)) {
            msg = this.getErrorMsg(attribute, '{attribute} không đúng định dạng {regex}', options).replace('{regex}', regex);
        }
        return msg;
    }
    validateFunc(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        
        let vl = this.model[attribute];
        var func = typeof(options) == 'function' ? options : options.func;
        var msg = func.apply(this.model);
        return this.getErrorMsg(attribute, msg, msg);
    }

    /**
     * Validate value of attribute as integer number
     * @param attribute : attribute of model, which was validate
     * @param options : value condition to validate. Value true is validate run, false is nothing.
     */
    validateInteger(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateInteger(vl)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải là kiểu số nguyên', options);
        }
        return msg;
    }

    /**
     * Validate value of attribute which between min, max value
     * @param attribute : attribute of model, which was validate
     * @param options : value condition to validate. Structure is [numberMin, numberMax].
     */
    validateMinmax(attribute: string = '', options: any) {
        if (!attribute) {
            attribute = this.attribute;
        }
        let msg = '';
        let vl = this.model[attribute];
        if (!GlobalFunction.validateMinmax(vl, options)) {
            msg = this.getErrorMsg(attribute, '{attribute} phải >= ' + options[0] + ' và < ' + options[1], options);
        }
        return msg;
    }
}