import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from '../interfaces/user.interface';
import { CrudUserService } from './crud-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = 'http://localhost:3000';
  private _user!: User | undefined;

  public get user() {
    return this._user
  }


  constructor(
    private http: HttpClient,
    private vs: ValidationsService,
    private crd: CrudUserService
  ) { }


  public setUser( user: User ) {
    //Autentificacion
    this._user = user;
    localStorage.setItem( 'token', JSON.stringify(user.id) )
  }

  //Validates access data, if there are corrects, the functions returns the user
  //If there are incorrects it return undefined
  public signIn( identifier: string, password: string ) {
    //Validacion
    return this.vs.checkUser( identifier, password )
      .pipe(
        tap( resp => {
          if( resp ) {
            this.setUser( resp )
          }

          return undefined
        })
      )
  }

  public logout(): void {
    this._user = undefined;
    localStorage.removeItem( 'token' )
  }

  public signInStorage() {
    this.crd.getUserByStorage()
      .subscribe( user => {
        this._user = user
      })
  }

  public authVerification(): Observable<boolean> {
    if( localStorage.getItem('token') && this.user) {
      console.log('user',this.user);
      console.log('token',localStorage.getItem('token'));
      return of(true)
    } else {
      console.log('user',this.user);
      return of(false)
    }
  }
}
