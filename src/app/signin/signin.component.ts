import { Component, OnInit } from '@angular/core';
import {Usuario} from 'src/app/usuario//usuario';
import {UsuarioService} from 'src/app/usuario/usuario.service';
import {Router,ActivatedRoute} from '@angular/router'; //activatedRoute: sirve para encontrar el 'id del cliente', que de forma automatica asigna los datos al objeto 'cliente'
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
  this.usuarioService.create(this.usuario).subscribe(usuario => {
    this.router.navigate(['/login']);
    swal.fire('Cliente Nuevo', ` El cliente ha sido creado con exito! `, 'success');
    },
    err => {
      this.errores = err.error.mensaje as string[];
    });
  }
}
