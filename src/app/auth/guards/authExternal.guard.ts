import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardExternal implements OnInit, CanActivate, CanLoad {
  private _isLoggedOut: boolean = false;

  constructor(
    private router: Router,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('auth').subscribe( ({ isLoggedIn }) => this._isLoggedOut = !isLoggedIn )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this._isLoggedOut ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this._isLoggedOut ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
  }
}
