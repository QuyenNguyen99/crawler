import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, forwardRef, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalValidateModel } from '../../core/global_validate';
import { GlobalFunction } from '../../core/global_function';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceGlobal } from 'app/common/services/service.global';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';

import 'rxjs/add/operator/toPromise';


declare var $: any;

const CHUAXULYSTATUS = 2;
const CHOOSE_HANLDER = 'Chọn người xử lý';
const MIN_HEIGHT_TBODY = 500;

@Component({
    selector: 'ftable',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TableComponent),
        multi: true
    }]
})
export class TableComponent implements OnInit, AfterViewInit {
    disable: boolean = true;

    
    _loading: any = false;
    @Input()
    set loading(vl: any) {
        this._loading = vl;
    }
    get loading() {
        return this._loading;
    }

    @Output()
    onInitValue = new EventEmitter<string>();
    @Output()
    admin_table_column_update_click = new EventEmitter<string>();

    @Output()
    is_show_delete_all = new EventEmitter<boolean>();

    @Output()
    orderDone = new EventEmitter<any>();
    @Output()
    sortDone = new EventEmitter<any>();
    @Output()
    getDataTableDone = new EventEmitter<any>();
    @Output()
    listAssignChoosen = new EventEmitter<any>();
    @Output()
    multiAssignDone = new EventEmitter<any>();
    @Output()
    table_load_true = new EventEmitter<any>();

    obj_export: any;
    obj_import: any;

    @Input()
    set model(value: Observable<any> | any) { this._model = value; }
    get model() { return this._model; }

    @Input()
    set tparent(value: Observable<any> | any) { this._tparent = value; this._tparent.table = this; }
    get tparent() { return this._tparent; }

    @Input()
    set columns(value: Observable<any> | any) { this.setColumns(value); this.setAutoColumn(); }
    get columns() { return this._columns; }
    link_view: any = '';
    setColumns(value) {

        
        var rs = [];
        var rs_header = [];
        for (var i in value) {
            rs_header.push(value[i]);
            if(!value[i] || value[i] === undefined) {
                continue;
            }
            if (value[i]['children']) {
                for (var j in value[i]['children']) {
                    rs.push(value[i]['children'][j]);
                }
            } else {
                rs.push(value[i]);
            }
            if (value[i]['default_sort']) {
                this._sort = this._sort || {
                    attribute: value[i].attribute,
                    sort_by: value[i]['default_sort'],
                };
            }
        }
        this._columns_header = rs_header;
        this._columns = rs;
    }

    _columns_header: any = [];

    @Input()
    set action(value: Observable<any> | any) { this._action = value; this.setAutoColumn();this.action_column_roles(); }
    get action() { return this._action; }

    admin_table: any;

    @Input()
    set set_admin_table(vl: any) {
        this.admin_table = vl;
    }


    _show_paging: any = true;

    @Input()
    set show_paging(value: Observable<any> | any) { this._show_paging = value; }
    get show_paging() { return this._show_paging; }

    @Input()
    set limit(value: Observable<any> | any) { this._limit = value; }
    get limit() { return this._limit; }

    @Input()
    set showChecked(value: Observable<any> | any) { this._showChecked = value; }
    get showChecked() { return this._showChecked; }
    @Input()
    set showSTT(value: Observable<any> | any) { this._showSTT = value; }
    get showSTT() { return this._showSTT; }

    @Input()
    set role(value: Observable<any> | any) { this._role = value; }
    get role() { return this._role; }
    @Input()
    set dbclick_row(value: Observable<any> | any) { this._dbclick_row = value; }
    get dbclick_row() { return this._dbclick_row; }

    @Input()
    set disable_row_by_attribute(vl: any) {
        this._disable_row_by_attribute = vl;
    }
    get disable_row_by_attribute() {
        return this._disable_row_by_attribute;
    }
    @Input()
    set attribute_value(vl: any) {
        this._attribute_value = vl;
    }
    get attribute_value() {
        return this._attribute_value;
    }
    @Input()
    set disable_items(vl: any) {
        this._disable_items = vl;
    }
    get disable_items() {
        return this._disable_items;
    }
    limit_data: any = [
        { "id": 20, "text": "20" },
        { "id": 50, "text": "50" },
        { "id": 75, "text": "75" },
        { "id": 100, "text": "100" },
        { "id": 200, "text": "200" },
        { "id": 500, "text": "500" },
        { "id": 1000, "text": "1000" },
    ]
    _attribute_value: any;
    _disable_items: any;
    _disable_row_by_attribute: any;
    _dbclick_row: any;
    _role: any;
    _tparent: any;
    _model: ServiceGlobal;
    _columns: any;
    _action: any = [];
    _showChecked: boolean = true;
    _showSTT: boolean = true;
    sub: any;
    delayRequest: any = 500;
    _sort: any;
    _limit: any = 20;
    _page: any = 1;
    _range: any = 3;
    rows: any;
    count: any;
    start: any = 0;
    check_all: boolean = false;
    list_paging: any = [];
    column_filter_flag = true;
    timeout_reload_add: any = false;
    actionStyleHeader: any = {
        width: '211px',
    };
    checkboxHeader: any = {
        width: '50px',
    };
    _show_action: any = false;

    _header_filter: any;
    @Input()
    set header_filter(vl: any) {
        if (vl) {
            this._header_filter = vl;
        }
    }
    get header_filter() {
        return this._header_filter;
    }


    @ViewChild('div_table') _div_table: any;
    @ViewChild('table') _table: any;
    @ViewChild('thead') _thead: any;
    @ViewChild('tbody') _tbody: any;
    @ViewChild('tbodyNo') _tbodyNo: any;
    @ViewChild('paging') paging: any;

    constructor(private route: ActivatedRoute, private router: Router, public notification_service: NotificationsService) { }

    ngOnInit() {
        this.link_view = this.get_path_name();
        if (this.link_view.indexOf('/index') == -1) {
            this.link_view += (this.link_view.match(/\/$/) ? '' : '/') + 'view';
        } else {
            this.link_view = this.link_view.replace('/index', '/view');
        }
        // this.link_view = this.link_view.replace('/customerreview','/customerlist').replace('/customerhasreview','/customerlist');
        this.table_name = this._model.tableName();
    }

    renderClass(column) {
        var classes = '';
        if (column) {
            classes += column.view ? ' link-view' : '';
            classes += column['checked'] ? '' : ' hide';
            classes += ' cl_' + column['attribute']
        }
        return classes;
    }

    check_role(action) {
        return GlobalFunction.ROLE[action] ? true : false;
    }

    action_column_roles() {
        this._show_action = false;
        for (var i in this._action) {
            var action = this._action[i];
            if (action.role && action.role !== undefined) {
                action.role_show = GlobalFunction.ROLE[action.role] ? true : false;
            } else {
                action.role_show = false;
            }
            if(action.role_show) {
                this._show_action = true;
            }
        }
    }

    table_name: any = '';

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    link_old = '';

    admin_common_controller: boolean = false;

    ngAfterViewInit() {
        var that = this;
        this._model.resetAttributes();
        this.model_update[this._model.tableName()] = {};
        this.table_name = this._model.tableName();
        this.sub = this.route.params.subscribe(params => {
            if (!that.admin_table) {
                that.set_load_route_params(params);
            }
            document.querySelector('.page_inner').scrollTop = 0;
        });
        this.table_load_true.emit(true);
    }

    set_load_route_params(params) {
        var that = this;
        setTimeout(function () {
            that.admin_common_controller = params.admin_common_controller ? true : false;
        })
        var link = location.pathname.replace(/;.*/gi, '');
        if (this.link_old && this.link_old != link) {
            this.sub.unsubscribe();
            return false;
        }
        this.link_old = link;
        // this.model_update[this._model.tableName()] = {};
        var params_obj = Object.assign({}, params);
        if (params_obj.page) {
            this._page = parseInt(params_obj.page);
            delete params_obj['page'];
        }
        if (params_obj.limit) {
            this._limit = params_obj.limit;
        }
        if (params_obj.order_by) {
            var a = params_obj.order_by.replace(/[ ]+/gi, ' ').trim().split(' ');
            if (a.length == 2 && this._model.hasAttribute(a[0]) && GlobalFunction.contains(a[1].toLowerCase(), ['asc', 'desc'])) {
                setTimeout(function () {
                    that._sort = {
                        attribute: a[0],
                        sort_by: a[1],
                    };
                }, 1);
            }
        }
        return GlobalFunction.DEFER.promise.then(r => {
            if (Object.keys(GlobalFunction.ROLE).length) {
                return that._model.setAttributesNotEmptyThen(params_obj).then(function () {
                    return that._getList(Object.assign({}, params_obj)).then(() => {
                        that.getDataTableDone.emit({ listStaffToAssign: that.listStaffToAssign, count: that.count });
                        return Promise.resolve(true);
                    });
                })
            } else {
                return Promise.resolve(true);
            }
        })
    }

    hightLightFirstRow() {
        var that = this;
        setTimeout(function () {
            $('#table-body tr:first-child').addClass('hightlight');
            setTimeout(function () {
                $('#table-body tr:first-child').addClass('hightlight_out');
                $('#table-body tr:first-child').removeClass('hightlight');
                setTimeout(function () {
                    $('#table-body tr:first-child').removeClass('hightlight_out');
                }, 5000);
            }, 10);
        }, 10);
    }

    reload() {
        this.check_all = false;
        return this.set_load_route_params(this.route.params['_value']);
    }
    setAutoColumn() {
        this.column_filter_flag = false;
        for (var i in this._columns) {
            var column = this._columns[i];
            if (column.filter) {
                if (!column.filter.attribute) {
                    column.filter.attribute = column.attribute;
                }
                if (column.filter.attribute == 'id' && !column.filter.operator) {
                    column.filter.operator = 'like';
                }
                var column_filter = column.filter;
                switch (column_filter.type) {
                    case 'date':
                        if (!column_filter.operator) {
                            column_filter.operator = ['>=', '<='];
                        }
                        break;
                }
                if (column_filter.operator && typeof (column_filter.operator) == 'string') {
                    column_filter.operator = column_filter.operator.split(',');
                }
                var attribute = column.filter.attribute;
                if (column_filter.operator) {
                    for (var j in column_filter.operator) {
                        if (!this._model.table_search_attribute[attribute][j]) {
                            this._model.table_search_attribute[attribute][j] = {
                                value: undefined,
                                operator: column_filter.operator[j]
                            };
                        }
                    }
                } else {
                    column_filter.operator = [''];
                    if (!this._model.table_search_attribute[attribute][0]) {
                        this._model.table_search_attribute[attribute][0] = {
                            value: undefined,
                        };
                    }
                }
                column.filter = column_filter;
                this.column_filter_flag = true;
            }
            this._columns[i] = column;
        }
    }

    typeof(obj) {
        return typeof (obj);
    }

    db_click(record, index) {
        if (this._dbclick_row) {
            if (this._dbclick_row.func) {
                this._dbclick_row.func.apply(this._tparent, [record, index]);
            }
            if (this._dbclick_row.view) {
                var path = this.get_path_name();
                var a = path.split('/');
                if (a.length == 3) {
                    path += '/view';
                } else if (a.length >= 4) {
                    path = '/' + a[1] + '/' + a[2].replace('customerlistleader', 'customerlist') + '/view';
                }
                this.router.navigate([path, { id: record['id'] }]);
            }
        }
    }

    run_func(action_i, record, index) {
        if (action_i.func) {
            var a = action_i.func;
            if (typeof (action_i.func) == 'string') {
                var b = 'a = ' + action_i.func + ';';
                b = b.replace('this', 'this._tparent');
                eval(b);
            }
            a.apply(this._tparent, [record, index, this]);
        }
        var row = record;
        if(action_i.popup) {
            var that = this._tparent;
            if(typeof(action_i.popup) == 'string') {
                eval("action_i.popup = " + action_i.popup +";");
            }
            var popup_action = Object.assign({}, action_i.popup);
            if(typeof(popup_action['confirm']) == 'string') {
                eval("popup_action['confirm'] = " + action_i.popup['confirm'] + ";");
            }
            this._tparent.obj_message_confirm.open(popup_action);
        }
        if (action_i.link) {
            this.router.navigate([action_i.link, { id: record.id }]);
        }
    }

    model_update: any = {};
    notAssign: string = CHOOSE_HANLDER;
    timeOut: any;
    current_user_id: any;
    focusing: boolean = false;

    create_model_update(record) {
        if (!this.model_update[this.table_name]) {
            this.model_update[this.table_name] = {};
        }

        if (!this.model_update[this.table_name][record.id]) {
            var md = Object.assign({}, this._model);
            md['__proto__'] = Object.assign({}, this._model['__proto__']);
            md['__proto__']['__proto__'] = Object.assign({}, this._model['__proto__']['__proto__']);
            md.resetAttributesNotFk();
            md._validate.model = md;
            md['_old_attributes'] = record['old_attributes'];
            md['setAttributes'](record['old_attributes']);
            this.model_update[this.table_name][record.id] = md;
        }
    }

    run_update_func(column, record, index) {
        this.create_model_update(record);
        this.current_user_id = record.id;
        if (this.model_update[this.table_name][record.id][column.attribute] === null) {
            this.model_update[this.table_name][record.id][column.attribute] = 'null';
        }
        if (this.model_update[this.table_name][record.id]['fk_table_' + column.attribute] && !this.model_update[this.table_name][record.id]['fl_' + column.attribute]) {
            var a = [];
            var fl = false;
            for (var i in this.model_update[this.table_name][record.id]['fk_table_' + column.attribute]) {
                if (this.model_update[this.table_name][record.id]['fk_table_' + column.attribute][i]['id'] !== '') {
                    a.push(this.model_update[this.table_name][record.id]['fk_table_' + column.attribute][i]);
                } else {
                    fl = true;
                }
            }
            if (fl) {
                this.model_update[this.table_name][record.id]['fl_' + column.attribute] = true;
                this.model_update[this.table_name][record.id]['fk_table_' + column.attribute] = a;
            }
        }
        record[column.attribute + '_table_update'] = true;
    }

    update_attribute(record, column) {
        var that = this;
        if (record[column.attribute + '_table_update']) {
            record[column.attribute + '_table_update'] = false;
        }
        var md = this.model_update[this.table_name][record.id];
        if (this.current_user_id == record.id) {
            record[column.attribute + '_table_update'] = false;
            var value_old = record[column.attribute];
            record[column.attribute] = that._model.showAttribute(column.attribute, md[column.attribute]);
            let status = md.showAttribute('status', this.model_update.status);
            md.update_attributes([column.attribute]).then(r => {
                if (r.code == 200) {
                    if (!r.disable_reload) {
                        that.reload();
                    }
                    that.notification_service.success(r.message ? r.message : 'Chỉnh sửa ' + that._model.attributeLabels()[column.attribute].toLowerCase() + ' thành công', '');
                } else if (r.code == 400) {
                    record[column.attribute] = value_old;
                    var a_msg = [];
                    for (var i in r.error) {
                        a_msg.push(r.error[i]);
                    }
                    that.notification_service.error('Lỗi', a_msg.join("<br />\n"));
                }
            })
        }
    }
    checkAll() {
        var that = this;
        setTimeout(function () {
            var temp_list: any[] = [];
            for (var i in that.rows) {
                if(!that._attribute_value || (GlobalFunction.is_array(that._attribute_value) && !that._attribute_value.length) || !that.checkDisableCheckbox(that._attribute_value, that.rows[i])) {
                    that.rows[i]['checked'] = that.check_all;
                    if (that.rows[i]['checked']) {
                        temp_list.push(that.rows[i].id);
                    }
                }
            }
            that.listAssign = temp_list;
            that.listAssignChoosen.emit(that.listAssign);
            that.is_show_delete_all.emit(that.listAssign.length > 0);
        }, 20);
    }

    sort(column) {
        if (column.sort) {
            var attribute_old = this._sort ? this._sort.attribute : '';
            var sort_by_old = this._sort ? this._sort.sort_by : '';
            this._sort = {
                attribute: column.attribute,
                sort_by: 'ASC',
            };
            if (attribute_old == column.attribute) {
                this._sort.sort_by = sort_by_old == 'ASC' ? 'DESC' : 'ASC';
            }
            if (typeof (this._tparent['column_sort']) == 'function') {
                this._tparent['column_sort'](this._sort);
            }
            this.orderDone.emit(this._sort);
            this.filterHandle();
        }
    }
    getFilterColumnData() {
        return this._columns;
    }
    listStaffToAssign: any;
    timeout_adjust_height: any;
    _getList(condition) {
        var that = this;
        let offset = (this._page - 1) * this._limit;
        if (isNaN(offset) || offset <= 0) {
            offset = 0;
        }
        clearTimeout(that.timeout_reload_add);
        if(this.admin_table && this.admin_table['default_search']) {
            if(typeof(this.admin_table['default_search']) == 'string') {
                Object.assign(condition,JSON.parse(this.admin_table['default_search']));
            } else {
                Object.assign(condition,this.admin_table['default_search']);
            }
        }
        that.loading = true;
        return this._model.findAll(condition, this._limit, offset).then(data => {
            that.loading = false;
            this.rows = data['list'];
            this.count = data['count'];
            for (var i in this._columns) {
                if(this._columns[i].id){
                    this._columns[i].ID = this._columns[i].id;
                }
                if (this._columns[i].filter) {
                    var attribute = this._columns[i].filter.attribute;
                    var attr_fk_table = 'fk_table_' + attribute;
                    var attr_fk_table_obj = 'fk_table_' + attribute + '_obj';
                    switch (this._columns[i].filter.type) {
                        case 'multiselect':
                        case 'select':
                            if (this._columns[i].filter.listData === undefined && that._model[attr_fk_table]) {
                                if (that._model[attr_fk_table_obj] && (that._model[attr_fk_table_obj][''] || that._model[attr_fk_table_obj]['null'])) {
                                    this._columns[i].filter.listData = that._model[attr_fk_table];
                                } else {
                                    if (!(that._model[attr_fk_table].length && that._model[attr_fk_table][0]['id'] === '')) {
                                        this._columns[i].filter.listData = [{ 'id': '', 'text': '-- Chọn --' }].concat(that._model[attr_fk_table]);
                                    } else {
                                        this._columns[i].filter.listData = that._model[attr_fk_table];
                                    }
                                }
                            }
                            break;
                    }
                }
            }
            if (typeof (this._tparent['before_table_get_list']) == 'function') {
                this._tparent['before_table_get_list'](data);
            }
            if (this.rows && this.rows.length) {
                for (var row of this.rows) {
                    this.set_row(row);
                }
            }
            this.listStaffToAssign = that._model['fk_table_staff_handle_id'];
            if (this.paging) { this.paging.handleFilter(); }
            this.start = this._page > 0 ? this._limit * (this._page - 1) : 0;
            clearTimeout(this.timeout_adjust_height);
            // this.timeout_adjust_height = setTimeout(function () {
            //     that.adjustHeight();
            // }, 50);
            if (typeof (this._tparent['after_table_get_list']) == 'function') {
                this._tparent['after_table_get_list'](data);
            }
            return Promise.resolve(true);
        });
    }

    set_row(row) {
        row.disable_row = this.attribute_value && this.disable_row_by_attribute && this.checkDisableCheckbox(this.attribute_value,row);
        if(this._action && this._action.length) {
            for(let i in this._action) {
                var item = this._action[i];
                item.id = i;
                var attr = 'show_' + i;
                row[attr] = item.role_show;
                if(item.display) {
                    row[attr] = row[attr] && this.call_action_i(row, item.display);
                }
            }
        }
        this.create_model_update(row);
    }

    getSearchParam(page = 1) {
        var attributes = this._model.getAttributesSearch();
        if (this._sort) {
            attributes['order_by'] = this._sort.attribute + ' ' + this._sort.sort_by;
        }
        if (this._limit) {
            attributes['limit'] = this._limit;
        }
        if (page > 1) {
            attributes['page'] = page;
        }
        if (this.route.params['_value'].admin_filter_user_id) {
            attributes['admin_filter_user_id'] = this.route.params['_value'].admin_filter_user_id;
        }
        // reset checkall value;
        this.check_all = false;
        // reset list assign
        this.listAssign = [];
        this.listAssignChoosen.emit(this.listAssign);
        return attributes;
    }

    get_path_name() {
        return location.pathname.replace(/;.*/gi, '');
    }

    changeLimit(event: any) {
        var limit = event.limit;
        if (typeof (limit) == 'string') {
            limit = parseInt(limit);
        }
        this._limit = limit;
        this._page = 1;
        if (typeof (this._tparent['change_limit']) == 'function') {
            this._tparent['change_limit'](this._limit);
        }
        this.router.navigate([this.get_path_name(), this.getSearchParam(this._page)]);

    }

    timeout: any = false;
    filterHandle(event: any = { page: 1 }) {
        if (event.limit) {
            this._limit = event.limit;
        }
        if (event.range) {
            this._range = event.range;
        }
        var page = event.page;
        if (typeof (page) == 'string') {
            page = parseInt(page);
        }
        this._page = page;
        this.router.navigate([this.get_path_name(), this.getSearchParam(page)]);
    }

    filter(event) {
        clearTimeout(this.timeout);
        if ('keyup' == event.type) {
            this.timeout = setTimeout(() => {
                this.filterHandle();
            }, this.delayRequest);
        } else {
            this.timeout = setTimeout(() => {
                this.filterHandle();
            }, 25);
        }
    }

    /**
     * 
     * @param opts 
     */
    resizeTable(opts) {
        if (this._table && this._tbody && this._thead &&
            this._tbody !== undefined &&
            this._tbody.nativeElement &&
            this._tbody.nativeElement !== undefined &&
            this._thead !== undefined &&
            this._thead.nativeElement &&
            this._thead.nativeElement !== undefined &&
            null != this.rows && '' != this.rows) {
            var opt = $.extend({ tableIdentify: '.table_' + this.table_name, styleId: 'tableResizeStyle' }, opts);
            var table = $(opt.tableIdentify);
            var thead = $(this._thead.nativeElement);
            var tbody = $(this._tbody.nativeElement);
            // Create css for table to map container size
            var cssContent = [];
            // Create style tag to render css for table
            $('#' + opt.styleId).remove();
            $('head').append('<style id="' + opt.styleId + '"></style>');
            // Set height
            $('#loading').removeClass('hidden');
            cssContent.push('.table-container{opacity: 0;}');
            cssContent.push(opt.tableIdentify + ' thead.header_container,.table_component .table_body{display: block;width: 100%;}');
            cssContent.push(opt.tableIdentify + ' .table_body{overflow-x: hidden;overflow-y: hidden;}');
            // Set width for each column
            var ths = thead.find('tr').eq(1).find('>th'),
                tds = tbody.find('tr').eq(0).find('>td');
            var len = ths.length;
            var index = 0;
            var width = 0;
            var s = 20;
            for (var i = 0; i < len; i++) {
                index = i + 1;
                // Setting width of column
                width = ths.eq(i).widthTrue() > tds.eq(i).widthTrue() ? ths.eq(i).widthTrue() : tds.eq(i).widthTrue();
                s += width;
                cssContent.push(opt.tableIdentify + '>.table_body>tr>td:nth-child(' + index + '){width:' + width + 'px !important}');
                cssContent.push(opt.tableIdentify + '>thead>tr>th:nth-child(' + index + '){width:' + width + 'px !important}');
                // cssContent.push(opt.tableIdentify + '>thead>tr>th:nth-child(' + index + '){width:' + (width + (len == index ? 0 : 0)) + 'px !important}');
            }
            if (1500 >= parseInt($(window).width())) {
                cssContent.push('.div_table{width: ' + s + 'px !important;}');
            }
            // Calculate height of tbody
            var offsetPadding = 23,
                heightContainer = $(window).height() - $('.main-header').height() - $('#customer-list-popup > .title').height() - $('.main-footer').height() - offsetPadding,
                heightOthers = $('.cbs_btn_action').heightTrue() +
                    thead.heightTrue() +
                    $('.table-footer').heightTrue() +
                    $('.cbs_footer').heightTrue(),
                tableHeight = heightContainer - heightOthers;
            cssContent.push(opt.tableIdentify + ' .table_body{height:' + tableHeight + 'px !important;}');
            $('#' + opt.styleId).html(cssContent.join('\n'));
        }
    }

    /**
     * Load table when change display mode
     */
    loadTable() {
        var thiz = this;
        setTimeout(function () {
            // thiz.resizeTable({});
            // setTimeout(function () {
            //     thiz.resizeTable({});
            //     setTimeout(function () {
            //         thiz.resizeTable({});
            //         setTimeout(function () {
            thiz.resizeTable({});
            $('#table-container').removeClass('table-container');
            $('#loading').addClass('hidden');
            var to;
            $('#table-body').off('mousewheel.scroll').on('mousewheel.scroll', function (event) {
                $('#table-body').addClass('invisible-scrollbar');
                clearTimeout(to);
                to = setTimeout(function () {
                    $('#table-body').removeClass('invisible-scrollbar');
                }, 500);
            });
            //         }, 100);
            //     }, 100);
            // }, 100);
        }, 50);
    }

    /**
     * Get Item check box to listAssign
     */
    listAssign: any[] = [];
    getItemCheckAssign() {
        var that = this;
        var temp_list: any[] = [];
        var count: number = 0;
        setTimeout(() => {
            for (let i in that.rows) {
                if(!that._attribute_value || (GlobalFunction.is_array(that._attribute_value) && !that._attribute_value.length) || !that.checkDisableCheckbox(that._attribute_value, that.rows[i])) {
                    if (that.rows[i]['checked']) {
                        temp_list.push(that.rows[i].id);
                    }
                    count++;
                }
            }
            that.listAssign = temp_list;
            that.check_all = count == that.listAssign.length;
            that.listAssignChoosen.emit(that.listAssign);
            that.is_show_delete_all.emit(that.listAssign.length > 0);
        }, 20);
    }

    _selectExport: any;
    showPopupExport() {
        var that = this;
        this.obj_export.open({
            title: 'Export Excel',
            content: `Lựa chọn loại export`,
            values: [
                {
                    'id': 1,
                    'text': 'Trang hiện tại',
                },
                {
                    'id': 2,
                    'text': 'Tất cả',
                },
            ],
            confirm: function () {
                that.exportExcel(that.obj_export._selectExport);
                return Promise.resolve(true);
            },
        });
    }

    exportExcel(type) {
        var self = this;
        var condition;
        if (type == 2) {
            condition = this.getSearchParam() || {};
        } else {
            if (this.rows && this.rows.length) {
                condition = {
                    id: GlobalFunction.indexArray(this.rows, 'id').join(','),
                };
                condition['order_by'] = this._sort ? (this._sort.attribute + ' ' + this._sort.sort_by) : 'id desc';
            } else {
                return false;
            }
        }
        var columns = [];
        for (var column of this._columns) {
            if (column.checked) {
                columns.push({ label: column.label, attribute: column.attribute, width: column.width_excel ? column.width_excel : 20 });
            }
        }
        condition.columns_excel = columns;
        this._model.exportExcel(condition);
    }

    _selectImport: any;
    showPopupImport() {
        var that = this;
        this.obj_import.open({
            title: 'Import Excel',
            content: `Import file`,
            link: this.table_name+'importtemplate.xlsx',
            confirm: function () {
                that.importExcel(that.obj_import.file)
                return Promise.resolve(true);
            },
        });
    }

    importExcel(base64file) {
        if(base64file)
        {
            return this._model.importExcel(base64file).then(rs => {
                alert("Import thành công!");
                this.reload();
                return true;
              });
            
        }
        else
        {
            alert("Import thất bại!");
            return false;
        }
    }

    admin_table_column_update(column) {
        this.admin_table_column_update_click.emit(column);
    }

    uncheckable = false;
    checkDisableCheckbox(array_attribute_value, record) {
        if (!GlobalFunction.is_array(array_attribute_value)) {
            array_attribute_value = [array_attribute_value];
        }
        for (var attribute_value of array_attribute_value) {
            if (attribute_value == record.old_attributes[this.disable_row_by_attribute]) {
                this.uncheckable = true;
                return true;
            }
            for (var i in this.disable_items) {
                if (record.old_attributes[this.disable_items[i]['attr']] && record.old_attributes[this.disable_items[i]['attr']] == this.disable_items[i]['value']) {
                    this.uncheckable = true;
                    return true;
                }
            }
            this.uncheckable = false;
        }
        return false;
    }

    sortAdminTableColumn() {
        var that = this;
        return {
        onMove  : function(e, v) {
            if(e.dragged.className.includes('not_sortable') || e.related.className.includes('not_sortable')) {
                return false;
            }
        },
        onEnd   : function(e) {
                if(e.newIndex != e.oldIndex) {
                    var a_column_header = [], a_columns = [];
                    var header_obj = GlobalFunction.index(that._columns_header,'id');
                    var columns_obj = GlobalFunction.index(that.columns,'id');
                    var value_emit = [];
                    var i = 1;
                    $('#trhead > th[id]').each(function(e){
                        var id = $(this).attr('id');
                        if(id && ('' + id).match(/^[0-9]+$/gi)) {
                            id = parseInt(id);
                            a_column_header.push(header_obj[id]);
                            a_columns.push(columns_obj[id]);
                            header_obj[id].priority = i;
                            columns_obj[id].priority = i;
                            value_emit.push(id);
                            i++;
                        }
                    })
                    setTimeout(() => {
                        that._columns_header = a_column_header;
                        that.columns = a_columns;
                        setTimeout(function(){
                            document.body.click();
                        })
                        that.sortDone.emit(value_emit);
                    },10);
                }
            }
        };
    }

    getIdChecked() {
        var ids = [];
        for(var item of this.rows) {
            if(item.checked) {
                ids.push(item.ID || item.id);
            }
        }
        return ids;
    }

    call_action_i(row, display) {
        return eval(display);
    }
}