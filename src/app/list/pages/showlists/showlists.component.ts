import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-showlists',
  templateUrl: './showlists.component.html',
  styleUrls: ['./showlists.component.scss']
})
export class ShowlistsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private ls: ListService
  ) { }

  ngOnInit(): void {
    this.ls.getMovieLists(true).subscribe( lists => this.lists = lists)
  }
}
