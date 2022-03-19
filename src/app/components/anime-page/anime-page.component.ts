import { HttpEventType } from '@angular/common/http';
import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Anime } from 'src/app/model/anime';
import { AnimePageService } from 'src/app/services/anime-page/anime-page.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Usuario } from 'src/app/services/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
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
   @ViewChild('exampleModal') modal:  ModalDirective;
   animes: Anime = new Anime;
   data;
   usuario: Usuario = new Usuario;
   public title: String;
   private errores : string[];
   private delete : number = 0;
   private fotoselecionada : File;
   progreso: number=0;
   comment: Comment = new Comment;
   anime_title: string ="";
   episode;
   public cont : number = 0;
   habilitar: boolean = true;
   showEpisode: boolean = false;
  constructor(private usuarioService: UsuarioService, private animeService: SearchService,  private animePageService: AnimePageService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {

    bodyPages();
    this.cargarAnime_Manga();
    this.getAnimeEpisode();


  }
  getAnimeEpisode(): void{
    let id;
    this.activatedRoute.params.subscribe(params =>{
      id = params['id'];
    });
    if(id){
    this.animePageService.getAnimeEpisodes(id,0).subscribe(asdasd => this.episode = asdasd['data'])
   }
  }
 cargarAnimes(pageOffset):void{
     let id;
     this.activatedRoute.params.subscribe(params =>{
       id = params['id'];
      });
      this.cont = this.cont + pageOffset;
      this.animePageService.getAnimeEpisodes(id,this.cont).subscribe(animes =>this.episode = animes['data']);
      }
    descargarAnimes(pageOffset):void{
      let id;
      this.activatedRoute.params.subscribe(params =>{
        id = params['id'];
       });
        this.cont = this.cont - pageOffset;
        this.animePageService.getAnimeEpisodes(id,this.cont).subscribe(animes =>this.episode = animes['data']);
        }
  cargarAnime_Manga(): void{
      this.activatedRoute.params.subscribe(params =>{
        let id = params['id'];
        let type = params['type'];
        if(id && type=='anime'){
          this.animeService.passAnime(id).subscribe(anime => this.data = anime['data'])
          setTimeout(()=>{
                this.loadFav();
                this.comments();

              },500);
          console.log(type);
        }
        if(id && type== 'manga'){
          this.animeService.passManga(id).subscribe(manga => this.data = manga['data'])
          setTimeout(()=>{
                this.loadFav();
                this.comments();
              },500);
          console.log(type);
        }
      })
    }
  animeFavorite(title,description,image):void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['userId'];
      let type= params['type'];
      if(id){
        this.animes.image = image;
        this.animes.title= title;
        this.animes.description = description;
        this.animes.id= this.data.id;
        this.animes.type = type;
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
         let type = params['type'];
         this.animePageService.delAnime(userId,this.myTitle.nativeElement.innerHTML,type).subscribe(anime => {
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
      let type = params['type'];
      if(id){
        delFav();
        this.animePageService.getAnime(userId,this.myTitle.nativeElement.innerHTML,type).subscribe(anime =>{
          addFav();
        });

      }else{
        delFav();
      }
    });
  }
  uploadFoto(event){
  this.fotoselecionada = event.target.files[0];
  this.progreso= 0;
  console.log(this.fotoselecionada);
  if(this.fotoselecionada.type.indexOf('image')<0){
    swal.fire('Error', 'the image must be a picture','error');
         this.fotoselecionada = null;

    }
  }

  subirFoto(num){
    if(num==1){
        swal.fire('Picture Add','The picture was add correctly!','success');
      }
  }
  deleteFoto(){
     this.activatedRoute.params.subscribe(params => {
       let id= params['id'];
       this.usuarioService.DeleteFoto(id)
         .subscribe(event => {
           if(event.type === HttpEventType.UploadProgress){
             this.progreso = Math.round((event.loaded/event.total)*100);
           }else if(event.type === HttpEventType.Response){
             let response: any = event.body;
             this.comment = response.comment as Comment;
             swal.fire('the picture was delete successfully!', response.mensaje,'success');
            }
          });

        });
   }
   subirComentario(anime_title,texto,number):void{
     let userId;
     let type;
     this.activatedRoute.params.subscribe(params => {
       userId= params['userId'];
       type = params['type'];
       });
       this.animePageService.updateFoto(anime_title,type,userId,this.fotoselecionada,texto)
         .subscribe(event => {
           if(event.type === HttpEventType.UploadProgress){
             this.progreso = Math.round((event.loaded/event.total)*100);
           }else if(event.type === HttpEventType.Response){
             let response: any = event.body;
             this.comment = response.comment as Comment;
             swal.fire('The comment was Add correctly!', response.mensaje,'success');
           }
          });
        }
    comments():void{
      let type;
      this.activatedRoute.params.subscribe(params => {
        type = params['type'];
      });
      this.animePageService.getComments(type,this.myTitle.nativeElement.innerHTML).subscribe(comment => this.comment = comment);
    }
}
