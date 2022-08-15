import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { login } from 'src/app/auth/redux/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public signinForm: FormGroup = this.fb.group({
    identifier: ['', [ Validators.required, Validators.minLength(3) ] ],
    password: ['', [ Validators.required] ]
  })

  constructor(
    private fb: FormBuilder,
    private validations: ValidationsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

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

      this.store.dispatch( login({ email: identifier, password }) )
      this.router.navigate([`./movie/all`])

    } else {
      this.signinForm.markAllAsTouched();
    }
  }

}
