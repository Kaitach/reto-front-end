import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { SingupComponent } from './singup/singup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRouterModule } from './login.routing.module';
import { DataModule } from 'src/app/data/data.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule,ReactiveFormsModule,  FormsModule,RouterModule,],
  declarations: [SingupComponent,LoginComponent],
  exports: [SingupComponent, LoginRouterModule,  LoginComponent,   DataModule,
  ],
})
export class Login2Module {}
