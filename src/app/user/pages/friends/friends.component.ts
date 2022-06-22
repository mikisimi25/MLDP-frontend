import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { CrudUserService } from '../../services/crud-user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public friends: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cs: CrudUserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ username }) => {
      this.cs.getUserFriends( username ).subscribe( friends => this.friends = friends)
    })
  }

}
