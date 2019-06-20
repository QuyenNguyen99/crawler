import { Component, ViewEncapsulation, AfterViewInit, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';

import { GlobalFunction } from '../../../common/core/global_function';
import { RoleRoleItemMulService } from '../../../common/services/role_role_item_mul.service';

@Component({
  selector: 'role-list',
  templateUrl: './rolefull.component.html',
})

export class RolefullComponent {


  sub: any;
  showChecked: boolean = false;
  notifications_options: any = {
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
  };
  action = [];
  columns = [];


  constructor(private route: ActivatedRoute,
    private router: Router,
    public role_role_item_mul_service: RoleRoleItemMulService) {
  }
  ngOnInit() {
    var that = this;
    this.role_role_item_mul_service.get_header_role().then(r => {
      that.columns = r;
      for(var i in that.columns){
        that.columns[i]['checked'] = true;
      }
    })
  }
  ngAfterViewInit() {
  }
  role(action) {
    return GlobalFunction.ROLE[action] ? true : false;
  }
}