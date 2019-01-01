import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {SearchService} from 'src/app/search/search.service';
import {Anime} from './anime'
declare function bodyPages() : any;
declare function moreInfo() : any;


@Component({
  selector: 'app-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent implements OnInit {

   animes: Anime[];
   data;
  constructor(private animeService: SearchService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    bodyPages();
    moreInfo();
    this.cargarAnime();

  }
  cargarAnime(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.animeService.passAnime(id).subscribe(anime => this.data = anime['data'])
      }
    })

  }

}
