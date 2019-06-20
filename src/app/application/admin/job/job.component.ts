import { Component, ViewEncapsulation, AfterViewInit, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';

import { GlobalFunction } from '../../../common/core/global_function';
import { JobService } from '../models/job.service';
import { LogService } from '../models/log.service';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
})

export class JobComponent {


  job: any = {};
  log: any = {};
  result: any = {};
  showChecked: boolean = false;
  notifications_options: any = {
      timeOut: 3000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
  };


  constructor(private route: ActivatedRoute,
    private router: Router,
    public jobservice: JobService,
    public logservice: LogService) {
  }
  ngOnInit() {
    this.run();
  }
  ngAfterViewInit() {
  }
  role(action) {
    return GlobalFunction.ROLE[action] ? true : false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    clearInterval(this.clr);
  }
  sub: any = false;

  clr: any = false;

  run(){
    var that = this;
    this.sub = this.route.params.subscribe(async function(params) {
      const jobId = params['id'];
      that.jobservice.findOne(jobId).then(r => {
        that.job = that.jobservice.showAttributes();
      });
      
      that.logservice.findAll({JOB_ID:jobId,order_by: 'ID desc'}).then(r => {
        that.log = r;
      })
      that.jobservice.get(jobId).then(r => {
        that.result = r;
      })
      that.clr = setTimeout(function(){
        that.run();
      },10000);
    });
  }
}