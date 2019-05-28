import { Component, OnInit } from '@angular/core';
import {CategoriesSearchService} from './categories-search.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Usuario} from 'src/app/usuario/usuario'
import {UsuarioService} from 'src/app/usuario/usuario.service'
@Component({
  selector: 'app-categories-search',
  templateUrl: './categories-search.component.html',
  styleUrls: ['./categories-search.component.css']
})
export class CategoriesSearchComponent implements OnInit {
  categories;
  manga;
  public cont : number = 0;
  public usuario: Usuario = new Usuario;
  constructor(private categoriesSearchService: CategoriesSearchService,private router: Router, private activatedRoute: ActivatedRoute,private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.categoriesSearch();
    this.categoriesSearchManga();
    this.cargarUsuario();

  }

  categoriesSearch(): void{
    this.activatedRoute.params.subscribe(params =>{
      let categories = params['categories'];
      if(categories){
          this.categoriesSearchService.getCategories(categories,0).subscribe(categories => this.categories = categories['data'])
      }
    });

  }
  categoriesSearchManga(): void{
    this.activatedRoute.params.subscribe(params =>{
      let categories = params['categories'];
      if(categories){
          this.categoriesSearchService.getCategoriesManga(categories,0).subscribe(categories => this.manga = categories['data'])
      }
    });

  }
  cargarMangas(pageOffset): void{
    let categories;
    this.activatedRoute.params.subscribe(params =>{
      categories = params['categories'];
    });
        this.cont = this.cont + pageOffset;
        this.categoriesSearchService.getCategoriesManga(categories,this.cont).subscribe(categories => this.manga = categories['data']);

      }
  descargarMangas(pageOffset): void{
    let categories;
    this.activatedRoute.params.subscribe(params =>{
      categories = params['categories'];
    });
    this.cont = this.cont - pageOffset;
    this.categoriesSearchService.getCategoriesManga(categories,this.cont).subscribe(categories => this.manga = categories['data']);
     }
  cargarAnimes(pageOffset):void{
    let categories;
    this.activatedRoute.params.subscribe(params =>{
      categories = params['categories'];
    });
    this.cont = this.cont + pageOffset;
    this.categoriesSearchService.getCategories(categories,this.cont).subscribe(animes =>this.categories = animes['data']);
    }
  descargarAnimes(pageOffset):void{
    let categories;
    this.activatedRoute.params.subscribe(params =>{
      categories = params['categories'];
    });
      this.cont = this.cont - pageOffset;
      this.categoriesSearchService.getCategories(categories,this.cont).subscribe(animes =>this.categories = animes['data']);
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
