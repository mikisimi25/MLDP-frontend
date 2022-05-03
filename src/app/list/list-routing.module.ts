import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowlistsComponent } from './pages/showlists/showlists.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ShowlistsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
