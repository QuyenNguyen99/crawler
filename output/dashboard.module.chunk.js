webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/application/admin/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<style>\r\n    .gray{color:gray}\r\n  td.red code{color: white;\r\n    background: #fd6060;\r\n    border-radius: 15px;\r\n    cursor: pointer;}\r\n  .green{color:green}\r\n  td pre{ color:#fd6060;font-size:10px}\r\n</style>\r\n<div class=\"container-fluid\">\r\n    <hr/>\r\n    <div class=\"cbs_item_row col-6-ipad cbs_style_label col-xs-12 col-lg-6\">\r\n        <!----><div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n            <label for=\"jobtypeservice-name\" class=\"\">Số lượng bản ghi chạy mỗi request:</label>\r\n        </div>\r\n        <div class=\"col-7-ipad cbs_style_ip col-xs-12 col-lg-4\">\r\n            <input type=\"text\" [(ngModel)]=\"optionkey\">\r\n            <div class=\"help-block\"></div>\r\n        </div>\r\n        <div class=\"col-7-ipad cbs_style_ip col-xs-12 col-lg-3\">\r\n            <button class=\"cbs_btn btn_primary\" (click)=\"updateoptionkey()\" type=\"submit\">Cập nhật</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"container-fluid\" style=\"background:#ECEFF1\" id='layout_dashboard'>\r\n        <br/>\r\n        <h1>Thống kê dữ liệu</h1>\r\n        <br/>\r\n  </div>  \r\n  <br/>\r\n    <!-- <h2>Bar chart example</h2> -->\r\n    \r\n<div class=\"admin-table-to-form col-12-ipad cbs_style_label col-xs-12 col-lg-12\">\r\n        <hr/>\r\n        <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n            \r\n                <div class=\"col-md-12\">\r\n                        <h2>Mật độ job - theo thời gian</h2>\r\n                        <hr>\r\n                    </div>\r\n                    <div class=\"col-md-12\">\r\n                        <div id=\"heatmap-1\"></div>\r\n                    </div>\r\n                \r\n        </div>\r\n        <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                <fdaterangepicker [model]=\"jobService\" [labelValue]=\"'Chọn khoảng thời gian'\" [attribute]=\"'FINISH_TIME'\" (valueChanged)=\"changedate()\"></fdaterangepicker>\r\n                <div class=\"row\"  *ngIf=\"custom.data\">\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>Tên API</th>\r\n                                    <th class=\"gray\">Chưa chạy</th>\r\n                                    <th class=\"red\">Lỗi</th>\r\n                                    <th class=\"green\">Thành công</th>\r\n                                    <th>Tổng số request</th>\r\n                                <th>%</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <ng-container *ngFor=\"let r of custom.data\">\r\n                                <tr>\r\n                                    <td>{{r.NAME}}</td>\r\n                                    <td class=\"gray\">{{r.NOT_RUNNING}}</td>\r\n                                    <td class=\"red\">{{r.ERROR}}</td>\r\n                                    <td class=\"green\">{{r.VALID}}</td>\r\n                                    <td>{{r.TOTAL}}</td>\r\n                                    <td>{{r.PERCENT}}</td>\r\n                                </tr>\r\n                            </ng-container>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n            </div>\r\n        \r\n</div>\r\n    <div class=\"admin-table-to-form col-12-ipad cbs_style_label col-xs-12 col-lg-12\">\r\n      \r\n      <ul class=\"nav nav-tabs\">\r\n            <li class=\"active\"><a data-toggle=\"tab\" href=\"#menu0\"><h4>TOÀN THỜI GIAN</h4></a></li>\r\n          <li><a data-toggle=\"tab\" href=\"#menu1\"><h4>HÔM NAY</h4></a></li>\r\n          <li><a data-toggle=\"tab\" href=\"#menu2\"><h4>THÁNG</h4></a></li>\r\n          <li><a data-toggle=\"tab\" href=\"#menu3\"><h4>NĂM</h4></a></li>\r\n        </ul>\r\n        \r\n        <div class=\"tab-content\">\r\n            <div id=\"menu0\" class=\"tab-pane fade in active\">\r\n                    <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                            <div class=\"row\"  *ngIf=\"result.data\">\r\n                                <table class=\"table\">\r\n                                    <thead>\r\n                                        <tr>\r\n                                        <th>Tên API</th>\r\n                                        <th class=\"gray\">Chưa chạy</th>\r\n                                        <th class=\"red\">Lỗi</th>\r\n                                        <th class=\"green\">Thành công</th>\r\n                                        <th>Tổng số request</th>\r\n                                        <th>%</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                    <ng-container *ngFor=\"let r of result.data\">\r\n                                        <tr>\r\n                                            <td>{{r.NAME}}</td>\r\n                                            <td class=\"gray\">{{r.NOT_RUNNING}}</td>\r\n                                            <td class=\"red\" (click)=\"searchError('total',r.ID)\"><code>{{r.ERROR}}</code></td>\r\n                                            <td class=\"green\">{{r.VALID}}</td>\r\n                                            <td>{{r.TOTAL}}</td>\r\n                                            <td>{{r.PERCENT}}</td>\r\n                                        </tr>\r\n                                    </ng-container>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n            </div>\r\n            <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                    <div class=\"row\"  *ngIf=\"ERRORTOTAL\">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Thông tin</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody style=\"background: #444;\">\r\n                                <ng-container *ngFor=\"let ERR of ERRORTOTAL\">\r\n                                    <tr>\r\n                                        <td><pre>{{ERR}}</pre></td>\r\n                                    </tr>\r\n                                </ng-container>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n              </div>\r\n            </div>\r\n            \r\n          <div id=\"menu1\" class=\"tab-pane fade\">\r\n              <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                  <div class=\"row\"  *ngIf=\"dailyresult.data\">\r\n                      <table class=\"table\">\r\n                          <thead>\r\n                              <tr>\r\n                                  <th>Tên API</th>\r\n                                  <th class=\"gray\">Chưa chạy</th>\r\n                                  <th class=\"red\">Lỗi</th>\r\n                                  <th class=\"green\">Thành công</th>\r\n                                  <th>Tổng số request</th>\r\n                              <th>%</th>\r\n                              </tr>\r\n                          </thead>\r\n                          <tbody>\r\n                          <ng-container *ngFor=\"let r of dailyresult.data\">\r\n                              <tr>\r\n                                  <td>{{r.NAME}}</td>\r\n                                  <td class=\"gray\">{{r.NOT_RUNNING}}</td>\r\n                                  <td class=\"red\" (click)=\"searchError('day',r.ID)\"><code>{{r.ERROR}}</code></td>\r\n                                  <td class=\"green\">{{r.VALID}}</td>\r\n                                  <td>{{r.TOTAL}}</td>\r\n                                  <td>{{r.PERCENT}}</td>\r\n                              </tr>\r\n                          </ng-container>\r\n                          </tbody>\r\n                      </table>\r\n                  </div>\r\n              </div>\r\n              \r\n              <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                    <div class=\"row\"  *ngIf=\"ERRORDAY\">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Thông tin</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody style=\"background: #444;\">\r\n                                <ng-container *ngFor=\"let ERR of ERRORDAY\">\r\n                                    <tr>\r\n                                        <td><pre>{{ERR}}</pre></td>\r\n                                    </tr>\r\n                                </ng-container>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n              </div>\r\n            </div>\r\n          <div id=\"menu2\" class=\"tab-pane fade\">\r\n            <!-- <h2>Bar chart example</h2> -->\r\n            <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                <div class=\"row\"  *ngIf=\"monthlyresult.data\">\r\n                    <table class=\"table\">\r\n                        <thead>\r\n                            <tr>\r\n                                <th>Tên API</th>\r\n                                <th class=\"gray\">Chưa chạy</th>\r\n                                <th class=\"red\">Lỗi</th>\r\n                                <th class=\"green\">Thành công</th>\r\n                                <th>Tổng số request</th>\r\n                            <th>%</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                        <ng-container *ngFor=\"let r of monthlyresult.data\">\r\n                            <tr>\r\n                                <td>{{r.NAME}}</td>\r\n                                <td class=\"gray\">{{r.NOT_RUNNING}}</td>\r\n                                <td class=\"red\" (click)=\"searchError('month',r.ID)\"><code>{{r.ERROR}}</code></td>\r\n                                <td class=\"green\">{{r.VALID}}</td>\r\n                                <td>{{r.TOTAL}}</td>\r\n                                <td>{{r.PERCENT}}</td>\r\n                            </tr>\r\n                        </ng-container>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                  <div class=\"row\"  *ngIf=\"ERRORMONTH\">\r\n                          <table class=\"table\">\r\n                              <thead>\r\n                                  <tr>\r\n                                      <th>Thông tin</th>\r\n                                  </tr>\r\n                              </thead>\r\n                              <tbody style=\"background: #444;\">\r\n                              <ng-container *ngFor=\"let ERR of ERRORMONTH\">\r\n                                  <tr>\r\n                                      <td><pre>{{ERR}}</pre></td>\r\n                                  </tr>\r\n                              </ng-container>\r\n                              </tbody>\r\n                          </table>\r\n                      </div>\r\n            </div>\r\n              \r\n          </div>\r\n          <div id=\"menu3\" class=\"tab-pane fade\">\r\n              <!-- <h2>Bar chart example</h2> -->\r\n              <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                  <div class=\"row\"  *ngIf=\"yearlyresult.data\">\r\n                      <table class=\"table\">\r\n                          <thead>\r\n                              <tr>\r\n                                  <th>Tên API</th>\r\n                                  <th class=\"gray\">Chưa chạy</th>\r\n                                  <th class=\"red\">Lỗi</th>\r\n                                  <th class=\"green\">Thành công</th>\r\n                                  <th>Tổng số request</th>\r\n                              <th>%</th>\r\n                              </tr>\r\n                          </thead>\r\n                          <tbody>\r\n                          <ng-container *ngFor=\"let r of yearlyresult.data\">\r\n                              <tr>\r\n                                  <td>{{r.NAME}}</td>\r\n                                  <td class=\"gray\">{{r.NOT_RUNNING}}</td>\r\n                                  <td class=\"red\" (click)=\"searchError('year',r.ID)\"><code>{{r.ERROR}}</code></td>\r\n                                  <td class=\"green\">{{r.VALID}}</td>\r\n                                  <td>{{r.TOTAL}}</td>\r\n                                  <td>{{r.PERCENT}}</td>\r\n                              </tr>\r\n                          </ng-container>\r\n                          </tbody>\r\n                      </table>\r\n                  </div>\r\n              </div>\r\n              <div class=\"admin-table-to-form col-6-ipad cbs_style_label col-xs-6 col-lg-6\">\r\n                    <div class=\"row\"  *ngIf=\"ERRORYEAR\">\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <tr>\r\n                                        <th>Thông tin</th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody style=\"background: #444;\">\r\n                                <ng-container *ngFor=\"let ERR of ERRORYEAR\">\r\n                                    <tr>\r\n                                        <td><pre>{{ERR}}</pre></td>\r\n                                    </tr>\r\n                                </ng-container>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n\r\n\r\n    "

/***/ }),

/***/ "../../../../../src/app/application/admin/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\n  font-family: 'Open Sans', sans-serif; }\n\ndiv#layout {\n  text-align: center; }\n\ndiv#container {\n  width: 1000px;\n  height: 600px;\n  margin: auto;\n  background-color: #2F4A6D; }\n\nsvg {\n  width: 100%;\n  height: 100%; }\n\n.bar {\n  fill: #80cbc4; }\n\ntext {\n  font-size: 12px;\n  fill: #fff; }\n\npath {\n  stroke: gray; }\n\nline {\n  stroke: gray; }\n\nline#limit {\n  stroke: #FED966;\n  stroke-width: 3;\n  stroke-dasharray: 3 6; }\n\n.grid path {\n  stroke-width: 0; }\n\n.grid .tick line {\n  stroke: #9FAAAE;\n  stroke-opacity: 0.3; }\n\ntext.divergence {\n  font-size: 14px;\n  fill: #2F4A6D; }\n\ntext.value {\n  font-size: 14px; }\n\ntext.title {\n  font-size: 22px;\n  font-weight: 600; }\n\ntext.label {\n  font-size: 14px;\n  font-weight: 400; }\n\ntext.source {\n  font-size: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/admin/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_common_services_dashboard_service__ = __webpack_require__("../../../../../src/app/common/services/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_job_service__ = __webpack_require__("../../../../../src/app/application/admin/models/job.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular4_notifications_src_notifications_service__ = __webpack_require__("../../../../angular4-notifications/src/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_assets_js_jquery_CalendarHeatmap_min__ = __webpack_require__("../../../../../src/assets/js/jquery.CalendarHeatmap.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_assets_js_jquery_CalendarHeatmap_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_assets_js_jquery_CalendarHeatmap_min__);
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







var DashboardComponent = (function () {
    function DashboardComponent(route3, router3, user_service, notification_service3) {
        this.route3 = route3;
        this.router3 = router3;
        this.user_service = user_service;
        this.notification_service3 = notification_service3;
        this.result = {};
        this.dailyresult = {};
        this.monthlyresult = {};
        this.yearlyresult = {};
        this.custom = {};
        this.ERRORDAY = [];
        this.ERRORMONTH = [];
        this.ERRORYEAR = [];
        this.ERRORTOTAL = [];
        this.changeFilterModeWidth = 480;
        this.isMobile = false;
        this.optionkey = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.reload_admin_table();
                return [2 /*return*/];
            });
        });
    };
    DashboardComponent.prototype.reload_admin_table = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.dashboardservice = new __WEBPACK_IMPORTED_MODULE_3_app_common_services_dashboard_service__["a" /* DashboardService */](this.user_service._db, this.user_service.http);
                this.jobService = new __WEBPACK_IMPORTED_MODULE_4__models_job_service__["a" /* JobService */](this.user_service._db, this.user_service.http);
                this.dashboardservice.getTotalResult().then(function (r) {
                    _this.result = r;
                });
                this.dashboardservice.getTotalDailyResult().then(function (r) {
                    _this.dailyresult = r;
                });
                this.dashboardservice.getTotalMonthlyResult().then(function (r) {
                    _this.monthlyresult = r;
                });
                this.dashboardservice.getTotalYearlyResult().then(function (r) {
                    _this.yearlyresult = r;
                });
                this.dashboardservice.getOptionKey().then(function (r) {
                    _this.optionkey = r.data;
                });
                this.heatmap();
                return [2 /*return*/];
            });
        });
    };
    DashboardComponent.prototype.changedate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dates, from, to, start, end, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dates = this.jobService.FINISH_TIME.split(" - ");
                        from = dates[0].split("-");
                        to = dates[1].split("-");
                        start = from[1] + "/" + from[0] + "/" + from[2];
                        end = to[1] + "/" + to[0] + "/" + to[2];
                        _a = this;
                        return [4 /*yield*/, this.dashboardservice.getTotalFromDateToDateResult(start, end)];
                    case 1:
                        _a.custom = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.heatmap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, data, _i, _a, dat, that;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dashboardservice.getHeatchartdata()];
                    case 1:
                        x = _b.sent();
                        data = [];
                        for (_i = 0, _a = x.data; _i < _a.length; _i++) {
                            dat = _a[_i];
                            data.push({
                                count: dat.CNT,
                                date: dat.FILTER_DATE
                            });
                        }
                        $("#heatmap-1").CalendarHeatmap(data, {
                            labels: {
                                custom: {
                                    monthLabels: "MMM 'YY"
                                }
                            },
                            tooltips: {
                                show: true
                            }
                        });
                        that = this;
                        $(".ch-day").on("click", function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var date_, dat, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            date_ = $(this).attr("date_").split("-");
                                            dat = date_[1] + "/" + date_[2] + "/" + date_[0];
                                            _a = that;
                                            return [4 /*yield*/, that.dashboardservice.getTotalExactlyDate(dat)];
                                        case 1:
                                            _a.custom = _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.searchError = function (type, typeid) {
        return __awaiter(this, void 0, void 0, function () {
            var total, _i, _a, t, year, _b, _c, y, month, _d, _e, m, day, _f, _g, d;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        this.ERRORYEAR = [];
                        this.ERRORMONTH = [];
                        this.ERRORDAY = [];
                        this.ERRORTOTAL = [];
                        if (!(type == 'total')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dashboardservice.getErrorTotallyResult(typeid)];
                    case 1:
                        total = _h.sent();
                        for (_i = 0, _a = total.data; _i < _a.length; _i++) {
                            t = _a[_i];
                            this.ERRORTOTAL.push(JSON.stringify(t, null, 2));
                        }
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(type == 'year')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.dashboardservice.getErrorYearlyResult(typeid)];
                    case 3:
                        year = _h.sent();
                        for (_b = 0, _c = year.data; _b < _c.length; _b++) {
                            y = _c[_b];
                            this.ERRORYEAR.push(JSON.stringify(y, null, 2));
                        }
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(type == 'month')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.dashboardservice.getErrorMonthlyResult(typeid)];
                    case 5:
                        month = _h.sent();
                        for (_d = 0, _e = month.data; _d < _e.length; _d++) {
                            m = _e[_d];
                            this.ERRORMONTH.push(JSON.stringify(m, null, 2));
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(type == 'day')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.dashboardservice.getErrorDailyResult(typeid)];
                    case 7:
                        day = _h.sent();
                        for (_f = 0, _g = day.data; _f < _g.length; _f++) {
                            d = _g[_f];
                            this.ERRORDAY.push(JSON.stringify(d, null, 2));
                        }
                        _h.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent.prototype.updateoptionkey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rs, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dashboardservice.updateOptionKey(this.optionkey)];
                    case 1:
                        rs = _b.sent();
                        if (!(rs.code != 200)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.dashboardservice.getOptionKey()];
                    case 2:
                        _a.optionkey = (_b.sent()).data;
                        this.notification_service3.error('Cập nhật thất bại', '');
                        return [3 /*break*/, 4];
                    case 3:
                        this.notification_service3.success('Cập nhật thành công', '');
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'dashboard',
            template: __webpack_require__("../../../../../src/app/application/admin/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/admin/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_common_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_common_services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_angular4_notifications_src_notifications_service__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular4_notifications_src_notifications_service__["NotificationsService"]) === "function" && _d || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_notifications__ = __webpack_require__("../../../../angular4-notifications/components.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular4_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular4_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_component__ = __webpack_require__("../../../../../src/app/application/admin/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_component_table_table_module__ = __webpack_require__("../../../../../src/app/common/component/table/table.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_common_component_popup_popup_module__ = __webpack_require__("../../../../../src/app/common/component/popup/popup.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_application_admin_fields_fields_module__ = __webpack_require__("../../../../../src/app/application/admin/fields/fields.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_application_admin_settings_build_common_page_module__ = __webpack_require__("../../../../../src/app/application/admin/settings-build/common.page.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_application_admin_settings_build_admin_filterusername_filterusername_module__ = __webpack_require__("../../../../../src/app/application/admin/settings-build/admin/filterusername/filterusername.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_common_component_selectupdate_selectupdate_module__ = __webpack_require__("../../../../../src/app/common/component/selectupdate/selectupdate.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_common_component_multiselect_multiselect_module__ = __webpack_require__("../../../../../src/app/common/component/multiselect/multiselect.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_common_component_tooltip_tooltip_module__ = __webpack_require__("../../../../../src/app/common/component/tooltip/tooltip.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng_pick_datetime__ = __webpack_require__("../../../../ng-pick-datetime/picker.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng_pick_datetime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ng_pick_datetime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_11_app_application_admin_fields_fields_module__["a" /* FieldAdminModule */],
                __WEBPACK_IMPORTED_MODULE_17_app_common_component_tooltip_tooltip_module__["a" /* TooltipsModule */],
                __WEBPACK_IMPORTED_MODULE_10_app_common_component_popup_popup_module__["a" /* PopupModule */],
                __WEBPACK_IMPORTED_MODULE_13_app_application_admin_settings_build_common_page_module__["a" /* CommonpageModule */],
                __WEBPACK_IMPORTED_MODULE_14_app_application_admin_settings_build_admin_filterusername_filterusername_module__["a" /* filterusernameModule */],
                __WEBPACK_IMPORTED_MODULE_15_app_common_component_selectupdate_selectupdate_module__["a" /* SelectupdateModule */],
                __WEBPACK_IMPORTED_MODULE_16_app_common_component_multiselect_multiselect_module__["a" /* MultiselectModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_loading__["a" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_18_ng_pick_datetime__["DateTimePickerModule"],
                __WEBPACK_IMPORTED_MODULE_6_angular4_notifications__["SimpleNotificationsModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_8__dashboard_component__["a" /* DashboardComponent */]
                    },
                    {
                        path: 'index',
                        component: __WEBPACK_IMPORTED_MODULE_8__dashboard_component__["a" /* DashboardComponent */]
                    },
                ]),
                __WEBPACK_IMPORTED_MODULE_9__common_component_table_table_module__["a" /* TableModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__dashboard_component__["a" /* DashboardComponent */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6_angular4_notifications__["NotificationsService"], __WEBPACK_IMPORTED_MODULE_12_app_common_services_user_service__["a" /* UserService */]],
        })
    ], DashboardModule);
    return DashboardModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ "../../../../../src/app/common/services/dashboard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_global__ = __webpack_require__("../../../../../src/app/common/services/service.global.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_api__ = __webpack_require__("../../../../../src/app/config/api.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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




var DashboardService = (function (_super) {
    __extends(DashboardService, _super);
    function DashboardService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loading = false;
        return _this;
    }
    DashboardService.prototype.dbname = function () {
        return 'crawlersystem';
    };
    DashboardService.prototype.tableName = function () { return 'dashboard'; };
    DashboardService.prototype.attributeLabels = function () {
        return Object.assign(_super.prototype.attributeLabels.call(this), {
            "data": "data",
            "fk_table_data": "fk_table_data"
        });
    };
    DashboardService.prototype.getTotalResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_TOTAL_RESULT)];
            });
        });
    };
    DashboardService.prototype.getTotalDailyResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_DAILY_RESULT)];
            });
        });
    };
    DashboardService.prototype.getTotalMonthlyResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_MONTHLY_RESULT)];
            });
        });
    };
    DashboardService.prototype.getTotalYearlyResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_YEARLY_RESULT)];
            });
        });
    };
    DashboardService.prototype.getErrorYearlyResult = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_ERROR_YEARLY, {
                        typeid: id
                    })];
            });
        });
    };
    DashboardService.prototype.getErrorMonthlyResult = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_ERROR_MONTHLY, {
                        typeid: id
                    })];
            });
        });
    };
    DashboardService.prototype.getErrorDailyResult = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_ERROR_DAILY, {
                        typeid: id
                    })];
            });
        });
    };
    DashboardService.prototype.getErrorTotallyResult = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_ERROR_TOTALLY, {
                        typeid: id
                    })];
            });
        });
    };
    DashboardService.prototype.getTotalFromDateToDateResult = function (st, en) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_FROM_DATE_TO_DATE_RESULT, {
                        start: st,
                        end: en
                    })];
            });
        });
    };
    DashboardService.prototype.getHeatchartdata = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_HEAT_CHART_DATA)];
            });
        });
    };
    DashboardService.prototype.getTotalExactlyDate = function (dat) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].JOB_EXACTLY_DATE, {
                        data: dat
                    })];
            });
        });
    };
    DashboardService.prototype.getOptionKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].OPTION_KEY)];
            });
        });
    };
    DashboardService.prototype.updateOptionKey = function (optionkey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._db.get(__WEBPACK_IMPORTED_MODULE_3__config_api__["a" /* API */].UPDATE_OPTION_KEY, {
                        optionkey: optionkey
                    })];
            });
        });
    };
    DashboardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
    ], DashboardService);
    return DashboardService;
}(__WEBPACK_IMPORTED_MODULE_0__service_global__["a" /* ServiceGlobal */]));

//# sourceMappingURL=dashboard.service.js.map

/***/ }),

/***/ "../../../../../src/assets/js/jquery.CalendarHeatmap.min.js":
/***/ (function(module, exports) {

/*
 *  calendarheatmap - v0.0.3
 *  A simple Calendar Heatmap for jQuery.
 *  https://github.com/SeBassTian23/CalendarHeatmap
 *
 *  Made by Sebastian Kuhlgert
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

    "use strict";

        // Default Options
        var pluginName = "CalendarHeatmap",
            defaults = {
                title: null,
                months: 12,
                weekStartDay: 1,
                lastMonth: moment().month() + 1,
                lastYear: moment().year(),
                coloring: null,
                labels: {
                    days: false,
                    months: true,
                    custom: {
                        weekDayLabels: null,
                        monthLabels: null
                    }
                },
                legend: {
                    show: true,
                    align: "right",
                    minLabel: "Less",
                    maxLabel: "More"
                },
                tooltips: {
                    show: false,
                    options: {}
                }
            };

        // The actual plugin constructor
        function Plugin ( element, data, options ) {
            this.element = element;
            this.data = data;
            this.settings = $.extend( true, {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend( Plugin.prototype, {
            init: function() {

                // Run Calandar Heatmap Function
                this.calendarHeatmap();

                // Check if the moment.js library is available.
                if ( !moment ) {
                    console.log( "The calendar heatmap plugin requires moment.js" );
                }
            },
            parse: function() {

                var type = $.type( this.data );
                if ( [ "array", "object" ].indexOf( type ) === -1 ) {
                    console.log( "Invalid data source" );
                    return null;
                } else {
                    if ( type === "array" && this.data.length > 0 ) {
                        var arrtype = $.type( this.data[ 0 ] );
                        if ( arrtype === "object" ) {
                            if ( this.data[ 0 ].date && this.data[ 0 ].count ) {
                                return this.data.slice( 0 );
                            } else {
                                return null;
                            }
                        } else if ( [ "string", "date" ].indexOf( arrtype ) > -1 ) {
                            if ( moment( this.data[ 0 ] ).isValid() ) {
                                var obj = {};
                                for ( var i in this.data ) {
                                    var d = moment( this.data[ i ] ).format( "YYYY-MM-DD" );
                                    if ( !obj[ d ] ) {
                                        obj[ d ] = 1;
                                    } else {
                                        obj[ d ] += 1;
                                    }
                                }
                                var arr = [];
                                for ( var j in obj ) {
                                    arr.push( {
                                        "count": obj[ j ],
                                        "date": j
                                    } );
                                }
                                return arr;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else if ( type === "array" && this.data.length === 0 ) {
                        return [];
                    } else if ( type === "object" && !Object.empty( this.data ) ) {
                        var keys = Object.keys( this.data );
                        if ( moment( keys[ 0 ] ).isValid() ) {
                            if ( $.type( this.data[ keys[ 0 ] ] ) === "number" ) {
                                var data = [];
                                for ( var k in this.data ) {
                                    data.push( {
                                        "count": this.data[ k ],
                                        "date": moment( k ).format( "YYYY-MM-DD" )
                                    } );
                                }
                                return data;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            },
            index: function( data ) {
                this.idx = {};
                for ( var i in data ) {
                    this.idx[ data[ i ].date ] = i;
                }
            },
            pad: function( str, max ) {
                str = String( str );
                return str.length < max ? this.pad( "0" + str, max ) : str;
            },
            calculateBins: function( events ) {

                // Calculate bins for events
                var arr = [];
                var i;
                var bins = this.settings.steps || 4;
                var binlabels = [ "0" ];
                var binlabelrange = [ [ 0, 0 ] ];
                for ( i in events ) {
                    events[ i ].count = parseInt( events[ i ].count );
                    arr.push( events[ i ].count );
                }
                var firstStep = Math.min.apply( Math, arr );
                var maxCount = Math.max.apply( Math, arr );
                var stepWidth = ( maxCount - firstStep ) / bins;

                if ( stepWidth === 0 ) {
                    stepWidth = maxCount / bins;
                    if ( stepWidth < 1 ) {
                        stepWidth = 1;
                    }
                }

                // Generate bin labels
                for ( i = 0; i < bins; i++ ) {
                    if ( !isFinite( firstStep ) ) {
                        binlabels.push( "" );
                        binlabelrange.push( [ null, null ] );
                    } else if ( maxCount < bins ) {
                        if ( ( i - ( bins - maxCount ) ) >= 0 ) {
                            binlabels.push( String( 1 + ( i - ( bins - maxCount ) ) ) );
                            binlabelrange.push( [
                                ( 1 + ( i - ( bins - maxCount ) ) ),
                                ( 1 + ( i - ( bins - maxCount ) ) )
                            ] );
                        } else {
                            binlabels.push( "" );
                            binlabelrange.push( [ null, null ] );
                        }
                    } else if ( maxCount === bins ) {
                        binlabels.push( String( ( i + 1 ) ) );
                        binlabelrange.push( [ ( i + 1 ), ( i + 1 ) ] );
                    } else if ( ( maxCount - 2 ) === bins ) {
                        if ( ( i + 1 ) === bins ) {
                            binlabels.push( String( ( i + 1 ) ) + "+" );
                            binlabelrange.push( [ ( i + 1 ), null ] );
                        } else {
                            binlabels.push( String( ( i + 1 ) ) );
                            binlabelrange.push( [ ( i + 1 ), ( i + 1 ) ] );
                        }
                    } else {
                        var l = Math.round( i * stepWidth ) + 1;
                        var ll = Math.round( i * stepWidth + stepWidth );
                        binlabelrange.push( [ l, ll ] );
                        if ( i === ( bins - 1 ) ) {
                            l += "+";
                        } else {
                            if ( l !== ll ) {
                                l += " to ";
                                l += ll;
                            }
                        }
                        binlabels.push( String( l ) );
                    }
                }

                // Assign bins to counts
                for ( i in events ) {

                    if ( events[ i ].count === 0 ) {
                        events[ i ].level = 0;
                    } else if ( events[ i ].count - firstStep === 0 ) {
                        events[ i ].level = 1;
                    } else if ( !isFinite( firstStep ) ) {
                        events[ i ].level = bins;
                    } else {
                        events[ i ].level = this.matchBin( binlabelrange, events[ i ].count );
                    }
                }

                return { events: events, bins: binlabels };
            },
            matchBin: function( range, value ) {
                var overlap = -1;
                for ( var r in range ) {
                    if ( value >= range[ r ][ 0 ] && value <= range[ r ][ 1 ] ) {
                        return r;
                    }
                    else if(value > range[ r ][ 1 ])
                    {
                        overlap = r;
                    }
                }
                if(overlap!=-1)
                {
                    return overlap;
                }
                return 0;
            },
            matchDate: function( obj, key ) {

                if ( this.idx[ key ] ) {
                    return obj[ this.idx[ key ] ];
                } else {
                    return null;
                }
            },
            addWeekColumn: function( ) {
                if ( this.settings.labels.days ) {
                    $( ".ch-year", this.element )
                        .append( "<div class=\"ch-week-labels\"></div>" );

                    $( ".ch-week-labels", this.element )
                        .append( "<div class=\"ch-week-label-col\"></div>" );

                    $( ".ch-week-label-col", this.element )
                        .append( "<div class=\"ch-day-labels\"></div>" );

                    // If month labels are displayed a placeholder needs to be added
                    if ( this.settings.labels.months ) {
                        $( ".ch-week-labels", this.element )
                            .append( "<div class=\"ch-month-label\">&nbsp;</div>" );
                    }

                    var swd = this.settings.weekStartDay || 1;

                    for ( var i = 0; i < 7; i++ ) {

                        var dayName = moment().weekday( ( i + swd ) ).format( "ddd" );
                        var dayNumber = moment().weekday( ( i + swd ) ).format( "d" );
                        if ( ( i - 1 ) % 2 ) {
                            var wdl = this.settings.labels.custom.weekDayLabels;
                            if ( $.type( wdl ) === "array" ) {
                                dayName = wdl[ dayNumber ] || "";
                            } else if ( $.type( wdl ) === "string" ) {
                                dayName = moment().weekday( ( i + swd ) )
                                .format( wdl );
                            }
                        } else {
                            dayName = "&nbsp;";
                        }
                        $( "<div>", {
                            class: "ch-day-label",
                            html: dayName
                        } )
                        .appendTo( $( ".ch-day-labels", this.element ) );
                    }
                }
            },
            calendarHeatmap: function( ) {

                var data = this.parse();

                if ( $.type( data ) !== "array" ) {
                    return;
                }

                // Generate lookup index
                this.index( data );

                var calc = this.calculateBins( data );
                var events = calc.events;
                var binLabels = calc.bins;
                var currMonth = this.settings.lastMonth;
                var currYear = this.settings.lastYear;
                var months = this.settings.months;
                var i;

                // Start day of the week
                var swd = this.settings.weekStartDay || 1;

                // Empty container first
                $( this.element ).empty();

                // Add a title to the container if not null
                if ( this.settings.title ) {
                    $( "<h3>", {
                        class: "ch-title",
                        html: this.settings.title
                    } ).appendTo( $( this.element ) );
                }

                // Add the main container for the year
                $( this.element ).addClass( "ch" )
                    .append( "<div class=\"ch-year\"></div>" );

                // Add labels
                this.addWeekColumn();

                // Start building the months
                for ( i = months; i > 0; i-- ) {

                    var month = currMonth - i;
                    var year = currYear;
                    if ( month < 0 ) {
                        year -= 1;
                        month += 12; // TODO: FIX for more than one year
                    }

                    // Build Month
                    var monthName = moment().set( { "month": month, "year": year } )
                    .format( "MMM" );
                    if ( this.settings.labels.custom.monthLabels ) {
                        if ( $.type( this.settings.labels.custom.monthLabels ) === "array" ) {
                            monthName = this.settings.labels.custom.monthLabels[ month ] || "";
                        }else {
                            monthName = moment().set( { "month": month, "year": year } )
                                .format( this.settings.labels.custom.monthLabels );
                        }
                    }
                    $( ".ch-year", this.element )
                        .append( "<div class=\"ch-month\"></div>" );

                    $( ".ch-month:last", this.element )
                        .append( "<div class=\"ch-weeks\"></div>" );

                    if ( this.settings.labels.months ) {
                        $( ".ch-month:last", this.element )
                        .append( "<div class=\"ch-month-label\">" + monthName + "</div>" );
                    }

                    // Get the number of days for the month
                    var days = moment().set( { "month": month, "year": year } ).daysInMonth();

                    // Add the first week
                    $( ".ch-month:last .ch-weeks", this.element )
                        .append( "<div class=\"ch-week\"></div>" );

                    // Week day counter
                    var wc = 0;
                    for ( var j = 0; j < days; j++ ) {
                        var str = year + "-" + this.pad( ( month + 1 ), 2 );
                        str += "-" + this.pad( ( j + 1 ), 2 );
                        var obj = this.matchDate( events, str );

                        if ( obj ) {
                            var title = obj.count + " on ";
                            title += moment( obj.date ).format( "ll" );

                            var color = "";

                            if ( this.settings.coloring ) {
                                color = " " + this.settings.coloring + "-" + obj.level;
                            }

                            $( "<div/>", {
                                "class": "ch-day lvl-" + obj.level + color,
                                "title": title,
                                "date_": obj.date,
                                "data-toggle": "tooltip"
                            } ).appendTo(
                                $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            );

                        } else {
                            $( "<div/>", {
                                "class": "ch-day"
                            } ).appendTo(
                                $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            );
                        }

                        // Get the iso week day to see if a new week has started
                        var wd = moment().set( {
                            "date": ( j + 2 ),
                            "month": month,
                            "year": year
                        } ).isoWeekday();

                        // Incrementing the day counter for the week
                        wc++;

                        if ( wd === swd  && ( days - 1 ) > j ) {

                            $( ".ch-month:last .ch-weeks", this.element )
                                .append( "<div class=\"ch-week\">" + j + "</div>" );

                            // Reset the week day counter
                            wc = 0;
                        }
                    }

                    // Now fill up the last week with blank days
                    for ( wc; wc < 7; wc++ ) {
                        $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            .append( "<div class=\"ch-day is-outside-month\"></div>" );
                    }
                }

                // Add a legend
                if ( this.settings.legend.show ) {

                    // Add the legend container
                    $( "<div>", {
                        class: "ch-legend"
                    } )
                    .appendTo( this.element )
                    .append( "<small>" + ( this.settings.legend.minLabel || "" ) + "</small>" )
                    .append( "<ul class=\"ch-lvls\"></ul>" )
                    .append( "<small>" + ( this.settings.legend.maxLabel || "" ) + "</small>" );

                    if ( this.settings.legend.align === "left" ) {
                        $( ".ch-legend", this.element ).addClass( "ch-legend-left" );
                    }

                    if ( this.settings.legend.align === "center" ) {
                        $( ".ch-legend", this.element ).addClass( "ch-legend-center" );
                    }

                    // Add the legend steps
                    for ( i = 0; i < binLabels.length; i++ ) {
                        $( "<li>", {
                            "class": "ch-lvl lvl-" + i,
                            "title": binLabels[ i ],
                            "data-toggle": "tooltip"
                        } )
                        .appendTo( $( ".ch-lvls", this.element ) );
                        if ( this.settings.coloring ) {
                            $( ".ch-lvls li:last", this.element  )
                            .addClass( this.settings.coloring + "-" + i );
                        }
                    }
                }

                // Add tooltips to days and steps
                if ( this.settings.tooltips.show && typeof $.fn.tooltip === "function" ) {
                    $( "[data-toggle=\"tooltip\"]", this.element )
                    .tooltip( this.settings.tooltips.options );
                }
            }
        } );

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function( data, options ) {
            return this.each( function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" +
                        pluginName, new Plugin( this, data, options ) );
                }
            } );
        };

} )( jQuery, window, document );


/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map