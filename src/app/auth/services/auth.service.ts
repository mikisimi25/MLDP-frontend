import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListService } from 'src/app/list/services/list.service';
import { environment } from 'src/environments/environment';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User | undefined;
  private _isLogged: boolean = false;
  private _userSubject = new BehaviorSubject<User | undefined>(undefined);
  private _isLoggedSubject = new BehaviorSubject<boolean>(false);

  getUserSubject(){
    return this._userSubject.asObservable();
  }

  public get user() {
    return {...this._user};
  }

  isLoggedInSubject(){
    return this._isLoggedSubject.asObservable();
  }

  public get isLoggedIn() {
    return this._isLogged;
  }

  public get isLoggedOut() {
    return !this._isLogged;
  }

  constructor(
    private http: HttpClient
  ) { }

  public login( email:string, password:string ): Observable<any> {
    return this.http.post(`${environment.laravelApiURL}/user/login`, {email, password})
  }

  public register( userData: any ): Observable<any> {
    return this.http.post(`${environment.laravelApiURL}/user/register`, userData)
  }

  public setSession( token: string ): void {
    localStorage.setItem( 'token', JSON.stringify(token) )
    this.setUserData();
  }

  public getToken(): string | null {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public setUserData() {
    const params = new HttpParams().set('token',this.getToken()!)

    this.http.get<any>(`${environment.laravelApiURL}/user/authenticated`,{params})
      .subscribe({
        next: data => {
          this._user = {...data.user};
          this._isLogged = true;
          this._isLoggedSubject.next(true)
          this._userSubject.next(this._user)
        },
        error: err => console.error(err)
      })
  }

  public logout(): void {
    this._isLogged = false;
    this._isLoggedSubject.next(false)
    this._user = undefined;
    this._userSubject.next(undefined)
    localStorage.removeItem( 'token' )
  }

  public recoverUserData() {
    if(this.getToken()) {
      this.setUserData()
    }
  }

}
