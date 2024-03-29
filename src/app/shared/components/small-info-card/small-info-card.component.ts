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
import { of, Subscription } from 'rxjs';

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
  public oldCollection: List[] = [];
  public selectedLists: List[] = [];
  public sliceOption!: number;
  public isLoggedIn: boolean = false;
  public user: User | undefined = undefined;

  private _subscriptions: Subscription[] = [];
  public viewed: boolean = false;

  public ratingColl: number[] = [];
  public selectedRating: number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
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

    for(let i = 1; i <= 10; i++) {
      this.ratingColl.push(i);
    }

    this._subscriptions.push(

      this.store.select('auth').subscribe( ({ user,isLoggedIn }) => {
        this.isLoggedIn = isLoggedIn;
        this.user = user;

        //Reset
        this.viewed = false;

        this.selectedRating = this.setRaiting();
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
  public uploadChecks( listas: any ) {
    this.sliceOption = ( this.type == 'movie' ) ? 6 : 3;
    this.selectedLists = [];

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
            this.oldCollection = this.selectedLists;
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
  public toggleAdd( movieId: number, lists: List[]) {
      if( this.oldCollection > lists ) {
        let descartedList: List = this.catchDeletetedList(this.oldCollection,lists);

        // const selectedList: List = lists.slice(-1)[0] || 0;

        // this.ls.addContentToList( selectedList, this.type+'/'+movieId.toString())
        //   .subscribe( data => {
        //     if(data) {
        //       this.ls.updateGroupedListsSubject()
        //       this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title})
        //     } else {
        //       this.messageService.add({severity:'warn', summary: 'Contenido repetido'});
        //     }
        //   })

        this.store.dispatch( listActions.deleteContentFromList({ id: descartedList.user_list_count!, content: this.type+'/'+movieId.toString() }) );

        this.messageService.add({severity:'warn', summary: 'Película descartada de la lista de '+ descartedList.title})
      } else {
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

  public setRaiting(): number | null {
    const raitingMap = new Map(JSON.parse(localStorage.getItem('ratingColl')!))

    const content: string = this.type + '/' + this.content.id;
    const raiting = raitingMap.get(content);

    if( raiting !== undefined ) {
      return <number>raiting;
    }

    return null;
  }

  public changeRating(): void {
    const raitingMap = new Map(JSON.parse(localStorage.getItem('ratingColl')!));
    const content: string = this.type + '/' + this.content.id;

    if(this.selectedRating) {
      raitingMap.set(content,this.selectedRating)
    } else {
      raitingMap.delete(content)
    }

    localStorage.setItem('ratingColl',JSON.stringify(Array.from(raitingMap.entries())));
  }

  private catchDeletetedList( oldLists: List[], newLists: List[] ): List {
    let oldCollection: List[] = oldLists;
    let newCollection: List[] = newLists;
    let descartedList!: List;

    oldCollection.forEach((oldList) => {
      let index = newCollection.findIndex( list => list.user_list_count === oldList.user_list_count )

      if(index == -1) {
        descartedList = oldList;
      }

    })

    return descartedList;
  }
}
