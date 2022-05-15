import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';
import { Genre } from '../../interfaces/categorie.interface';

@Component({
  selector: 'app-search-tvshow',
  templateUrl: './search-tvshow.component.html',
  styleUrls: ['./search-tvshow.component.scss']
})
export class SearchTvshowComponent implements OnInit {

  public searchQuery: string = '';
  public genres: Genre[] = [];

  constructor(
    private router: Router,
    private cs: ContentService
  ) { }

  ngOnInit(): void {

    this.cs.getMovieOrTvshowsCategories( 'tv' ).subscribe( categories => this.genres = categories.genres)

  }

  public search(): void {
    if( this.searchQuery.trim().length > 0) {
      this.router.navigate([`movie/search/${ this.searchQuery }`]);
    }
  }

}
