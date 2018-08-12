import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NvD3Module } from 'ng2-nvd3';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ThemeModule,
    MiscellaneousModule,
    NvD3Module,
  ],
  declarations: []
})
export class UtilsModule { }
