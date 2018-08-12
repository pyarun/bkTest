import { Component, Renderer2, ElementRef, forwardRef, OnInit, Input } from "@angular/core";
import { WidgetComponent } from "ngx-dashboard";
import { UtilsService } from '../../../../utils/utils.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'widget-free-vs-paid',
  templateUrl: './free-vs-paid.component.html',
  styleUrls: ['./free-vs-paid.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => FreeVsPaidComponent) }]
})
export class FreeVsPaidComponent extends WidgetComponent implements OnInit {
  options;
  data;
  @Input() public widgetId: string;

  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);

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
          axisLabel: 'Year bucket'
        },
        yAxis: {
          axisLabel: 'No Of Games',
          axisLabelDistance: -10
        },
        yScale: d3.scale.sqrt()
      }

    };
    this.data = [];
  }

  ngOnInit() {
    this.getMetric();
  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights_freeVsPaid');
    this.http.get(url).subscribe(resp => {
      _.each(_.keys(resp), key => {
        resp[key] = _.filter(resp[key], item => {
          if (item['_id'] !== 'no_year') { return true; }
        })
      })
      this.data = [
        {
          key: 'Free',
          yAxis: 1,
          values: _.map(resp['free'], item => {
            return {
              x: item['_id'],
              y: item['count']
            };
          })
        },
        {
          key: 'Paid',
          yAxis: 1,
          values: _.map(resp['paid'], item => {
            return {
              x: item['_id'],
              y: item['count']
            };
          })
        },

      ];
    });
  }

}
