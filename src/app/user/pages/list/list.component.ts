import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from '../../../list/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public movies: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private cs: ContentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username, listId }) => {
      this.ls.getMovieLists( undefined,username, listId ).subscribe( list => {
          JSON.parse(list[0].contentId!).forEach( (contentId:string) => {
            this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => this.movies.push(content))
          })
        })
    });
  }

}
