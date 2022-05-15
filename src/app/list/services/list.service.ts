import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }


  public getMovieLists(): Observable<List[]> {
    return this.http.get<List[]>(`${this._baseUrl}/lists`)
  }

  public getMovieListById( listId: number ): Observable<List> {
    return this.http.get<List>(`${this._baseUrl}/lists/${ listId }`)
  }

  public getUserLists( userId: number ): Observable<List[]>{
    let userLists: List[] = [];

    return this.getMovieLists()
      .pipe(
        map( lists => {
          lists.forEach( list => {

            if( list.userId === userId ) {
              userLists.push(list)
            }

          })

          return userLists
        })
      )

  }

  public getUserListsByUsername( username: string, limit?: any ): Observable<List[]>{
    let userLists: List[] = [];

    return this.getMovieLists()
      .pipe(
        map( lists => {
          lists.forEach( list => {
            if( list.username === username ) {
              userLists.push(list)
            }
          })

          return userLists
        })
      )
  }

  public createList( newList: List ): void {

    if( !newList.moviesId ) {
      newList.moviesId = [];
    }

    this.http.post<List>(`${this._baseUrl}/lists`, newList)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log("Lista creada")
      })
  }

  public deleteList( listId: number): void {
    this.http.delete(`${ this._baseUrl }/lists/${ listId }`)
      .subscribe({
        next: resp => {}
      })
  }

  public updateList( listId: number, changes: any ) {
    this.http.patch(`${ this._baseUrl }/lists/${ listId }`, changes)
      .subscribe({
        next: resp => {}
      })
  }

  public addMovieToList( listId: number, movieId: string ): void {
    let moviesId: string[] | undefined = [];

    this.getMovieListById( listId )
      .subscribe( list => {

        if( list.moviesId?.indexOf( movieId ) === -1 ) {
          moviesId = list.moviesId;

          moviesId?.push( movieId )

          this.http.patch<List>(`${ this._baseUrl }/lists/${ listId }`, { moviesId: moviesId } )
          .subscribe({
            next: resp => console.log(resp),
            error: err => console.log(err),
            complete: () => console.log("Lista creada")
          })
        }
      })

  }

}
