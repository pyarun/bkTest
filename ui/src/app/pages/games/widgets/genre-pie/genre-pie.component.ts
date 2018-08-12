import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, forwardRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import * as _ from 'lodash';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widgets-genre-pie',
  templateUrl: './genre-pie.component.html',
  styleUrls: ['./genre-pie.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => GenrePieComponent) }]
})
export class GenrePieComponent extends WidgetComponent implements OnInit {
  @Output()
  onExpand: EventEmitter<string>;
  flags: any = {
    expanded: false
  }
  options;
  countPieData;
  @Input() public widgetId: string;
  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);
    this.options = {
      chart: {
        "type": "pieChart",
        x: function (d) { return d.label; },
        y: function (d) { return d.value; },

        "height": 300,
        "showLabels": true,
        "duration": 500,
        "labelType": "percent",
        "labelThreshold": 0.01,
        "labelSunbeamLayout": true,
        showLegend: true,
        "title": true,
        "legend": {
          "margin": {
            "top": 5,
            "right": 35,
            "bottom": 5,
            "left": 0
          }
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
    this.countPieData = [];

    this.onExpand = new EventEmitter();
  }

  ngOnInit() {
    this.getMetric();

  }

  getMetric() {
    const url = this.utils.getUrl('apis:insights-genre');
    this.http.get(url).subscribe(resp => {
      this.countPieData = _.map(resp, item => {
        return { label: item['_id'], value: item['count'] };
      });

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
    this.countPieData = this.countPieData;
    this.onExpand.emit(klass);
  }



}
