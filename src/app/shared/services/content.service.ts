import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private _baseUrlImg: string = `https://image.tmdb.org/t/p/w500/zFTLPipninMF4THDbdkQUZLWMEw.jpg`;

  constructor(
    private http: HttpClient
  ) { }

  public popularMoviesOrTv( type: string, page: number = 1 ): Observable<any> {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      .set('language','es')
      .set('page',page)

    if( type === 'movie' ) {
      return this.http.get<any>(`${environment.tmdbApiURL}/3/movie/popular`, { params })
    } else {
      return this.http.get<any>(`${environment.tmdbApiURL}/3/tv/popular`, { params })
    }
  }

  public getImagesOfMovieOrTvshows( contentId: string ) {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      .set('language','es')

    return this.http.get(`${environment.tmdbApiURL}/3/${contentId}/images`, { params })
  }

  public getMovieOrTvshowsById( contentId: string) {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      .set('language','es')

      return this.http.get(`${environment.tmdbApiURL}/3/${contentId}`, { params })
  }

  public getMovieOrTvshowsSearchResult( type: string, query: string, page: number = 1 ): Observable<any> {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      .set('language','es')
      .set('query',query)
      .set('page',page)
      .set('include_adult',false)

      if( type === 'movie' ) {
        return this.http.get<any>(`${environment.tmdbApiURL}/3/search/movie`, { params })
      } else {
        return this.http.get<any>(`${environment.tmdbApiURL}/3/search/tv`, { params })
      }

  }

  public getMovieOrTvshowsCategories( type: string ) {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      .set('language','es')

    if( type === 'movie' ) {
      return this.http.get(`${environment.tmdbApiURL}/3/genre/movie/list`, { params })
    } else {
      return this.http.get(`${environment.tmdbApiURL}/3/genre/tv/list`, { params })
    }

  }

  public getContentTrailer( contentType: string, contentId: string ) {
    const params = new HttpParams()
      .set('api_key',environment.tmdbApiToken)
      // .set('language','es')

    if( contentType === 'movie' ) {
      return this.http.get(`${environment.tmdbApiURL}/3/movie/${contentId}/videos`, { params })
    } else {
      return this.http.get(`${environment.tmdbApiURL}/3/tv/${contentId}/videos`, { params })
    }
  }
}
