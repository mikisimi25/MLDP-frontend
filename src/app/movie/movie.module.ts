import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { ShowmoviesComponent } from './pages/showmovies/showmovies.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { SearchMovieComponent } from './pages/search-movie/search-movie.component';
import { SearchMovieResultComponent } from './pages/search-movie-result/search-movie-result.component';


@NgModule({
  declarations: [
    ShowmoviesComponent,
    MovieInfoComponent,
    SearchMovieComponent,
    SearchMovieResultComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HttpClientModule,
    PrimengModule,
    SharedModule,
    FormsModule
  ]
})
export class MovieModule { }
