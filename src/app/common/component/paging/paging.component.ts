import { Component, Input, AfterViewInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'paging',
    templateUrl: 'paging.component.html',
    styleUrls: []
})
export class PagingComponent implements AfterViewInit {

    @Input() limit_data: any;
    @Input()
    set count(vl: any) { if (vl) this._count = vl; }
    get count() { return this._count; }
    @Input()
    set limit(vl: any) { if (vl) this._limit = vl;}
    get limit() { return this._limit; }
    @Input()
    set page(vl: any) { if (vl) this._page = vl; }
    get page() { return this._page; }
    @Input()
    set range(vl: any) { if (vl) this._range = vl; }
    get range() { return this._range; }
    @Input()
    set showlimit(vl: any) { if (vl) this._showlimit = vl; }
    get showlimit() { return this._showlimit; }

    @Output('choosePaging') choosePaging: EventEmitter<any> = new EventEmitter<any>();
    @Output('changeLimit') changeLimit: EventEmitter<any> = new EventEmitter<any>();

    _count: any;
    _limit: any;
    _page: any;
    _range: any;
    _showlimit: any;
    list_paging: any = [];

    ngAfterViewInit() {
        this.init();
    }

    init(){
        var thix = this;
        setTimeout(function(){
            thix.paging();
        });
    }

    handleFilter(){
        var thix = this;
        setTimeout(function(){
            thix.paging();
        });
    }

    change_limit(event) {
        var thix = this;
        this.changeLimit.emit({
            type: 'changLimit',
            limit: this._limit
        });
        setTimeout(function(){
            thix.paging();
        });
    }

    pagingHandle(page: any = 1){
        var thix = this;
        this.choosePaging.emit({
            type: 'choose',
            limit: this._limit,
            page: page,
            range: this._range
        });
        setTimeout(function(){
            thix.paging();
        });
    }

    paging() {
        let totalPage = Math.ceil(this._count / this._limit);
        let range_start_other = 0;
        let start = this._page - this._range;
        if (start < 1) {
            range_start_other = 1 - start;
            start = 1;
        }

        let end = this._page + this._range + range_start_other;
        if (end > totalPage) {
            let range_end_other = end - totalPage;
            end = totalPage;
            start -= range_end_other;
            if (start < 1) start = 1;
        }

        let result = [];
        if (start > 1) {
            result.push({
                'id': 1,
                'name': '<<',
                'icon': 'icon-prevgroup',
            });
        }

        if (start > 2) {
            result.push({
                'id': this._page - 1,
                'name': '<',
                'icon': 'icon-prev',
            });
        }
        for (let i = start; i <= end; i++) {
            let item = {
                'id': i,
                'name': i,
            };
            if (i == this._page) {
                item['active'] = 1;
            }
            result.push(item);
        }
        if (end < totalPage - 1) {
            result.push({
                'id': this._page + 1,
                'name': '>',
                'icon': 'icon-next',
            });
        }
        if (end < totalPage) {
            result.push({
                'id': totalPage,
                'name': '>>',
                'icon': 'icon-nextgroup',
            });
        }
        this.list_paging = result;
    }
}