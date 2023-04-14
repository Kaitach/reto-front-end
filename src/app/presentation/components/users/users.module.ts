import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRouterModule } from './user-router.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataModule } from 'src/app/data/data.module';
import { AccountModule } from '../account/account.module';




@NgModule({
  declarations: [
    
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AccountModule
    
  ],
  exports:[
    UserRouterModule,
    DataModule,

  ]
})
export class UsersModule { }
