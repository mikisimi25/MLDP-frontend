import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  private _lists: List[] = [];
  private _permission: boolean = false;

  public get lists(): List[] {
    return this._lists;
  }

  public get permission(): boolean {
    return this._permission;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private as: AuthService,
    private store: Store<AppState>
  ) {  }

  ngOnInit(): void {
    this.store.select('auth').subscribe( ({ user }) => {
      this.getCollection( user! )
    })
  }

  private getCollection( userData: User ) {
    this.activatedRoute.params.subscribe(({ username }) => {
        this._permission = userData?.username === username;

        this.ls.getMovieLists((userData?.username === username ? undefined : true),username).subscribe( lists => {
          this._lists = lists
          if(this._permission) {
            this._lists = lists
          } else {
            lists.forEach( list => {
              ( list.public ) && (this.lists.push(list));
            })
          }
        })
    })
  }
}
