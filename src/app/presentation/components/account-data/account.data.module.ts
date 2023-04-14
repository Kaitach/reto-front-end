import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccountDataRouterModule,  } from "./account.data.routing.module";
import { DataModule } from "src/app/data/data.module";
import { CommonModule } from '@angular/common';
import { AccountDataComponent } from "./account-data.component";
import { AccountModule } from "../account/account.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule,RouterModule,AccountModule,     ReactiveFormsModule,
    ],
    declarations: [AccountDataComponent],
    exports: [  AccountDataRouterModule, DataModule, AccountDataComponent],
  })
  export class AccountDataModule {}
  