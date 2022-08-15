import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {
  private _user!: User | undefined;

  public get user() {
    return this._user
  }

  constructor(
    private http: HttpClient,
    private as: AuthService
  ) {

  }

  public getUser( id?: number, username?: string, email?: string, like?: string ): Observable<User[]> {
    let params: string = '?';

    ( id !== undefined ) && (params += '&id='+id);
    ( username !== undefined ) && (params += '&username='+username);
    ( email !== undefined ) && (params += '&email='+email);
    ( like !== undefined ) && (params += '&like='+like);

    return this.http.get<User[]>(`${environment.laravelApiURL}/user`+params)
  }

  public addUser( userData: any ): void {
    this.http.post<User>(`${environment.laravelApiURL}/register`, userData)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log('Usuario creado')
      })
  }

  public getUserFollowers( username: string ): Observable<User[]> {
    const params = new HttpParams().set('token',JSON.parse(localStorage.getItem('token')!))

    return this.getUser( undefined, username ).pipe(
      switchMap( user => this.http.get<User[]>(`${environment.laravelApiURL}/user/${user[0]?.id}/followers`,{params}))
    )
  }

  public addFollow( requestedId: number, recieverId: number ) {
    return this.http.post(`${environment.laravelApiURL}/user/follow-request`,{ user_requested_id:requestedId, user_reciever_id: recieverId, token: JSON.parse(localStorage.getItem('token')!) })
  }

  public cancelFollow( recieverId: number ) {
    const params = new HttpParams()
      .set('token',JSON.parse(localStorage.getItem('token')!))
      .set('user_requested_id',this.as.user?.id!)
      .set('user_reciever_id',recieverId)

    return this.http.delete(`${environment.laravelApiURL}/user/follow-request`,{params})
  }

  public changeDataUser( userData: User) {
    return this.http.patch(`${environment.laravelApiURL}/user/${userData.id}`,{description: userData.description,token: JSON.parse(localStorage.getItem('token')!)})
  }

}
