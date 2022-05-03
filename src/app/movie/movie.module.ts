import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { ShowmoviesComponent } from './pages/showmovies/showmovies.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    ShowmoviesComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HttpClientModule,
    PrimengModule,
    SharedModule
  ]
})
export class MovieModule { }
