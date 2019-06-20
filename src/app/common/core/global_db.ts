import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, Response } from '@angular/http';
import { GlobalFunction } from './global_function';

@Injectable()
export class Global_DB {
    constructor(private http: Http) { }
    dbname: string = '';

    getHeader() {
        let authData = GlobalFunction.readCookie('token');
        let header = new Headers();
        // header.append('x-access-token',authData);
        header.append('Accept', 'application/json');
        return header;
    }

    error(error: Response | any): Promise<any> {
        console.error('An error occurred', error, error.status, error.statusText);
        if(error.status == 405) {
            GlobalFunction.removeCookie('token');
            location.href =  '/authenticate?urlb=' + encodeURIComponent(window.location.href);
        }
        return Promise.reject(error.message || error);
    }

    result(res): Promise<any> {
        return Promise.resolve(JSON.parse(res._body));
    }
    setUrl(url) {
        url += (url.match(/\?/gi) ? '&' : '?') + 'token=' + GlobalFunction.readCookie('token');
        return url.replace('{dbname}', this.dbname);
    }
    link(url, data = undefined) {
        url = this.setUrl(url);
        if (data && typeof (data) == 'object') {
            url += (url.match(/\?/gi) ? '&' : '?') + GlobalFunction.get_url_param_by_object(data);
        }
        return url;
    }

    get(url, data = undefined) {
        url = this.link(url, data);
        return this.http.get(url, { headers: this.getHeader() }).toPromise().catch(this.error).then(this.result);
    }

    post(url, data = {}) {
        url = this.setUrl(url);
        return this.http.post(url, data, { headers: this.getHeader() }).toPromise().catch(this.error).then(this.result);
    }

    delete(url, data = undefined) {
        url = this.setUrl(url);
        if (data && typeof (data) == 'object') {
            url += (url.match(/\?/gi) ? '&' : '?') + GlobalFunction.get_url_param_by_object(data);
        }
        return this.http.delete(url, { headers: this.getHeader() }).toPromise().catch(this.error).then(this.result);
    }

    put(url, data = {}) {
        url = this.setUrl(url);
        return this.http.put(url, data, { headers: this.getHeader() }).toPromise().catch(this.error).then(this.result);
    }
}