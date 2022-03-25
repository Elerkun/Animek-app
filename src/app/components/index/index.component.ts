import { Component, OnInit } from '@angular/core'
import { Anime } from 'src/app/model/anime'
import { IndexService } from 'src/app/services/index/index.service'
declare function bodyIndex(): any
declare function slider(): any
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public animes: Anime[]
  public animeWeek = [] ;
  public animeEmision = [];
  constructor(private animeService: IndexService) {}
  ngOnInit() {
    bodyIndex();
    slider();
    this.animeService.getPopularAnimesWeek().subscribe(animes => this.animeWeek = animes['data']);
    this.animeService.getPopularAnimesOnEmision().subscribe(animesEmision => this.animeEmision = animesEmision['data'])
  }
}
