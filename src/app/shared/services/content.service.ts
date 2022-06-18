import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreSearchResulte } from 'src/app/movie/interfaces/categorie.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private _token: string = '2f37bc57c20e8ab508f6ce88a9ead705';
  private _baseUrl: string = `https://api.themoviedb.org`;
  private _baseUrlImg: string = `https://image.tmdb.org/t/p/w500/zFTLPipninMF4THDbdkQUZLWMEw.jpg`;


  constructor(
    private http: HttpClient
  ) { }

  public popularMoviesOrTv( type: string, page: number = 1 ): Observable<any> {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')
      .set('page',page)

    if( type === 'movie' ) {
      return this.http.get<any>(`${this._baseUrl}/3/movie/popular`, { params })
    } else {
      return this.http.get<any>(`${this._baseUrl}/3/tv/popular`, { params })
    }
  }

  public getImagesOfMovieOrTvshows( contentId: string ) {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')

    return this.http.get(`${this._baseUrl}/3/${contentId}/images`, { params })
  }

  public getMovieOrTvshowsById( contentId: string) {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')

      return this.http.get(`${this._baseUrl}/3/${contentId}`, { params })
  }

  public getMovieOrTvshowsSearchResult( type: string, query: string, page: number = 1 ): Observable<any> {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')
      .set('query',query)
      .set('page',page)
      .set('include_adult',false)

      if( type === 'movie' ) {
        return this.http.get<any>(`${this._baseUrl}/3/search/movie`, { params })
      } else {
        return this.http.get<any>(`${this._baseUrl}/3/search/tv`, { params })
      }

  }

  public getMovieOrTvshowsCategories( type: string ): Observable<GenreSearchResulte> {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')

    if( type === 'movie' ) {
      return this.http.get<GenreSearchResulte>(`${this._baseUrl}/3/genre/movie/list`, { params })
    } else {
      return this.http.get<GenreSearchResulte>(`${this._baseUrl}/3/genre/tv/list`, { params })
    }

  }
}
