import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  private _userData: User | undefined;

  public get userData() {
    return { ...this._userData }
  }


  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService
  ) { }

  ngOnInit(): void {
    this.ar.params.subscribe(({ id }) => {
      this.us.getUserByUsername( id )
        .subscribe( userData => {
          this._userData = userData;
        })
    });
  }




}
