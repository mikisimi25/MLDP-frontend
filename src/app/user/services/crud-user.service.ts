import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  private _apiUrl: string = 'http://localhost:3000';
  private _user!: User | undefined;

  public get getUser() {
    return this._user
  }

  constructor(
    private ar: ActivatedRoute,
    private http: HttpClient,
    private vs: ValidationsService
  ) { }

  public addUser( userData: any ): void {
    this.http.post<User>(`${this._apiUrl}/user`, userData)
      .subscribe({
        next: resp => console.log(resp),
        error: err => console.log(err),
        complete: () => console.log('Usuario creado')
      })
  }

  public getUserByUsername( username: string ): Observable<User[] | undefined> {
    return this.http.get<User[]>(`${this._apiUrl}/user?username=${username}`)
  }

  public getUserById( userId: string ): Observable<User | undefined> {
    return this.http.get<User>(`${this._apiUrl}/user/${userId}`)
  }

  public getUserByStorage() {
    return this.getUserById( localStorage.getItem('token')! )
  }

}
