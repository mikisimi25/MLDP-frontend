import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  public movie: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ movieId }) => {
      this.cs.getMovieOrTvshowsById( 'movie/'+movieId ).subscribe( movie => this.movie = movie)
    });
  }

}