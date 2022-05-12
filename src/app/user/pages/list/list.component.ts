import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie/services/movie.service';
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
    private ms: MovieService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username, listId }) => {
      this.ls.getMovieListById( listId ).subscribe( list => {
          list.moviesId!.forEach( movieId => {

            this.ms.getMovieById( movieId ).subscribe( movie => this.movies.push(movie))

          })
        })
    });
  }

}
