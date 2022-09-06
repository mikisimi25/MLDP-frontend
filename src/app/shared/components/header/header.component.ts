import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { guestAccess, login, unSetUser } from 'src/app/auth/redux/auth.actions';

import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TitleCasePipe]
})
export class HeaderComponent{
  public items: any = [];

  public auth: any = {
    isLoggedIn: false,
    guest: false,
  }

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private router: Router,
    public titleCasePipe: TitleCasePipe,
    private store: Store<AppState>
  ) {  }

  ngOnInit(): void {

    this.store.select('auth').subscribe(({ user, isLoggedIn, guest }) => {

      this.auth.isLoggedIn = isLoggedIn;
      this.auth.guest = guest;

      this.options = [
        {value: 'Películas', route: "movie"},
        {value: 'Series', route: "tv"}
      ];

      //If it is a user displeys user option in the search
      if(!guest && isLoggedIn) {
        this.options.push({value: 'Usuarios', route: "user"});
      }

      this.setMenuItems( user!, this.auth )
    })

    this.optionField = this.options[0];
  }

  public search(): void {
    if(this.searchQuery.trim().length > 0) {
      this.router.navigate([`/search`], { queryParams: { type: this.optionField.route, q: this.searchQuery }});
      this.searchQuery = '';
      this.optionField = this.options[0];
    }
  }

  public guestLogin(): void {
    this.store.dispatch( guestAccess() )
  }

  public setMenuItems( userData: User, auth: any ): void {
    this.items = [
      {
        label:'Películas',
        icon:'fa-solid fa-film',
        routerLink: `/movie/all`
      },
      {
        label:'Series',
        icon: 'fa-solid fa-tv',
        routerLink: `/tv/all`
      }
    ]

    if(auth.isLoggedIn) {
      if( auth.guest ) {
        this.items.push(
          {
            label: 'Mis listas',
            icon: 'fa-solid fa-clipboard-list',
            routerLink: `/user/${userData?.username}/lists`,
            visible: userData !== undefined
          },
          {
            label: 'Salir',
            icon: 'fa-solid fa-arrow-right-from-bracket',
            command: () => this.store.dispatch( unSetUser() ),
            visible: userData !== undefined
          }
        )
      } else if ( !auth.guest ) {
        this.items.push(
          {
              label:'Listas',
              icon: 'fa-solid fa-clipboard-list',
              items: [
                {
                  label: 'Populares',
                  routerLink: `/list/all`
                },
                {
                  label: 'Mis listas',
                  routerLink: `/user/${userData?.username}/lists`,
                  visible: userData !== undefined
                },
                {
                  label: 'Listas guardadas',
                  routerLink: `/user/${userData?.username}/lists/saved`,
                  visible: userData !== undefined
                },
              ]
          },
          {
            label:this.titleCasePipe.transform(userData?.username),
            icon:'fa fa-user',
            items: [
                {
                  label: 'Perfil',
                  routerLink: `/user/${userData?.username}`
                },
                {
                  label: 'Seguidos',
                  routerLink: `/user/${userData?.username}/follows`
                },
                {
                  label: 'Salir',
                  icon: 'fa-solid fa-arrow-right-from-bracket',
                  command: () => this.store.dispatch( unSetUser() ),
                  visible: userData !== undefined
                }
            ],
            visible: userData !== undefined
          }
        );
      }
    }
  }
}
