import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(
    private http: HttpClient
  ) { }
  validate( email: AbstractControl ): Observable<ValidationErrors | null> {

    return this.http.get<User[]>(`${environment.laravelApiURL}/user?email=${email.value}`)
      .pipe(
        delay(500),
        map(
          resp => {
          console.log("🚀 ~ file: email-validator.service.ts ~ line 23 ~ EmailValidatorService ~ validate ~ resp", resp)

            return null
          }
        )
      )

  }
}
