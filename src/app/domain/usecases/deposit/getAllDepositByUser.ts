import { Observable } from "rxjs";
import { IDepositModel } from "../../models/deposit.model";
import { DepositRepository } from "../../repository/deposit.repository";

export class GetAllDepositByUserIdUseCase {
    constructor(private depositRepository: DepositRepository) { }
  
    execute(userId: string): Observable<IDepositModel[]> {
      return this.depositRepository.getAllDepositByUserId(userId);
    }
  }