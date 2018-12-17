import { Component, OnInit } from '@angular/core';
declare function bodyIndex() : any;
declare function scroll() : any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     scroll();
     bodyIndex();


  }

}
