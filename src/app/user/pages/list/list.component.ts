import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { List } from 'src/app/list/interfaces/list.interface';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from '../../../list/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _list!: List;
  public contentCpllection: any[] = [];
  public authorColumn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private cs: ContentService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ username, listId }) => {
      this._list = <List>{ user_list_count: listId, username: username};
    })

    this.store.select('auth')
      .pipe(
        debounceTime(500)
      ).subscribe( ({ user }) => {
        this.authorColumn = user?.username === this._list.username;
        this.getCollection()
      })


    this.store.select('list').subscribe(({ lists }) => {
      this.getCollection()
    })
  }

  private getCollection() {
    this.contentCpllection = []
      this.ls.getMovieLists( undefined,this._list.username, this._list.user_list_count ).subscribe( list => {

        JSON.parse(list[0].contentId!).forEach( (contentId:string) => {
          if(list[0].public == true || this.authorColumn) {
            let type: string = (contentId.includes('tv')) ? 'tv' : 'movie';

            this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => this.contentCpllection.push({...content,type:type}))
          }
        })

    });
  }

}
