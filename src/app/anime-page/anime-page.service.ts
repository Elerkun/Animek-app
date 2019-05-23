import { Injectable } from '@angular/core';
import { Anime } from './anime';
import {/*of,*/Observable,throwError} from 'rxjs'; //IMPORTANT: Es la clase que permite transformar todas los flujos de datos para que se puedan manejar
import {map, catchError,tap} from 'rxjs/operators';
import {HttpClient,HttpHeaders, HttpRequest,HttpEvent} from '@angular/common/http'; //IMPORTANT: Crea la conexion Http para que la creacion de clientes sea dinámica
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AnimePageService {
  private addAnimeFavorite: String = "http://localhost:8080/api/animes/";
  private getAnimeFavorite: String = "http://localhost:8080/api/anime";
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'});
  anime: Anime = new Anime;
  constructor(private http: HttpClient) { }

  addAnime(anime: Anime,id): Observable<any> {

    return this.http.post(`${this.addAnimeFavorite}/${id}`,JSON.stringify(anime), {headers : this.HttpHeaders}).pipe(
      map((response:any) => response.anime as Anime),
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
   delAnime(usuario_id,anime_title): Observable<any> {

     return this.http.delete(`${this.getAnimeFavorite}/${usuario_id}/${anime_title}`, {headers : this.HttpHeaders}).pipe(
       map((response:any) => response.anime as Anime),
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
   getAnime(usuario_id,anime_title): Observable<any> {

     return this.http.get(`${this.getAnimeFavorite}/${usuario_id}/${anime_title}`).pipe(
       map((response:any) => response.anime as Anime),
       catchError(e => {
         if(e.status==400){//bad request
            return throwError(e);
         }
         return throwError(e);
       })
     );
    }
}
