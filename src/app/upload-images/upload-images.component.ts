import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/app/usuario//usuario';
import {UsuarioService} from 'src/app/usuario/usuario.service';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  private errores : string[];
  private fotoselecionada : File;
  progreso: number=0;
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  uploadFoto(event){
  this.fotoselecionada = event.target.files[0];
  this.progreso= 0;
  console.log(this.fotoselecionada);
  if(this.fotoselecionada.type.indexOf('image')<0){
    swal.fire('Error', 'El archivo debe ser una imagen','error');
         this.fotoselecionada = null;
    }
  }
  subirFoto(){
  if(!this.fotoselecionada){
    swal.fire('Error', 'Seleccione una foto','error');
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
        swal.fire('La foto se ha subido correctamente!', response.mensaje,'success');
       }
     });
   });
   }
 }
}
