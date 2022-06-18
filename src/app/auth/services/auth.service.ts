import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { ListService } from 'src/app/list/services/list.service';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from '../../user/interfaces/user.interface';
import { CrudUserService } from '../../user/services/crud-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:8000/api';
  private _user: User | undefined;
  private _isLogged: boolean = false;
  private _items: any;
  private _groupedLists?: any[] = [];

  public get user() {
    return {...this._user};
  }

  public get isLoggedIn() {
    return this._isLogged;
  }

  public get isLoggedOut() {
    return !this._isLogged;
  }

  public get items() {
    return this._items;
  }

  public get groupedLists() {
    return this._groupedLists;
  }

  constructor(
    private http: HttpClient,
    private vs: ValidationsService,
    private crd: CrudUserService,
    private ls: ListService,
  ) {
    this.setMenuItems()
  }

  public login( email:string, password:string ): Observable<any> {
    return this.http.post(`${this._url}/user/login`, {email, password})
  }

  public register( userData: any ): Observable<any> {
    return this.http.post(`${this._url}/user/register`, userData)
  }

  public setSession( token: string ): void {
    localStorage.setItem( 'token', JSON.stringify(token) )
    this.setUserData();
  }

  public getToken(): string | null {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public setUserData() {
    const params = new HttpParams()
      .set('token',this.getToken()!);

      this.http.get<any>(`${this._url}/user/authenticated`,{params})
        .subscribe({
          next: data => {
            this._user = {...data.user};
            console.log("🚀 ~ file: auth.service.ts ~ line 74 ~ AuthService ~ setUserData ~ this._user", this._user)
            this._isLogged = true;
            this.setMenuItems()
            this.setUserListCollection()
          },
          error: err => console.error(err)
        })
  }

  public setUserListCollection() {
    this.ls.getMovieLists(undefined,this.user?.username).subscribe( (lists:any) => {

      this._groupedLists = [
        {
          label: 'Mis Listas',
          value: 'ml',
          items: lists
        }
      ];
    })
  }

  public logout(): void {
    this._isLogged = false;
    this._user = undefined;
    localStorage.removeItem( 'token' )
    this.setMenuItems()
  }

  public recoverUserData() {
    if(this.getToken()) {
      this.setUserData()
    }
  }

  public authVerification(): Observable<User | undefined> {
    if( localStorage.getItem('token') ) {
      return this.crd.getUser( parseInt(localStorage.getItem('token')!) )
        .pipe(
          map( user => {
            // this._user = user[0];
            // console.log('authVerification2',this._user);
            // console.log('user',this.user)

            return user[0];
          })
        )
        // .subscribe( user => {
        //   this._user = user;
        //   console.log('authVerification',this._user);

        //   return of(user);
        // })

        // return of(this.user)
    } else {
      return of(undefined)
    }
  }

  setMenuItems() {
    this._items = [
      {
          label:'Películas',
          icon:'pi pi-fw pi-movie',
          items: [
            {
              label: 'Populares',
              routerLink: `/movie/all`
            }
          ]
      },
      {
          label:'Series',
          icon:'pi pi-fw pi-movie',
          items: [
            {
              label: 'Populares',
              routerLink: `/tv/all`
            }
          ]
      },
      {
          label:'Listas',
          icon:'pi pi-fw pi-list',
          items: [
            {
              label: 'Populares',
              routerLink: `/list/all`
            },
            {
              label: 'Mis listas',
              routerLink: `/user/${this.user?.username}/lists`,
              visible: this.isLoggedIn
            },
            {
              label: 'Listas guardadas',
              routerLink: `/user/${this.user?.username}/lists/saved`,
              visible: this.isLoggedIn
            },
          ]
      },
      {
          label:'Usuario',
          icon:'pi pi-fw pi-user',
          items: [
              {
                label: 'Perfil',
                routerLink: `/user/${this.user?.username}`
              },
              {
                label: 'Amigos',
                routerLink: `/user/${this.user?.username}/friends`
              },
              {
                label: 'Salir',
                command: () => this.logout()
              }
          ],
          visible: this.isLoggedIn
      }
    ];
  }
}
