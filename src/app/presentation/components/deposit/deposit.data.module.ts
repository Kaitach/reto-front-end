import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataModule } from "src/app/data/data.module";
import { CommonModule } from '@angular/common';
import { AccountModule } from "../account/account.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DepositDataRouterModule } from "./deposit.data.routing.module";
import { DepositComponent } from "./deposit.component";

@NgModule({
    imports: [CommonModule,RouterModule,     ReactiveFormsModule,
    ],
    declarations: [DepositComponent],
    exports: [  DepositDataRouterModule, DataModule, DepositComponent],
  })
  export class DepositDataModule {}
  