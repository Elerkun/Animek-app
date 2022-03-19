import { Injectable } from '@angular/core';
import {/*of,*/Observable} from 'rxjs'; //IMPORTANT: Es la clase que permite transformar todas los flujos de datos para que se puedan manejar
import {map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http' //IMPORTANT: Crea la conexion Http para que la creacion de clientes sea dinámica
import { Categories } from 'src/app/model/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesSearchService {
  private searchCategoriesAnime: string ="https://kitsu.io/api/edge/anime?filter[genres]="
  private searchCategoriesManga: string ="https://kitsu.io/api/edge/manga?filter[genres]="
  private offset: string = "page[limit]=10&page[offset]=";
  constructor(private http: HttpClient) { }

  getCategories(categories,pageOffset): Observable<Categories[]> {
      return this.http.get(`${this.searchCategoriesAnime}/${categories}&${this.offset}+${pageOffset}`).pipe(map(
      response => response as Categories[]
    ));
  }
  getCategoriesManga(categories,pageOffset): Observable<Categories[]> {
      return this.http.get(`${this.searchCategoriesManga}/${categories}&${this.offset}+${pageOffset}`).pipe(map(
      response => response as Categories[]
    ));
  }
}
