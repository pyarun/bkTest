import { Component, OnInit, Output, EventEmitter, Input, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { UtilsService } from '../../../../utils/utils.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widgets-release-count-by-year',
  templateUrl: './release-count-by-year.component.html',
  styleUrls: ['./release-count-by-year.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => ReleaseCountByYearComponent) }]
})
export class ReleaseCountByYearComponent extends WidgetComponent implements OnInit {
  @Output()
  onExpand: EventEmitter<string>;
  flags: any = {
    expanded: false
  };
  options;
  data;
  @Input() public widgetId: string;
  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);
    this.onExpand = new EventEmitter();
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function (d) { return d._id; },
        y: function (d) { return d.count; },
        showValues: true,

        duration: 500,
        xAxis: {
          axisLabel: 'Year'
        },
        yAxis: {
          axisLabel: 'No. Of Games',
          // axisLabelDistance: -10
        }
      }

    };
    this.data = [];
  }

  ngOnInit() {
    this.getMetric();
  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights-year-count');
    this.http.get(url).subscribe(resp => {
      this.data = [{
        key: '',
        values: _.map(resp, item => {
          if (!item._id) {
            item._id = "N/A"
          }
          return item;
        })
      }];
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
