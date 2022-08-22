import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../user/interfaces/user.interface';
import { guestAccess, setUserToken, unSetUser } from '../redux/auth.actions';
import { List } from '../../list/interfaces/list.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private user: User = <User>{};
  private lists: List[] = [];

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.subscribe(({ user, list }) => {
      this.user = <User>user.data;
      this.lists = list.lists;
    })
  }

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

  public logout() {
    //User
    localStorage.removeItem( 'token' )

    //Guest
    localStorage.removeItem( 'user' )
    localStorage.removeItem( 'guest' )
    localStorage.removeItem( 'lists' )

    return of(undefined)
  }

  public recoverUserData() {
    if(this.getToken()) {
      this.store.dispatch( setUserToken({ token: this.getToken()! }) )
    } else if (this.getGuest()) {
      //Guest
      this.store.dispatch( guestAccess() )
    }
  }

  //Guest
  public setGuestData() {
    if(!localStorage.getItem('guest')) {
      let lists: List[] = [
        {
            id: 0,
            title: "Favoritos",
            username: "guest",
            description: "",
            user_list_count: 1,
            contentId: "[]",
        },
        {
            id: 1,
            title: "Vistos",
            username: "guest",
            description: "",
            user_list_count: 2,
            contentId: "[]",
        },
        {
            id: 2,
            title: "Quiero ver",
            username: "guest",
            description: "",
            user_list_count: 3,
            contentId: "[]",
        },
        {
            id: 3,
            title: "En progreso",
            username: "guest",
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
    } else {
      const savedUser = JSON.parse(localStorage.getItem('user')!);
      const savedLists = JSON.parse(localStorage.getItem('lists')!);

      return of({ user: savedUser, lists: savedLists})
    }

    // return this.http.get<any>(`${environment.laravelApiURL}/user/guest`)
  }

}
