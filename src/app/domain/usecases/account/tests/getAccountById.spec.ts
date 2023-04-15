import { of } from "rxjs";
import { IAccountModel } from "src/app/domain/models";
import { AccountRepository } from "src/app/domain/repository";
import { GetAccountByIdUseCase } from "../getAccountByid.usecase";


describe('GetAccountByIdUseCase', () => {
  let useCase: GetAccountByIdUseCase;
  let accountRepository: AccountRepository;
  const id = '123';

  beforeEach(() => {
    accountRepository = jasmine.createSpyObj('accountRepository', ['getAccountById']);
    useCase = new GetAccountByIdUseCase(accountRepository);
  });

  describe('execute', () => {
    it('should call getAccountById with the given id and return an Observable of account', () => {
      const account: IAccountModel = { id: '123',amount: 1, type: 'money' };
      (accountRepository.getAccountById as jasmine.Spy).and.returnValue(of(account));

      useCase.execute(id).subscribe(result => {
        expect(result).toBe(account);
        expect(accountRepository.getAccountById).toHaveBeenCalledWith(id);
      });
    });
  });
});
