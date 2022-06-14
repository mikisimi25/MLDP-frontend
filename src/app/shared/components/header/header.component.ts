import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public items: any = []
  public userAuth?: User;
  public isLoggedIn: boolean = false;
  public isLoggedOut: boolean = true;

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private as: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
    ];

    this.optionField = this.options[0];

    this.as.setUserData()

    this.as.authVerification().subscribe( userAuth => {
      this.userAuth = userAuth;

      this.items = [
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
                routerLink: `/user/${this.as.user?.username}/lists`,
                visible: this.as.isLoggedIn()
              },
              {
                label: 'Listas guardadas',
                routerLink: `/user/${this.as.user?.username}/lists/saved`,
                visible: this.as.isLoggedIn()
              },
            ]
        },
        {
            label:'Usuario',
            icon:'pi pi-fw pi-user',
            items: [
                {
                  label: 'Perfil',
                  routerLink: `/user/${this.as.user?.username}`
                },
                {
                  label: 'Amigos',
                  routerLink: `/user/${this.as.user?.username}/friends`
                },
                {
                  label: 'Salir',
                  command: () => this.as.logout()
                }
            ],
            visible: this.as.isLoggedIn()
        }
      ];
    });

  }

  public search(): void {
    if(this.searchQuery.trim().length > 0) {
      this.router.navigate([`/search`], { queryParams: { type: this.optionField.route, q: this.searchQuery }});
      this.searchQuery = '';
      this.optionField = this.options[0];
    }
  }
}
