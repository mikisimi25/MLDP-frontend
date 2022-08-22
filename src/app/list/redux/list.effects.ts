import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import * as listActions from './list.actions';
import * as authActions from '../../auth/redux/auth.actions';
import { ListService } from '../services/list.service';
import { List } from '../interfaces/list.interface';

@Injectable()
export class ListEffects {

  constructor(
    //$ -> es un observable
    private actions$: Actions,
    private ls: ListService,
    private as: AuthService
  ) { }

  public setUserLists = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.setUserSuccess ),
      mergeMap(
        ({ user }) => this.ls.getMovieLists(undefined, user.username)
        .pipe(
          map( (lists) => listActions.setLists( { lists } ) )
        )
      )
    )
  );

  public unSetUserLists = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.unSetUser ),
      mergeMap(
        () => this.as.logout()
        .pipe(
          map( () => listActions.unSetLists() )
        )
      )
    )
  );

  public setGuestLists = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.guestAccess ),
      mergeMap(
        () => this.as.setGuestData()
        .pipe(
          map( ({ lists }) => listActions.setLists( { lists } ) )
        )
      )
    )
  );

  public createList = createEffect(
    () => this.actions$.pipe(
      ofType( listActions.createList ),
      mergeMap(
        ({ list }) => this.ls.createList(list)
        .pipe(
          map( list => listActions.createListSuccess( {list} ) )
        )
      )
    )
  );

  public updateList = createEffect(
    () => this.actions$.pipe(
      ofType( listActions.editList ),
      mergeMap(
        ({ list }) => this.ls.updateList(list)
        .pipe(
          map( list => listActions.editListSuccess( {list} ) )
        )
      )
    )
  );

  public deleteList = createEffect(
    () => this.actions$.pipe(
      ofType( listActions.deleteList ),
      mergeMap(
        ({ list }) => this.ls.deleteList(list)
        .pipe(
          map( () => listActions.deleteListSuccess() )
        )
      )
    )
  );

  public addContentToList = createEffect(
    () => this.actions$.pipe(
      ofType( listActions.addContentToList ),
      mergeMap(
        ({ list, content }) => this.ls.addContentToList( list, content )
        .pipe(
          map( () => listActions.addContentToListSuccess({ list }) )
        )
      )
    )
  );

}
