import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/app/usuario//usuario';
import {UsuarioService} from 'src/app/usuario/usuario.service';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private usuario: Usuario = new Usuario();
  private errores : string[];
  constructor(private usuarioService: UsuarioService,private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
     this.cargarUsuario_byNameAndPass(this.usuario.nombre,this.usuario.pass)

    }
 public cargarUsuario_byNameAndPass(name,pass): void{
    if(name && pass ){
      this.usuarioService.getUsuario_byNameAndPass(name,pass).subscribe((usuario)=> {
        this.usuario = usuario;
        this.router.navigate(['/myProfile', this.usuario.id]);
        swal.fire('Inicio Sesion', ` Inicio de Sesion con exito! `, 'success');
        err => {
          this.errores = err.error.mensaje as string[];
          }
      });
    }
  }
}
