import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { ShowmoviesComponent } from './pages/showmovies/showmovies.component';
import { SearchMovieComponent } from './pages/search-movie/search-movie.component';
import { SearchMovieResultComponent } from './pages/search-movie-result/search-movie-result.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ShowmoviesComponent
      },
      {
        path: 'search',
        component: SearchMovieComponent
      },
      {
        path: 'search/:query',
        component: SearchMovieResultComponent
      },
      {
        path: ':movieId',
        component: MovieInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
