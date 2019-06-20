webpackJsonp(["admin.module"],{

/***/ "../../../../../src/app/application/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-sidebar-container class=\"app\" [ngClass]=\"{'mode-boxed': isBoxed, 'sidebar-opened': isOpened, 'theme-light': theme == 'light', 'mode-push': _mode == 'push', 'mode-dock': _mode == 'dock'}\">\r\n  <ng-sidebar [(opened)]=\"isOpened\" [(mode)]=\"_mode\" [position]=\"'left'\" [dockedSize]=\"'80px'\" [autoCollapseWidth]=\"'991'\"\r\n    *ngIf=\"!user_info.isFirstLogin()\" [closeOnClickOutside]=\"isOver()\" [showBackdrop]=\"isOver()\" [sidebarClass]=\"'sidebar-panel'\"\r\n    (onClosed)=\"closed()\" #sidebar>\r\n    <nav class=\"menu\" *ngIf=\"load\">\r\n      <ul class=\"navigation\" appAccordion>\r\n        <li class=\"navigation-item header-menu\">\r\n          <div class=\"logo_top\">\r\n            <h2 style=\"padding:10px\"><i style=\"color:#3A995F\">CRAWLER </i><i style=\"color:#fff\">SYSTEM</i></h2>\r\n            <img *ngIf=\"_mode == 'dock' && !isMobile\" src=\"assets/image/logo_five9.svg\" alt=\"cybersale\" class=\"cbs_logo_2\">\r\n          </div>\r\n        </li>\r\n        <ng-container *ngFor=\"let menuitem of menuItems.MENUITEMS; let i = index;\">\r\n          <li *ngIf=\"role(menuitem.role)\" class=\"navigation-item\">\r\n            <a *ngIf=\"!isMobile && menuitem.type === 'mainTab' && 'dock'!= _mode\" [class]=\"menuitem.class\">\r\n              <i class=\"icon {{ menuitem[('icon'+_mode)] }}\"></i>\r\n              <span *ngIf=\"_mode == 'push'\">{{menuitem.name}}</span>\r\n            </a>\r\n            <a *ngIf=\"isMobile && menuitem.type === 'mainTab'\" [class]=\"menuitem.class\">\r\n              <i class=\"icon {{ menuitem[('icon'+_mode)] }}\"></i>\r\n              <span>{{menuitem.name}}</span>\r\n            </a>\r\n            <a class=\"navigation-link route_click {{menuitem.active_class}} {{menuitem.class}}\" \r\n              [routerLink]=\"menuitem.filter !== false ? [menuitem.state, menuitem.filter] : [menuitem.state]\"\r\n              *ngIf=\"menuitem.type === 'link'\" (click)=\"closeSidebar(menuitem)\">\r\n              <i class=\"icon {{ menuitem[('icon'+_mode)]}}\"></i>\r\n              <span>{{ menuitem.name  }}</span>\r\n              <span class=\"mr-auto\"></span>\r\n              <span class=\"badge badge-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\r\n              <i class=\"menu-caret icon icon-arrows-right\" *ngIf=\"role(menuitem.role2) && menuitem.children && menuitem.children.length\"></i>\r\n            </a>\r\n            <a class=\"navigation-link {{menuitem.active_class}}\" href=\"javascript:;\" *ngIf=\"menuitem.type === 'sub'\">\r\n              <i class=\"icon {{ menuitem[('icon'+_mode)] }}\"></i>\r\n              <span>{{ menuitem.name  }}</span>\r\n              <span class=\"mr-auto\"></span>\r\n              <span class=\"badge badge-{{ badge.type }}\" *ngFor=\"let badge of menuitem.badge\">{{ badge.value }}</span>\r\n              <i class=\"menu-caret icon icon-arrows-right\" *ngIf=\"role(menuitem.role2) && menuitem.children && menuitem.children.length\"></i>\r\n            </a>\r\n            <ul class=\"navigation-submenu\" *ngIf=\"menuitem.children && menuitem.children.length\">\r\n              <ng-container *ngFor=\"let childitem of menuitem.children\">\r\n                <li *ngIf=\"role(childitem.role)\" class=\"navigation-item {{childitem.active_class}}\" routerLinkActive=\"open\">\r\n                  <a [routerLink]=\"childitem.filter !== false ? [childitem.state, childitem.filter] : [childitem.state]\" (click)=\"closeSidebar(childitem)\" class=\"navigation-link route_click relative\">\r\n                      <i class=\"icon {{ childitem[('icon'+_mode)]}}\"></i>\r\n                      <span>{{ childitem.name  }}</span>\r\n                      <span class=\"mr-auto\"></span>\r\n                      <i class=\"menu-caret icon icon-arrows-right\" *ngIf=\"role(childitem.role2) && childitem.children && childitem.children.length\"></i>\r\n                  </a>\r\n                  \r\n\r\n                  <ul class=\"navigation-submenu\" *ngIf=\"childitem.children && childitem.children.length\">\r\n                    <ng-container *ngFor=\"let childitem2 of childitem.children\">\r\n                      <li *ngIf=\"role(childitem2.role)\" class=\"navigation-item {{childitem2.active_class}}\" routerLinkActive=\"open\">\r\n                        <a [routerLink]=\"childitem2.filter !== false ? [childitem2.state, childitem2.filter] : [childitem2.state]\" (click)=\"closeSidebar(childitem2)\" class=\"navigation-link route_click relative\">{{ childitem2.name  }}</a>\r\n                      </li>\r\n                    </ng-container>\r\n                  </ul>\r\n\r\n\r\n                </li>\r\n              </ng-container>\r\n            </ul>\r\n          </li>\r\n        </ng-container>\r\n      </ul>\r\n      <div class=\"footer\">\r\n        Copyright © 2019 crawlersystem\r\n      </div>\r\n    </nav>\r\n  </ng-sidebar>\r\n\r\n  <perfect-scrollbar ng-sidebar-content class=\"app-inner page_inner\" [config]=\"config\" #mainScroll>\r\n    <a *ngIf=\"downing\" class=\"cricle_totop\" (click)=\"toTop()\">\r\n      <i class=\"icon icon-striped-arrow-up\"></i>\r\n    </a>\r\n    <div class=\"header_top\">\r\n      <nav class=\"navbar custom-navbar bg-faded main-header\">\r\n        <a href=\"javascript:void(0);\" class=\"nav-link\" id=\"table_resize\" (click)=\"changeMode()\">\r\n          <i class=\"icon icon-list_home\">\r\n            <span></span>\r\n          </i>\r\n        </a>\r\n        <span class=\"mr-auto\"></span>\r\n        <ul class=\"navbar-nav top-menu\">\r\n          <li class=\"nav-item user-profile\" ngbDropdown placement=\"bottom-right\">\r\n            <a href=\"javascript:;\" class=\"nav-link\" ngbDropdownToggle>\r\n              <img src=\"{{'assets/images/avatar1.jpg'}}\" class=\"navbar-avatar rounded-circle\" id=\"image_avatar\" />\r\n              <i class=\"icon icon-dow_seting\"></i>\r\n            </a>\r\n            <div ngbDropdownMenu class=\"dropdown-menu dropdown-menu-right\">\r\n              <div class=\"name_top\">{{user_info.display_name}}</div>\r\n              <a (click)=\"editStaff()\" class=\"dropdown-item\" href=\"javascript:;\">\r\n                <span>Cập nhật thông tin</span>\r\n              </a>\r\n              <div class=\"dropdown-divider\"></div>\r\n              <a class=\"dropdown-item\" (click)=\"changePassword()\">\r\n                <span>Đổi mật khẩu</span>\r\n              </a>\r\n              <div class=\"dropdown-divider\"></div>\r\n              <a (click)=\"logout()\" class=\"dropdown-item\" href=\"javascript:;\">\r\n                <span>Đăng xuất</span>\r\n              </a>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </nav>\r\n    </div>\r\n    <div class=\"main-content\">\r\n      <router-outlet></router-outlet>\r\n      <div [hidden]=\"!error_active\">\r\n        Không tìm thấy trang này\r\n      </div>\r\n    </div>\r\n  </perfect-scrollbar>\r\n\r\n</ng-sidebar-container>\r\n\r\n\r\n<change-password></change-password>\r\n<staff-edit [parent]=\"this\"></staff-edit>\r\n<simple-notifications [options]=\"notifications_options\"></simple-notifications>\r\n<ngx-loading [show]=\"user_info.loading\"></ngx-loading>"

/***/ }),

/***/ "../../../../../src/app/application/admin/admin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".configuration {\n  width: 240px;\n  position: fixed;\n  right: 0;\n  top: 150px;\n  margin-left: 0;\n  z-index: 99999999;\n  transition: -webkit-transform .3s ease-in-out;\n  transition: transform .3s ease-in-out;\n  transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;\n  -webkit-transform: translate(100%, 0);\n          transform: translate(100%, 0); }\n  .configuration .card {\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n    margin: 0;\n    border-radius: 0; }\n\n.configuration.active {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0); }\n\n.configuration-cog {\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  left: -50px;\n  line-height: 50px;\n  font-size: 24px;\n  text-align: center;\n  background: #fff;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);\n  border-top-left-radius: 2px;\n  border-bottom-left-radius: 2px;\n  cursor: pointer; }\n  .configuration-cog i:before {\n    line-height: 50px; }\n\n.page_inner span, .page_inner p, .page_inner div {\n  font-size: 14px; }\n\n.main-brand {\n  background-color: #fff;\n  border-radius: 0;\n  box-shadow: none;\n  border-right: 1px solid #e6e4e4; }\n\na, body, h1, h2, h3, h4, li, ul {\n  font-family: 'Roboto', sans-serif !important; }\n\nbody {\n  font-family: 'Roboto', sans-serif !important; }\n\n.nav_name {\n  margin-right: 10px; }\n\n.color_primary {\n  color: #3caa61; }\n\n/*Reponsive*/\n@media (max-width: 767px) {\n  .nav_name {\n    display: none; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_menu_items_menu_items__ = __webpack_require__("../../../../../src/app/application/admin/shared/menu-items/menu-items.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__ = __webpack_require__("../../../../../src/app/common/core/global_function.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_services_authenticate_service__ = __webpack_require__("../../../../../src/app/common/services/authenticate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_common_services_changepassword_service__ = __webpack_require__("../../../../../src/app/common/services/changepassword.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var load_information = false;
var AdminComponent = (function () {
    function AdminComponent(menuItems, router, route, modalService, titleService, changePass, authenticateService, user_info, zone) {
        this.menuItems = menuItems;
        this.router = router;
        this.route = route;
        this.modalService = modalService;
        this.titleService = titleService;
        this.changePass = changePass;
        this.authenticateService = authenticateService;
        this.user_info = user_info;
        this.zone = zone;
        this.theme = 'light';
        this.showSettings = false;
        this.isDocked = false;
        this.isBoxed = false;
        this.isOpened = true;
        this.mode = 'dock';
        // class = 'icon-next1';
        this._mode = this.mode;
        this._autoCollapseWidth = 991;
        this.width = window.innerWidth;
        this.notifications_options = {
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true
        };
        this.config = {
            wheelSpeed: 0.5,
            swipePropagation: false
        };
        this.image_avatar = '';
        this.load = false;
        this.error_active = false;
        this.isMobile = false;
        this.changeFilterModeWidth = 768;
        this.closing = true;
        this.disableTooltip = false;
        this.downing = false;
        __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].removeCookie('path');
    }
    AdminComponent.prototype.handleRole = function (id) {
        var _this = this;
        var that = this;
        this.user_info.getInformation().then(function (r) {
            if (r.code == 200) {
                __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */]['user_infor'] = that.user_info.getAttributes();
                that.image_avatar = that.user_info.showAttribute('image', that.user_info.avartar);
                if (!load_information) {
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].ROLE = r.role || {};
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].TIMESTAMPNOW = r.timestampnow;
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].ngay_nghi = r.date_expected;
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].LIST_TABLE_CORE = r.LIST_TABLE_CORE;
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].FILTER.LIST_FILTER = r.filter;
                    load_information = true;
                    if (that.user_info.isFirstLogin()) {
                        var link = '/admin/welcome';
                        var a = [link];
                    }
                    var href = '/admin/staffmanagement/index';
                    if (!that.user_info.isFirstLogin() && that.router.url == '/admin/welcome') {
                        window.location.href = href;
                    }
                    __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].DEFER.resolve(true);
                }
                _this.load = true;
            }
            else {
                that.authenticateService.logout().then(function (res) {
                    window.location.href = '/authenticate?urlb=' + encodeURIComponent(window.location.href);
                });
            }
        });
    };
    AdminComponent.prototype.role = function (action) {
        return __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].ROLE[action] ? true : false;
    };
    AdminComponent.prototype.onResize = function (event) {
        this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
    };
    AdminComponent.prototype.ngOnInit = function () {
        var that = this;
        this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
        if (this.isMobile) {
            this.isOpened = false;
        }
        this.route_active();
        document.title = 'crawlersystem';
        var token = __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].readCookie('token');
        var a = window.location.pathname.split('/');
        this.error_active = this.route.snapshot && this.route.snapshot['_routeConfig'] && this.route.snapshot['_routeConfig']['path'] == '**' ? true : false;
        if (token && token !== undefined) {
            var userInfo = __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].readCookie('userInfo');
            if (userInfo && userInfo !== undefined && userInfo != 'undefined') {
                try {
                    this.user_info.setAttributes(JSON.parse(userInfo));
                }
                catch (e) {
                    userInfo = userInfo.replace(/.*?("id"\:)/gi, '');
                    userInfo = parseInt(userInfo.replace(/,.*/gi, ''));
                    this.user_info.setAttributes({ id: userInfo });
                }
                this.changePass.setAttribute('id', this.user_info.id);
                this.handleRole(this.user_info.id);
            }
            var mode = __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].readCookie('mode');
            if (mode) {
                this._mode = mode;
            }
        }
        else {
            window.location.href = '/authenticate?urlb=' + encodeURIComponent(window.location.href);
        }
    };
    AdminComponent.prototype.addClass = function (className, element) {
        if (element && element.className) {
            element.className = element.className.concat(' ' + className);
        }
    };
    AdminComponent.prototype.ngAfterViewInit = function () {
        if (0 < parseInt($('.menu-mobile').css('width'))) {
            var thiz = this;
            setTimeout(function () {
                thiz.sidebar.close();
                thiz.disableTooltip = true;
            });
        }
        var that = this;
        // setTimeout(() => {
        //   if (that.mainScroll) {
        //     that.mainScroll.elementRef.nativeElement.addEventListener('ps-scroll-down', (event) => {
        //       if ($(event.target).hasClass('page_inner')) {
        //         $('.cricle_totop').removeClass('hide');
        //         that.downing = true;
        //       }
        //     });
        //     that.mainScroll.elementRef.nativeElement.addEventListener('ps-y-reach-start', (event) => {
        //       if ($(event.target).hasClass('page_inner')) {
        //         $('.cricle_totop').removeClass('hide');
        //         that.downing = false;
        //       }
        //     });
        //   }
        // }, 250);
    };
    AdminComponent.prototype.closeSidebar = function (menuitem) {
        if (this.isMobile) {
            this.closing = true;
            this.sidebar.close();
        }
        this.route_active(menuitem);
    };
    AdminComponent.prototype.sidebarOpen = function () {
        if (this.closing) {
            this.closing = false;
            this.sidebar.open();
        }
    };
    AdminComponent.prototype.closed = function () {
        this.closing = true;
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        if (this._router) {
            this._router.unsubscribe();
        }
    };
    AdminComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle('Crawlersystem | ' + newTitle);
    };
    AdminComponent.prototype.changeMode = function () {
        if (this._mode === 'dock') {
            this._mode = 'push';
            __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].createCookie('mode', 'push', null);
        }
        else {
            this._mode = 'dock';
            __WEBPACK_IMPORTED_MODULE_6__common_core_global_function__["b" /* GlobalFunction */].createCookie('mode', 'dock', null);
        }
        if (this.isMobile) {
            this.isOpened = !this.isOpened;
        }
        this.addClass('clicked', document.querySelector(".sidebar-panel"));
        this.addClass('clicked', document.querySelector(".app-inner"));
    };
    AdminComponent.prototype.isOver = function () {
        return window.matchMedia("(max-width: 991px)").matches;
    };
    AdminComponent.prototype.openSearch = function (search) {
        this.modalService.open(search, { windowClass: 'search', backdrop: false });
    };
    AdminComponent.prototype.logout = function () {
        this.authenticateService.logout().then(function (res) {
            window.location.href = '/authenticate';
        });
    };
    AdminComponent.prototype.changePassword = function () {
        $('#showChangePassword').trigger('click');
    };
    AdminComponent.prototype.editStaff = function () {
        $('#showChangeEditStaff').trigger('click');
    };
    AdminComponent.prototype.toTop = function () {
        var that = this;
        setTimeout(function () {
            document.querySelector('.page_inner').scrollTop = 0;
            that.downing = false;
        }, 50);
    };
    AdminComponent.prototype.route_active = function (menuitem) {
        if (menuitem === void 0) { menuitem = false; }
        var obj = {};
        for (var _i = 0, _a = this.menuItems.MENUITEMS; _i < _a.length; _i++) {
            var item = _a[_i];
            item['active_class'] = '';
            obj[item.state] = item;
            if (item['children'] && item['children'].length) {
                for (var _b = 0, _c = item['children']; _b < _c.length; _b++) {
                    var item_child = _c[_b];
                    item_child['active_class'] = '';
                    obj[item_child.state] = item_child;
                    obj[item_child.state].parent = item;
                }
            }
        }
        var state = menuitem ? menuitem.state : this.route['_routerState'].snapshot.url.replace(/;.*/gi, '');
        state = state.trim();
        if (state.match(/[0-9]+\/form$/gi)) {
            state = state.replace(/[0-9]+\/form$/gi, 'index');
        }
        if (obj[state]) {
            obj[state]['active_class'] = 'open';
            if (obj[state].parent) {
                obj[state].parent['active_class'] = 'open';
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidebar'),
        __metadata("design:type", Object)
    ], AdminComponent.prototype, "sidebar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AdminComponent.prototype, "onResize", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mainScroll'),
        __metadata("design:type", Object)
    ], AdminComponent.prototype, "mainScroll", void 0);
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/application/admin/admin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_menu_items_menu_items__["a" /* MenuItems */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_menu_items_menu_items__["a" /* MenuItems */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["d" /* Title */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9_app_common_services_changepassword_service__["a" /* ChangePasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_app_common_services_changepassword_service__["a" /* ChangePasswordService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__common_services_authenticate_service__["a" /* AuthenticateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__common_services_authenticate_service__["a" /* AuthenticateService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__common_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__common_services_user_service__["a" /* UserService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _j || Object])
    ], AdminComponent);
    return AdminComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_sidebar__ = __webpack_require__("../../../../ng-sidebar/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng_sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_core_global_db__ = __webpack_require__("../../../../../src/app/common/core/global_db.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__admin_route__ = __webpack_require__("../../../../../src/app/application/admin/admin.route.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__admin_component__ = __webpack_require__("../../../../../src/app/application/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_shared_module__ = __webpack_require__("../../../../../src/app/application/admin/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_services_authenticate_service__ = __webpack_require__("../../../../../src/app/common/services/authenticate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__changepassword_changepassword_component__ = __webpack_require__("../../../../../src/app/application/admin/changepassword/changepassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_common_services_changepassword_service__ = __webpack_require__("../../../../../src/app/common/services/changepassword.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_application_admin_fields_fields_module__ = __webpack_require__("../../../../../src/app/application/admin/fields/fields.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular4_notifications__ = __webpack_require__("../../../../angular4-notifications/components.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular4_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angular4_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_loading__ = __webpack_require__("../../../../ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_tooltip__ = __webpack_require__("../../../../ngx-tooltip/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ngx_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ngx_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_common_services_role_role_item_mul_service__ = __webpack_require__("../../../../../src/app/common/services/role_role_item_mul.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__common_component_tooltip_tooltip_module__ = __webpack_require__("../../../../../src/app/common/component/tooltip/tooltip.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__staff_edit_staff_edit_component__ = __webpack_require__("../../../../../src/app/application/admin/staff-edit/staff-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng2_device_detector__ = __webpack_require__("../../../../ng2-device-detector/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_perfect_scrollbar__ = __webpack_require__("../../../../angular2-perfect-scrollbar/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_perfect_scrollbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_angular2_perfect_scrollbar__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_14__changepassword_changepassword_component__["a" /* ChangePasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_22__staff_edit_staff_edit_component__["a" /* StaffEditComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_9__admin_route__["a" /* AdminRouter */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_11__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_16_app_application_admin_fields_fields_module__["a" /* FieldAdminModule */],
                __WEBPACK_IMPORTED_MODULE_18_ngx_loading__["a" /* LoadingModule */],
                __WEBPACK_IMPORTED_MODULE_19_ngx_tooltip__["TooltipModule"],
                __WEBPACK_IMPORTED_MODULE_21__common_component_tooltip_tooltip_module__["a" /* TooltipsModule */],
                __WEBPACK_IMPORTED_MODULE_17_angular4_notifications__["SimpleNotificationsModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__ng_bootstrap_ng_bootstrap__["c" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ng_sidebar__["SidebarModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23_ng2_device_detector__["a" /* Ng2DeviceDetectorModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_24_angular2_perfect_scrollbar__["PerfectScrollbarModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__common_core_global_db__["a" /* Global_DB */], __WEBPACK_IMPORTED_MODULE_12__common_services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_13__common_services_authenticate_service__["a" /* AuthenticateService */], __WEBPACK_IMPORTED_MODULE_15_app_common_services_changepassword_service__["a" /* ChangePasswordService */],
                __WEBPACK_IMPORTED_MODULE_17_angular4_notifications__["NotificationsService"], __WEBPACK_IMPORTED_MODULE_20_app_common_services_role_role_item_mul_service__["a" /* RoleRoleItemMulService */],
            ],
        })
    ], AdminModule);
    return AdminModule;
}());

//# sourceMappingURL=admin.module.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/admin.route.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRouter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_component__ = __webpack_require__("../../../../../src/app/application/admin/admin.component.ts");

var AdminRouter = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_0__admin_component__["a" /* AdminComponent */],
        children: [
            { path: '', redirectTo: 'staffmanagement/index', pathMatch: 'full' },
            { path: 'rolefull', loadChildren: './rolefull/rolefull.module#RolefullModule' },
            { path: 'staffmanagement', loadChildren: './staff-management/staff-management.module#StaffManagementModule' },
            { path: 'common', loadChildren: './settings-build/common.admin.module#CommonAdminModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'job', loadChildren: './job/job.module#JobModule' },
        ]
    },
    {
        path: '**',
        component: __WEBPACK_IMPORTED_MODULE_0__admin_component__["a" /* AdminComponent */],
    },
];
//# sourceMappingURL=admin.route.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/changepassword/changepassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"change-password\">\r\n  <button class=\"btn btn-secondary hide\" (click)=\"openPopup(content)\" id=\"showChangePassword\"></button>\r\n  <ng-template ngbModalContainer></ng-template>\r\n  <ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n      <form (ngSubmit)=\"change_pasword()\">\r\n    <div class=\"modal-header\">\r\n      <h6 class=\"modal-title text-uppercase\">Đổi mật khẩu</h6>\r\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"cbs_update_status_customer\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <fpassworduser [model]=\"changePassModel\" [labelValue]=\"'Mật khẩu hiện tại'\" [attribute]=\"'oldPassword'\"></fpassworduser>\r\n              <fpassworduser [model]=\"changePassModel\" [labelValue]=\"'Mật khẩu mới'\" [attribute]=\"'newPassword'\"></fpassworduser>\r\n              <fpassworduser [model]=\"changePassModel\" [labelValue]=\"'Nhập lại mật khẩu mới'\" [attribute]=\"'confirmPassword'\"></fpassworduser>\r\n            </div>\r\n          </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"cbs_btn_action\">\r\n            <button type=\"button\" class=\"btn_secondary\" (click)=\"c('Close click')\">Hủy</button>\r\n            <button type=\"submit\" class=\"cbs_btn btn_primary\">Đổi</button>\r\n          </div>\r\n    </div>\r\n  </form>\r\n  </ng-template>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/application/admin/changepassword/changepassword.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/admin/changepassword/changepassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_changepassword_service__ = __webpack_require__("../../../../../src/app/common/services/changepassword.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__ = __webpack_require__("../../../../angular4-notifications/src/notifications.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordComponent = (function () {
    // _model: ChangePasswordService;
    // @Input()
    // set changePassModel(value: Observable<any> | any) { this._model = value; }
    // get changePassModel() { return this._model; }
    function ChangePasswordComponent(modalService, changePassModel, user, notification_service) {
        this.modalService = modalService;
        this.changePassModel = changePassModel;
        this.user = user;
        this.notification_service = notification_service;
    }
    ChangePasswordComponent.prototype.openPopup = function (content) {
        var _this = this;
        this.changePassModel = new __WEBPACK_IMPORTED_MODULE_2__common_services_changepassword_service__["a" /* ChangePasswordService */](this.user._db, this.user.http);
        this.modalService.open(content, { 'windowClass': 'change-password' }).result.then(function (result) {
            _this.changePassModel.resetAttrs();
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.changePassModel.resetAttrs();
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    ChangePasswordComponent.prototype.close = function () {
        $(document.querySelector('.modal-header .close')).click();
    };
    ChangePasswordComponent.prototype.change_pasword = function () {
        var _this = this;
        var that = this;
        if (this.changePassModel.validate()) {
            that.user.loading = true;
            this.changePassModel.changePassword().then(function (rs) {
                if (rs.code == 200) {
                    that.notification_service.success('Thay đổi mật khẩu thành công', '');
                    that.changePassModel._error_api = {};
                    _this.close();
                }
                else {
                    that.changePassModel._error_api = rs.error;
                }
                that.user.loading = false;
            });
        }
        // if(this.user_service.validate()) {
        //     this.user_service.save().then(rs => {
        //         if(rs.code == 200) {
        //             that.close();
        //         } else {
        //             that.user_service._error_api = rs.error;
        //         }
        //     })
        // } else {
        //     console.log('loi roi', this.user_service._validate.getErrors());
        // }
    };
    ChangePasswordComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    ChangePasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'change-password',
            template: __webpack_require__("../../../../../src/app/application/admin/changepassword/changepassword.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/admin/changepassword/changepassword.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_changepassword_service__["a" /* ChangePasswordService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_changepassword_service__["a" /* ChangePasswordService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_common_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_common_services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__["NotificationsService"]) === "function" && _d || Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=changepassword.component.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_items_menu_items__ = __webpack_require__("../../../../../src/app/application/admin/shared/menu-items/menu-items.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            // declarations: [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
            // exports:      [ AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective ],
            providers: [__WEBPACK_IMPORTED_MODULE_1__menu_items_menu_items__["a" /* MenuItems */]]
        })
    ], SharedModule);
    return SharedModule;
}());

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/application/admin/staff-edit/staff-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-staff\">\r\n        <button class=\"btn btn-secondary hide\" (click)=\"openPopupStatus(content)\" id=\"showChangeEditStaff\"></button>\r\n        <ng-template ngbModalContainer></ng-template>\r\n        <ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n            <form (ngSubmit)=\"save_user()\">\r\n            <div class=\"modal-header\">\r\n                <h6 class=\"modal-title text-uppercase\">Cập nhật thông tin cá nhân</h6>\r\n                <button [hidden]=\"user_info.isFirstLogin()\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"cbs_update_status_customer\">\r\n                   \r\n                        <div class=\"row\" *ngIf=\"false\">\r\n                            <div class=\"col-12-ipad col-lg-6 user_edit_add\">\r\n                                <fmultiselectuser [model]=\"_model\" [attribute]=\"'user_role_mul'\"></fmultiselectuser>\r\n                            </div>\r\n                            <div class=\"col-12-ipad col-lg-6\">\r\n                                <ftextuser [model]=\"_model\" [attribute]=\"'display_name'\"></ftextuser>\r\n                                <ftextuser [model]=\"_model\" [attribute]=\"'phone'\"></ftextuser>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"true\">\r\n                            <div class=\"col-12-ipad col-lg-6 user_edit_add\">\r\n                                <div class=\"cbs_item_row row clearfix\">\r\n                                    <div class=\"col-5-ipad cbs_style_label col-xs-12 col-lg-5\">\r\n                                        <label>Email đăng nhập</label>\r\n                                    </div>\r\n                                    <div class=\"cbs_style_ip col-7-ipad col-xs-12 col-lg-7\">\r\n                                        {{ _model.email }}\r\n                                    </div>\r\n                                </div>\r\n                                <ftextuser [model]=\"_model\" [attribute]=\"'display_name'\"></ftextuser>\r\n                                <fmultiselectuser [model]=\"_model\" [attribute]=\"'user_role_mul'\" [disabled]=\"true\" [hide_html_drop]=\"true\" [labelOptions]=\"{html_label_require:'<b></b>'}\"></fmultiselectuser>\r\n                            </div>\r\n                            <div class=\"col-12-ipad col-lg-6\">\r\n                                <ftextuser [model]=\"_model\" [attribute]=\"'phone'\"></ftextuser>\r\n                                <!-- <foneimage [model]=\"_model\" [attribute]=\"'avartar'\" [auto_rotate]=\"true\"></foneimage> -->\r\n                            </div>\r\n                        </div>\r\n                       \r\n                    \r\n                </div>\r\n                <div class=\"cbs_update_status_customer\">\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                    <div class=\"cbs_btn_action\">\r\n                            <button type=\"button\" class=\"btn_secondary\" (click)=\"c('Close click')\" [hidden]=\"isFirstLogin()\">\r\n                                    Hủy</button>\r\n                            <button type=\"submit\" class=\"cbs_btn btn_primary cbs_btn_message\">\r\n                                Lưu</button>\r\n                           \r\n                        </div>\r\n            </div>\r\n        </form>\r\n        </ng-template>\r\n\r\n    </div>"

/***/ }),

/***/ "../../../../../src/app/application/admin/staff-edit/staff-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/application/admin/staff-edit/staff-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_user_service__ = __webpack_require__("../../../../../src/app/common/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__ = __webpack_require__("../../../../angular4-notifications/src/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_core_global_function__ = __webpack_require__("../../../../../src/app/common/core/global_function.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StaffEditComponent = (function () {
    function StaffEditComponent(route, router, modalService, notification_service, user_info) {
        this.route = route;
        this.router = router;
        this.modalService = modalService;
        this.notification_service = notification_service;
        this.user_info = user_info;
        this.confirmDone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(StaffEditComponent.prototype, "user_service", {
        get: function () { return this._model; },
        set: function (value) { this._model = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StaffEditComponent.prototype, "id", {
        get: function () { return this._id; },
        set: function (value) { this._id = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StaffEditComponent.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (value) { this._parent = value; },
        enumerable: true,
        configurable: true
    });
    StaffEditComponent.prototype.openPopupStatus = function (content) {
        var _this = this;
        this._model = new __WEBPACK_IMPORTED_MODULE_2__common_services_user_service__["a" /* UserService */](this.user_info._db, this.user_info.http);
        this._model.setAttributes(this.user_info.getAttributes());
        this._model._old_attributes = this.user_info._old_attributes;
        this._model.scenario = 'update';
        this.modalService.open(content, { 'windowClass': 'add-staff', 'backdrop': !this.user_info.isFirstLogin() }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    StaffEditComponent.prototype.close = function () {
        $(document.querySelector('.modal-header .close')).click();
    };
    StaffEditComponent.prototype.get_path_name = function () {
        return location.pathname.replace(/;.*/gi, '');
    };
    StaffEditComponent.prototype.save_user = function () {
        var _this = this;
        var that = this;
        if (this.user_service.validate()) {
            this.user_service.updateprofile().then(function (rs) {
                if (rs.code == 200) {
                    that.close();
                    that.notification_service.success('Cập nhật thông tin thành công', '');
                    that.user_info.setAttributes(_this.user_service);
                    that.parent.image_avatar = that.user_info.showAttribute('image', that.user_info.avartar);
                    __WEBPACK_IMPORTED_MODULE_5__common_core_global_function__["b" /* GlobalFunction */]['userInformation'].attributes = that.user_info.getAttributes();
                    that.confirmDone.emit(that.user_service.showAttributes());
                }
                else {
                    that.user_service._error_api = rs.error;
                }
            });
        }
        else {
            console.log('loi roi', this.user_service._validate.getErrors());
        }
    };
    StaffEditComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    StaffEditComponent.prototype.isFirstLogin = function () {
        return this._model.created_time === this._model.modified_time;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StaffEditComponent.prototype, "user_service", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StaffEditComponent.prototype, "id", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StaffEditComponent.prototype, "parent", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], StaffEditComponent.prototype, "confirmDone", void 0);
    StaffEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'staff-edit',
            template: __webpack_require__("../../../../../src/app/application/admin/staff-edit/staff-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/application/admin/staff-edit/staff-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular4_notifications_src_notifications_service__["NotificationsService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_user_service__["a" /* UserService */]) === "function" && _e || Object])
    ], StaffEditComponent);
    return StaffEditComponent;
    var _f, _g, _h, _j, _k, _l, _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=staff-edit.component.js.map

/***/ }),

/***/ "../../../../ng2-device-detector/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ng2DeviceDetectorModule; });
/* unused harmony export Ng2DeviceService */
/* unused harmony export ReTree */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");



/**
 * Created by ahsanayaz on 08/11/2016.
 */
var BROWSERS = {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    OPERA: 'opera',
    IE: 'ie',
    MS_EDGE: 'ms-edge',
    FB_MESSANGER: 'fb-messanger',
    UNKNOWN: 'unknown'
};
var DEVICES = {
    ANDROID: 'android',
    I_PAD: 'ipad',
    IPHONE: 'iphone',
    I_POD: 'ipod',
    BLACKBERRY: 'blackberry',
    FIREFOX_OS: 'firefox-os',
    CHROME_BOOK: 'chrome-book',
    WINDOWS_PHONE: 'windows-phone',
    PS4: 'ps4',
    VITA: 'vita',
    CHROMECAST: 'chromecast',
    APPLE_TV: 'apple-tv',
    GOOGLE_TV: 'google-tv',
    UNKNOWN: 'unknown'
};
var OS = {
    WINDOWS: 'windows',
    MAC: 'mac',
    IOS: 'ios',
    ANDROID: 'android',
    LINUX: 'linux',
    UNIX: 'unix',
    FIREFOX_OS: 'firefox-os',
    CHROME_OS: 'chrome-os',
    WINDOWS_PHONE: 'windows-phone',
    UNKNOWN: 'unknown'
};
var OS_VERSIONS = {
    WINDOWS_3_11: 'windows-3-11',
    WINDOWS_95: 'windows-95',
    WINDOWS_ME: 'windows-me',
    WINDOWS_98: 'windows-98',
    WINDOWS_CE: 'windows-ce',
    WINDOWS_2000: 'windows-2000',
    WINDOWS_XP: 'windows-xp',
    WINDOWS_SERVER_2003: 'windows-server-2003',
    WINDOWS_VISTA: 'windows-vista',
    WINDOWS_7: 'windows-7',
    WINDOWS_8_1: 'windows-8-1',
    WINDOWS_8: 'windows-8',
    WINDOWS_10: 'windows-10',
    WINDOWS_PHONE_7_5: 'windows-phone-7-5',
    WINDOWS_PHONE_8_1: 'windows-phone-8-1',
    WINDOWS_PHONE_10: 'windows-phone-10',
    WINDOWS_NT_4_0: 'windows-nt-4-0',
    MACOSX_15: 'mac-os-x-15',
    MACOSX_14: 'mac-os-x-14',
    MACOSX_13: 'mac-os-x-13',
    MACOSX_12: 'mac-os-x-12',
    MACOSX_11: 'mac-os-x-11',
    MACOSX_10: 'mac-os-x-10',
    MACOSX_9: 'mac-os-x-9',
    MACOSX_8: 'mac-os-x-8',
    MACOSX_7: 'mac-os-x-7',
    MACOSX_6: 'mac-os-x-6',
    MACOSX_5: 'mac-os-x-5',
    MACOSX_4: 'mac-os-x-4',
    MACOSX_3: 'mac-os-x-3',
    MACOSX_2: 'mac-os-x-2',
    MACOSX: 'mac-os-x',
    UNKNOWN: 'unknown'
};
var OS_RE = {
    WINDOWS: { and: [{ or: [/\bWindows|(Win\d\d)\b/, /\bWin 9x\b/] }, { not: /\bWindows Phone\b/ }] },
    MAC: { and: [/\bMac OS\b/, { not: /Windows Phone/ }] },
    IOS: { and: [{ or: [/\biPad\b/, /\biPhone\b/, /\biPod\b/] }, { not: /Windows Phone/ }] },
    ANDROID: { and: [/\bAndroid\b/, { not: /Windows Phone/ }] },
    LINUX: /\bLinux\b/,
    UNIX: /\bUNIX\b/,
    FIREFOX_OS: { and: [/\bFirefox\b/, /Mobile\b/] },
    CHROME_OS: /\bCrOS\b/,
    WINDOWS_PHONE: { or: [/\bIEMobile\b/, /\bWindows Phone\b/] },
    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
    VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
};
var BROWSERS_RE = {
    CHROME: { and: [{ or: [/\bChrome\b/, /\bCriOS\b/] }, { not: { or: [/\bOPR\b/, /\bEdge\b/] } }] },
    FIREFOX: /\bFirefox\b/,
    SAFARI: { and: [/^((?!CriOS).)*\Safari\b.*$/, { not: { or: [/\bOPR\b/, /\bEdge\b/, /Windows Phone/] } }] },
    OPERA: { or: [/Opera\b/, /\bOPR\b/] },
    IE: { or: [/\bMSIE\b/, /\bTrident\b/, /^Mozilla\/5\.0 \(Windows NT 10\.0; Win64; x64\)$/] },
    MS_EDGE: { or: [/\bEdge\b/] },
    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
    VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/,
    FB_MESSANGER: /\bFBAN\/MessengerForiOS\b/
};
var DEVICES_RE = {
    ANDROID: { and: [/\bAndroid\b/, { not: /Windows Phone/ }] },
    I_PAD: /\biPad\b/,
    IPHONE: { and: [/\biPhone\b/, { not: /Windows Phone/ }] },
    I_POD: /\biPod\b/,
    BLACKBERRY: /\bblackberry\b/,
    FIREFOX_OS: { and: [/\bFirefox\b/, /\bMobile\b/] },
    CHROME_BOOK: /\bCrOS\b/,
    WINDOWS_PHONE: { or: [/\bIEMobile\b/, /\bWindows Phone\b/] },
    PS4: /\bMozilla\/5.0 \(PlayStation 4\b/,
    CHROMECAST: /\bCrKey\b/,
    APPLE_TV: /^iTunes-AppleTV\/4.1$/,
    GOOGLE_TV: /\bGoogleTV\b/,
    VITA: /\bMozilla\/5.0 \(Play(S|s)tation Vita\b/
};
var OS_VERSIONS_RE = {
    WINDOWS_3_11: /Win16/,
    WINDOWS_95: /(Windows 95|Win95|Windows_95)/,
    WINDOWS_ME: /(Win 9x 4.90|Windows ME)/,
    WINDOWS_98: /(Windows 98|Win98)/,
    WINDOWS_CE: /Windows CE/,
    WINDOWS_2000: /(Windows NT 5.0|Windows 2000)/,
    WINDOWS_XP: /(Windows NT 5.1|Windows XP)/,
    WINDOWS_SERVER_2003: /Windows NT 5.2/,
    WINDOWS_VISTA: /Windows NT 6.0/,
    WINDOWS_7: /(Windows 7|Windows NT 6.1)/,
    WINDOWS_8_1: /(Windows 8.1|Windows NT 6.3)/,
    WINDOWS_8: /(Windows 8|Windows NT 6.2)/,
    WINDOWS_10: /(Windows NT 10.0)/,
    WINDOWS_PHONE_7_5: /(Windows Phone OS 7.5)/,
    WINDOWS_PHONE_8_1: /(Windows Phone 8.1)/,
    WINDOWS_PHONE_10: /(Windows Phone 10)/,
    WINDOWS_NT_4_0: { and: [/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/, { not: /Windows NT 10.0/ }] },
    MACOSX: /(MAC OS X\s*[^ 0-9])/,
    MACOSX_3: /(Darwin 10.3|Mac OS X 10.3)/,
    MACOSX_4: /(Darwin 10.4|Mac OS X 10.4)/,
    MACOSX_5: /(Mac OS X 10.5)/,
    MACOSX_6: /(Mac OS X 10.6)/,
    MACOSX_7: /(Mac OS X 10.7)/,
    MACOSX_8: /(Mac OS X 10.8)/,
    MACOSX_9: /(Mac OS X 10.9)/,
    MACOSX_10: /(Mac OS X 10.10)/,
    MACOSX_11: /(Mac OS X 10.11)/,
    MACOSX_12: /(Mac OS X 10.12)/,
    MACOSX_13: /(Mac OS X 10.13)/,
    MACOSX_14: /(Mac OS X 10.14)/,
    MACOSX_15: /(Mac OS X 10.15)/
};
var BROWSER_VERSIONS_RE_MAP = {
    CHROME: [/\bChrome\/([\d\.]+)\b/, /\bCriOS\/([\d\.]+)\b/],
    FIREFOX: /\bFirefox\/([\d\.]+)\b/,
    SAFARI: /\bVersion\/([\d\.]+)\b/,
    OPERA: [/\bVersion\/([\d\.]+)\b/, /\bOPR\/([\d\.]+)\b/],
    IE: [/\bMSIE ([\d\.]+\w?)\b/, /\brv:([\d\.]+\w?)\b/],
    MS_EDGE: /\bEdge\/([\d\.]+)\b/
};
var BROWSER_VERSIONS_RE = Object.keys(BROWSER_VERSIONS_RE_MAP).reduce(function (obj, key) {
    obj[BROWSERS[key]] = BROWSER_VERSIONS_RE_MAP[key];
    return obj;
}, {});


var Constants = Object.freeze({
	BROWSERS: BROWSERS,
	DEVICES: DEVICES,
	OS: OS,
	OS_VERSIONS: OS_VERSIONS,
	OS_RE: OS_RE,
	BROWSERS_RE: BROWSERS_RE,
	DEVICES_RE: DEVICES_RE,
	OS_VERSIONS_RE: OS_VERSIONS_RE,
	BROWSER_VERSIONS_RE_MAP: BROWSER_VERSIONS_RE_MAP,
	BROWSER_VERSIONS_RE: BROWSER_VERSIONS_RE
});

/**
 * Created by ahsanayaz on 08/11/2016.
 */
var ReTree = (function () {
    function ReTree() {
    }
    /**
     * @param {?} string
     * @param {?} regex
     * @return {?}
     */
    ReTree.prototype.test = function (string, regex) {
        var /** @type {?} */ self = this;
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }
        if (regex instanceof RegExp) {
            return regex.test(string);
        }
        else if (regex && Array.isArray(regex.and)) {
            return regex.and.every(function (item) {
                return self.test(string, item);
            });
        }
        else if (regex && Array.isArray(regex.or)) {
            return regex.or.some(function (item) {
                return self.test(string, item);
            });
        }
        else if (regex && regex.not) {
            return !self.test(string, regex.not);
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} string
     * @param {?} regex
     * @return {?}
     */
    ReTree.prototype.exec = function (string, regex) {
        var /** @type {?} */ self = this;
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }
        if (regex instanceof RegExp) {
            return regex.exec(string);
        }
        else if (regex && Array.isArray(regex)) {
            return regex.reduce(function (res, item) {
                return (!!res) ? res : self.exec(string, item);
            }, null);
        }
        else {
            return null;
        }
    };
    return ReTree;
}());

/**
 * Created by ahsanayaz on 08/11/2016.
 */
var Ng2DeviceService = (function () {
    function Ng2DeviceService() {
        this.ua = '';
        this.userAgent = '';
        this.os = '';
        this.browser = '';
        this.device = '';
        this.os_version = '';
        this.browser_version = '';
        this.ua = window.navigator.userAgent;
        this._setDeviceInfo();
    }
    /**
     * @return {?}
     */
    Ng2DeviceService.prototype._setDeviceInfo = function () {
        var _this = this;
        var /** @type {?} */ reTree = new ReTree();
        var /** @type {?} */ ua = this.ua;
        this.userAgent = ua;
        var /** @type {?} */ mappings = [
            { const: 'OS', prop: 'os' },
            { const: 'BROWSERS', prop: 'browser' },
            { const: 'DEVICES', prop: 'device' },
            { const: 'OS_VERSIONS', prop: 'os_version' },
        ];
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce(function (obj, item) {
                obj[Constants[mapping.const][item]] = reTree.test(ua, Constants[mapping.const + "_RE"][item]);
                return obj;
            }, {});
        });
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const])
                .map(function (key) {
                return Constants[mapping.const][key];
            }).reduce(function (previousValue, currentValue) {
                return (previousValue === Constants[mapping.const].UNKNOWN && _this[mapping.prop][currentValue])
                    ? currentValue : previousValue;
            }, Constants[mapping.const].UNKNOWN);
        });
        this.browser_version = '0';
        if (this.browser !== BROWSERS.UNKNOWN) {
            var /** @type {?} */ re = BROWSER_VERSIONS_RE[this.browser];
            var /** @type {?} */ res = reTree.exec(ua, re);
            if (!!res) {
                this.browser_version = res[1];
            }
        }
    };
    /**
     * @return {?}
     */
    Ng2DeviceService.prototype.getDeviceInfo = function () {
        return {
            userAgent: this.userAgent,
            os: this.os,
            browser: this.browser,
            device: this.device,
            os_version: this.os_version,
            browser_version: this.browser_version,
        };
    };
    /**
     * @return {?}
     */
    Ng2DeviceService.prototype.isMobile = function () {
        var _this = this;
        return [
            DEVICES.ANDROID,
            DEVICES.IPHONE,
            DEVICES.I_POD,
            DEVICES.BLACKBERRY,
            DEVICES.FIREFOX_OS,
            DEVICES.WINDOWS_PHONE,
            DEVICES.VITA
        ].some(function (item) {
            return _this.device === item;
        });
    };
    
    /**
     * @return {?}
     */
    Ng2DeviceService.prototype.isTablet = function () {
        var _this = this;
        return [
            DEVICES.I_PAD,
            DEVICES.FIREFOX_OS
        ].some(function (item) {
            return _this.device === item;
        });
    };
    
    /**
     * @return {?}
     */
    Ng2DeviceService.prototype.isDesktop = function () {
        var _this = this;
        return [
            DEVICES.PS4,
            DEVICES.CHROME_BOOK,
            DEVICES.UNKNOWN
        ].some(function (item) {
            return _this.device === item;
        });
    };
    
    return Ng2DeviceService;
}());
Ng2DeviceService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/**
 * @nocollapse
 */
Ng2DeviceService.ctorParameters = function () { return []; };

var Ng2DeviceDetectorModule = (function () {
    function Ng2DeviceDetectorModule() {
    }
    /**
     * @return {?}
     */
    Ng2DeviceDetectorModule.forRoot = function () {
        return {
            ngModule: Ng2DeviceDetectorModule,
            providers: [
                ReTree,
                Ng2DeviceService
            ]
        };
    };
    return Ng2DeviceDetectorModule;
}());
Ng2DeviceDetectorModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                ],
                declarations: [],
                exports: []
            },] },
];
/**
 * @nocollapse
 */
Ng2DeviceDetectorModule.ctorParameters = function () { return []; };




/***/ })

});
//# sourceMappingURL=admin.module.chunk.js.map