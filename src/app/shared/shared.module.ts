import { NgModule } from '@angular/core';
import { PrimengModule } from './primeng/primeng.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SmallInfoCardComponent } from './components/small-info-card/small-info-card.component';
import { FormsModule } from '@angular/forms';
import { ShortTitlePipe } from './pipes/short-title.pipe';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './components/list-table/list-table.component';
import { SearchSelectorComponent } from './components/search-selector/search-selector.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SmallInfoCardComponent,
    ShortTitlePipe,
    ListTableComponent,
    SearchSelectorComponent,
    UserTableComponent,
    ErrorPageComponent,
    SafePipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SmallInfoCardComponent,
    ListTableComponent,
    ShortTitlePipe,
    SearchSelectorComponent,
    UserTableComponent,
    ErrorPageComponent,
    PrimengModule,
    SafePipe
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
