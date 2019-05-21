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
  private addAnimeFavorite: String = "http://localhost:8080/api/usuario/anime/";
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'});
  anime: Anime = new Anime;
  constructor(private http: HttpClient) { }

  addAnime(anime: Anime,id): Observable<any> {
    let animeArray = [{id:id,title: anime.title, description: anime.description, image:anime.image}];
    return this.http.put(`${this.addAnimeFavorite}/${id}`,JSON.stringify(animeArray), {headers : this.HttpHeaders}).pipe(
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
}
