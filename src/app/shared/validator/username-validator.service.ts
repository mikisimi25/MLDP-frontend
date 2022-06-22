
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator{
  constructor(
    private http: HttpClient
  ) { }

  validate( username: AbstractControl ):  Observable<ValidationErrors | null> {

    return this.http.get<User[]>(`${environment.laravelApiURL}/user?username=${username.value}`)
      .pipe(
        delay(500),
        map( resp => {
          console.log("🚀 ~ file: email-validator.service.ts ~ line 23 ~ EmailValidatorService ~ validate ~ resp", resp)
          return (resp.length !== 0) ? { userExists: true } : null
        })
      )

  }
}
