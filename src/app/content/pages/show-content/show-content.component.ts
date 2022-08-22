import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent implements OnInit, OnDestroy {
  private _contentCollection: any;
  private _typeOfContent: string = this.activatedRoute.snapshot.data['content'];

  private _subscriptions: Subscription[] = [];

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
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {

    this._subscriptions.push(

      this.activatedRoute.queryParams.subscribe(({page}) => {
        this.cs.popularMoviesOrTv( this.typeOfContent,page ).subscribe( content => {
          this._contentCollection = content
          this._typeOfContent = this.activatedRoute.snapshot.data['content'];
        })
      })

    )

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach( subscription => subscription.unsubscribe() );
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
