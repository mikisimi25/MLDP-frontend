import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowRoutingModule } from './tvshow-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TvShowRoutingModule,
    HttpClientModule,
    PrimengModule,
    SharedModule,
    FormsModule
  ]
})
export class TvShowModule { }
