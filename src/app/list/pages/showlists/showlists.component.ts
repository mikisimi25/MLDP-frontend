import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-showlists',
  templateUrl: './showlists.component.html',
  styleUrls: ['./showlists.component.scss']
})
export class ShowlistsComponent implements OnInit {

  private _lists: List[] = [];

  public get lists(): List[] {
    return this._lists;
  }

  constructor(
    private ls: ListService
  ) { }

  ngOnInit(): void {

    this.ls.getMovieLists()
      .subscribe( lists => {
        this._lists = lists;
      })

  }

  public createList() {

    this.ls.createList(
      {
        userId: 1,
        title: "Favoritos",
        description: "Lista de películas favoritas de Bebop23",
        moviesId: []
      }
    )

  }



}
