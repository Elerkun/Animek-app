import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public animes;
  public mangas;
  public cont: number = 0;
  public usuario: Usuario = new Usuario;
  constructor(private searchService: SearchService ,private router: Router, private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  searchAnime(text): void{
    this.searchService.searchAnimes(text,0).subscribe( animes => this.animes= animes['data']);
    this.cargarUsuario();

  }
  searchManga(text): void{
    this.searchService.searchMangas(text,0).subscribe( animes => this.mangas= animes['data']);

  }
  cargarMangas(text,pageOffset): void{
        this.cont = this.cont + pageOffset;
        this.searchService.searchMangas(text,this.cont).subscribe(categories => this.mangas = categories['data']);

      }
  descargarMangas(text,pageOffset): void{
    this.cont = this.cont - pageOffset;
    this.searchService.searchMangas(text,this.cont ).subscribe(categories => this.mangas = categories['data']);
     }
  cargarAnimes(text,pageOffset):void{
    this.cont = this.cont + pageOffset;
    this.searchService.searchAnimes(text,this.cont).subscribe(animes =>this.animes = animes['data']);
    }
  descargarAnimes(text,pageOffset):void{
      this.cont = this.cont - pageOffset;
      this.searchService.searchAnimes(text,this.cont).subscribe(animes =>this.animes = animes['data']);
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
