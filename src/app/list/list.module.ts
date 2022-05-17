import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ShowlistsComponent } from './pages/showlists/showlists.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShowlistsComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    PrimengModule,
    SharedModule,
    FormsModule
  ]
})
export class ListModule { }
