import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';
import { map, Observable,of,switchMap,tap,debounceTime,forkJoin,pluck, catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from 'src/app/shared/validator/validations.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public dashboardUser?: Observable<{user?:User, list?: List[]}>;
  public error?: Observable<boolean> = of(false);
  public ownProfile: boolean = false;
  public profileForm!: FormGroup;

  constructor(
    private ar: ActivatedRoute,
    private us: CrudUserService,
    private ls: ListService,
    private as: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.as.getUserSubject().subscribe( userData => {
      this.dashboardUser = this.ar.params.pipe(
        debounceTime(500),
        switchMap( ({username}) => {
          this.ownProfile = username === userData?.username;

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

  public changeDataUser() {
    if( this.profileForm.valid ) {
      const description = this.profileForm.get('description')?.value;

      this.as.getUserSubject().subscribe( userData => {
        let user: User | undefined = userData;
        user!.description = description;

        this.us.changeDataUser( user! ).subscribe({
          next: resp => {
            console.log(resp);
          }
        })
      })

    }
  }
}
