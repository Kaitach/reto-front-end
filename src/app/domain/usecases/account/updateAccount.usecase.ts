import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { IAccountModel } from "../../models/account.model";
import { AccountRepository } from "../../repository/account.repository";

export class UpdateAccountUseCase  {
    constructor(private accountRepository: AccountRepository) {}
  
    execute(id:string, account: IAccountModel): Observable<IAccountModel> {
     
      return this.accountRepository.updateAccount(id, account);
    }
}
