import { Injectable } from '@angular/core';
//import { CLIENTES } from './clientes.json';
import { Anime } from './anime';
import { Categories } from './categories';
import {/*of,*/Observable} from 'rxjs'; //IMPORTANT: Es la clase que permite transformar todas los flujos de datos para que se puedan manejar
import {map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http' //IMPORTANT: Crea la conexion Http para que la creacion de clientes sea dinámica
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private urlEndPoint: string ='https://kitsu.io/api/edge/trending/anime'
  private allAnimes: string ='https://kitsu.io/api/edge/anime'
  private allCategories: string ="https://kitsu.io/api/edge/categories?page%5Blimit%5D=10&page%5Boffset%5D";
  constructor(private http: HttpClient) { }

  getAnimes(): Observable<Anime[]> {
      return this.http.get(this.urlEndPoint).pipe(map(
      response => response as Anime[]
    ));
}
getAllAnimes(): Observable<Anime[]> {
    return this.http.get(this.allAnimes).pipe(map(
    response => response as Anime[]
  ));
}
passAnime(id):Observable<Anime> {

    return this.http.get(`${this.allAnimes}/${id}`).pipe(map(
    response => response as Anime
  ));
}
getCategories(pageOffset): Observable<Categories>{

  return this.http.get(`${this.allCategories}=${pageOffset}`).pipe(map(
  response => response as Categories
));
}
}
