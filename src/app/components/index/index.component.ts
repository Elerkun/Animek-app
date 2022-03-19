import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/model/anime';
import { IndexService } from 'src/app/services/index/index.service';
declare function bodyIndex() : any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnInit {

  animes: Anime[];
  data;
  constructor(private animeService: IndexService) {

  }
  ngOnInit() {
     bodyIndex();
     this.animeService.getAnimes().subscribe(animes => this.data = animes['data']);

  }

}
