import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-tvshow-info',
  templateUrl: './tvshow-info.component.html',
  styleUrls: ['./tvshow-info.component.scss']
})
export class TvshowInfoComponent implements OnInit {
  public movie: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ tvId }) => {
      this.cs.getMovieOrTvshowsById( ('tv/'+tvId) ).subscribe( movie => this.movie = movie)
    });
  }

}
