import { Component, OnInit } from '@angular/core';
declare function bodySignin() : any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    bodySignin();

  }

}
