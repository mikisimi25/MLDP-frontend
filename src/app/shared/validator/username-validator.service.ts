
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator{
  private _apiUrl: string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  validate( username: AbstractControl ):  Observable<ValidationErrors | null> {

    return this.http.get<User[]>(`${this._apiUrl}/user?username=${username.value}`)
      .pipe(
        delay(500),
        map( resp => {
          return (resp.length !== 0) ? { userExists: true } : null
        })
      )

  }
}
