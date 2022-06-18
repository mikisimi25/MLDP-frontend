import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public get items() {
    return this.as.items;
  }

  public get isLoggedIn() {
    return this.as.isLoggedIn;
  }

  //Search
  public searchQuery: string = '';
  public optionField: any;
  public options: any;

  constructor(
    private as: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.options = [
      {value: 'Películas', route: "movie"},
      {value: 'Series', route: "tv"},
      {value: 'Usuarios', route: "user"}
    ];

    this.optionField = this.options[0];
  }

  public search(): void {
    if(this.searchQuery.trim().length > 0) {
      this.router.navigate([`/search`], { queryParams: { type: this.optionField.route, q: this.searchQuery }});
      this.searchQuery = '';
      this.optionField = this.options[0];
    }
  }
}
