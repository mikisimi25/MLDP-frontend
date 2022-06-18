import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { ListService } from '../../../list/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public movies: any[] = [];
  public author: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private cs: ContentService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    if(this.as.getToken()) {
      setTimeout(() => {
        this.getCollection()
      }, 500)
    } else {
      this.getCollection()
    }
  }

  private getCollection() {
    this.activatedRoute.params.subscribe(({ username, listId }) => {
      this.author = this.as.user?.username === username;
      console.log("🚀 ~ file: list.component.ts ~ line 36 ~ ListComponent ~ this.activatedRoute.params.subscribe ~ this.author", this.author)

      this.ls.getMovieLists( undefined,username, listId ).subscribe( list => {
        JSON.parse(list[0].contentId!).forEach( (contentId:string) => {
          this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => this.movies.push(content))
        })
      })
    });
  }

}
