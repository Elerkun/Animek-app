import { Component, OnInit } from '@angular/core';
import { Anime } from './anime';
import {SearchService} from './search.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Usuario} from 'src/app/usuario/usuario'
import {UsuarioService} from 'src/app/usuario/usuario.service'
declare function bodyPages() : any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  animes: Anime[];
  data;
  allAnimes;
  categories;
  allMangas;
  public cont : number = 0;
  public usuario: Usuario = new Usuario;


  constructor(private animeService: SearchService, private router: Router, private activatedRoute: ActivatedRoute,private usuarioService: UsuarioService) { }

  ngOnInit() {
    bodyPages();
    this.animeService.getAnimes().subscribe(animes => this.data = animes['data']);
    this.animeService.getAllAnimes(0).subscribe(animes => this.allAnimes = animes['data']);
    this.animeService.getManga().subscribe(manga => this.allMangas = manga['data']);
    this.animeService.getCategories(this.cont).subscribe(categories => this.categories = categories['data'])
    this.cargarUsuario();

}
cargarCategories(pageOffset): void{
      this.cont = this.cont + pageOffset;
      this.animeService.getCategories(this.cont).subscribe(categories => this.categories = categories['data']);

    }
descargarCategories(pageOffset): void{
  this.cont = this.cont - pageOffset;
  this.animeService.getCategories(this.cont ).subscribe(categories => this.categories = categories['data']);
   }
cargarAnimes(pageOffset):void{
  this.cont = this.cont + pageOffset;
  this.animeService.getAllAnimes(this.cont).subscribe(animes =>this.allAnimes = animes['data']);
  }
descargarAnimes(pageOffset):void{
    this.cont = this.cont - pageOffset;
    this.animeService.getAllAnimes(this.cont).subscribe(animes =>this.allAnimes = animes['data']);
    }
    cargarUsuario():void{
        this.activatedRoute.params.subscribe(params =>{
          let id = params['userId'];
          if(id){
            this.usuarioService.getUsuario_byId(id).subscribe(usuario => this.usuario = usuario);
          }
        });
      }
}
