import { Component, OnInit, EventEmitter, Output, Input, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import * as _ from 'lodash';
import { WidgetComponent } from 'ngx-dashboard';
declare let d3: any;

@Component({
  selector: 'widgets-sales-by-region',
  templateUrl: './sales-by-region.component.html',
  styleUrls: ['./sales-by-region.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => SalesByRegionComponent) }]
})
export class SalesByRegionComponent extends WidgetComponent implements OnInit {
  @Output()
  onExpand: EventEmitter<string>;
  flags: any = {
    expanded: false
  }
  options;
  data;
  @Input() public widgetId: string;
  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);
    this.onExpand = new EventEmitter();
    this.options = {
      chart: {
        "type": "pieChart",
        "height": 300,
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
      },
    }
    this.data = []
  }
  ngOnInit() {

    this.getMetric();
  }
  getMetric() {
    const url = this.utils.getUrl('apis:insights-sales-by-region');
    this.http.get(url).subscribe(resp => {
      this.data = [
        { label: 'North America', value: resp['na_sales'] },
        { label: 'Eurpoe', value: resp['eu_sales'] },
        { label: 'Japan', value: resp['jp_sales'] },
        { label: 'Other', value: resp['other_sales'] },
      ];
    });
  }



  expand() {
    this.flags.expanded = !this.flags.expanded;
    let klass;
    if (this.flags.expanded) {
      klass = 'col-12';
    } else {
      klass = 'col-6'
    }
    this.onExpand.emit(klass);
  }




}
