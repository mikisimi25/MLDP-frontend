import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { ListService } from 'src/app/list/services/list.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: List[] = [];
  public author: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ls: ListService,
    private as: AuthService,
  ) { }

  ngOnInit(): void {
    this.as.authVerification().subscribe( user => {
      this.activatedRoute.params.subscribe(({ username }) => {
        this.author = user?.username === username;

        this.ls.getMovieLists(((this.author) ? undefined : true),username).subscribe( lists => this.lists = lists)
      })
    })
  }
}
