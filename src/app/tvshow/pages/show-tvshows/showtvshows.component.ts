import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../list/services/list.service';
import { List } from 'src/app/list/interfaces/list.interface';
import {MessageService} from 'primeng/api';
import { ContentService } from 'src/app/shared/services/content.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-showtvshow',
  templateUrl: './showtvshows.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ShowTvshowsComponent implements OnInit {

  user: User | undefined = undefined;
  showContent: any[] = [];
  listOfLists: List[] = [];

  groupedCities!: any[];
  selectedCity: any;
  selectedCountries: any[][] = [];

  constructor(
    private ls: ListService,
    private messageService: MessageService,
    private cs: ContentService,
    private as: AuthService
  ) {


  }

  ngOnInit(): void {
    this.as.authVerification().subscribe( user => this.user = user)

    this.cs.popularMoviesOrTv( 'tv' ).subscribe( tv => {
        this.showContent = tv.results;

        //Fill list of lists
        if( this.user ) {
          this.ls.getUserListsByUsername(this.user!.username).subscribe( lists => {
            this.listOfLists = lists;

            this.listOfLists.forEach( lista => {
              lista.moviesId?.forEach( movieId => {
                movieId = movieId.toString().slice(3)

                this.showContent.forEach( (movie,index) => {

                  if( parseInt(movieId) === movie.id ) {
                    if( this.selectedCountries[index] === undefined) {
                      this.selectedCountries[index] = []
                    }

                    this.selectedCountries[index].push(lista)
                  }

                })

              })
            })

            this.groupedCities = [
                {
                  label: 'Listas',
                  value: 'li',
                  items: this.listOfLists
                }
            ];
          })
        }
      })
  }

  showSuccess( movieId: number, list: List[]) {

    if( list.length > 0) {
      const selectedList: number = list.slice(-1)[0].id || 0;

      this.ls.addMovieToList( selectedList, 'tv/'+movieId.toString());

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title});
    }

  }

  addToFavourite( movieId: string ) {
    this.ls.addMovieToList( 1, movieId)
  }



}
