import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { CrudUserService } from "src/app/user/services/crud-user.service";
import * as userActions from './user.actions';

@Injectable()
export class UserEffects {

  constructor(
    //$ -> es un observable
    private actions$: Actions,
    private as: AuthService,
    private crud: CrudUserService
  ) { }

  public setFollowers = createEffect(
    () => this.actions$.pipe(
      ofType( userActions.setFollowers ),
      mergeMap(
        ({ username }) => this.crud.getUserFollowers( username )
        .pipe(
          map( (followers) => userActions.setFollowersSuccess({ followers }))
        )
      )
    )
  );

  public followUser = createEffect(
    () => this.actions$.pipe(
      ofType( userActions.follow ),
      mergeMap(
        ({ userId, followId }) => this.crud.addFollow( userId, followId )
        .pipe(
          map( () => userActions.success() )
        )
      )
    )
  );

  public unFollowUser = createEffect(
    () => this.actions$.pipe(
      ofType( userActions.unFollow ),
      mergeMap(
        ({ followId }) => this.crud.cancelFollow( followId )
        .pipe(
          map( () => userActions.success() )
        )
      )
    )
  );


}
