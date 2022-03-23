import { Injectable } from '@angular/core';
//import { CLIENTES } from './clientes.json';
import {/*of,*/Observable} from 'rxjs'; //IMPORTANT: Es la clase que permite transformar todas los flujos de datos para que se puedan manejar
import {map} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http' //IMPORTANT: Crea la conexion Http para que la creacion de clientes sea dinámica
import { Anime } from 'src/app/model/anime';
@Injectable({
  providedIn: 'root'
})
export class IndexService {

  private urlEndPoint: string ='https://kitsu.io/api/edge/trending/anime'
  constructor(private http: HttpClient) { }
  data;
  displayItems;

getAnimes(): Observable<Anime[]> {
      return this.http.get(`${this.urlEndPoint}/${'?limt=4'}`).pipe(map(
      response => response as Anime[]
    ));
  }

  }
