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
  public contentCpllection: any[] = [];
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

      this.ls.getMovieLists( undefined,username, listId ).subscribe( list => {
        JSON.parse(list[0].contentId!).forEach( (contentId:string) => {
          if(list[0].public == true || this.author) {
            this.cs.getMovieOrTvshowsById( contentId ).subscribe( content => this.contentCpllection.push(content))
          }
        })
      })
    });
  }

}
