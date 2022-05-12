import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from '../../user/interfaces/user.interface';
import { CrudUserService } from '../../user/services/crud-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = 'http://localhost:3000';
  private _user: User | undefined;

  public get user() {
    console.log('auth',this._user);
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

  public authVerification(): Observable<User | undefined> {
    if( localStorage.getItem('token') ) {
      return this.crd.getUserById( localStorage.getItem('token')! )
        .pipe(
          map( user => {
            this._user = user;
            // console.log('authVerification2',this._user);

            return user;
          })
        )
        // .subscribe( user => {
        //   this._user = user;
        //   console.log('authVerification',this._user);

        //   return of(user);
        // })

        return of(this.user)
    } else {
      return of(undefined)
    }
  }
}
