import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SavedListsComponent } from './pages/saved-lists/saved-lists.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ListComponent } from './pages/list/list.component';
import { AuthGuardInternal } from '../auth/guards/authInternal.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':username',
        component: UserDashboardComponent,
      },
      {
        path: ':username/lists',
        component: ListsComponent
      },
      {
        path: ':username/friends',
        component: FriendsComponent,
        canLoad: [ AuthGuardInternal ],
        canActivate: [ AuthGuardInternal ],
      },
      {
        path: ':username/lists/saved',
        component: SavedListsComponent,
        canLoad: [ AuthGuardInternal ],
        canActivate: [ AuthGuardInternal ],
      },
      {
        path: ':username/list/:listId',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
