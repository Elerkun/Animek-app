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


  constructor(private animeService: SearchService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.cargarCliente();
     bodyPages();

  this.animeService.getAnimes().subscribe(animes =>this.data = animes['data']);
  this.animeService.getAllAnimes().subscribe(animes => this.allAnimes = animes['data']);

}
cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let pageOffset = params['pageOffset'];
      this.animeService.getCategories(pageOffset).subscribe(animes => this.categories = animes['data']);

    });

  }


}
