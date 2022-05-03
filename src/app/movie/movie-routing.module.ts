import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowmoviesComponent } from './pages/showmovies/showmovies.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ShowmoviesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
