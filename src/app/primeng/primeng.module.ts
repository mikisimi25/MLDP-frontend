import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import {ButtonModule} from 'primeng/button';

@NgModule({
  exports: [
    CardModule,
    ImageModule,
    ButtonModule
  ]
})
export class PrimengModule { }
