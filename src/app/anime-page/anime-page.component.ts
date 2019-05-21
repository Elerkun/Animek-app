import { Component, OnInit} from '@angular/core';
import {SearchService} from 'src/app/search/search.service';
import {AnimePageService} from './anime-page.service';
import {Anime} from './anime'
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';
declare function bodyPages() : any;
declare function favoritos() : any;

@Component({
  selector: 'app-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent implements OnInit {

   animes: Anime = new Anime;
   data;
    private errores : string[];
  constructor(private animeService: SearchService,  private animePageService: AnimePageService, private activatedRoute: ActivatedRoute,private router: Router) { }

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
  animeFavorite(title,description,image):void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['userId'];
      if(id){
        this.animes.title = title;
        this.animes.description = description;
        this.animes.image = image;
        this.animes.id= this.data.id;
        this.animePageService.addAnime(this.animes,id).subscribe(anime => {
        this.router.navigate(['/myProfile']);
        swal.fire('Anime nuevo', ` El Anime ${title} ha sido agregado a favoritos  con exito! `, 'success');
        },
        err => {
          this.errores = err.error.mensaje as string[];
          }
        );
      }
    });
  }
}
