import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { CrudUserService } from 'src/app/user/services/crud-user.service';

@Component({
  selector: 'component-small-info-card',
  templateUrl: './small-info-card.component.html',
  styleUrls: ['./small-info-card.component.scss'],
  providers: [MessageService]
})
export class SmallInfoCardComponent {
  @Input() content!: any;
  @Input() type!: string;
  @Input() crud: boolean = true;

  public selectedList: any;
  public selectedLists: any = [];
  public sliceOption!: number;

  public get user() {
    return this.as.user;
  }

  public get groupedLists() {
    this.uploadChecks(this.as.groupedLists)
    return this.as.groupedLists;
  }

  public get isLoggedIn() {
    return this.as.isLoggedIn;
  }

  constructor(
    private ls: ListService,
    private messageService: MessageService,
    private cruds: CrudUserService,
    private as: AuthService,
  ) {  }

  uploadChecks( prueba: any ) {
    this.sliceOption = ( this.type == 'movie' ) ? 6 : 3;

    prueba[0].items.forEach( (lista:any) => {
      JSON.parse(lista.contentId)?.forEach( (movieId: any) => {
        movieId = movieId.toString().slice(this.sliceOption);

        if( movieId == this.content.id) {
          this.selectedLists.push(lista)
        }

      })
    })
  }

  public showSuccess( movieId: number, list: List[]) {

    if( list.length > 0) {
      const selectedList: List = list.slice(-1)[0] || 0;

      this.ls.addContentToList( selectedList, this.type+'/'+movieId.toString());

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title});
    }

  }

  public addToViewed( movieId: string ) {
    this.ls.addContentToList( <List>{username: this.user?.username, user_list_count: 2}, movieId )
      .subscribe( list => {
        this.selectedLists.push(list)
        this.selectedLists = [...this.selectedLists]
        this.messageService.add({severity:'success', summary: 'Película añadida a la lista de Vistos'});
      })
  }

  public addFriend( userId: number ) {
    this.cruds.addFriend( this.user?.id!, userId );
    this.messageService.add({severity:'success', summary: 'Solicitud de amistad enviadad'});
  }


}
