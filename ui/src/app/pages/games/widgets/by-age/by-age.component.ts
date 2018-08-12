import { Component, OnInit, EventEmitter, Output, forwardRef, Input, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../../../utils/utils.service';
import { WidgetComponent } from 'ngx-dashboard';

@Component({
  selector: 'widgets-games-by-age',
  templateUrl: './by-age.component.html',
  styleUrls: ['./by-age.component.scss'],
  providers: [{ provide: WidgetComponent, useExisting: forwardRef(() => ByAgeComponent) }]
})
export class ByAgeComponent extends WidgetComponent implements OnInit {

  flags: any = {
    expanded: false
  };
  options;
  data;
  @Input() public widgetId: string;

  constructor(ngEl: ElementRef, renderer: Renderer2, private http: HttpClient, private utils: UtilsService) {
    super(ngEl, renderer);

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
          axisLabel: 'Age Group'
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
    const url = this.utils.getUrl('apis:insights-count-by-age');
    this.http.get(url).subscribe(resp => {
      this.data = [{
        key: '',
        values: resp
      }];
    });
  }

}
