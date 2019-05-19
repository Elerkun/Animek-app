import { Component, OnInit } from '@angular/core';
import { Anime } from './anime';
import {SearchService} from 'src/app/search/search.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public animes;
  public mangas;
  public cont: number = 0;
  constructor(private searchService: SearchService ,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  searchAnime(text): void{
    this.searchService.searchAnimes(text,0).subscribe( animes => this.animes= animes['data']);

  }
  searchManga(text): void{
    this.searchService.searchMangas(text,0).subscribe( animes => this.mangas= animes['data']);

  }
  cargarMangas(text,pageOffset): void{
        this.cont = this.cont + pageOffset;
        this.searchService.searchMangas(text,this.cont).subscribe(categories => this.mangas = categories['data']);

      }
  descargarMangas(text,pageOffset): void{
    this.cont = this.cont - pageOffset;
    this.searchService.searchMangas(text,this.cont ).subscribe(categories => this.mangas = categories['data']);
     }
  cargarAnimes(text,pageOffset):void{
    this.cont = this.cont + pageOffset;
    this.searchService.searchAnimes(text,this.cont).subscribe(animes =>this.animes = animes['data']);
    }
  descargarAnimes(text,pageOffset):void{
      this.cont = this.cont - pageOffset;
      this.searchService.searchAnimes(text,this.cont).subscribe(animes =>this.animes = animes['data']);
      }
}
