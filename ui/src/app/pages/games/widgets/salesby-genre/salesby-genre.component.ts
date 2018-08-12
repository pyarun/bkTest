import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer2, Input, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import * as _ from 'lodash';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widget-salesby-genre',
  templateUrl: './salesby-genre.component.html',
  styleUrls: ['./salesby-genre.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => SalesbyGenreComponent) }]
})
export class SalesbyGenreComponent extends WidgetComponent implements OnInit {
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
        "type": "multiBarHorizontalChart",
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },
        showControls: false,
        showLegend: false,
        "height": 300,
        "showLabels": true,
        "duration": 500,
        // "labelType": "percent",
        // "labelThreshold": 0.01,
        // "labelSunbeamLayout": true,

        "title": true,
        "legend": {
          "margin": {
            "top": 5,
            "right": 35,
            "bottom": 5,
            "left": 0
          }
        }
      }
    }
    this.data = [];

  }

  ngOnInit() {
    this.getMetric();
  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights-genre');
    this.http.get(url).subscribe(resp => {
      this.data = [
        {
          key: '',
          values: _.map(resp, item => {
            return { label: item['_id'], value: item['global_sales'] };
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
