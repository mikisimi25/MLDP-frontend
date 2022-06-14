import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  private _url = 'http://localhost:8000/api';
  private _user!: User | undefined;

  public get user() {
    return this._user
  }

  constructor(
    private http: HttpClient
  ) { }

  public getUser( id?: number, username?: string, email?: string, like?: string ): Observable<User[]> {
    let params: string = '?';

    ( id !== undefined ) && (params += '&id='+id);
    ( username !== undefined ) && (params += '&username='+username);
    ( email !== undefined ) && (params += '&email='+email);
    ( like !== undefined ) && (params += '&like='+like);

    return this.http.get<User[]>(`${this._url}/user`+params)
  }

  public addUser( userData: any ): void {
    this.http.post<User>(`${this._url}/register`, userData)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log('Usuario creado')
      })
  }

  public getUserByStorage() {
    return this.getUser( parseInt(localStorage.getItem('token')!) )
  }

  public getUserFriends( username: string ) {
    return this.getUser( undefined, username ).pipe(
      switchMap( user => this.http.get<User[]>(`${this._url}/user/${user[0]?.id}/friends`))
    )
  }

  public addFriend( requestedId: number, recieverId: number ) {
    this.http.post(`${this._url}/user/friend-request`,{ user_requested_id:requestedId, user_reciever_id: recieverId })
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log("Solicitud de amistad enviada")
      })
  }

}
