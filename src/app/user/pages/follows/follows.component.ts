import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {
  public followers: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: CrudUserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username }) => {
      this.cs.getUserFollowers( username ).subscribe( followers => this.followers = followers)
    })
  }

}
