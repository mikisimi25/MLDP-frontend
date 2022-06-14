import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{
  private _apiUrl: string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }
  validate( email: AbstractControl ): Observable<ValidationErrors | null> {

    return this.http.get<User[]>(`${this._apiUrl}/user?email=${email.value}`)
      .pipe(
        delay(500),
        map(
          resp => (resp.length !== 0) ? { emailExists: true } : null
        )
      )

  }
}
