import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountModel } from '../models/account.model';


export abstract class AccountRepository{
  abstract createAccount(account: IAccountModel): Observable<IAccountModel>;
  abstract updateAccount(id: string, account: IAccountModel): Observable<IAccountModel>;
  abstract getAccountById(id: string): Observable<IAccountModel>;
  abstract deleteAccountById(id: string): Observable<boolean>;
}
