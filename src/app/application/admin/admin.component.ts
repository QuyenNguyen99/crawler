import { Component, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuItems } from './shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { GlobalFunction } from '../../common/core/global_function';
import { AuthenticateService } from '../../common/services/authenticate.service';
import { UserService } from '../../common/services/user.service';
import { ChangePasswordService } from 'app/common/services/changepassword.service';

declare var $: any;

var load_information = false;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {

  private _router: Subscription;

  options: Options;
  theme = 'light';
  showSettings = false;
  isDocked = false;
  isBoxed = false;
  isOpened = true;
  mode = 'dock';
  // class = 'icon-next1';
  _mode = this.mode;
  _autoCollapseWidth = 991;
  width = window.innerWidth;
  notifications_options: any = {
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true
  };
  config: any = {
    wheelSpeed: 0.5,
    swipePropagation: false
  }

  @ViewChild('sidebar') sidebar;

  constructor(
    public menuItems: MenuItems,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private titleService: Title,
    private changePass: ChangePasswordService,
    private authenticateService: AuthenticateService,
    public user_info: UserService,
    private zone: NgZone) {
    GlobalFunction.removeCookie('path');
  }
  image_avatar: any = '';
  load = false;
  handleRole(id: any) {
    var that = this;
    this.user_info.getInformation().then(r => {
      if (r.code == 200) {
        GlobalFunction['user_infor'] = that.user_info.getAttributes();
        that.image_avatar = that.user_info.showAttribute('image', that.user_info.avartar);
        if (!load_information) {
          GlobalFunction.ROLE = r.role || {};
          GlobalFunction.TIMESTAMPNOW = r.timestampnow;
          GlobalFunction.ngay_nghi = r.date_expected;
          GlobalFunction.LIST_TABLE_CORE = r.LIST_TABLE_CORE;
          GlobalFunction.FILTER.LIST_FILTER = r.filter;
          load_information = true;
          if (that.user_info.isFirstLogin()) {
            var link = '/admin/welcome';
            var a: any = [link];
          }
          var href = '/admin/staffmanagement/index';
          if (!that.user_info.isFirstLogin() && that.router.url == '/admin/welcome') {
            window.location.href = href;
          }

          GlobalFunction.DEFER.resolve(true);
        }
        this.load = true;
      } else {
        that.authenticateService.logout().then(res => {
          window.location.href = '/authenticate?urlb=' + encodeURIComponent(window.location.href);
        });
      }
    });
  }
  role(action) {
    return GlobalFunction.ROLE[action] ? true : false;
  }

  error_active: any = false;
  isMobile: boolean = false;
  changeFilterModeWidth: number = 768;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
  }
  sub: any;
  ngOnInit(): void {
    var that = this;
    this.isMobile = this.changeFilterModeWidth >= window.innerWidth;
    if (this.isMobile) {
      this.isOpened = false;
    }
    this.route_active();
    document.title = 'crawlersystem';
    var token = GlobalFunction.readCookie('token');
    var a = window.location.pathname.split('/');
    this.error_active = this.route.snapshot && this.route.snapshot['_routeConfig'] && this.route.snapshot['_routeConfig']['path'] == '**' ? true : false;
    if (token && token !== undefined) {
      var userInfo = GlobalFunction.readCookie('userInfo');
      if (userInfo && userInfo !== undefined && userInfo != 'undefined') {
        try {
          this.user_info.setAttributes(JSON.parse(userInfo));
        } catch (e) {
          userInfo = userInfo.replace(/.*?("id"\:)/gi, '');
          userInfo = parseInt(userInfo.replace(/,.*/gi, ''));
          this.user_info.setAttributes({ id: userInfo });
        }

        this.changePass.setAttribute('id', this.user_info.id);
        this.handleRole(this.user_info.id);
      }

      let mode = GlobalFunction.readCookie('mode');
      if (mode) {
        this._mode = mode;
      }

    } else {
      window.location.href = '/authenticate?urlb=' + encodeURIComponent(window.location.href);
    }

  }


  addClass(className, element) {
    if (element && element.className) {
      element.className = element.className.concat(' ' + className);
    }
  }

  closing: boolean = true;
  disableTooltip: boolean = false;
  @ViewChild('mainScroll') mainScroll: any;
  ngAfterViewInit(): void {
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
  }

  closeSidebar(menuitem) {
    if (this.isMobile) {
      this.closing = true;
      this.sidebar.close();
    }
    this.route_active(menuitem);
  }

  sidebarOpen() {
    if (this.closing) {
      this.closing = false;
      this.sidebar.open();
    }
  }

  closed() {
    this.closing = true;
  }

  ngOnDestroy() {
    if (this._router) {
      this._router.unsubscribe();
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle('Crawlersystem | ' + newTitle);
  }

  changeMode(): void {
    if (this._mode === 'dock') {
      this._mode = 'push';
      GlobalFunction.createCookie('mode', 'push', null);
    } else {
      this._mode = 'dock';
      GlobalFunction.createCookie('mode', 'dock', null);
    }
    if (this.isMobile) {
      this.isOpened = !this.isOpened;
    }
    this.addClass('clicked', document.querySelector(".sidebar-panel"));
    this.addClass('clicked', document.querySelector(".app-inner"));
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }

  openSearch(search) {
    this.modalService.open(search, { windowClass: 'search', backdrop: false });
  }


  logout() {
    this.authenticateService.logout().then(res => {
      window.location.href = '/authenticate';
    });
  }
  changePassword() {
    $('#showChangePassword').trigger('click');
  }

  editStaff() {
    $('#showChangeEditStaff').trigger('click');
  }
  downing: boolean = false;
  toTop() {
    var that = this;
    setTimeout(function () {
      document.querySelector('.page_inner').scrollTop = 0;
      that.downing = false;
    }, 50);
  }

  

  route_active(menuitem: any = false) {
    var obj = {};
    for(var item of this.menuItems.MENUITEMS) {
      item['active_class'] = '';
      obj[item.state] = item;
      if(item['children'] && item['children'].length) {
        for(var item_child of item['children']){
          item_child['active_class'] = '';
          obj[item_child.state] = item_child;
          obj[item_child.state].parent = item;
        }
      }
    }
    var state = menuitem ? menuitem.state : this.route['_routerState'].snapshot.url.replace(/;.*/gi,'');
    state = state.trim();
    if(state.match(/[0-9]+\/form$/gi)) {
      state = state.replace(/[0-9]+\/form$/gi,'index');
    }
    if(obj[state]) {
      obj[state]['active_class'] = 'open';
      if(obj[state].parent) {
        obj[state].parent['active_class'] = 'open';
      }
    }
  }
}
