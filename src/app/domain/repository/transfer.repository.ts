import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransferModel } from '../models/transfer.model';


export abstract class TransferRepository {
  abstract createTransfer(transfer: TransferModel): Observable<TransferModel>;
}
