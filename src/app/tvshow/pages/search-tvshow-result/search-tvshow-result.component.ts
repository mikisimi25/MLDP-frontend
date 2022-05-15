import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/list/interfaces/list.interface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/list/services/list.service';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-search-tvshow-result',
  templateUrl: './search-tvshow-result.component.html',
  styleUrls: ['./search-tvshow-result.component.scss'],
  providers: [MessageService],
})
export class SearchTvshowResultComponent implements OnInit {
  showContent: any[] = [];
  listOfLists: List[] = [];

  groupedCities!: any[];
  selectedCity: any;
  selectedCountries: any[][] = [];

  constructor(
    private cs: ContentService,
    private ls: ListService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ query }) => {
      this.cs.getMovieOrTvshowsSearchResult( 'tv', query).subscribe((movies) => {
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

  showSuccess(movieId: string, list: List[]) {
    if (list.length > 0) {
      const selectedList: number = list.slice(-1)[0].id || 0;

      this.ls.addMovieToList(selectedList, movieId);

      this.messageService.add({
        severity: 'success',
        summary: 'Película añadida a la lista de ' + list.slice(-1)[0].title,
      });
    }
  }

  addToFavourite(movieId: string) {
    this.ls.addMovieToList(1, movieId);
  }
}
