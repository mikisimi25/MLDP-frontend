import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-content-info',
  templateUrl: './content-info.component.html',
  styleUrls: ['./content-info.component.scss']
})
export class ContentInfoComponent implements OnInit {
  public content: any;
  public typeOfContent: string = this.activatedRoute.snapshot.data['content'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: ContentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ contentId }) => {
      this.cs.getMovieOrTvshowsById( this.typeOfContent+"/"+contentId ).subscribe( content => this.content = content)
    });
  }

}
