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
   private delete : number = 0;
  constructor(private animeService: SearchService,  private animePageService: AnimePageService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    bodyPages();
    this.cargarAnime_Manga();
  }
  cargarAnime_Manga(): void{
      this.activatedRoute.params.subscribe(params =>{
        let id = params['id'];
        let type = params['type'];
        if(id && type=='anime'){
          this.animeService.passAnime(id).subscribe(anime => this.data = anime['data'])
          setTimeout(()=>{
                this.loadFav();
              },500);
          console.log(type);


        }
        if(id && type== 'manga'){
          this.animeService.passManga(id).subscribe(manga => this.data = manga['data'])
          setTimeout(()=>{
                this.loadFav();
              },500);
          console.log(type);

        }

      })

    }
  animeFavorite(title,description,image):void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['userId'];
      if(id){
        this.animes.image = image;
        this.animes.title= title;
        this.animes.description = description;
        this.animes.id= this.data.id;
        this.animePageService.addAnime(this.animes,id).subscribe(anime => {
          addFav();
        });
     }else{
       delFav();
     }
   });
 }
 deleteFavorite(title,description,image):void{
   swal.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!',
   }).then((result) => {
     if (result.value) {
       this.activatedRoute.params.subscribe(params =>{
           let userId = params['userId'];
         this.animePageService.delAnime(userId,this.myTitle.nativeElement.innerHTML).subscribe(anime => {
         delFav();
         this.delete=1;
          });
        });
       }
     });

 }
  loadFav():void{
    this.activatedRoute.params.subscribe(params =>{
      let userId = params['userId'];
      let id = params['id'];
      if(id){
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
