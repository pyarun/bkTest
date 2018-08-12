import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer2, Input, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widget-users-vs-price',
  templateUrl: './users-vs-price.component.html',
  styleUrls: ['./users-vs-price.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => UsersVsPriceComponent) }]
})
export class UsersVsPriceComponent extends WidgetComponent implements OnInit {
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
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        showValues: true,
        focusEnable: false,
        duration: 500,
        xAxis: {
          axisLabel: 'Price'
        },
        yAxis: {
          axisLabel: 'Buyers',
          axisLabelDistance: 10
        },
        xScale: d3.scale.sqrt()
      }

    };
    this.data = [];
  }

  ngOnInit() {
    this.getMetric();
  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights-buys-vs-price');
    this.http.get(url).subscribe(resp => {
      this.data = [
        {
          key: '',
          values: _.map(resp, item => {
            return {
              x: item['_id']['max'],
              y: item['users']
            };
          })
        }
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
