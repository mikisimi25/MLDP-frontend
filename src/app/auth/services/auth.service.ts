import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from '../../user/interfaces/user.interface';
import { CrudUserService } from '../../user/services/crud-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:8000/api';
  private _user: User | undefined = undefined;
  public isLogged: boolean = false;

  public get user() {
    console.log("🚀 ~ file: auth.service.ts ~ line 15 ~ AuthService ~ _user", this._user)
    return this._user;
  }

  constructor(
    private http: HttpClient,
    private vs: ValidationsService,
    private crd: CrudUserService
  ) { }

  public login( email:string, password:string ): Observable<any> {
    return this.http.post(`${this._url}/user/login`, {email, password})
  }

  public register( userData: any ): Observable<any> {
    return this.http.post(`${this._url}/user/register`, userData)
  }

  public setSession( token: string ): void {
    console.log("🚀 ~ file: auth.service.ts ~ line 39 ~ AuthService ~ setSession ~ token", token)
    localStorage.setItem( 'token', JSON.stringify(token) )
    this.setUserData()
  }

  public getToken(): string | null {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public setUserData() {
    const params = new HttpParams()
      .set('token',this.getToken()!);

    this.http.get<User>(`${this._url}/user/authenticated`,{params})
      .subscribe({
        next: user => {
          this._user = user;
          console.log("🚀 ~ file: auth.service.ts ~ line 51 ~ AuthService ~ setUserData ~ user", user)
          this.isLogged = true;
        },
        error: err => console.error(err)
      })
  }

  // public setUserData() {
  //   const params = new HttpParams()
  //     .set('token',this.getToken()!);

  //   return this.http.get<User>(`${this._url}/user/authenticated`,{params})
  //   .pipe(
  //     tap({
  //       next: user => {
  //         this._user = user;
  //         this.isLogged = true;
  //         console.log("🚀 ~ file: auth.service.ts ~ line 51 ~ AuthService ~ setUserData ~ user", user)
  //         return user;
  //       },
  //       error: err => null
  //     })
  //   )
  // }

  public logout(): void {
    this.isLogged = false;
    this._user = undefined;
    localStorage.removeItem( 'token' )
  }

  public isLoggedIn(): boolean{
    return this.isLogged;
  }

  public isLoggedOut(): boolean {
      return !this.isLoggedIn();
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
            this._user = user[0];
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
}
