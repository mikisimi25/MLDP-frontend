import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,of,switchMap } from 'rxjs';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) {
  }

  public getMovieLists( mode?: boolean, username?: string, user_list_count?: number, id?: number ): Observable<List[]> {
    let params: string = '?';

    ( mode !== undefined ) && (params += '&public='+mode);
    ( username ) && (params += '&username='+username);
    ( user_list_count ) && (params += '&user_list_count='+user_list_count);
    ( id !== undefined ) && (params += '&id='+id);

    return this.http.get<List[]>(`${this._baseUrl}/list`+params)
  }

  public createList( newList: List ): void {

    this.http.post<List>(`${this._baseUrl}/list`, newList )
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log("Lista creada")
      })
  }

  public deleteList( list: List ): void {
    this.http.delete(`${this._baseUrl}/list/${ list.id }`)
      .subscribe({
        next: resp => console.log(resp)
      })
  }

  public addContentToList( listInpor: List , contentId: string ) {
    return this.getMovieLists( undefined, listInpor.username, undefined, listInpor.user_list_count! )
      .pipe(
        switchMap( list => {
          let contentCollection = JSON.parse(list[0].contentId!);

          if( contentCollection?.indexOf( contentId ) === -1 ) {
            contentCollection?.push( contentId )
            return this.http.patch<List>(`${this._baseUrl}/list/${ list[0].id }/addContent`, { contentId: JSON.stringify(contentCollection) } )
          } else {
            return of(undefined)
          }
        })
      )
  }

  public saveList( list: List ) {
    // this.as.authVerification().subscribe( user => {
    //   const data = { user: user, list: list }

    //   this.http.post(`${this._baseUrl}/list/save-list`, data)
    //     .subscribe({
    //       next: resp => console.log(resp),
    //       error: err => console.log(err),
    //       complete: () => console.log("Lista guardada")
    //     })
    // })
  }

  public getSavedLists( username: string ): Observable<List[]> {
    return this.http.get<List[]>(`${this._baseUrl}/list/savedLists/${username}`)
  }

  public addToFavourite( username: string ) {

  }

  public updateList( changedList: List ) {
    this.http.put(`${this._baseUrl}/list/${ changedList.id }`, changedList)
      .subscribe({
        next: resp => console.log('Update list',resp)
      })
  }

}
