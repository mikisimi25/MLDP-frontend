import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{
  @Input() users!: User[];

  @Input() rows: number = 10;
  @Input() paginator: boolean = true;

  public user: User = <User>{};
  public userAuth?: User;

  constructor(
    private as: AuthService
  ) {
    this.as.authVerification().subscribe( userAuth => {
      this.userAuth = userAuth
    });
  }

  ngOnInit(){
  }
}
