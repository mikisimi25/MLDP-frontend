import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popularMovies.interface';
import { MovieService } from '../../services/movie.service';
import { ListService } from '../../../list/services/list.service';

@Component({
  selector: 'app-showmovies',
  templateUrl: './showmovies.component.html',
  styles: [
  ]
})
export class ShowmoviesComponent implements OnInit {

  showContent: Result[] = [];

  constructor(
    private ms: MovieService,
    private ls: ListService
  ) { }

  ngOnInit(): void {

    this.ms.popularMovies()
      .subscribe( movies => {
        this.showContent = movies.results;
        console.log(movies.results);
      })

  }

  addToFavourite( movieId: number ) {
    this.ls.addMovieToList( 1, movieId)
  }


}
