import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardInternal implements CanActivate, CanLoad {

  constructor(
    private as: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this.as.isLoggedIn ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
    return this.as.isLoggedIn;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this.as.isLoggedIn ) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false
      }
  }
}
