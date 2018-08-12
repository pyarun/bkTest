import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  salesList(queryParams: Object = {}) {
    const url = this.utils.getUrl('apis:vgsales-list');
    return this.http.get(url, this.utils.requestOptions());
  }

  featureList(queryParams: Object = {}) {
    const url = this.utils.getUrl('apis:gfeatures-list');
    return this.http.get(url, this.utils.requestOptions());
  }

}
