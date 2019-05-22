import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/app/usuario//usuario';
import {UsuarioService} from 'src/app/usuario/usuario.service';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';

declare function bodyPages() : any;
declare function addFav() : any;
declare function delFav() : any;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  private errores : string[];
  constructor(private usuarioService: UsuarioService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    bodyPages();
    this.cargarCliente_byId();
  }
  public cargarCliente_byId(): void{
  this.activatedRoute.params.subscribe(params => {
    let id= params['userId'];
    if(id){
      this.usuarioService.getUsuario_byId(id).subscribe((usuario)=> this.usuario= usuario)
    }
  })
 }
 updateprofile(){
   this.activatedRoute.params.subscribe(params => {
     let id= params['userId'];
     if(id){
       this.router.navigate(['/uploadImage', id]);
     }
   });
 }
}
