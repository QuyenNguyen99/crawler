import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupcomponentComponent } from "app/common/component/popup/popup.component";
import { GlobalFunction } from "app/common/core/global_function";
import { API } from 'app/config/api';
import { Global_DB } from '../../../core/global_db';
declare var $: any;

@Component({
    selector: 'importexcel',
    templateUrl: 'import-excel.component.html',
})
export class ImportExcelComponent extends PopupcomponentComponent {
    constructor(private modalService1: NgbModal, private db: Global_DB) { 
        super(modalService1);
    }
    file: any;
    link: any;
    check_file(file) {
        var a = file.type.split('/');
        var flag = false;
        if(a.length == 2 && GlobalFunction.contains(a[1],['vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.ms-excel'])) {
            flag = true;
        }
        return flag;
    }

    upload_file(event) {
        var file = event.target.files[0];
        if (this.check_file(file)) {
            if (file.size < 10 * 1024 * 1024) {
                var that = this;
                this.file = file;
                var reader = new FileReader();
                reader.onloadend = function () {
                    that.file = reader.result;
                    // that.db.post(that._link_api, Object.assign({ content: reader.result, name: file.name }, that._attribute_api)).then(r => {
                    //     if (r.code == 200) {
                    //         that.link_file = r.attributes.link;
                    //         that._value = r.attributes.name;
                    //         that.sendModelChange(that._value);
                    //         event.target.value = '';
                    //         that.valueChanged.emit({
                    //             type: 'change'
                    //         });
                    //     } else {
                    //         event.target.value = '';
                    //         that.obj_message.open({
                    //             title: 'Lỗi file',
                    //             content: r.error,
                    //             autoClose: true,
                    //         });
                    //     }
                    // })
                }
                reader.readAsDataURL(file);
            } else {
                this.file = undefined;
                event.target.value = '';
            }
        } else {

        }
    }
    
    downloadTemplate(args) {
        var that = this;
        this.db.put(API.DOWNLOADTEMPLATE, {
                data: this.message.link
            }).then(res => {
                if(res.code==200)
                {
                    var link;
                    link = document.createElement('a');
                    link.setAttribute('href', "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + res.data);
                    link.setAttribute('download', that.message.link);
                    link.click();
                }
        });
    };
}