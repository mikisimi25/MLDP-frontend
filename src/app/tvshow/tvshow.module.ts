import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowRoutingModule } from './tvshow-routing.module';
import { ShowTvshowsComponent } from './pages/show-tvshows/showtvshows.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { TvshowInfoComponent } from './pages/tvshow-info/tvshow-info.component';
import { SearchTvshowResultComponent } from './pages/search-tvshow-result/search-tvshow-result.component';
import { SearchTvshowComponent } from './pages/search-tvshow/search-tvshow.component';


@NgModule({
  declarations: [
    ShowTvshowsComponent,
    TvshowInfoComponent,
    SearchTvshowComponent,
    SearchTvshowResultComponent
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
