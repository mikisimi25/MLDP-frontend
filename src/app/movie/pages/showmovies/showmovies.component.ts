import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popularMovies.interface';
import { ListService } from '../../../list/services/list.service';
import { List } from 'src/app/list/interfaces/list.interface';
import {MessageService} from 'primeng/api';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-showmovies',
  templateUrl: './showmovies.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class ShowmoviesComponent implements OnInit {

  showContent: Result[] = [];
  listOfLists: List[] = [];

  groupedCities!: any[];
  selectedCity: any;
  selectedCountries: any[][] = [];

  constructor(
    private cs: ContentService,
    private ls: ListService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.cs.popularMoviesOrTv( 'movie' ).subscribe( movies => {
        this.showContent = movies.results;

        this.ls.getMovieLists().subscribe( lists => {
          this.listOfLists = lists;

          this.listOfLists.forEach( lista => {
            lista.moviesId?.forEach( movieId => {
              movieId = movieId.slice(6)

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