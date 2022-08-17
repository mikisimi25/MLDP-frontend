import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../user/interfaces/user.interface';
import { setUserToken, unSetUser } from '../redux/auth.actions';
import { List } from '../../list/interfaces/list.interface';
import { environment } from 'src/environments/environment';

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

  //Guest

  public setGuestData() {
    let lists: List[] = [
      {
          title: "Favoritos",
          description: "",
          user_list_count: 1,
          contentId: "[]",
      },
      {
          title: "Vistos",
          description: "",
          user_list_count: 2,
          contentId: "[]",
      },
      {
          title: "Quiero ver",
          description: "",
          user_list_count: 3,
          contentId: "[]",
      },
      {
          title: "En progreso",
          description: "",
          user_list_count: 4,
          contentId: "[]",
      }
    ],
    user: User = {
      username: "guest",
      description: "Hola soy Bebop"
    };

    localStorage.setItem('guest',JSON.stringify(true));
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('lists',JSON.stringify(lists));

    return of({ user, lists })
    // return this.http.get<any>(`${environment.laravelApiURL}/user/guest`)
  }

}
