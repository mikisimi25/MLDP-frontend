import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';
import { map, Observable,of,switchMap,tap,debounceTime,forkJoin,pluck, catchError } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public dashboardUser?: Observable<{user?:User, list?: List[]}>;
  public error?: Observable<boolean> = of(false);

  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService,
    private ls: ListService,
    private as: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.as.getUserSubject().subscribe( userData => {
      this.dashboardUser = this.ar.params.pipe(
        debounceTime(500),
        switchMap( ({username}) => {
          return forkJoin({
            user: (this.us.getUser( undefined,username).pipe(pluck(0))),
            list: this.ls.getMovieLists( undefined,username ).pipe(
              switchMap( collection => of(username !== userData?.username ? collection.filter(list => list.public) : collection))
            )
          })
        }),
        catchError(() => {
          this.router.navigateByUrl('not-found');
          return of({user: undefined});
        }),
      )
    })
  }
}
