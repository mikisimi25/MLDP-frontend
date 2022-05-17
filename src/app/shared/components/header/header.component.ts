import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { CrudUserService } from 'src/app/user/services/crud-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  _user: User | undefined;
  items: any = []

  get user() {
    return this._user
  }

  constructor(
    private as: AuthService,
    private crs: CrudUserService
  ) { }

  ngOnInit() {
    this.as.authVerification()
      .subscribe( user => {
        this._user = user;

        this.items = [
          {
              label:'Películas',
              icon:'pi pi-fw pi-movie',
              items: [
                {
                  label: 'Populares',
                  routerLink: `/movie/all`
                },
                {
                  label: 'Buscar',
                  routerLink: `/movie/search`
                },
              ]
          },
          {
              label:'Series',
              icon:'pi pi-fw pi-movie',
              items: [
                {
                  label: 'Populares',
                  routerLink: `/tv/all`
                },
                {
                  label: 'Buscar',
                  routerLink: `/tv/search`
                },
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
                  routerLink: `/user/${this.user!.username}/lists`
                },
              ]
          },
          {
              label:'Usuario',
              icon:'pi pi-fw pi-user',
              items: [
                  {
                    label: 'Perfil',
                    routerLink: `/user/${this.user!.username}`
                  },
                  {
                    label: 'Salir',
                    command: () => this.signout()
                  }
              ]
          }
        ];
      })
  }

  public signout() {
    this.as.logout()
  }
}
