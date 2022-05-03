import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { CrudUserService } from 'src/app/user/services/crud-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public _auth: boolean = true;

  get auth() {
    return this._auth;
  }

  constructor(
    private as: AuthService,
    private crs: CrudUserService
  ) { }

  public signout() {
    this.as.logout()
  }

}
