import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private as: AuthService,
  ) {  }

  ngOnInit(): void {
    if(this.as.getToken()) {
      setTimeout(() => {
        this.getCollection()
      }, 800)
    } else {
      this.getCollection()
    }
  }

  private getCollection() {
    this.activatedRoute.params.subscribe(({ username }) => {
        this.ls.getMovieLists((this.as.user?.username === username ? undefined : true),username).subscribe( lists => {
          this.lists = lists
        })
    })
  }
}
