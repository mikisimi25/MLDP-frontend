import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTvshowResultComponent } from './pages/search-tvshow-result/search-tvshow-result.component';
import { SearchTvshowComponent } from './pages/search-tvshow/search-tvshow.component';
import { ShowTvshowsComponent } from './pages/show-tvshows/showtvshows.component';
import { TvshowInfoComponent } from './pages/tvshow-info/tvshow-info.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all',
        component: ShowTvshowsComponent
      },
      {
        path: 'search',
        component: SearchTvshowComponent
      },
      {
        path: 'search/:query',
        component: SearchTvshowResultComponent
      },
      {
        path: ':tvId',
        component: TvshowInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowRoutingModule { }
