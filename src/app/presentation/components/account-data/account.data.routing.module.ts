import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountDataComponent } from "./account-data.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {path: '', component: AccountDataComponent},
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
  export class AccountDataRouterModule { }