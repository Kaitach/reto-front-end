import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferModel, TransferRepository } from '../../../app/domain';
import { TransferImplementationRepositoryMapper } from './mappers/transfer.mapper';
import { Observable, map } from 'rxjs';
import { TransferEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class TransferImplementationRepository extends TransferRepository {
  transferMapper = new TransferImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  createTransfer(transfer: TransferModel): Observable<TransferModel> {
    return this.http
      .post<TransferEntity>('https://banco-backend.onrender.com/transfer/',     transfer)
  }
}
