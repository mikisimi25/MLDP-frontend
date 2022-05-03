import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public createList( newList: List ): void {
    this.http.post<List>(`${this._baseUrl}/lists`, newList)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log("Lista creada")
      })
  }

  public addMovieToList( listId: number, movieId: number ) {
    let moviesId: number[] | undefined = [];

    this.getMovieListById( listId )
      .subscribe( list => {
        moviesId = list.moviesId;

        moviesId?.push( movieId )

        this.http.patch<List>(`${ this._baseUrl }/lists/${ listId }`, { moviesId: moviesId } )
        .subscribe({
          next: resp => console.log(resp),
          error: err => console.log(err),
          complete: () => console.log("Lista creada")
        })
      })

  }
}
