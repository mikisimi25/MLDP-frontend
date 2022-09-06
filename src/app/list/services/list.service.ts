import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/user/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService implements OnDestroy {
  private _userData: User | undefined = undefined;
  private _guest: boolean = false;
  private _lists: List[] = [];
  private _subscriptions: Subscription[] = [];

  get token() {
    return {token: JSON.parse(localStorage.getItem('token')!)};
  }

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this._subscriptions[0] = this.store.select('auth').subscribe( ({ user, guest }) => {
      if(user) {
        this._userData = user;
        this._guest = guest;
      }
    })

    this._subscriptions[1] = this.store.select('list').subscribe( ({ lists }) => {
      this._lists = lists

      if(this._userData) {
        localStorage.setItem('lists',JSON.stringify(this._lists))
      }
    })
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach( subscription => subscription.unsubscribe() );
  }

  public getMovieLists( mode?: boolean, username?: string, user_list_count?: number, id?: number ): Observable<List[]> {

    if(!this._guest) {
      let params: string = '?';

      ( mode !== undefined ) && (params += '&public='+mode);
      ( username !== undefined ) && (params += '&username='+username);
      ( user_list_count !== undefined ) && (params += '&user_list_count='+user_list_count);
      ( id !== undefined ) && (params += '&id='+id);

      return this.http.get<List[]>(`${environment.laravelApiURL}/list`+params);
    } else {
      //Guest
      const lists: List[] = JSON.parse(localStorage.getItem('lists')!);

      if ( user_list_count !== undefined ) {
        return of(lists.filter( list => list.user_list_count == user_list_count))
      } else {
        return of(lists);
      }

    }

  }

  public createList( newList: List ): Observable<List> {

    if(this._guest) {
      //Guest
      const id: number = this._lists.length;
      const lastElement: number = this._lists[this._lists.length-1].user_list_count!;
      const listCount: number = (lastElement <= 10) ? 11 : lastElement+1;

      const list: List = {
        id: id,
        username: this._userData?.username,
        userId: this._userData?.id,
        user_list_count: listCount,
        description: '',
        contentId: '[]',
        public: false,
        ...newList,
      }

      return of( list )

    } else {
      //User
      const params = { ...this.token, ...newList };

      return this.http.post<List>(`${environment.laravelApiURL}/list`, params)
    }

  }

  public deleteList( list: List ): Observable<null> {
    //Guest
    if(this._guest) {

      return of(null)

    } else {
      //User
      const params = new HttpParams().set('token',this.token.token)

      return this.http.delete<null>(`${environment.laravelApiURL}/list/${ list.id }`,{params})
    }
  }

  public deleteSavedList( list: List ): void {
    const params = new HttpParams().set('token',this.token.token)

    this.http.delete(`${environment.laravelApiURL}/list/saved-list/${this._userData?.id}/${list.id}`,{params})
      .subscribe({
        next: resp => console.log(resp)
      })
  }

  public addContentToList( listInpor: List , contentId: string ): Observable<List | undefined> {

    if(!this._guest) {
      return this.getMovieLists( undefined, listInpor.username, listInpor.user_list_count )
        .pipe(
          switchMap( (list:any) => {
            let contentCollection = JSON.parse(list[0].contentId!);

            if( contentCollection?.indexOf( contentId ) === -1 ) {
              contentCollection?.push( contentId )
              return this.http.patch<List>(`${environment.laravelApiURL}/list/${ list[0].id }/addContent`, { contentId: JSON.stringify(contentCollection), ...this.token } )
            } else {
              return of(undefined)
            }
          })
        )
    } else {
      //Guest
      return of(listInpor)
    }

  }

  public deleteContentFromList( listId: number, contentId: string ): Observable<List | undefined> {
    //Guest
    if(this._guest) {

      return of(undefined)

    } else {
      //User
      return this.getMovieLists( undefined, undefined, undefined, listId )
        .pipe(
          switchMap( (list:any) => {
            let contentCollection:any[] = JSON.parse(list[0].contentId!),
            indexOfContent = contentCollection?.indexOf( contentId );

            if(indexOfContent !== -1) {
              contentCollection.splice(indexOfContent,1);

              return this.http.patch<List>(`${environment.laravelApiURL}/list/${ list[0].id }/addContent`, { contentId: JSON.stringify(contentCollection), ...this.token } )
            } else {
              return of(undefined)
            }
          })
        )
    }
  }

  public saveList( list: List ): Observable<Object> {
    const data = { user: this._userData, list: list, token: this.token.token }

    return this.http.post(`${environment.laravelApiURL}/list/save-list`, data)
  }

  public getSavedLists( username: string ): Observable<List[]> {
    const params = new HttpParams().set('token',this.token.token)

    return this.http.get<List[]>(`${environment.laravelApiURL}/list/savedLists/${username}`,{params})
  }

  public updateList( changedList: List ): Observable<List> {

    //Guest
    if(this._guest) {

      return of( changedList )

    } else {
      //User

      return this.http.put<List>(`${environment.laravelApiURL}/list/${ changedList.id }`, {...changedList, ...this.token})

    }
  }

}
