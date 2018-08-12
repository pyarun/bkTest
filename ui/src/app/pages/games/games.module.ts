import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { SalesComponent } from './sales/sales.component';
import { FeaturesComponent } from './features/features.component';
import { GamesComponent } from './games/games.component';

import { ListComponent } from './sales/list/list.component';
import { ListComponent as FeatureListComponent } from './features/list/list.component';

import { WidgetsModule } from './widgets/widgets.module';
import { UtilsModule } from '../../utils/utils.module';
import { GamesDashboardComponent } from './dashboard/dashboard.component';
import { NvD3Module } from 'ng2-nvd3';
import { NgDashboardModule } from 'ngx-dashboard';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
    WidgetsModule,
    UtilsModule,
    NvD3Module,
    NgDashboardModule
  ],
  // exports: [GamesDashboardComponent],
  declarations: [SalesComponent, FeaturesComponent, GamesComponent, ListComponent, FeatureListComponent, GamesDashboardComponent]
})
export class GamesModule { }
