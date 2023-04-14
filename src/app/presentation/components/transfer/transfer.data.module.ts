import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {  TransferDataRouterModule,  } from "./transfer.data.routing.module";
import { DataModule } from "src/app/data/data.module";
import { CommonModule } from '@angular/common';
import { AccountModule } from "../account/account.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TransferComponent } from "./transfer.component";

@NgModule({
    imports: [CommonModule,RouterModule,     ReactiveFormsModule,
    ],
    declarations: [TransferComponent],
    exports: [  TransferDataRouterModule, DataModule, TransferComponent],
  })
  export class TransferDataModule {}
  