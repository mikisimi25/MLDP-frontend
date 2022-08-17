import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, BehaviorSubject, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/user/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { List } from '../interfaces/list.interface';
import * as listUtilities from 'src/app/shared/utilities/list.utilities';

@Injectable({
  providedIn: 'root'
})
export class ListService implements OnDestroy {
  private _groupedLists = new BehaviorSubject<any>([]);
  private _userData: User | undefined = undefined;
  private _guest: boolean = false;
  private _lists: List[] = [];
  private _subscriptions: Subscription[] = [];

  public listChanges = new BehaviorSubject<number>(0);


  getGroupedListsSubject(){
    return this._groupedLists.asObservable();
  }

  updateGroupedListsSubject() {
    this.setUserListCollection(this._userData!)
  }

  getListChanges(){
    return this.listChanges.asObservable();
  }

  public set groupedLists(value:any) {
    this._groupedLists.next(value);
  }

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

        this.setUserListCollection( user );
      }
    })

    this._subscriptions[1] = this.store.select('list').subscribe( ({ lists }) => {
      this._lists = lists
    })
  }

  ngOnDestroy() {
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

      return of(lists);
    }

  }

  public createList( newList: List ) {
    const params = { ...this.token, ...newList };

    return this.http.post<List>(`${environment.laravelApiURL}/list`, params)
  }

  public deleteList( list: List ): Observable<null> {
    const params = new HttpParams().set('token',this.token.token)

    return this.http.delete<null>(`${environment.laravelApiURL}/list/${ list.id }`,{params})
  }

  public deleteSavedList( list: List ): void {
    const params = new HttpParams().set('token',this.token.token)

    this.http.delete(`${environment.laravelApiURL}/list/saved-list/${this._userData?.id}/${list.id}`,{params})
      .subscribe({
        next: resp => console.log(resp)
      })
  }

  public addContentToList( listInpor: List , contentId: string ) {

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
      localStorage.setItem('lists',JSON.stringify(this._lists));

      return of(listInpor)
    }

  }

  public deleteContentFromList( listId: number, contentId: string ) {
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

  public saveList( list: List ) {
    const data = { user: this._userData, list: list, token: this.token.token }

    return this.http.post(`${environment.laravelApiURL}/list/save-list`, data)
  }

  public getSavedLists( username: string ): Observable<List[]> {
    const params = new HttpParams().set('token',this.token.token)

    return this.http.get<List[]>(`${environment.laravelApiURL}/list/savedLists/${username}`,{params})
  }

  public updateList( changedList: List ): Observable<List> {
    return this.http.put<List>(`${environment.laravelApiURL}/list/${ changedList.id }`, {...changedList, ...this.token})
  }

  public setUserListCollection( userData: User ) {
    this.getMovieLists(undefined,userData?.username).subscribe( (lists:any) => {
      this.groupedLists = [
        {
          label: 'Mis Listas',
          value: 'ml',
          items: lists
        }
      ]
    })
  }
}
