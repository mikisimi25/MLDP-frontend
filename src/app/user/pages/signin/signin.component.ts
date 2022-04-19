import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { AuthService } from '../../services/auth.service';
import { CrudUserService } from '../../services/crud-user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup = this.fb.group({
    identifier: ['', [ Validators.required, Validators.minLength(3) ] ],
    password: ['', [ Validators.required, Validators.pattern(this.validations._passwordPattern) ] ]
  })


  constructor(
    private fb: FormBuilder,
    private validations: ValidationsService,
    private router: Router,
    private us: CrudUserService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.signinForm.reset({
      identifier: 'bebop23',
      password: 'a?M12345'
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

      this.as.signIn( identifier, password )
        .subscribe({
          next: resp => {
            if( resp ) {
              this.router.navigate([`./user/${resp.username}`])
            } else {
              this.signinForm.setErrors( { accessFail: true} )
            }
          }
        })

    } else {
      this.signinForm.markAllAsTouched();
    }
  }

}
