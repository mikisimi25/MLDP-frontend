import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private cs: ContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ contentId }) => {
      this.cs.getMovieOrTvshowsById( this.typeOfContent+"/"+contentId ).subscribe({
        next: content => {
          this.content = content

          this.cs.getContentTrailer( this.typeOfContent, this.content.id ).subscribe( (data:any) => {
            this.content = { trailerId: data.results[0].key, ...this.content }
          })
        },
        error: err => {
          this.router.navigateByUrl('');
        }
      })
    });
  }

  public displayTrailerModal: boolean = false;

  public trailerModal() {
    this.displayTrailerModal = true;
  }

}
