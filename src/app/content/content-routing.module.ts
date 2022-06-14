import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentInfoComponent } from './pages/content-info/content-info.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ShowContentComponent } from './pages/show-content/show-content.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ShowContentComponent,
      },
      {
        path: ':contentId',
        component: ContentInfoComponent,
      },
      {
        path: '',
        component: SearchResultComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
