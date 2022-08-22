import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

//Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ListService } from 'src/app/list/services/list.service';

//Utilities
import * as subsUtilities from 'src/app/shared/utilities/subscription.utilities';

//Interface
import { List } from 'src/app/list/interfaces/list.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
  public lists: List[] = [];
  public permission: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private ls: ListService
  ) {  }

  ngOnInit(): void {
    this.subscriptions.push(

      this.store.subscribe(({ auth, list  }) => {
        //Guest
        if( auth.guest ) {
          this.lists = [...list.lists];
          this.permission = true;
        } else {
        //User
          this.getCollection( auth.user! );
        }
      })

    )
  }

  ngOnDestroy(): void {
    subsUtilities.unsubscribe(this.subscriptions);
  }

  /**
   *  Set the collection of users lists
   * @param userData
   */
  private getCollection( userData: User ): void {
    this.subscriptions.push(

      this.activatedRoute.params.subscribe(({ username }) => {
          this.permission = userData?.username === username;

          this.subscriptions.push(

            this.ls.getMovieLists((userData?.username === username ? undefined : true),username).subscribe( lists => {
              this.lists = lists
              if(this.permission) {
                this.lists = lists
              } else {
                lists.forEach( list => {
                  ( list.public ) && (this.lists.push(list));
                })
              }
            })

          )
      })

    )
  }
}
