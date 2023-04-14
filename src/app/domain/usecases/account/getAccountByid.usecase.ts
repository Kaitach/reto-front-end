import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { IAccountModel } from "../../models/account.model";
import { AccountRepository } from "../../repository/account.repository";

export class GetAccountByIdUseCase implements UseCase<string, IAccountModel> {
    constructor(private accountRepository: AccountRepository) {}
  
    execute(id: string): Observable<IAccountModel> {
      return this.accountRepository.getAccountById(id);
    }
  }