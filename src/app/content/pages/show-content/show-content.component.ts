import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent {
  private _contentCollection: any;
  private _typeOfContent: string = this.activatedRoute.snapshot.data['content'];

  public get contentCollection() {
    return this._contentCollection;
  }

  public get typeOfContent(): string {
    return this._typeOfContent;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContentService,
    private router: Router,
  ) {

    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.cs.popularMoviesOrTv( this.typeOfContent,page ).subscribe( content => {
        this._contentCollection = content
        this._typeOfContent = this.activatedRoute.snapshot.data['content'];
      })
    })
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

  private scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     });
  }
}
