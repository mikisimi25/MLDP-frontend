import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap,pipe, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _groupedLists = new BehaviorSubject<any>([]);
  private _userData: User | undefined = undefined;
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
    private as: AuthService
  ) {
    this.as.getUserSubject().subscribe( userData => {
      if(userData) {
        this._userData = userData;
        this.setUserListCollection( userData );
      }
    })
  }

  public getMovieLists( mode?: boolean, username?: string, user_list_count?: number, id?: number ): Observable<List[]> {
    let params: string = '?';

    ( mode !== undefined ) && (params += '&public='+mode);
    ( username !== undefined ) && (params += '&username='+username);
    ( user_list_count !== undefined ) && (params += '&user_list_count='+user_list_count);
    ( id !== undefined ) && (params += '&id='+id);

    return this.http.get<List[]>(`${environment.laravelApiURL}/list`+params)
  }

  public createList( newList: List ): void {
    const params = {...this.token, ...newList};

    this.http.post<List>(`${environment.laravelApiURL}/list`, params)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log("Lista creada")
      })
  }

  public deleteList( list: List ): void {
    const params = new HttpParams().set('token',this.token.token)

    this.http.delete(`${environment.laravelApiURL}/list/${ list.id }`,{params})
      .subscribe({
        next: resp => console.log(resp)
      })
  }

  public deleteSavedList( list: List ): void {
    const params = new HttpParams().set('token',this.token.token)

    this.http.delete(`${environment.laravelApiURL}/list/saved-list/${this._userData?.id}/${list.id}`,{params})
      .subscribe({
        next: resp => console.log(resp)
      })
  }

  public addContentToList( listInpor: List , contentId: string ) {
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

  public updateList( changedList: List ) {
    this.http.put(`${environment.laravelApiURL}/list/${ changedList.id }`, {...changedList, ...this.token})
      .subscribe({
        next: resp => console.log('Update list',resp)
      })
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
