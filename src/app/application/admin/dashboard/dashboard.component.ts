import { Component, ViewEncapsulation, AfterViewInit, Input, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';


import { UserService } from 'app/common/services/user.service';
import { DashboardService } from 'app/common/services/dashboard.service';
import { JobService } from '../models/job.service';
import { NotificationsService } from 'angular4-notifications/src/notifications.service';
import { AdminOtherComponent } from 'app/application/admin/settings-build/admin/admin.other/admin.other.component';
import { AdminFormFieldService } from 'app/common/services/admin_form_field.service';
import { AdminFormService } from 'app/common/services/admin_form.service';
import { AdminFormTabService } from 'app/common/services/admin_form_tab.service';
import { GlobalFunction } from 'app/common/core/global_function';
declare var $: any;
import 'assets/js/jquery.CalendarHeatmap.min';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
    
    result: any = {};
    dailyresult: any = {};
    monthlyresult: any = {};
    yearlyresult: any = {};
    custom: any = {};
    ERRORDAY:  any = [];
    ERRORMONTH:  any = [];
    ERRORYEAR:  any = [];
    ERRORTOTAL:  any = [];
    admin_form: AdminFormService;
    admin_form_tab: AdminFormTabService;
    admin_form_field: AdminFormFieldService;
    jobService: any;
    dashboardservice: any;
  changeFilterModeWidth: number = 480;
  isMobile = false;
  optionkey: number = 0;

    constructor(private route3: ActivatedRoute, private router3: Router, public user_service: UserService, public notification_service3: NotificationsService) {
            
    }
    
    async ngOnInit() {
      this.reload_admin_table();
    }

    async reload_admin_table() {
        this.dashboardservice = new DashboardService(this.user_service._db, this.user_service.http);
        this.jobService = new JobService(this.user_service._db, this.user_service.http);
        this.dashboardservice.getTotalResult().then(r => {
          this.result = r;
        })
        this.dashboardservice.getTotalDailyResult().then(r => {
          this.dailyresult = r;
        });
        this.dashboardservice.getTotalMonthlyResult().then(r => {
          this.monthlyresult = r;
        })
        this.dashboardservice.getTotalYearlyResult().then(r => {
          this.yearlyresult = r;
        })
        this.dashboardservice.getOptionKey().then(r => {
          this.optionkey = r.data;
        });
        this.heatmap();

    }

    async changedate(){
      var dates = this.jobService.FINISH_TIME.split(" - ");
      var from = dates[0].split("-");
      var to = dates[1].split("-");
      var start = from[1]+"/"+from[0]+"/"+from[2];
      var end = to[1]+"/"+to[0]+"/"+to[2];
      this.custom = await this.dashboardservice.getTotalFromDateToDateResult(start,end);
    }

    async heatmap(){
      var x = await this.dashboardservice.getHeatchartdata();
      var data = [];
      for(var dat of x.data)
      {
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
        tooltips:{
          show: true
        }
      });
      var that = this;
      $(".ch-day").on("click",async function(){
        var date_ = $(this).attr("date_").split("-");
        var dat = date_[1]+"/"+date_[2]+"/"+date_[0];
        that.custom = await that.dashboardservice.getTotalExactlyDate(dat);
      })
    }

    async searchError(type,typeid){
      this.ERRORYEAR = [];
      this.ERRORMONTH = [];
      this.ERRORDAY = [];
      this.ERRORTOTAL = [];
      if(type=='total')
      {
        var total = await this.dashboardservice.getErrorTotallyResult(typeid);
        for(var t of total.data)
        {
          this.ERRORTOTAL.push(JSON.stringify(t,null,2));
        }
      }
      else if(type=='year')
      {
        var year = await this.dashboardservice.getErrorYearlyResult(typeid);
        for(var y of year.data)
        {
          this.ERRORYEAR.push(JSON.stringify(y,null,2));
        }
      }
      else if(type=='month')
      {
        var month = await this.dashboardservice.getErrorMonthlyResult(typeid);
        for(var m of month.data)
        {
          this.ERRORMONTH.push(JSON.stringify(m,null,2));
        }
      }
      else if(type=='day')
      {
        var day = await this.dashboardservice.getErrorDailyResult(typeid);
        for(var d of day.data)
        {
          this.ERRORDAY.push(JSON.stringify(d,null,2));
        }
      }
    }

    async updateoptionkey(){
      var rs = await this.dashboardservice.updateOptionKey(this.optionkey);
      if(rs.code != 200)
      {
        this.optionkey = (await this.dashboardservice.getOptionKey()).data;
        this.notification_service3.error('Cập nhật thất bại','');
      }
      else
      {
        this.notification_service3.success('Cập nhật thành công','');
      }
    }
    
}