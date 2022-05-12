import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popularMovies.interface';
import { MovieService } from '../../services/movie.service';
import { ListService } from '../../../list/services/list.service';
import { List } from 'src/app/list/interfaces/list.interface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-movie-result',
  templateUrl: './search-movie-result.component.html',
  styleUrls: ['./search-movie-result.component.scss'],
  providers: [MessageService],
})
export class SearchMovieResultComponent implements OnInit {
  showContent: any[] = [];
  listOfLists: List[] = [];

  groupedCities!: any[];
  selectedCity: any;
  selectedCountries: any[][] = [];

  constructor(
    private ms: MovieService,
    private ls: ListService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ query }) => {
      this.ms.getMovieSearchResult(query).subscribe((movies) => {
        this.showContent = movies.results;

        this.ls.getMovieLists().subscribe((lists) => {
          this.listOfLists = lists;

          this.listOfLists.forEach((lista) => {
            lista.moviesId?.forEach((movieId) => {
              this.showContent.forEach((movie, index) => {
                if (movieId === movie.id) {
                  if (this.selectedCountries[index] === undefined) {
                    this.selectedCountries[index] = [];
                  }

                  this.selectedCountries[index].push(lista);
                }
              });
            });
          });

          this.groupedCities = [
            {
              label: 'Germany',
              value: 'de',
              items: this.listOfLists,
            },
          ];
        });
      });
    });
  }

  showSuccess(movieId: number, list: List[]) {
    if (list.length > 0) {
      const selectedList: number = list.slice(-1)[0].id || 0;

      this.ls.addMovieToList(selectedList, movieId);

      this.messageService.add({
        severity: 'success',
        summary: 'Película añadida a la lista de ' + list.slice(-1)[0].title,
      });
    }
  }

  addToFavourite(movieId: number) {
    this.ls.addMovieToList(1, movieId);
  }
}
