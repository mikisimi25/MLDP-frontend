import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
  ]
})
export class SharedModule { }
