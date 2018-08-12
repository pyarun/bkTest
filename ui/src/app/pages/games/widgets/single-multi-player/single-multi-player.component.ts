import { Component, OnInit, Renderer2, ElementRef, Input, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import * as _ from 'lodash';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widget-single-multi-player',
  templateUrl: './single-multi-player.component.html',
  styleUrls: ['./single-multi-player.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => SingleMultiPlayerComponent) }]
})
export class SingleMultiPlayerComponent extends WidgetComponent implements OnInit {
  options;
  dataGameCount;
  dataPlayerCount;

  @Input() public widgetId: string;
  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);
    this.options = {
      chart: {
        "type": "pieChart",
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
        donut: true,
        "height": 300,
        "showLabels": true,
        "duration": 500,
        "labelType": "percent",
        "labelThreshold": 0.01,
        // "labelSunbeamLayout": true,
        showLegend: true,
        pie: {
          startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
          endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
        }

      },
      title: {
        "enable": true,
        "text": "Write Your Title",
        "className": "h4",
        "css": {
          "width": "nullpx",
          "textAlign": "center"
        }
      }
    }
    this.dataGameCount = [];
    this.dataPlayerCount = [];


  }

  ngOnInit() {
    this.getMetric();

  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights-single-multi-player');
    this.http.get(url).subscribe(resp => {
      this.dataGameCount = _.map(_.keys(resp), key => {
        return { label: key, value: resp[key][0]['count'] }
      });

      this.dataPlayerCount = _.map(_.keys(resp), key => {
        return { label: key, value: resp[key][0]['owners'] }
      });

    });
  }

}
