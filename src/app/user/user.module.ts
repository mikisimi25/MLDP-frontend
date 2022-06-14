import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import {CardModule} from 'primeng/card';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ListComponent } from './pages/list/list.component';
import { SavedListsComponent } from './pages/saved-lists/saved-lists.component';
import { FriendsComponent } from './pages/friends/friends.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ListsComponent,
    ListComponent,
    SavedListsComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,

    PrimengModule,
    CardModule
  ]
})
export class UserModule { }
