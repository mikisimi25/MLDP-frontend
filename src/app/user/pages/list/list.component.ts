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
      this.ls.getMovieListById( listId ).subscribe( list => {
          list.moviesId!.forEach( movieId => {

            this.cs.getMovieOrTvshowsById( movieId ).subscribe( movie => this.movies.push(movie))

          })
        })
    });
  }

}
