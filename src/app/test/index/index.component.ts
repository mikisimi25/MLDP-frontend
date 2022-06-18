import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { interval } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private _user:any;
  private token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE2NTU0ODk2NDUsImV4cCI6MTY1NTQ5MzI0NSwibmJmIjoxNjU1NDg5NjQ1LCJqdGkiOiJ0dkJVeGFLWTZRTVdXZjVBIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.uFEUY6KF9k2p4JmIrmCKWwg4oOXvggnqlCKrZMQFb3A";

  get user() {
    return (async () => {
      if( this._user === undefined ) {
        console.log(true);
        return this.getUserServ().then( data => {
          return data;
        })
      } else {
        console.log(false);
        return this._user;
      }
    })();
  }

  get data() {
    if( this._user === undefined) {
      return undefined;
    } else {
      return this._user;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    // this.getUserData().then( user => {
    // console.log("🚀 ~ file: index.component.ts ~ line 23 ~ IndexComponent ~ this.getUserData ~ user", user)

    // this.getUserData().then( data => console.log(data))

    // })

    // this.user.then( user => {
    //   console.log(user)
    // })

  }

  public async getUserServ() {
    if( this._user === undefined ) {
      return await axios.get('http://localhost:8000/api/list').then( user => {
        this._user = user.data.user
        console.log('object');
        return this._user;
      })
    } else {
      return this._user;
    }
  }

  public async getUserData() {
    if( this._user === undefined ) {
      console.log(true);
      return this.getUserServ().then( data => {
        return data;
      })
    } else {
      console.log(false);
      return this._user;
    }
  }

  getUserById(): any {
    return new Promise((resolve, reject) => {
      if( this._user === undefined ) {
        axios.get('http://localhost:8000/api/list',{
            params: {
              token: this.token
            }
          }
        ).then( data => {
          this._user = data
          console.log(data);
          resolve(data);
        })
      } else {
        resolve(this._user)
      }
    })
  }

  async getAssignedUser(): Promise<string> {
    return this.getUserById();
  }

  public delete() {
    this._user = '';
  }

  public setData() {
    this._user = 'data'
  }
}
