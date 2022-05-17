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
  public list!: List;
  public listDialog: boolean = false;
  public submitted: boolean = false;
  public username!: string;

  constructor(
    private ls: ListService
  ) { }

  ngOnInit(): void {
    this.ls.getMovieLists().subscribe( lists => this.lists = lists)
  }
}
