import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  public movie: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ms: MovieService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ movieId }) => {
      this.ms.getMovieById( movieId ).subscribe( movie => this.movie = movie)
    });
  }

}
