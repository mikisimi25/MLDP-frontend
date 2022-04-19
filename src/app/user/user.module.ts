import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserRoutingModule } from './user-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
