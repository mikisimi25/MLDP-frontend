import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/interfaces/user.interface';
import { AuthService } from 'src/app/user/services/auth.service';
import { CrudUserService } from 'src/app/user/services/crud-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _user: User | undefined;
  public _auth: boolean = true;

  get user() {
    return this._user;
  }

  get auth() {
    return this._auth;
  }

  constructor(
    private as: AuthService,
    private crs: CrudUserService
  ) { }

  ngOnInit(): void {
    // if ( this.as.authVerification() ) {
    //   this.crs.getUserByStorage()
    //     .subscribe( user => {
    //       this._user = user;
    //     })
    // }

    this.as.authVerification()
      .subscribe( auth => {
        console.log('authVerification');
      })

    if( this.user ) {
      console.log('true');
      this._auth = true
    } else {
      this._auth = false
    }
  }



}
