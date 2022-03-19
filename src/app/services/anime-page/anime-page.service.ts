import { Injectable } from '@angular/core';
import {/*of,*/Observable,throwError} from 'rxjs'; //IMPORTANT: Es la clase que permite transformar todas los flujos de datos para que se puedan manejar
import {map, catchError,tap} from 'rxjs/operators';
import {HttpClient,HttpHeaders, HttpRequest,HttpEvent,HttpParams} from '@angular/common/http'; //IMPORTANT: Crea la conexion Http para que la creacion de clientes sea dinámica
import swal from 'sweetalert2';
import { Anime } from 'src/app/model/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimePageService {
  private addAnimeFavorite: String = "http://localhost:8080/api/animes/";
  private getAnimeFavorite: String = "http://localhost:8080/api/anime";
  private urlEnpoint: String = "http://localhost:8080/api/comentarios";
  private getCommentsAnime: String ="http://localhost:8080/api/comentarios"
  private getAnimeEpisode: String = "https://kitsu.io/api/edge/anime";
  private offset: string = "page[limit]=10&page[offset]=";
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'});
  anime: Anime = new Anime;
  mensaje: String;
  comment: Comment = new Comment;
  constructor(private http: HttpClient) { }

  addAnime(anime: Anime,id): Observable<any> {

    return this.http.post(`${this.addAnimeFavorite}/${id}`,JSON.stringify(anime), {headers : this.HttpHeaders}).pipe(
      map((response:any) => response.anime as Anime[]),
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
   delAnime(usuario_id,anime_title,type): Observable<any> {

     return this.http.delete(`${this.getAnimeFavorite}/${usuario_id}/${anime_title}/${type}`, {headers : this.HttpHeaders}).pipe(
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
   getAnime(usuario_id,anime_title,type): Observable<any> {
      return this.http.get(`${this.getAnimeFavorite}/${usuario_id}/${anime_title}/${type}`).pipe(
       map((response:any) => response.anime as Anime),
       catchError(e => {
         if(e.status==400){//bad request
            return throwError(e);
         }
         return throwError(e);
       })
     );
    }
    getAnimeEpisodes(anime_id,number): Observable<any> {
       return this.http.get(`${this.getAnimeEpisode}/${anime_id}/episodes?${this.offset}${number}`).pipe(
        map(response => response as Anime[]))
      }

    updateFoto(anime_title,type,usuario_id,archivo:File,texto): Observable<HttpEvent<{}>>{
      let formData = new FormData();
      formData.append("archivo",archivo);
      const req = new HttpRequest('POST',`${this.urlEnpoint}/${usuario_id}/${anime_title}/${type}/${texto}`, formData,{
        reportProgress: true
      });
      return this.http.request(req);
    }
    getComments(type,anime_title): Observable<any> {
      return this.http.get(`${this.getCommentsAnime}/${type}/${anime_title}`).pipe(
        map( response => response as Comment[]))
      }

}
