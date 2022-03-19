import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import { Usuario } from 'src/app/services/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
declare function bodyPages() : any;
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  usuario: Usuario = new Usuario();

  private errores : string[];
  private fotoselecionada : File;
  progreso: number=0;
  titulo_foto: String ="Choose your profile picture"
  titulo_banner: String ="Choose your banner picture"
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      bodyPages();
      this.activatedRoute.params.subscribe(params =>{
          let id= params['id'];
         if(id){
           this.usuarioService.getUsuario_byId(id).subscribe(usuario =>{
             this.usuario = usuario;
           })
         }
      });
  }

  uploadFoto(event){
  this.fotoselecionada = event.target.files[0];
  this.progreso= 0;
  console.log(this.fotoselecionada);
  if(this.fotoselecionada.type.indexOf('image')<0){
    swal.fire('Error', 'the file must be a image','error');
         this.fotoselecionada = null;
    }
  }
  subirFoto(){
  if(!this.fotoselecionada){
    swal.fire('Error', 'select a picture','error');
  }else{
    this.activatedRoute.params.subscribe(params => {
      let id= params['id'];
      this.usuarioService.updateFoto(this.fotoselecionada, id)
        .subscribe(event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.usuario = response.cliente as Usuario;
            swal.fire('the picture was upload successfully!', response.mensaje,'success');
           }
         });
       });
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
             this.usuario = response.cliente as Usuario;
             swal.fire('the picture was delete successfully!', response.mensaje,'success');
            }
          });
        });
   }
   uploadBanner(event){
   this.fotoselecionada = event.target.files[0];
   this.progreso= 0;
   console.log(this.fotoselecionada);
   if(this.fotoselecionada.type.indexOf('image')<0){
     swal.fire('Error', 'the file must be a image','error');
          this.fotoselecionada = null;
     }
   }
   subirBanner(){
   if(!this.fotoselecionada){
     swal.fire('Error', 'select a picture','error');
   }else{
     this.activatedRoute.params.subscribe(params => {
       let id= params['id'];
       this.usuarioService.updateBanner(this.fotoselecionada, id)
         .subscribe(event => {
           if(event.type === HttpEventType.UploadProgress){
             this.progreso = Math.round((event.loaded/event.total)*100);
           }else if(event.type === HttpEventType.Response){
             let response: any = event.body;
             this.usuario = response.cliente as Usuario;
             swal.fire('the picture was upload successfully!', response.mensaje,'success');
            }
          });
        });
       }
     }
    deletBanner(){
      this.activatedRoute.params.subscribe(params => {
        let id= params['id'];
        this.usuarioService.DeleteBanner(id)
          .subscribe(event => {
            if(event.type === HttpEventType.UploadProgress){
              this.progreso = Math.round((event.loaded/event.total)*100);
            }else if(event.type === HttpEventType.Response){
              let response: any = event.body;
              this.usuario = response.cliente as Usuario;
              swal.fire('the picture was delete successfully!', response.mensaje,'success');
             }
           });
         });
    }
   profile(usuario: Usuario){
     this.activatedRoute.params.subscribe(params => {
        let id= params['id'];
        this.usuario = usuario;
          this.usuarioService.update(this.usuario).subscribe(usuario =>{
            this.router.navigate(['/myProfile', id]);
          });
        });
       }
}
