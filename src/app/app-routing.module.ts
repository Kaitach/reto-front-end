import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogedGuard } from './presentation/tools/guard/logged.guard';
import { LoginGuard } from './presentation/tools/guard';

const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('../app/presentation/users/users.module').then(m => m.UsersModule) , canActivate: [LoginGuard]
},
{
  path: 'login',
  loadChildren: () => import('../app/presentation/components/login/login.module').then(m => m.Login2Module), canActivate: [LogedGuard]
},
{
  path: 'account',
  loadChildren: () => import('../app/presentation/components/account-data/account.data.module').then(m => m.AccountDataModule), canActivate: [LoginGuard]
},
{
  path: 'deposit',
  loadChildren: () => import('../app/presentation/components/deposit/deposit.data.module').then(m => m.DepositDataModule), canActivate: [LoginGuard]
},
{
  path: 'transfer',
  loadChildren: () => import('../app/presentation/components/transfer/transfer.data.module').then(m => m.TransferDataModule), canActivate: [LoginGuard]
},
{
  path: '**',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
