import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/list/services/list.service';

//PrimeNg
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

//Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as listActions from 'src/app/list/redux/list.actions';

//Interfaces
import { List } from 'src/app/list/interfaces/list.interface';
import { User } from 'src/app/user/interfaces/user.interface';
import { Buttons } from '../../interfaces/listTable.interface';

//Utilities
import * as subsUtilities from 'src/app/shared/utilities/subscription.utilities';

@Component({
  selector: 'component-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  providers: [TitleCasePipe]
})
export class ListTableComponent implements OnInit, OnDestroy {
  @Input() lists: any;
  @Input() userLists?: User;

  //Buttons
  @Input() buttonAddList?: boolean = false;
  @Input() buttonEditList?: boolean = false;
  @Input() buttonDeleteList?: boolean = false;
  @Input() buttonDeleteSavedList?: boolean = false;

  //Columns
  @Input() authorColumn?: boolean = true;
  @Input() modeColumn?: boolean = true;

  //Config
  @Input() rows: number = 10;
  @Input() paginator: boolean = true;

  //List atributes
  public list: List = <List>{};
  public listDialog: boolean = false;
  public submitted: boolean = false;

  public reservedLists: number[] = [1,2,3,4,5,6,7,8,9,10]
  public isLoggedIn: boolean = false;
  public isLoggedOut: boolean = true;
  public userAuth: User | undefined = undefined;

  public subscriptions: Subscription[] = [];

  //Buttons boolean
  public buttons: Buttons = {
    create: false,
    edit: false,
    delete: false,
    like: false,
    dislike: false
  }

  constructor(
    private ls: ListService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public titleCasePipe: TitleCasePipe,
    public store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(

      this.store.select('auth').subscribe( ({ user,isLoggedIn }) => {

        this.userAuth = user;
        this.isLoggedIn = isLoggedIn;
        this.isLoggedOut = !isLoggedIn;

        this.buttons = {
          ...this.buttons,
          create: this.buttonAddList,
          edit: this.buttonEditList,
          delete: this.buttonDeleteList,
          like: this.isLoggedIn && !this.buttonDeleteSavedList,
          dislike: this.buttonDeleteSavedList
        }

      })

    )
  }

  ngOnDestroy(): void {
    subsUtilities.unsubscribe(this.subscriptions)
  }

  public openNew() {
    this.list = <List>{};
    this.submitted = false;
    this.listDialog = true;
  }

  public updateList( list: List ) {
    this.list = {...list};
    this.listDialog = true;
  }

  public destroyList( list: List ) {
    this.confirmationService.confirm({
        message: '¿Estás seguro de querer eliminar la lista ' + list.title + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => {
            this.lists = this.lists?.filter((val: List) => val.id !== list.id);
            this.store.dispatch( listActions.deleteList({ list }) )
            this.messageService.add({severity:'success', summary: 'Eliminado', detail: `Lista ${ list.title } eliminada.`, life: 3000});
        }
    });
  }

  public hideDialog() {
    this.listDialog = false;
    this.submitted = false;
  }

  public storeList() {
    this.submitted = true;

    if (this.list.title.trim()) {
        if (this.list.id !== undefined) {
            this.lists[this.findIndexById(this.list.id)] = this.list;

            this.store.dispatch( listActions.editList({ list: this.list }) )

            this.messageService.add({severity:'success', summary: 'Actualizada', detail: 'Lista actualizada', life: 3000});
        } else {
          this.list.username = this.userAuth?.username;

          this.store.dispatch( listActions.createList({ list: this.list }) )

          this.lists.push( this.list );
          this.messageService.add({severity:'success', summary: 'Creado', detail: `Lista ${ this.list.title } creada.`, life: 3000});
        }

        this.showChanges()
    }
  }

  public showChanges() {
    // this.lists = [...this.lists];
    this.listDialog = false;
    this.list = <List>{};
  }

  public saveList( list: List ) {
    this.ls.saveList( list )
      .subscribe({
        next: resp => {
          this.messageService.add({severity:'success', summary: 'Guardada', detail: `Lista ${ list.title } de ${this.titleCasePipe.transform(list.username)} guardada.`, life: 3000});
        }
      })
  }

  public deleteSavedList( list: List ) {
    this.confirmationService.confirm({
        message: '¿Estás seguro de querer eliminar la lista ' + list.title + ' de ' + this.titleCasePipe.transform(list.username) +' de tu colección?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => {
            this.lists = this.lists?.filter((val: List) => val.id !== list.id);
            this.ls.deleteSavedList( list )
            this.messageService.add({severity:'success', summary: 'Eliminado', detail: `Lista ${ list.title } eliminada.`, life: 3000});
        }
    });
  }

  public findIndexById( id: number ): number {
    let index = -1;
    for (let i = 0; i < this.lists.length; i++) {
        if ( this.lists[i].id == id ) {
            index = i;
            break;
        }
    }

    return index;
  }
}
