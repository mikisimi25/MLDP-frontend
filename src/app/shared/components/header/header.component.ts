import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { guestAccess, login } from 'src/app/auth/redux/auth.actions';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TitleCasePipe]
})
export class HeaderComponent{
  private _items: any = [];

  public get items() {
    return this._items;
  }

  public isLoggedIn: boolean = false;

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private as: AuthService,
    private router: Router,
    public titleCasePipe: TitleCasePipe,
    private store: Store<AppState>
  ) {  }

  ngOnInit() {

    this.store.select('auth').subscribe( ({user,isLoggedIn}) => {
      this.setMenuItems( user! )

      this.isLoggedIn = isLoggedIn;
    })


    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      // {value: 'Usuarios', route: "user"}
    ];

    this.optionField = this.options[0];
  }

  public search(): void {
    if(this.searchQuery.trim().length > 0) {
      this.router.navigate([`/search`], { queryParams: { type: this.optionField.route, q: this.searchQuery }});
      this.searchQuery = '';
      this.optionField = this.options[0];
    }
  }

  public guestLogin() {
    this.store.dispatch( guestAccess() )
  }

  setMenuItems( userData: User ) {
    this._items = [
      {
          label:'Películas',
          icon:'pi pi-fw pi-movie',
          items: [
            {
              label: 'Populares',
              routerLink: `/movie/all`
            }
          ]
      },
      {
          label:'Series',
          icon:'pi pi-fw pi-movie',
          items: [
            {
              label: 'Populares',
              routerLink: `/tv/all`
            }
          ]
      },
      {
        label: 'Salir',
        command: () => this.as.logout()
      }
      // {
      //     label:'Listas',
      //     icon:'pi pi-fw pi-list',
      //     items: [
      //       {
      //         label: 'Populares',
      //         routerLink: `/list/all`
      //       },
      //       {
      //         label: 'Mis listas',
      //         routerLink: `/user/${userData?.username}/lists`,
      //         visible: userData !== undefined
      //       },
      //       {
      //         label: 'Listas guardadas',
      //         routerLink: `/user/${userData?.username}/lists/saved`,
      //         visible: userData !== undefined
      //       },
      //     ]
      // },
      // {
      //     label:this.titleCasePipe.transform(userData?.username),
      //     icon:'pi pi-fw pi-user',
      //     items: [
      //         {
      //           label: 'Perfil',
      //           routerLink: `/user/${userData?.username}`
      //         },
      //         {
      //           label: 'Seguidos',
      //           routerLink: `/user/${userData?.username}/follows`
      //         },
      //         {
      //           label: 'Salir',
      //           command: () => this.as.logout()
      //         }
      //     ],
      //     visible: userData !== undefined
      // }
    ];
  }
}
