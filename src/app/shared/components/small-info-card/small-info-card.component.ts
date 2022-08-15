import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { CrudUserService } from 'src/app/user/services/crud-user.service';
import * as listActions from 'src/app/list/redux/list.actions';
import * as userActions from 'src/app/user/redux/user.actions';

@Component({
  selector: 'component-small-info-card',
  templateUrl: './small-info-card.component.html',
  styleUrls: ['./small-info-card.component.scss'],
  providers: [MessageService]
})
export class SmallInfoCardComponent implements OnInit{
  @Input() content?: any;
  @Input() type: string = this.activatedRoute.snapshot.data['content'];
  @Input() crud: boolean = true;
  @Input() deleteButton: boolean = false;

  public groupedLists: any;
  public selectedList: any;
  public selectedLists: any = [];
  public sliceOption!: number;
  public isLoggedIn: boolean = false;
  public user: User | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private messageService: MessageService,
    private cruds: CrudUserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('auth').subscribe( ({ user,isLoggedIn }) => {
      this.isLoggedIn = isLoggedIn;
      this.user = user;
    })

    this.ls.getGroupedListsSubject().subscribe( group => {
      this.groupedLists = group;
      (group.length > 0) && this.uploadChecks( this.groupedLists )
    })

  }

  uploadChecks( prueba: any ) {
    this.sliceOption = ( this.type == 'movie' ) ? 6 : 3;

    if(prueba[0].items.length > 0) {
      prueba[0].items?.forEach( (lista:any) => {
        JSON.parse(lista.contentId)?.forEach( (movieId: any) => {
          movieId = movieId.toString().slice(this.sliceOption);

          if( movieId == this.content.id) {
            this.selectedLists.push(lista)
          }

        })
      })
    }
  }

  public showSuccess( movieId: number, list: List[]) {
    if( list.length > 0) {
      const selectedList: List = list.slice(-1)[0] || 0;

      // this.ls.addContentToList( selectedList, this.type+'/'+movieId.toString())
      //   .subscribe( data => {
      //     if(data) {
      //       this.ls.updateGroupedListsSubject()
      //       this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title})
      //     } else {
      //       this.messageService.add({severity:'warn', summary: 'Contenido repetido'});
      //     }
      //   })

      this.store.dispatch( listActions.addContentToList({ list: selectedList, content: this.type+'/'+movieId.toString() }) );

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title})
    }
  }

  public addToViewed( movieId: string ) {
    // this.ls.addContentToList( <List>{username: this.user?.username, user_list_count: 2}, movieId )
    //   .subscribe( list => {
    //     if(list) {
    //       this.selectedLists.push(list)
    //       this.selectedLists = [...this.selectedLists];
    //       this.ls.updateGroupedListsSubject()
    //       this.messageService.add({severity:'success', summary: 'Película añadida a la lista de Vistos'});
    //     } else {
    //       this.messageService.add({severity:'warn', summary: 'Contenido repetido'});
    //     }
    //   })

    this.store.dispatch( listActions.addContentToList({ list: <List>{username: this.user?.username, user_list_count: 2}, content: this.type+'/'+movieId.toString() }) );

    this.messageService.add({severity:'success', summary: 'Película añadida a la lista de Vistos'});
  }

  public addFollower( userId: number ) {
    this.store.dispatch( userActions.follow({ userId: this.user?.id!, followId: userId }) )
  }

  public deleteContentFromList( contentId: string ) {

    this.activatedRoute.params.subscribe(({ listId }) => {
      this.ls.deleteContentFromList( listId, (this.type + '/' + contentId) )
        .subscribe({
          next: resp => {
            this.messageService.add({severity:'success', summary: 'Contenido eliminado'});
            this.ls.listChanges.next(listId)
          }
        })
    })

  }
}
