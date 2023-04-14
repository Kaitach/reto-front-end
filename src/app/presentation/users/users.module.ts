import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserComponent } from './get-user/get-user.component';
import { RouterModule } from '@angular/router';
import { UserRouterModule } from './user-router.module';
import { DataModule } from '../../../app/data/data.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from '../components/account/account.component';
import { AccountModule } from '../components/account/account.module';



@NgModule({
  declarations: [
    GetUserComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AccountModule
    
  ],
  exports:[
    GetUserComponent,
    UserRouterModule,
    DataModule,

  ]
})
export class UsersModule { }
