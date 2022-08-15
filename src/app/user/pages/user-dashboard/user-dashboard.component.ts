import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';
import { map, Observable,of,switchMap,tap,debounceTime,forkJoin,pluck, catchError, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/shared/validator/validations.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { changeUserData } from 'src/app/auth/redux/auth.actions';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public dashboardUser?: Observable<{user?:User, list?: List[]}>;
  public error?: Observable<boolean> = of(false);
  public ownProfile: boolean = false;
  public profileForm!: FormGroup;

  private userData: User | undefined = <User>{};

  private subs!: Subscription;

  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService,
    private ls: ListService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subs = this.store.select('auth').subscribe( ({ user }) => {
      this.userData = {...user};

      this.dashboardUser = this.ar.params.pipe(
        debounceTime(500),
        switchMap( ({username}) => {
          this.ownProfile = username === user?.username;

          return forkJoin({
            user: (this.us.getUser( undefined,username).pipe(pluck(0))),
            list: this.ls.getMovieLists( undefined,username ).pipe(
              switchMap( collection => of(!this.ownProfile ? collection.filter(list => list.public) : collection))
            )
          })
        }),
        tap( ({user}) => {
          this.profileForm = this.fb.group({
            description: [user?.description || '', [ Validators.required, Validators.minLength(3) ] ]
          })
        }),
        catchError(() => {
          this.router.navigateByUrl('not-found');
          return of({user: undefined});
        }),
      )
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public changeDataUser() {
    if( this.profileForm.valid ) {
      const description = this.profileForm.get('description')?.value;

      this.userData!.description = description;

      this.store.dispatch( changeUserData({ user: this.userData! }) )

    }
  }
}
