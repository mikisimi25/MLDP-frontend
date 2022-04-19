import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/app/user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  private _apiUrl: string = 'http://localhost:3000';
  public _emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  public _passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}';


  constructor(
    private http: HttpClient
  ) { }


  public checkIdentifier( identifier: string ) {
    return this.http.get<User[]>(`${this._apiUrl}/user?username=${identifier}`)
      .pipe(
        map(
          userArray => ( userArray.length === 0) ? -1 : userArray[0].id
        )
      )
  }

  public checkUser( identifier: string, password: string ) {
    return this.http.get<User[]>(`${this._apiUrl}/user?username=${identifier}`)
      .pipe(
        map( user => {
          //Si el usuario existe
          if( user[0] ) {
            if( user[0].password === password) {
              return user[0]
            }
          }

          //Si el usuario no existe
          return undefined
        })
      )
  }

  public matchPasswords( fieldName: string, fieldName2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const password = formGroup.get(fieldName)?.value;
      const password2 = formGroup.get(fieldName2)?.value;

      if(password !== password2) {
        formGroup.get(fieldName2)?.setErrors({ mathPasswords: true })
        return { mathPasswords: true }
      }

      return null;
    }
  }

  public invalidField( fieldName: string, form: AbstractControl  ): boolean | undefined {
    const field = form.get(fieldName);

    return field?.touched && field?.invalid;
  }

  public errorMessage( fieldName: string, form: AbstractControl ): string {
    const fieldErrors = form.get(fieldName)?.errors;

    if( fieldErrors?.['required'] ) {
      return 'Campo necesario';
    } else if ( fieldErrors?.['minlength'] ) {
      return 'Longitud insuficiente';
    } else if ( fieldErrors?.['pattern'] ) {
      return 'Formato incorrecto';
    } else {
      switch( fieldName ) {
        case 'password2':

          if( fieldErrors?.['mathPasswords'] ) {
            return 'Las contraseñas no coinciden';
          }

          break;
        case 'username':

          if( fieldErrors?.['userExists'] ) {
            return 'El usuario ya existe';
          }

          break;
        case 'email':

          if( fieldErrors?.['emailExists'] ) {
            return 'El usuario con este email ya existe';
          }

          break;
      }
    }

    return '';
  }

}
