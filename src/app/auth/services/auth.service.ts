import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ListService } from 'src/app/list/services/list.service';
import { environment } from 'src/environments/environment';
import { User } from '../../user/interfaces/user.interface';
import { setUserToken, unSetUser } from '../redux/auth.actions';
import { List } from '../../list/interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User | undefined;

  public get user() {
    return {...this._user};
  }

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  public login( email:string, password:string ): Observable<any> {
    return this.http.post(`${environment.laravelApiURL}/user/login`, {email, password})
  }

  public register( userData: any ): Observable<any> {
    return this.http.post(`${environment.laravelApiURL}/user/register`, userData)
  }

  public getToken(): string | null {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public getGuest(): string | null {
    return JSON.parse(localStorage.getItem('guest')!);
  }

  public setUserData( token: string ) {
    const params = new HttpParams().set('token',token)

    localStorage.setItem('guest',JSON.stringify(false));
    localStorage.setItem('token',JSON.stringify(token));

    return this.http.get<any>(`${environment.laravelApiURL}/user/authenticated`,{params})
  }

  public getGuestData() {
    localStorage.setItem('guest',JSON.stringify(true));

    return this.http.get<any>(`${environment.laravelApiURL}/user/guest`)
  }

  public saveGuestData( user: User, lists: List[] ) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  public logout(): void {
    this.store.dispatch( unSetUser() )
    localStorage.removeItem( 'token' )
  }

  public recoverUserData() {
    if(this.getToken()) {
      this.store.dispatch( setUserToken({ token: this.getToken()! }) )
    } else if (this.getGuest()) {
      this.store.dispatch( setUserToken({ token: this.getToken()! }) )
    }
  }

}
