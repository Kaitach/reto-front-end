import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { AccountRepository } from "../../repository/account.repository";

export class DeleteAccountByIdUseCase implements UseCase<string, boolean> {
    constructor(private accountRepository: AccountRepository) {}
  
    execute(id: string): Observable<boolean> {
      return this.accountRepository.deleteAccountById(id);
    }
}