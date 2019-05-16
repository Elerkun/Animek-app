import { Component, OnInit } from '@angular/core';
import { Anime } from './anime';
import {SearchService} from './search.service';
import {Router, ActivatedRoute} from '@angular/router';
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
  allMangas;
  public cont : number = 0;


  constructor(private animeService: SearchService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     bodyPages();

  this.animeService.getAnimes().subscribe(animes =>this.data = animes['data']);
  this.animeService.getAllAnimes().subscribe(animes => this.allAnimes = animes['data']);
  this.animeService.getManga().subscribe(manga => this.allMangas = manga['data']);
  this.animeService.getCategories(this.cont).subscribe(categories => this.categories = categories['data'])

}
cargarCategories(pageOffset): void{
      this.cont = this.cont + pageOffset;
      this.animeService.getCategories(this.cont).subscribe(categories => this.categories = categories['data']);

    }
descargarCategories(pageOffset): void{
  this.cont = this.cont + pageOffset;
  this.animeService.getCategories(this.cont ).subscribe(categories => this.categories = categories['data']);
   }
}
