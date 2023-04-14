import { NgModule } from "@angular/core";
import { AccountComponent } from "./account.component";
import { RouterModule } from "@angular/router";
import { DataModule } from "src/app/data/data.module";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule,RouterModule, ReactiveFormsModule],
    declarations: [AccountComponent],
    exports: [   DataModule, AccountComponent],
  })
  export class AccountModule {}
  