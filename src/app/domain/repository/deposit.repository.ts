import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepositModel } from '../models/deposit.model';



export abstract class DepositRepository {
  abstract createDeposit(deposit: IDepositModel): Observable<IDepositModel>;
  abstract updateDeposit(id: string, deposit: IDepositModel): Observable<IDepositModel>;
  abstract getDepositById(id: string): Observable<IDepositModel>;
  abstract deleteDepositById(id: string): Observable<boolean>;
  abstract getAllDepositByUserId(userId: string): Observable<IDepositModel[]>;
}
