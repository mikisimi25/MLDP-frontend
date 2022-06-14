import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'component-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent implements OnInit {
  @Input() selectorData: any = {};
  @Input() queryData: string = '';
  @Input() redirect: boolean = true;

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
  ) {
    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
    ];
  }

  ngOnInit(): void {
    this.optionField = this.options[0];
  }

  public search(): void {
    if(this.searchQuery.trim().length > 0) {
      this.router.navigate([`/search?type=${this.optionField.route}&q=${ this.searchQuery }`]);
      this.searchQuery = '';
      this.optionField = this.options[0];
    }
  }
}
