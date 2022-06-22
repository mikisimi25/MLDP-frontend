import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  public get isLoggedIn() {
    return this.as.isLoggedIn;
  }

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private as: AuthService,
    private router: Router,
    public titleCasePipe: TitleCasePipe
  ) {  }

  ngOnInit() {

    this.as.getUserSubject().subscribe( userData => {
      this.setMenuItems( userData! );
    })

    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
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
          label:'Listas',
          icon:'pi pi-fw pi-list',
          items: [
            {
              label: 'Populares',
              routerLink: `/list/all`
            },
            {
              label: 'Mis listas',
              routerLink: `/user/${userData?.username}/lists`,
              visible: this.isLoggedIn
            },
            {
              label: 'Listas guardadas',
              routerLink: `/user/${userData?.username}/lists/saved`,
              visible: this.isLoggedIn
            },
          ]
      },
      {
          label:this.titleCasePipe.transform(userData?.username),
          icon:'pi pi-fw pi-user',
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
                command: () => this.as.logout()
              }
          ],
          visible: this.isLoggedIn
      }
    ];
  }
}
