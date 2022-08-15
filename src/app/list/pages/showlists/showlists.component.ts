import { Component, OnInit } from '@angular/core';
import { List } from '../../interfaces/list.interface';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-showlists',
  templateUrl: './showlists.component.html',
  styleUrls: ['./showlists.component.scss']
})
export class ShowlistsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('list').subscribe(({ lists }) => this.lists = lists)
  }
}
