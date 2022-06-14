import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { ContentInfoComponent } from './pages/content-info/content-info.component';
import { FormsModule } from '@angular/forms';
import { ShowContentComponent } from './pages/show-content/show-content.component';
import { ShortTitlePipe } from '../shared/pipes/short-title.pipe';


@NgModule({
  declarations: [
    SearchResultComponent,
    ContentInfoComponent,
    ShowContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    PrimengModule,
    FormsModule,
  ]
})
export class ContentModule { }
