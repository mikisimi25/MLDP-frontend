import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidatorService } from 'src/app/shared/validator/username-validator.service';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { CrudUserService } from 'src/app/user/services/crud-user.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required, Validators.minLength(3) ], [ this.usernameValidator ] ],
    email: ['', [ Validators.required, Validators.pattern(this.validations._emailPattern) ], [ this.emailValidator ] ],
    password: ['', [ Validators.required, Validators.pattern(this.validations._passwordPattern) ] ],
    password2: ['', [ Validators.required ] ],
  }, {
    validators: [ this.validations.matchPasswords('password','password2') ]
  })


  constructor(
    private fb: FormBuilder,
    private us: CrudUserService,
    private as: AuthService,
    private usernameValidator: UsernameValidatorService,
    private emailValidator: EmailValidatorService,
    private validations: ValidationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.registerForm.reset({
    //   username: 'bebop23',
    //   email: 'bebop23@gmail.com',
    //   password: 'a?M12345',
    //   password2: 'a?M12345'
    // })
  }


  public invalidField( fieldName: string ): boolean | undefined {
    return this.validations.invalidField( fieldName, this.registerForm );
  }

  public errorMessage( fieldName: string ): string {
    return this.validations.errorMessage( fieldName, this.registerForm );
  }

  public signUp(): void {
    if( this.registerForm.valid ) {
      const {password2, ...userData}: {password2:string; userData: User} = this.registerForm.value;

      this.us.addUser(userData)

      let user = userData.userData;

      this.as.signIn( this.registerForm.get('username')?.value, this.registerForm.get('password')?.value ).subscribe({
        next: resp => {
          if( resp ) {
            this.router.navigate([`./user/${resp.username}`])
          }
        }
      })

    }
  }

}
