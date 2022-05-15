import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { Genre } from '../../interfaces/categorie.interface';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  public searchQuery: string = '';
  public genres: Genre[] = [];

  constructor(
    private router: Router,
    private cs: ContentService
  ) { }

  ngOnInit(): void {

    this.cs.getMovieOrTvshowsCategories( 'movie' ).subscribe( categories => this.genres = categories.genres)

  }

  public search(): void {
    if( this.searchQuery.trim().length > 0) {
      this.router.navigate([`movie/search/${ this.searchQuery }`]);
    }
  }

}