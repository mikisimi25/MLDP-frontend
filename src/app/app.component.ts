import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/services/auth.service';
import { CrudUserService } from './user/services/crud-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(
    private as: AuthService,
    private crs: CrudUserService
  ) {}

  ngOnInit() {
    if( localStorage.getItem('token') ) {
      this.as.signInStorage()
    }
  }

}
