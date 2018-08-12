import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import * as _ from 'lodash';
import { UtilsService } from '../../../../utils/utils.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filters: Object;
  items: any[];
  headers: string[];
  constructor(private utils: UtilsService, private apis: HttpService) {
    this.filters = {
      limit: 100,
      offset: 0
    };
    this.items = [];
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.apis.salesList(this.filters).subscribe(resp => {
      this.items = resp['results'];
      console.log(this.items);
      if (this.items.length >= 1) {
        this.headers = _.keys(this.items[0]);
      }
    });
  }

  rowItems(row) {
    const items = [];
    _.each(this.headers, key => {
      items.push(row[key]);
    });
    return items;
  }

}
