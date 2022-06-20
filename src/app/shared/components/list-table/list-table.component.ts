import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/user/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'component-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  providers: [TitleCasePipe]
})
export class ListTableComponent implements OnInit{
  @Input() lists!:any;
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

  public list: List = <List>{};
  public listDialog: boolean = false;
  public submitted: boolean = false;
  public _author: boolean = true;
  public reservedLists: number[] = [1,2,3,4,5,6,7,8,9,10]
  public tableViewes:any = [];
  public activeTableView:any = {};

  public get isLoggedIn() {
    return this.as.isLoggedIn;
  }

  public get isLoggedOut() {
    return this.as.isLoggedOut;
  }

  public get userAuth() {
    return this.as.user;
  }

  constructor(
    private ls: ListService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private as: AuthService,
    private activatedRoute: ActivatedRoute,
    public titleCasePipe: TitleCasePipe
  ) {  }

  ngOnInit(){
    this.as.getUserSubject().subscribe( userData => {

    })
  }

  public openNew() {
      this.list = <List>{};
      this.submitted = false;
      this.listDialog = true;
  }

  public updateList( list: List ) {
    (list.public) && (list.public = true);
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
            this.ls.deleteList( list )
            this.messageService.add({severity:'success', summary: 'Eliminado', detail: `Lista ${ list.title } eliminada.`, life: 3000});
        }
    });
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

  public hideDialog() {
    this.listDialog = false;
    this.submitted = false;
  }

  public storeList() {
    this.submitted = true;

    if (this.list.title.trim()) {
        if (this.list.id) {
            this.lists[this.findIndexById(this.list.id)] = this.list;
            this.ls.updateList( this.list )
            this.messageService.add({severity:'success', summary: 'Actualizada', detail: 'Lista actualizada', life: 3000});
        } else {
          this.list.username = this.as.user!.username;
          this.ls.createList( this.list );
          this.lists.push( this.list );
          this.messageService.add({severity:'success', summary: 'Creado', detail: `Lista ${ this.list.title } creada.`, life: 3000});
        }

        this.lists = [...this.lists];
        this.listDialog = false;
        this.list = <List>{};
    }
  }

  public saveList( list: List ) {
    this.ls.saveList( list )
      .subscribe({
        next: resp => {
          this.messageService.add({severity:'success', summary: 'Guardada', detail: `Lista ${ list.title } de ${this.titleCasePipe.transform(list.username)} guardada.`, life: 3000});
        }
      })
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
