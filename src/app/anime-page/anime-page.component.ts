import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {SearchService} from 'src/app/search/search.service';
import {AnimePageService} from './anime-page.service';
import {Anime} from './anime'
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';
declare function bodyPages() : any;
declare function addFav() : any;
declare function delFav() : any;
@Component({
  selector: 'app-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent implements OnInit {
   @ViewChild('animeTitle') myTitle: ElementRef;
   animes: Anime = new Anime;
   data;
   public title: String;
    private errores : string[];
  constructor(private animeService: SearchService,  private animePageService: AnimePageService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    bodyPages();
    this.cargarAnime_Manga();
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadFav();
 }, 500);
  }
  cargarAnime_Manga(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      let type = params['type'];
      if(id && type=='anime'){
        this.animeService.passAnime(id).subscribe(anime => this.data = anime['data'])

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
        addFav();
        });
      }else{
        delFav();
      }
    });
  }
  loadFav():void{
    this.activatedRoute.params.subscribe(params =>{
      let userId = params['userId'];
      let id = params['id'];
      if(userId && id){
        delFav();
        this.animePageService.getAnime(userId,this.myTitle.nativeElement.innerHTML).subscribe(anime =>{
          addFav();
        });

      }else{
        delFav();
      }
    });
  }
}
