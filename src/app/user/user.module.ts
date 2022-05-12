import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import {CardModule} from 'primeng/card';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    ListsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,

    MaterialModule,
    PrimengModule,
    CardModule
  ]
})
export class UserModule { }
