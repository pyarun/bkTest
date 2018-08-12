import { Component, ViewChild, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DashboardComponent as WidgetDashComponent } from 'ngx-dashboard';
import { FreeVsPaidComponent } from '../widgets/free-vs-paid/free-vs-paid.component';
import { GenrePieComponent } from '../widgets/genre-pie/genre-pie.component';
import { SalesbyGenreComponent } from '../widgets/salesby-genre/salesby-genre.component';
import { SalesByRegionComponent } from '../widgets/sales-by-region/sales-by-region.component';
import { ReleaseCountByYearComponent } from '../widgets/release-count-by-year/release-count-by-year.component';
import { UsersVsPriceComponent } from '../widgets/users-vs-price/users-vs-price.component';
import { ByAgeComponent } from '../widgets/by-age/by-age.component';
import { SingleMultiPlayerComponent } from '../widgets/single-multi-player/single-multi-player.component';


@Component({
  selector: 'games-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class GamesDashboardComponent implements OnInit {
  @ViewChild(WidgetDashComponent) dashboard: WidgetDashComponent;
  widgets = {};
  activeWidgets = [];
  widgetMap = {
    gamesByGenre: GenrePieComponent,
    salesByGenre: SalesbyGenreComponent,
    salesByRegion: SalesByRegionComponent,
    gamesByYear: ReleaseCountByYearComponent,
    priceVsUsers: UsersVsPriceComponent,
    gamesByAgeGroup: ByAgeComponent,
    singleMultiPlayer: SingleMultiPlayerComponent,
    freeVsPaid: FreeVsPaidComponent,
  };
  constructor() {
    const widgets = JSON.parse(localStorage.getItem('dashboard:widgets'));
    console.log(widgets);
    this.widgets = {
      'gamesByGenre': { 'name': 'Games By Genre', visible: false, expandClass: 'col-6', },
      'salesByGenre': { 'name': 'Sales By Genre', visible: false, expandClass: 'col-6', },
      'salesByRegion': { 'name': 'Sales By Region', visible: false, expandClass: 'col-6' },
      'gamesByYear': { 'name': 'Games By Year', visible: false, expandClass: 'col-12' },
      'priceVsUsers': { 'name': 'Price Vs Users', visible: false, expandClass: 'col-6' },
      'gamesByAgeGroup': { 'name': 'Games By Age Group', visible: false, expandClass: 'col-6' },
      'singleMultiPlayer': { 'name': 'Single-Multi Player', visible: false, expandClass: 'col-12' },
      'freeVsPaid': { 'name': 'Free vs Paid Games', visible: false, expandClass: 'col-12' }
    };
    if (widgets) {
      this.widgets = widgets;
    }
  }

  ngOnInit() {
    _.each(this.popWidgetList(this.widgets), w => {
      console.log('wdiget', w)
      if (w.visible) {
        w.visible = !w.visible; // a hack 
        this.addWidget(w);
      }
    });
  }


  popWidgetList(widgets) {
    // return _.values(widgets);
    return _.map(_.keys(widgets), key => {
      const val = widgets[key];
      val['code'] = key;
      return val;
    })

  }

  addWidget(graph) {
    graph.visible = !graph.visible;
    if (graph.visible) {
      const ref: FreeVsPaidComponent = this.dashboard.addItem(this.widgetMap[graph['code']]);
      ref.widgetId = Math.random() + '';
      graph['id'] = ref.widgetId;
      this.activeWidgets.push(graph);
    } else {
      this.dashboard.removeItemById(graph['id'])
    }
    localStorage.setItem("dashboard:widgets", JSON.stringify(this.widgets));
  }

  close(e: any, id: string) {

    this.dashboard.removeItemById(id);
    e.preventDefault();
    e.stopPropagation();
  }

}
