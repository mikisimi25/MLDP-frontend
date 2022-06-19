import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ContentService } from 'src/app/shared/services/content.service';
import { CrudUserService } from '../../../user/services/crud-user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
  @ViewChild('paginator', {static: false}) paginator!: Paginator;

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  //Content
  private _typeContent: string = '';
  private page: number = 1;
  private _contentCollection: any = {result: []};

  public get contentCollection() {
    return this._contentCollection;
  }

  public get typeContent() {
    return this._typeContent;
  }

  public get totalRecords() {
    return (this.contentCollection?.total_results < (500*20)) ? this.contentCollection?.total_results : (500*20);
  }

  constructor(
    private cs: ContentService,
    private activatedRoute: ActivatedRoute,
    private crs: CrudUserService,
    private router: Router
  ) {
    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
    ];

    this.optionField = this.options[0];

    this.activatedRoute.queryParams.subscribe(({type, q, page}) => {
      this.searchQuery = q;
      this._typeContent = type;
      this.page = page;
      this.optionField = this.options.find( (option: any) => option.route === this.typeContent);
    })

  }

  ngOnInit() {
    this.searchResult()
  }

  public search(): void {
    this.optionChanged({});
    this.searchResult();
  }

  public searchResult() {
    this._typeContent = this.optionField.route;
    this._contentCollection = {results: null};

    //Changing url query
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { type: this.typeContent, q: this.searchQuery, page: this.page },
        queryParamsHandling: 'merge'
      }
    );

    if ( this.typeContent === 'user' ) {
      this.crs.getUser( undefined,undefined,undefined, this.searchQuery ).subscribe( users => {
        this._contentCollection.results = users;
      })
    } else {
      this.getContent();
    }
  }

  private getContent() {
    this.cs.getMovieOrTvshowsSearchResult( this.typeContent, this.searchQuery,this.page ).subscribe( content => {
      this._contentCollection = content;
      this.paginator.changePageToFirst(event);
    })
  }

  public paginate( event:any ) {
    this.page = event.page+1;

    this.searchResult()

    this.scrollToTop()
  }

  private scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     });
  }

  public optionChanged( event: any) {
    this.page = 1;
  }

}
