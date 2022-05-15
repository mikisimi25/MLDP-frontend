import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public lists: List[] = [];
  public list!: List;
  private _user?: User;
  public userLists!: List[];

  public get user() {
    return this._user;
  }

  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService,
    private ls: ListService
  ) {}

  ngOnInit(): void {
    //Load user data and lists of user
    this.ar.params.subscribe(({ username }) => {
      this.us.getUserByUsername( username ).subscribe((user) => {
        if (user) {
          this._user = user[0];

          this.ls.getUserListsByUsername( username, 5)
            .subscribe((lists) => (this.userLists = lists));
        }
      });
    });
  }
}
