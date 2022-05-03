import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PopularMoviesInterface } from '../interfaces/popularMovies.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _token: string = '2f37bc57c20e8ab508f6ce88a9ead705';
  private _baseUrl: string = `https://api.themoviedb.org`;
  private _baseUrlImg: string = `https://image.tmdb.org/t/p/w500/zFTLPipninMF4THDbdkQUZLWMEw.jpg`;

  constructor(
    private http: HttpClient
  ) { }



  popularMovies(): Observable<PopularMoviesInterface> {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')
      .set('page',1)

    return this.http.get<PopularMoviesInterface>(`${this._baseUrl}/3/movie/popular`, { params })
  }

  getImagesOfMovie( movieId: number ) {
    const params = new HttpParams()
      .set('api_key',this._token)
      .set('language','es')

    return this.http.get(`${this._baseUrl}/3/movie/${movieId}/images`, { params })
  }

}
