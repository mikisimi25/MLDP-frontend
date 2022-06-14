import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { CrudUserService } from 'src/app/user/services/crud-user.service';

@Component({
  selector: 'component-small-info-card',
  templateUrl: './small-info-card.component.html',
  styleUrls: ['./small-info-card.component.scss'],
  providers: [MessageService]
})
export class SmallInfoCardComponent implements OnInit {
  @Input() content!: any;
  @Input() type!: string;
  @Input() crud: boolean = true;
  @Input() listOfLists?: List[];

  public groupedLists!: any[];
  public selectedList: any;
  public selectedLists: any = [];
  public sliceOption!: number;
  public userAuth?: User;

  constructor(
    private ls: ListService,
    private messageService: MessageService,
    private as: AuthService,
    private cruds: CrudUserService
  ) {
    this.as.authVerification().subscribe( userAuth => this.userAuth = userAuth);
  }

  ngOnInit() {
    if( this.type !== "user" ) {
      this.sliceOption = ( this.type == 'movie' ) ? 6 : 3;

      this.listOfLists?.forEach( (lista:any) => {
        JSON.parse(lista.contentId)?.forEach( (movieId: any) => {
          movieId = movieId.toString().slice(this.sliceOption);

          if( movieId == this.content.id) {
            this.selectedLists.push(lista)
          }

        })
      })

      this.groupedLists = [
          {
            label: 'Mis Listas',
            value: 'ml',
            items: this.listOfLists
          }
      ];
    }
  }

  public showSuccess( movieId: number, list: List[]) {

    if( list.length > 0) {
      const selectedList: List = list.slice(-1)[0] || 0;

      this.ls.addContentToList( selectedList, this.type+'/'+movieId.toString());

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title});
    }

  }

  public addToFavourite( movieId: string ) {
    this.ls.addContentToList( <List>{username: this.userAuth?.username, id: 1}, movieId )
  }

  public addFriend( userId: number ) {
    this.cruds.addFriend( this.userAuth?.id!, userId );
    this.messageService.add({severity:'success', summary: 'Solicitud de amistad enviadad'});
  }


}
