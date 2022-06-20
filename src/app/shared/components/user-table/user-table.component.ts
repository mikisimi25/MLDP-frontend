import { CrudUserService } from 'src/app/user/services/crud-user.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{
  @Input() users!: User[];

  @Input() rows: number = 10;
  @Input() paginator: boolean = true;

  constructor(
    private as: AuthService,
    private crud: CrudUserService,
    private messageService: MessageService,
  ) {  }

  ngOnInit(){
  }

  public cancelSuscrption( userId: number ) {
    this.crud.cancelFollow( userId )
      .subscribe({
        next: resp => {
          this.users = this.users?.filter((val: User) => val.id !== userId);
          this.messageService.add({severity:'warn', summary: 'Suscripción cancelada'});
        }
      })
  }

}
