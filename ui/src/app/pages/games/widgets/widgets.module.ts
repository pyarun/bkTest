import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenrePieComponent } from './genre-pie/genre-pie.component';
import { UtilsModule } from '../../../utils/utils.module';
import { SalesByRegionComponent } from './sales-by-region/sales-by-region.component';
import { ReleaseCountByYearComponent } from './release-count-by-year/release-count-by-year.component';
import { UsersVsPriceComponent } from './users-vs-price/users-vs-price.component';
import { ByAgeComponent } from './by-age/by-age.component';
import { SalesbyGenreComponent } from './salesby-genre/salesby-genre.component';
import { SingleMultiPlayerComponent } from './single-multi-player/single-multi-player.component';
import { FreeVsPaidComponent } from './free-vs-paid/free-vs-paid.component';


@NgModule({
  imports: [
    CommonModule,
    UtilsModule
  ],
  entryComponents: [GenrePieComponent, SalesByRegionComponent, ReleaseCountByYearComponent, UsersVsPriceComponent, ByAgeComponent, SalesbyGenreComponent, SingleMultiPlayerComponent, FreeVsPaidComponent],
  exports: [GenrePieComponent, SalesByRegionComponent, ReleaseCountByYearComponent, UsersVsPriceComponent, ByAgeComponent, SalesbyGenreComponent, SingleMultiPlayerComponent, FreeVsPaidComponent],
  declarations: [GenrePieComponent, SalesByRegionComponent, ReleaseCountByYearComponent, UsersVsPriceComponent, ByAgeComponent, SalesbyGenreComponent, SingleMultiPlayerComponent, FreeVsPaidComponent]
})
export class WidgetsModule { }
