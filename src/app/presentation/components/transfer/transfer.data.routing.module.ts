import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TransferComponent } from "./transfer.component";

const routes: Routes = [
    {
      path: '',
      children: [
        {path: '', component: TransferComponent},
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
  export class TransferDataRouterModule { }