import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbarr',
  templateUrl: './toolbarr.component.html',
  styleUrls: ['./toolbar.component.scss']

})

export class ToolbarrComponent {
constructor(public Router: Router){}

  singOut(){
    localStorage.clear();
    this.Router.navigate(['login']);

  }

}
