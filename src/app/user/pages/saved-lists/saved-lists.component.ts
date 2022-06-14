import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';

@Component({
  selector: 'app-saved-lists',
  templateUrl: './saved-lists.component.html',
  styleUrls: ['./saved-lists.component.scss']
})
export class SavedListsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username }) => {
        this.ls.getSavedLists( username ).subscribe( (lists:any) => {
          this.lists = lists
        } )
    })
  }

}
