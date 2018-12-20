import { Component, OnInit } from '@angular/core';
declare function bodyPages() : any;
declare function animePageScroll(): any;


@Component({
  selector: 'app-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    bodyPages();
    animePageScroll();

  }

}
