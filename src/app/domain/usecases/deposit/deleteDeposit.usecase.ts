import { Observable } from "rxjs";
import { DepositRepository } from "../../repository/deposit.repository";

export class DeleteDepositByIdUseCase {
    constructor(private depositRepository: DepositRepository) { }
  
    execute(id: string): Observable<boolean> {
      return this.depositRepository.deleteDepositById(id);
    }
  }