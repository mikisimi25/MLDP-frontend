import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { User } from './user/interfaces/user.interface';
import { CrudUserService } from './user/services/crud-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'MLDP';
  private _user!: User | undefined;

  public get user() {
    return this._user
  }


  constructor(
    private as: AuthService,
    private crs: CrudUserService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.as.authVerification()
      .subscribe( user => {
        this._user = user;
      })
  }

}
