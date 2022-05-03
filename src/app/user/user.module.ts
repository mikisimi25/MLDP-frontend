import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,

    MaterialModule,
    PrimengModule,
    CardModule
  ]
})
export class UserModule { }
