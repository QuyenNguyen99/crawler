import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';

declare var $: any;

/**
 * Way to use:
 *  <div class="tooltip-sidebar">
 *      <tooltip #tooltips [content]="content" [enable]="enabled" [focusing]="focusing" [classes]="classes"></tooltip>
 *  </div>
 */

@Component({
    selector: 'tooltip',
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.component.scss']
})

export class TooltipsComponent {
    @Input()
    set content(vl: any) {
        this._content = vl;
    }
    get content() {
        return this._content;
    }
    @Input()
    set enable(vl: any) {
        this._enable = vl;
    }
    get enable() {
        return this._enable;
    }
    @Input()
    set focusing(vl: any) {
        this._focusing = vl;
    }
    get focusing() {
        return this._focusing;
    }
    @Input()
    set classes(vl: any) {
        this._classes = vl;
    }
    get classes() {
        return this._classes;
    }

    _enable: any;
    _classes: any;
    _content: any;
    _focusing: any;
}