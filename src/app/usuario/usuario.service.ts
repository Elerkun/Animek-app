import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest,HttpEvent} from '@angular/common/http';
import {/*of,*/Observable, throwError} from 'rxjs';
import {map, catchError,tap} from 'rxjs/operators';
import{Usuario} from './usuario';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEnpoint: string ="http://localhost:8080/api/usuarios"
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,private router: Router) { }

  create(usuario:Usuario): Observable<Usuario> {
  return this.http.post(this.urlEnpoint,usuario, {headers : this.HttpHeaders}).pipe(
    map((response:any) => response.usuario as Usuario),
    catchError(e => {
      if(e.status==400){//bad request
         return throwError(e);
      }
      console.error(e.error.mensaje)
      swal.fire(e.error.mensaje, e.error.error,'error');
      return throwError(e);
     })
    );
   }
   getUsuario_byNameAndPass(name,pass):  Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlEnpoint}/${name}/${pass}`).pipe(catchError(e => {
          console.log("asdasdads")
          this.router.navigate(['/login']);
          console.error(e.error.mensaje);
          swal.fire('Error',e.error.mensaje,'error');
          return throwError(e);
      })
    );
  }
  getClientes_byId(id):  Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEnpoint}/${id}`).pipe(catchError(e => {
        console.error(e.error.mensaje);
        this.router.navigate(['/login']);
        swal.fire('Error al editar',e.error.mensaje,'error');
        return throwError(e);
      })
    );
   }
   updateFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    const req = new HttpRequest('POST',`${this.urlEnpoint}/upload/`, formData,{
      reportProgress: true
    });
    return this.http.request(req);
   }
}
