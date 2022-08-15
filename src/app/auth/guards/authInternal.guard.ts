import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardInternal implements OnInit, OnDestroy, CanActivate, CanLoad {
  private _isLoggedIn: boolean = false;
  private subs!: Subscription;

  constructor(
    private router: Router,
    public store: Store<AppState>
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.subs = this.store.select('auth').subscribe( ({ isLoggedIn }) => {
        this._isLoggedIn = isLoggedIn
      })

      if( this._isLoggedIn ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.subs = this.store.select('auth').subscribe( ({ isLoggedIn }) => {
        this._isLoggedIn = isLoggedIn
      })

      if( this._isLoggedIn ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
  }
}
