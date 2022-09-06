import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

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
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListModule)
  },
  {
    path: 'movie',
    data: { content: 'movie' },
    loadChildren: () => import('./content/content.module').then( m => m.ContentModule)
  },
  {
    path: 'tv',
    data: { content: 'tv' },
    loadChildren: () => import('./content/content.module').then( m => m.ContentModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./content/content.module').then( m => m.ContentModule)
  },
  {
    path: '',
    redirectTo: 'movie/all',
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
