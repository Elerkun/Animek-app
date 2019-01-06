import { Component, OnInit } from '@angular/core';
import { Anime } from './anime';
import {SearchService} from './search.service';
declare function bodyPages() : any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  animes: Anime[];
  data;
  allAnimes;
  categories;
  constructor(private animeService: SearchService) { }

  ngOnInit() {
  bodyPages();

  this.animeService.getAnimes().subscribe(animes =>this.data = animes['data']);
  this.animeService.getAllAnimes().subscribe(animes => this.allAnimes = animes['data']);
  this.animeService.getCategories().subscribe(animes => this.categories = animes['data']);

}

}
