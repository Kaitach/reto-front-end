import { Observable } from "rxjs";
import { IDepositModel } from "../../models/deposit.model";
import { DepositRepository } from "../../repository/deposit.repository";

export class UpdateDepositUseCase {
    constructor(private depositRepository: DepositRepository) { }
  
    execute(id: string, deposit: IDepositModel): Observable<IDepositModel> {
      return this.depositRepository.updateDeposit(id, deposit);
    }
  }