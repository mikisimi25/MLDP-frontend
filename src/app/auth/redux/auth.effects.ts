import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { CrudUserService } from "src/app/user/services/crud-user.service";
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    //$ -> es un observable
    private actions$: Actions,
    private as: AuthService,
    private crud: CrudUserService
  ) { }

  public login = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.login ),
      mergeMap(
        ({ email, password }) => this.as.login( email, password )
        .pipe(
          map( ({token}) => authActions.setUserToken({ token }) ),
          catchError( err => of(authActions.setUserFailure({ payload: err })) )
        )
      )
    )
  );

  public setUserData = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.setUserToken ),
      mergeMap(
        (data) => this.as.setUserData( data.token )
        .pipe(
          map( ({user}) => authActions.setUserSuccess({ user }) ),
          catchError( err => of(authActions.setUserFailure({ payload: err })) )
        )
      )
    )
  );

  public changeUserData = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.changeUserData ),
      mergeMap(
        ({ user }) => this.crud.changeDataUser( user )
        .pipe(
          map( () => authActions.success() ),
          catchError( () => of(authActions.failure()) )
        )
      )
    )
  );

  public guestLogin = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.guestAccess ),
      mergeMap(
        () => this.as.setGuestData()
        .pipe(
          map( ({ user }) => authActions.setUserSuccess( { user } ) ),
          catchError( err => of(authActions.setUserFailure({ payload: err })) )
        )
      )
    )
  );

}
