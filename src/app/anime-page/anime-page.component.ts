import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {SearchService} from 'src/app/search/search.service';
import {Anime} from './anime'
declare function bodyPages() : any;
declare function favoritos() : any;

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
    favoritos();
    this.cargarAnime_Manga();
  }
  cargarAnime_Manga(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      let type = params['type'];
      if(id && type=='anime'){
        this.animeService.passAnime(id).subscribe(anime => this.data = anime['data'])
        console.log(type);
      }
      if(id && type== 'manga'){
        this.animeService.passManga(id).subscribe(manga => this.data = manga['data'])
        console.log(type);
      }
    })
  }
}
