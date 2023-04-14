import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DepositComponent } from "./deposit.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {path: '', component: DepositComponent},
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
  export class DepositDataRouterModule { }