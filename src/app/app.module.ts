import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './shared/primeng/primeng.module';
import { AuthService } from './auth/services/auth.service';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';

import { appReducers } from './app.reducer';
import { AuthEffects } from './auth/redux/auth.effects'
import { ListEffects } from './list/redux/list.effects';
import { UserEffects } from './user/redux/user.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // FlexLayoutModule,
    SharedModule,
    PrimengModule,
    NgHttpLoaderModule.forRoot(),
    StoreModule.forRoot( appReducers ),
		EffectsModule.forRoot([ AuthEffects, UserEffects, ListEffects ]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
