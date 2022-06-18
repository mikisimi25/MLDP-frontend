import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup = this.fb.group({
    identifier: ['', [ Validators.required, Validators.minLength(3) ] ],
    password: ['', [ Validators.required] ]
  })

  constructor(
    private fb: FormBuilder,
    private validations: ValidationsService,
    private router: Router,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.signinForm.reset({
      identifier: 'bebop23@gmail.com',
      password: 'password'
    })
  }

  public invalidField( fieldName: string ): boolean | undefined {
    return this.validations.invalidField( fieldName, this.signinForm );
  }

  public errorMessage( fieldName: string ): string {
    return this.validations.errorMessage( fieldName, this.signinForm );
  }

  public signIn() {
    if( this.signinForm.valid ) {
      const identifier = this.signinForm.get('identifier')?.value;
      const password = this.signinForm.get('password')?.value;

      this.as.login( identifier, password )
        .subscribe({
          next: ({token}) => {
            this.as.setSession( token )
            this.router.navigate([`./movie/all`])
          },
          error: err => this.signinForm.setErrors( { accessFail: true} )
        })

    } else {
      this.signinForm.markAllAsTouched();
    }
  }

}
