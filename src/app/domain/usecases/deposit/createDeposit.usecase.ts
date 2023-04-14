import { Observable } from 'rxjs';
import { IDepositModel } from '../../models/deposit.model';
import { DepositRepository } from '../../repository/deposit.repository';

export class CreateDepositUseCase {
  constructor(private depositRepository: DepositRepository) { }

  execute(deposit: IDepositModel): Observable<IDepositModel> {
    return this.depositRepository.createDeposit(deposit);
  }
}