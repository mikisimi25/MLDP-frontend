import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnChanges{

  private _items: any;

  get items() {
    return [...this._items];
  }

  constructor(
    private as: AuthService,
  ) {
    this.setMenuItems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("🚀 ~ file: menu.service.ts ~ line 16 ~ MenuService ~ ngOnChanges ~ changes", changes)
  }

  setMenuItems() {
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
    console.log('this.as.isLoggedIn()',this.as.isLoggedIn())
  }
}
