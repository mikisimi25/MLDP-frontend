import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from 'src/app/list/services/list.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent implements OnInit {
  public showContent: any[] = [];
  public listOfLists: List[] = [];
  public typeOfContent: string = this.activatedRoute.snapshot.data['content'];

  constructor(
    private ls: ListService,
    private as: AuthService,
    private activatedRoute: ActivatedRoute,
    private cs: ContentService
  ) {
    this.as.authVerification().subscribe( user => {
      if( user ) {
        this.ls.getMovieLists(undefined,user?.username).subscribe( (lists:any) => {
          this.cs.popularMoviesOrTv( this.typeOfContent ).subscribe( content => {
            this.showContent = content.results;
            this.listOfLists = lists;
          })

        })
      } else {
        this.cs.popularMoviesOrTv( this.typeOfContent ).subscribe( content => {
          this.showContent = content.results;
        })
      }
    })
  }

  ngOnInit() {
  }
}
