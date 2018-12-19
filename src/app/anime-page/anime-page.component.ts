import { Component, OnInit } from '@angular/core';
declare function bodyWhite() : any;

@Component({
  selector: 'app-anime-page',
  templateUrl: './anime-page.component.html',
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    bodyWhite();

  }

}
