import { of } from "rxjs";
import { AccountRepository } from "src/app/domain/repository";
import { DeleteAccountByIdUseCase } from "../deleteAccount.usecase";

describe('DeleteAccountByIdUseCase', () => {
    let useCase: DeleteAccountByIdUseCase;
    let accountRepository: AccountRepository;
  
    beforeEach(() => {
      accountRepository = jasmine.createSpyObj('accountRepository', ['deleteAccountById']);
      useCase = new DeleteAccountByIdUseCase(accountRepository);
    });
  
    it('should call deleteAccountById function of the repository and return an Observable with boolean value', () => {
      const id = '1234';
      const success = true;
      (accountRepository.deleteAccountById as jasmine.Spy).and.returnValue(of(success));
  
      useCase.execute(id).subscribe(result => {
        expect(result).toBe(success);
        expect(accountRepository.deleteAccountById).toHaveBeenCalledWith(id);
      });
    });
  });