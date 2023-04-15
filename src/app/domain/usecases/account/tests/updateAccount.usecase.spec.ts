import { of } from "rxjs";
import { IAccountModel } from "../../../../../app/domain/models";
import { AccountRepository } from "../../../../../app/domain/repository";
import { UpdateAccountUseCase } from "../updateAccount.usecase";


describe('UpdateAccountUseCase', () => {
    let useCase: UpdateAccountUseCase;
    let accountRepository: AccountRepository;
    const id = '123';
    const account: IAccountModel = { id: '123',amount: 1, type: 'money' };
  
    beforeEach(() => {
      accountRepository = jasmine.createSpyObj('accountRepository', ['updateAccount']);
      useCase = new UpdateAccountUseCase(accountRepository);
    });
  
    describe('execute', () => {
      it('should call updateAccount with the given id and account and return an Observable of updated account', () => {
        (accountRepository.updateAccount as jasmine.Spy).and.returnValue(of(account));
  
        useCase.execute(id, account).subscribe(result => {
          expect(result).toBe(account);
          expect(accountRepository.updateAccount).toHaveBeenCalledWith(id, account);
        });
      });
    });
  });