import { Component } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from 'src/app/list/services/list.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent {
  private _contentCollection: any;
  public typeOfContent: string = this.activatedRoute.snapshot.data['content'];
  private _groupedLists: any = [];

  public get contentCollection() {
    return this._contentCollection;
  }

  public get groupedLists() {
    return this._groupedLists;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContentService,
    private router: Router,
    private ls: ListService,
    private as: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.cs.popularMoviesOrTv( this.typeOfContent,page ).subscribe( content => this._contentCollection = content)
    })

    if(this.as.getToken()) {
      setTimeout(() => {
        this.as.setUserListCollection()
      }, 1000)
    } else {
      this.as.setUserListCollection()
    }
  }

  public paginate( event:any ) {
    const page = event.page+1;

    this.cs.popularMoviesOrTv( this.typeOfContent, page ).subscribe( content => this._contentCollection = content)

    this.scrollToTop()

    //Changing url query
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: page },
        queryParamsHandling: 'merge'
      }
    );
  }

  public setUserListCollection() {
    this.ls.getMovieLists(undefined,this.as.user?.username).subscribe( (lists:any) => {

      this._groupedLists = [
        {
          label: 'Mis Listas',
          value: 'ml',
          items: lists
        }
      ];
    })
  }

  private scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     });
  }
}
