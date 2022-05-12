import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { CrudUserService } from '../../services/crud-user.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: List[] = [];
  public list!: List;
  public listDialog: boolean = false;
  public submitted: boolean = false;
  public username!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private us: CrudUserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username }) => {
      this.us.getUserByUsername( username ).subscribe( user => {
        this.username = username;

        this.ls.getUserListsByUsername( username ).subscribe( lists => this.lists = lists )
      })
    });
  }

  openNew() {
      this.list = <List>{}
      this.submitted = false;
      this.listDialog = true;
  }

  editProduct( list: List ) {
    this.list = {...list};
    this.listDialog = true;
  }

  deleteProduct( list: List ) {
    this.confirmationService.confirm({
        message: '¿Estás seguro de querer eliminar la lista ' + list.title + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => {
            this.lists = this.lists.filter((val: List) => val.id !== list.id);
            this.ls.deleteList( list.id! )
            this.messageService.add({severity:'success', summary: 'Eliminado', detail: `Lista ${ list.title } eliminada.`, life: 3000});
        }
    });
  }

  hideDialog() {
      this.listDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.list.title.trim()) {
          if (this.list.id) {
              this.lists[this.findIndexById(this.list.id)] = this.list;
              this.ls.updateList( this.list.id, this.list )
              this.messageService.add({severity:'success', summary: 'Actualizada', detail: 'Lista actualizada', life: 3000});
          } else {
            this.list.username = this.username;
            this.ls.createList( this.list );
            this.lists.push( this.list );
            this.messageService.add({severity:'success', summary: 'Creado', detail: `Lista ${ this.list.title } creada.`, life: 3000});
          }
        console.log(this.list);

          this.lists = [...this.lists];
          this.listDialog = false;
          this.list = <List>{};
      }
  }

  findIndexById( id: number ): number {
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
