webpackJsonp(["job.module"],{

/***/ "../../../../../src/app/application/admin/job/job.component.html":
/***/ (function(module, exports) {

module.exports = "<style>\r\n    .table_>thead>tr>th,\r\n    .table_>tbody>tr>th,\r\n    .table_>tfoot>tr>th,\r\n    .table_>thead>tr>td,\r\n    .table_>tbody>tr>td,\r\n    .table_>tfoot>tr>td,\r\n    .table_ tr>td code {\r\n        font-size: 10px;\r\n        color: white !important;\r\n        padding: 3px;\r\n        border: none;\r\n    }\r\n\r\n    .table_ {\r\n        background-color: #444;\r\n        border: none\r\n    }\r\n\r\n    .value {\r\n        font-weight: normal;\r\n        font-size: 11px;\r\n        text-transform: uppercase\r\n    }\r\n</style>\r\n<div class=\"customer-list-popup\" id=\"customer-list-popup\" [hidden]=\"!role('job_read')\">\r\n    <div class=\"div-admin-form-tab-parent\">\r\n        <div class=\"admin-form-tab\">\r\n            <div class=\"div-admin-form-field-parent\">\r\n                <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\" *ngIf=\"job\"\r\n                    style=\"border:1px solid #ccc\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>ID:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.id}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Tên:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.NAME}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Loại Job:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\" *ngIf=\"job.JOB_JOB_TYPE_MUL\">\r\n                            <ng-container *ngFor=\"let lg of job.JOB_JOB_TYPE_MUL.split(',')\">\r\n                                <p><code>{{lg}}</code></p>\r\n                            </ng-container>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Loại nguồn:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p><code>{{job.SOURCE_TYPE}}</code></p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"job.SOURCE_TYPE == 'Excel'\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>File excel:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p><a href=\"{{job.FILE_EXCEL}}\">{{job.FILE_EXCEL}}</a></p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"job.SOURCE_TYPE == 'Sql'\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>SQL:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.SQL}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"job.SOURCE_TYPE == 'Textarea'\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Textarea:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7 div-textarea\">\r\n                            <p><code>{{job.TEXTAREA}}</code></p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Nhóm Job:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.GROUP}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Giới hạn dữ liệu chạy batch:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.BATCH_LIMIT}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Giới hạn đồng bộ trong batch:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.MULTI_LIMIT}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Thời gian bắt đầu chạy JOB:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.START_TIME}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Thời gian kết thúc:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.FINISH_TIME}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Trạng thái hiện tại:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p><code>{{job.STATUS}}</code></p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Ưu tiên:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.PRIORITY}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Thời gian tạo Job:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.CREATED_TIME}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Người tạo:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.CREATED_BY}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Thời gian cập nhật cuối:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.MODIFIED_TIME}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                            <label>Người cập nhật:</label>\r\n                        </div>\r\n                        <div class=\"col-7-ipad value col-xs-12 col-lg-7\">\r\n                            <p>{{job.MODIFIED_BY}}</p>\r\n                        </div>\r\n                    </div>\r\n                    <hr />\r\n                    <div class=\"row\" *ngIf=\"result.data\">\r\n                        <div class=\"col-12-ipad cbs_style_label col-xs-12 col-lg-12\">\r\n                            <h2>Tổng hợp kết quả chạy Job:</h2>\r\n                        </div>\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>NAME</th>\r\n                                    <th>NOT_RUNNING</th>\r\n                                    <th>ERROR</th>\r\n                                    <th>VALID</th>\r\n                                    <th>TOTAL</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <ng-container *ngFor=\"let r of result.data\">\r\n                                    <tr>\r\n                                        <td>{{r.NAME}}</td>\r\n                                        <td>{{r.NOT_RUNNING}}</td>\r\n                                        <td>{{r.ERROR}}</td>\r\n                                        <td>{{r.VALID}}</td>\r\n                                        <td>{{r.TOTAL}}</td>\r\n                                    </tr>\r\n                                </ng-container>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\" *ngIf=\"log\"\r\n                    style=\"overflow:scroll\">\r\n                    <div class=\"row\" style=\"height:800px\">\r\n                        <table class=\"table table_\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>ID</th>\r\n                                    <th>Hành động</th>\r\n                                    <th>Nội dung Log</th>\r\n                                    <th>Thời gian tạo</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <ng-container *ngFor=\"let lg of log.list\">\r\n                                    <tr>\r\n                                        <td>#{{lg.ID}}</td>\r\n                                        <td><code style=\"background-color: #00841c;\">{{lg.ACTION}}</code></td>\r\n                                        <td>{{lg.MESSAGE}}</td>\r\n                                        <td style=\"color:rgb(115, 255, 97) !important\">{{lg.CREATED_TIME}}</td>\r\n                                    </tr>\r\n                                </ng-container>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n<simple-notifications [options]=\"notifications_options\"></simple-notifications>"

/***/ }),

/***/ "../../../../../src/app/application/admin/job/job.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_core_global_function__ = __webpack_require__("../../../../../src/app/common/core/global_function.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_job_service__ = __webpack_require__("../../../../../src/app/application/admin/models/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_log_service__ = __webpack_require__("../../../../../src/app/application/admin/models/log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var JobComponent = (function () {
    function JobComponent(route, router, jobservice, logservice) {
        this.route = route;
        this.router = router;
        this.jobservice = jobservice;
        this.logservice = logservice;
        this.job = {};
        this.log = {};
        this.result = {};
        this.showChecked = false;
        this.notifications_options = {
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true
        };
        this.sub = false;
        this.clr = false;
    }
    JobComponent.prototype.ngOnInit = function () {
        this.run();
    };
    JobComponent.prototype.ngAfterViewInit = function () {
    };
    JobComponent.prototype.role = function (action) {
        return __WEBPACK_IMPORTED_MODULE_2__common_core_global_function__["b" /* GlobalFunction */].ROLE[action] ? true : false;
    };
    JobComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        clearInterval(this.clr);
    };
    JobComponent.prototype.run = function () {
        var that = this;
        this.sub = this.route.params.subscribe(function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var jobId;
                return __generator(this, function (_a) {
                    jobId = params['id'];
                    that.jobservice.findOne(jobId).then(function (r) {
                        that.job = that.jobservice.showAttributes();
                    });
                    that.logservice.findAll({ JOB_ID: jobId, order_by: 'ID desc' }).then(function (r) {
                        that.log = r;
                    });
                    that.jobservice.get(jobId).then(function (r) {
                        that.result = r;
                    });
                    that.clr = setTimeout(function () {
                        that.run();
                    }, 10000);
                    return [2 /*return*/];
                });
            });
        });
    };
    JobComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'job',
            template: __webpack_require__("../../../../../src/app/application/admin/job/job.component.html"),
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__models_job_service__["a" /* JobService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_job_service__["a" /* JobService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__models_log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__models_log_service__["a" /* LogService */]) === "function" && _d || Object])
    ], JobComponent);
    return JobComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=job.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/job/job.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JobModule", function() { return JobModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_notifications__ = __webpack_require__("../../../../angular4-notifications/components.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular4_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_component_table_table_module__ = __webpack_require__("../../../../../src/app/common/component/table/table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_common_component_popup_popup_module__ = __webpack_require__("../../../../../src/app/common/component/popup/popup.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_application_admin_fields_fields_module__ = __webpack_require__("../../../../../src/app/application/admin/fields/fields.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_application_admin_job_job_component__ = __webpack_require__("../../../../../src/app/application/admin/job/job.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_job_service__ = __webpack_require__("../../../../../src/app/application/admin/models/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_log_service__ = __webpack_require__("../../../../../src/app/application/admin/models/log.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var JobModule = (function () {
    function JobModule() {
    }
    JobModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_10_app_application_admin_fields_fields_module__["a" /* FieldAdminModule */],
                __WEBPACK_IMPORTED_MODULE_9_app_common_component_popup_popup_module__["a" /* PopupModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_loading__["a" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular4_notifications__["SimpleNotificationsModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_12_app_application_admin_job_job_component__["a" /* JobComponent */]
                    },
                    {
                        path: 'view',
                        component: __WEBPACK_IMPORTED_MODULE_12_app_application_admin_job_job_component__["a" /* JobComponent */]
                    },
                ]),
                __WEBPACK_IMPORTED_MODULE_8__common_component_table_table_module__["a" /* TableModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12_app_application_admin_job_job_component__["a" /* JobComponent */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6_angular4_notifications__["NotificationsService"], __WEBPACK_IMPORTED_MODULE_11_app_common_services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_13__models_job_service__["a" /* JobService */], __WEBPACK_IMPORTED_MODULE_14__models_log_service__["a" /* LogService */]],
        })
    ], JobModule);
    return JobModule;
}());

//# sourceMappingURL=job.module.js.map

/***/ })

});
//# sourceMappingURL=job.module.chunk.js.map