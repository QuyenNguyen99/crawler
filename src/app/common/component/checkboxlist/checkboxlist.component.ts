import { Component, Input, Output, ViewChild, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { GlobalFunction } from '../../../common/core/global_function';

declare var $: any;

@Component({
    selector: 'fcheckboxlist',
    templateUrl: 'checkboxlist.component.html',
    styleUrls: ['checkboxlist.component.scss']
})

export class CheckboxListComponent {
    _model: any;
    _modelSearch: any = [];
    @Input()
    set model(vl: any) {
        if (vl) {
            this._model = vl;
            this._modelSearch = GlobalFunction.cloneArray(vl);
        }
    }
    get model() {
        return this._model;
    }
    _label: any = '';
    @Input()
    set label(vl: any) {
        this._label = vl;
    }
    get label() {
        return this._label;
    }
    _class_a: any = '';
    @Input()
    set class_a(vl: any) {
        this._class_a = vl;
    }
    get class_a() {
        return this._class_a;
    }
    _icons: any = [];
    @Input()
    set icons(vl: any) {
        this._icons = vl;
    }
    get icons() {
        return this._icons;
    }

    _attribute: any;
    @Input()
    set attribute(vl: any) {
        if (vl) {
            this._attribute = vl;
        }
    }
    get attribute() {
        return this._attribute;
    }


    // _settingTabble: any = false;
    // @Input()
    // set settingTabble(vl: any){
    //     if(vl){
    //         this._settingTabble = vl;
    //     }
    // }
    // get settingTabble(){
    //     return this._settingTabble;
    // }

    // _settingilter: any = false;
    // @Input()
    // set settingilter(vl: any){
    //     if(vl){
    //         this._settingilter = vl;
    //     }
    // }
    // get settingilter(){
    //     return this._settingilter;
    // }

    @Output('changelist') changelist: EventEmitter<any> = new EventEmitter();

    show: boolean = false;


    @ViewChild('dropdownContent') dropdownContent: any;

    showHideList(isShow) {
        this.show = isShow;
    }
    id: any = 'checkboxlist';
    openList() {
        this.id = 'checkboxlist' + new Date().getTime();
        var that = this;
        this.searchString = '';
        this._modelSearch = GlobalFunction.cloneArray(this._model);
        function click_func(e) {
            if (!e.target['closest']('#' + that.id)) {
                that.show = false;
                document.body.removeEventListener('click', click_func);
            }
        }
        document.body.addEventListener('click', click_func);
        this.show = !this.show;
    }

    chooseList: any = [];
    chooseCheckbox(value: any) {
        if (value) {
            for (var i in this.model) {
                if (value['id'] == this.model[i]['id']) {
                    this._model[i]['checked'] = value['checked'];
                }
            }
        }
        this.changelist.emit(value);
    }

    searchString: any = '';
    search(event) {
        this.searchString = event;
        this._modelSearch = GlobalFunction.searchInArrayObject(this.searchString, this._model, 'label');
    }
}