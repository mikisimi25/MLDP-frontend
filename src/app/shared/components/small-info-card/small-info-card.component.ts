import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ListService } from 'src/app/list/services/list.service';

//Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as listActions from 'src/app/list/redux/list.actions';
import * as userActions from 'src/app/user/redux/user.actions';

//Interfaces
import { List } from 'src/app/list/interfaces/list.interface';
import { User } from 'src/app/user/interfaces/user.interface';
import { GroupedList } from '../../interfaces/groupedList.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'component-small-info-card',
  templateUrl: './small-info-card.component.html',
  styleUrls: ['./small-info-card.component.scss'],
  providers: [ MessageService ]
})
export class SmallInfoCardComponent implements OnInit, OnDestroy {
  @Input() content?: any;
  @Input() type: string = this.activatedRoute.snapshot.data['content'];
  @Input() crud: boolean = true;
  @Input() deleteButton: boolean = false;

  public groupedLists: GroupedList[] = [];
  public selectedList: List = <List>{};
  public selectedLists: List[] = [];
  public sliceOption!: number;
  public isLoggedIn: boolean = false;
  public user: User | undefined = undefined;

  private _subscriptions: Subscription[] = [];
  public viewed: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private messageService: MessageService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.groupedLists = [
      {
        label: 'Mis Listas',
        value: 'ml',
        items: []
      }
    ];

    this._subscriptions.push(

      this.store.select('auth').subscribe( ({ user,isLoggedIn }) => {
        this.isLoggedIn = isLoggedIn;
        this.user = user;
      })

    )

    this._subscriptions.push(

      this.store.select('list').subscribe(({ lists }) => {
        this.groupedLists[0].items = lists;

        (lists.length > 0) && this.uploadChecks( this.groupedLists[0].items );
      })

    )

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach( subscription => subscription.unsubscribe() );
  }

  /**
   * Update the checks of the collection list
   * @param listas imports all the lists
   */
  uploadChecks( listas: any ) {
    this.sliceOption = ( this.type == 'movie' ) ? 6 : 3;

    if(listas.length > 0) {
      listas?.forEach( (lista: List) => {
        const contentCollection: string[] = JSON.parse(lista.contentId!);

        contentCollection.forEach( (movieId: any) => {
          movieId = movieId.toString().slice(this.sliceOption);

          if( movieId == this.content.id) {
            if(lista.user_list_count == 2) {
              this.viewed = true;
            }

            this.selectedLists.push(lista)
          }

        })
      })
    }
  }

  /**
   *
   * @param movieId id of the content
   * @param lists all lists where the content is added
   */
  public showSuccess( movieId: number, lists: List[]) {
    if( lists.length > 0) {
      const selectedList: List = lists.slice(-1)[0] || 0;

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

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ lists.slice(-1)[0].title})
    }
  }

  /**
   * Adds the content to viewed list
   *
   * @param movieId id of the content
   */
  public addToViewed( movieId: string ) {

    if(this.viewed) {
      this.store.dispatch( listActions.deleteContentFromList({ id: 2, content: movieId.toString() }) );

      this.messageService.add({severity:'warn', summary: 'Película descartada de la lista de Vistos'});

      this.viewed = false;
    } else {
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

      this.store.dispatch( listActions.addContentToList({ list: <List>{username: this.user?.username, user_list_count: 2}, content: movieId.toString() }) );

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de Vistos'});
    }
  }

  public addFollower( userId: number ) {
    this.store.dispatch( userActions.follow({ userId: this.user?.id!, followId: userId }) )
  }

  public deleteContentFromList( contentId: string ) {

    this.activatedRoute.params.subscribe(({ listId }) => {

      this.store.dispatch( listActions.deleteContentFromList({ id: listId, content: this.type + '/' + contentId }) )

      // this.ls.deleteContentFromList( listId, (this.type + '/' + contentId) )
      //   .subscribe({
      //     next: resp => {
      //       this.messageService.add({severity:'success', summary: 'Contenido eliminado'});
      //       // this.ls.listChanges.next(listId)
      //     }
      //   })
    })

  }
}
