import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { CrudUserService } from '../../../user/services/crud-user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit{
  private user: any;

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  //Content
  public typeContent: string = '';
  public showContent: any[] = [];
  public listOfLists: List[] = [];

  constructor(
    private cs: ContentService,
    private as: AuthService,
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private crs: CrudUserService,
    private router: Router
  ) {
    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
    ];

    this.optionField = this.options[0];

    this.as.authVerification().subscribe( user => {
      this.user = user;
    })

    this.activatedRoute.queryParams.subscribe(({type, q}) => {
      this.searchQuery = q;
      this.typeContent = type;
      this.optionField = this.options.find( (option: any) => option.route === this.typeContent);
    })

  }

  ngOnInit() {
    this.searchResult()
  }

  public search(): void {
    this.searchResult();
  }

  public searchResult() {
    this.typeContent = this.optionField.route;

    //Changing url query
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { type: this.typeContent, q: this.searchQuery },
        queryParamsHandling: 'merge'
      }
    );


    if ( this.typeContent === 'user' ) {
      this.crs.getUser( undefined,undefined,undefined, this.searchQuery ).subscribe( users => {
        this.showContent = [];
        this.showContent = users;
      })
    } else {
      if( this.user ) {
          this.ls.getMovieLists(undefined,this.user.username).subscribe( (lists:any) => {
            this.listOfLists = lists;

            this.getContent()
          })
      } else {
        this.getContent()
      }
    }
  }

  private getContent() {
    this.cs.getMovieOrTvshowsSearchResult( this.typeContent, this.searchQuery ).subscribe( content => {
      this.showContent = [];
      this.showContent = content.results;
    })
  }

}
