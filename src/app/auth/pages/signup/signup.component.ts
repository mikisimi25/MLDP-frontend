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
export class SignupComponent {

  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private usernameValidator: UsernameValidatorService,
    private emailValidator: EmailValidatorService,
    private validations: ValidationsService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(3) ], [ this.usernameValidator ] ],
      email: ['', [ Validators.required, Validators.pattern(this.validations._emailPattern) ], [ this.emailValidator ] ],
      password: ['', [ Validators.required, Validators.pattern(this.validations._passwordPattern) ] ],
      password_confirmation: ['', [ Validators.required ] ],
    }, {
      validators: [ this.validations.matchPasswords('password','password_confirmation') ]
    })
  }

  public invalidField( fieldName: string ): boolean | undefined {
    return this.validations.invalidField( fieldName, this.registerForm );
  }

  public errorMessage( fieldName: string ): string {
    return this.validations.errorMessage( fieldName, this.registerForm );
  }

  public signUp(): void {
    if( this.registerForm.valid ) {
      const userData = this.registerForm.value;

      this.as.register( userData ).subscribe({
        next: ({token}) => {
          this.as.setSession( token )
          this.router.navigate([`./movie/all`])
        }
      })

    }
  }

}
