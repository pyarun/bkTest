import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

declare var Urls: any;



@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getUrl(name: string, ...args: any[]) {
    const url = Urls[name].apply(this, args);
    return url;
  }

  public requestOptions(qp?: Object, responseType?) {
    const httpOptions = {};
    if (qp) {
      httpOptions['params'] = new HttpParams(<HttpParamsOptions>{ fromObject: qp });
    }
    return httpOptions;
  }
}
