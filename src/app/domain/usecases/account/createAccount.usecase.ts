import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { IAccountModel } from "../../models/account.model";
import { AccountRepository } from "../../repository/account.repository";

export class CreateAccountUseCase implements UseCase<IAccountModel, IAccountModel> {
    constructor(private accountRepository: AccountRepository) {}
  
    execute(account: IAccountModel): Observable<IAccountModel> {
      return this.accountRepository.createAccount(account);
    }
  }