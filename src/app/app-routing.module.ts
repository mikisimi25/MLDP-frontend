import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then( m => m.MovieModule)
  },
  {
    path: 'tv',
    loadChildren: () => import('./tvshow/tvshow.module').then( m => m.TvShowModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
