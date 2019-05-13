import { Component, OnInit } from '@angular/core';
declare function bodyPages() : any;
declare function favoritos() : any;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    bodyPages();
    favoritos();
  }

}
