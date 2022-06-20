import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounce, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from '../../../list/services/list.service';
import { User } from '../../interfaces/user.interface';

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
    private as: AuthService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ username, listId }) => {
      this._list = <List>{ id: listId, username: username};
    })

    this.as.getUserSubject()
      .pipe(
        debounceTime(500)
      ).subscribe( userData => {
        this.authorColumn = userData?.username === this._list.username;
        this.getCollection()
      })

    this.ls.getListChanges().subscribe( listId => {
      if( listId === this._list.id) {
        this.getCollection()
      }
    })
  }

  private getCollection() {
    this.contentCpllection = []
      this.ls.getMovieLists( undefined,this._list.username, this._list.id ).subscribe( list => {
        JSON.parse(list[0].contentId!).forEach( (contentId:string) => {
          if(list[0].public == true || this.authorColumn) {
            let type: string = (contentId.includes('tv')) ? 'tv' : 'movie';

            this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => this.contentCpllection.push({...content,type:type}))
          }
        })

    });
  }

}
