import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  public ownProfile: boolean = false;
  public user?: User;
  public dashboardUser?: User;

  public lists: List[] = [];
  public list!: List;
  public userLists!: List[];

  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService,
    private as: AuthService,
    private ls: ListService
  ) {}

  ngOnInit(): void {

    this.as.authVerification().subscribe( userAuth => {
      this.ar.params.subscribe(({ username }) => {
        this.us.getUser( undefined,username ).subscribe((user) => {
          if (user) {
            this.dashboardUser = user[0];
            this.ownProfile = userAuth?.id === user[0].id;

            this.ls.getMovieLists( undefined,username )
              .subscribe((lists) => (this.userLists = lists));
          }
        });
      });
    })
  }
}
