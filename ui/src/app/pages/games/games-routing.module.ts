import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { FeaturesComponent } from './features/features.component';
import { GamesComponent } from './games/games.component';
import { ListComponent as SalesListComponent } from './sales/list/list.component';
import { ListComponent as FeatureListComponent } from './features/list/list.component';
import { GamesDashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '', component: GamesComponent, children: [
      {
        path: '', component: GamesDashboardComponent
      },
      {
        path: 'sales', component: SalesComponent, children: [
          { path: '', component: SalesListComponent },
        ]
      },
      {
        path: 'features', component: FeaturesComponent, children: [
          { path: '', component: FeatureListComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
