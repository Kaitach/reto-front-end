import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SingupComponent } from "./singup";
import { LoginComponent } from "./login.component";
import { LoginGuard } from "../../tools/guard";

const routes: Routes = [
    {
      path: '',
      children: [
        {path: 'login', component: SingupComponent},
        {path: '', component: LoginComponent,},
      ]
    }
  ];
  
  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes),
      CommonModule
    ],
    exports:[
      RouterModule
    ]
  })
  export class LoginRouterModule { }