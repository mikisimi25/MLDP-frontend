import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popularMovies.interface';
import { ListService } from '../../../list/services/list.service';
import { List } from 'src/app/list/interfaces/list.interface';
import {MessageService} from 'primeng/api';
import { ContentService } from 'src/app/shared/services/content.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-showmovies',
  templateUrl: './showmovies.component.html',
  styleUrls: ['./showmovies.component.scss'],
  providers: [MessageService]
})
export class ShowmoviesComponent implements OnInit {

  user: User | undefined = undefined;
  showContent: Result[] = [];
  listOfLists: List[] = [];

  groupedCities!: any[];
  selectedCity: any;
  selectedCountries: any[][] = [];

  constructor(
    private cs: ContentService,
    private ls: ListService,
    private messageService: MessageService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.as.authVerification().subscribe( user => this.user = user)

    this.cs.popularMoviesOrTv( 'movie' ).subscribe( movies => {
        this.showContent = movies.results;

        //Fill list of lists
        if( this.user ) {
          this.ls.getUserListsByUsername(this.user!.username).subscribe( lists => {
            this.listOfLists = lists;

            this.listOfLists.forEach( lista => {
              lista.moviesId?.forEach( movieId => {
                movieId = movieId.toString().slice(6)

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
                  label: 'Germany',
                  value: 'de',
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

      this.ls.addMovieToList( selectedList, 'movie/'+movieId.toString());

      this.messageService.add({severity:'success', summary: 'Película añadida a la lista de '+ list.slice(-1)[0].title});
    }

  }

  addToFavourite( movieId: string ) {
    this.ls.addMovieToList( 1, movieId)
  }



}
