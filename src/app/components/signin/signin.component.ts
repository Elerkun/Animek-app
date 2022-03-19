import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import { Usuario } from 'src/app/services/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  private errores : string[];
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


  }
  public create():void{
      this.usuario.anime;
      this.usuarioService.create(this.usuario).subscribe(usuario => {
      this.usuarioService.getUsuario_byNameAndPass(this.usuario.nombre,this.usuario.pass).subscribe((usuario)=> {
      this.usuario = usuario;
      this.router.navigate(['/uploadImage', this.usuario.id]);
      swal.fire('New User', ` New User create successfully! `, 'success');
      err => {
        this.errores = err.error.mensaje as string[];
         }
       });
     });
  }
}
