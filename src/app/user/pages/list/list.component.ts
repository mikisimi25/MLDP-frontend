import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from '../../../list/services/list.service';

//Interfaces
import { List } from 'src/app/list/interfaces/list.interface';

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

          this.store.select('auth').pipe(debounceTime(500)).subscribe( ({ user }) => {
            this.authorColumn = user?.username === this._list.username;

            this.store.select('list').subscribe( () => {
              this.ls.getMovieLists( undefined,this._list.username, this._list.user_list_count ).subscribe( list => {
                this.contentCpllection = this.extractContent(list[0], this.authorColumn)
              });
            })
          })
      })
  }


  /**
   * Gets the collection of content id and returns a collection of content
   *
   * @param list
   * @returns
   */
  private extractContent( list: List, myList: boolean ): any {

    const contentIdCollection: string[] = JSON.parse(list.contentId!);
    let contentCollection: any = [];

    contentIdCollection.forEach( (contentId:string) => {
      if(list.public == true || myList) {
        let type: string = (contentId.includes('tv')) ? 'tv' : 'movie';

        this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => contentCollection.push({...content,type:type}))
      }
    })

    return contentCollection;
  }

}
