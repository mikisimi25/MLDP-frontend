import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private as: AuthService,
    private cs: ContentService
  ) { }

  public getMovieLists( mode?: boolean, username?: string, user_list_count?: number, id?: number ): Observable<List[]> {
    let params: string = '?';

    ( id !== undefined ) && (params += '&id='+id);
    ( mode !== undefined ) && (params += '&public='+mode);
    ( username ) && (params += '&username='+username);
    ( user_list_count ) && (params += '&user_list_count='+user_list_count);

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

  public addContentToList( listInpor: List , contentId: string ): void {

    this.getMovieLists( undefined, undefined, undefined, listInpor.id! )
      .subscribe( list => {
        let contentCollection = JSON.parse(list[0].contentId!);

        if( contentCollection?.indexOf( contentId ) === -1 ) {
          contentCollection?.push( contentId )

          this.http.patch<List>(`${this._baseUrl}/list/${ list[0].id }/addContent`, { contentId: JSON.stringify(contentCollection) } )
          .subscribe({
            next: resp => console.log("ContentId: ",resp),
            error: err => console.log(err),
            complete: () => console.log("Contenido añadido")
          })
        }
      })
  }

  public saveList( list: List ) {
    this.as.authVerification().subscribe( user => {
      const data = { user: user, list: list }

      this.http.post(`${this._baseUrl}/list/save-list`, data)
        .subscribe({
          next: resp => console.log(resp),
          error: err => console.log(err),
          complete: () => console.log("Lista guardada")
        })
    })
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

  //NOT
  //Get content and lists
  public async getContentAndLists(): Promise<Observable<any>> {
    let data = {content: null, list: null};

    return this.as.authVerification()
      .pipe(
        map( user => {
          if( user ) {
            this.getMovieLists(undefined,user.username).subscribe( async (lists:any) => {
              data.list = lists[0].listas;

              this.cs.popularMoviesOrTv( 'movie' ).subscribe( movies => {
                data.content = movies.results

                return data;
              })
            })
          } else {
            this.cs.popularMoviesOrTv( 'movie' ).subscribe( movies => {
              data.content = movies.results

              return data;
            })
          }
        })
      )
  }


}
