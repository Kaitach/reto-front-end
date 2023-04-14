import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuard } from '../../tools/guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'profile', component: ProfileComponent,  canActivate: [LoginGuard]},
      // {path: 'signup', component: SingupComponent, canActivate: [LoginGuard]},
      // {path: 'signupgoogle', component: SignupGoogleComponent},
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
export class UserRouterModule { }
