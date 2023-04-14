import { Observable } from "rxjs";
import { IDepositModel } from "../../models/deposit.model";
import { DepositRepository } from "../../repository/deposit.repository";

export class GetDepositByIdUseCase {
    constructor(private depositRepository: DepositRepository) { }
  
    execute(id: string): Observable<IDepositModel> {
      return this.depositRepository.getDepositById(id);
    }
  }