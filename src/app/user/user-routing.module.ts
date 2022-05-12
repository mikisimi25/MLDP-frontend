import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ListComponent } from './pages/list/list.component';
import { ListsComponent } from './pages/lists/lists.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: UserDashboardComponent,
        // canLoad: [ AuthGuard ],
        // canActivate: [ AuthGuard ],
      },
      {
        path: ':username/lists',
        component: ListsComponent
      },
      {
        path: ':username/list/:listId',
        component: ListComponent
      },
      // {
      //   path: '**',
      //   redirectTo: 'signup'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
