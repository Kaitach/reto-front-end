import { of } from "rxjs";
import { IAccountModel } from "src/app/domain/models";
import { AccountRepository } from "src/app/domain/repository";
import { CreateAccountUseCase } from "../createAccount.usecase";

describe('CreateAccountUseCase', () => {
    let useCase: CreateAccountUseCase;
    let accountRepository: AccountRepository;
  
    beforeEach(() => {
      accountRepository = jasmine.createSpyObj('accountRepository', ['createAccount']);
      useCase = new CreateAccountUseCase(accountRepository);
    });
  
    it('should call createAccount function of the repository and return an Observable with the created account model', () => {
      const account: IAccountModel = { 
        id: '1234',
        amount: 0,
      
       type: 'createAccount',
       userID: '1234',
      };
      const createdAccount: IAccountModel = { 
        ...account,
        amount: 0,
        userID: '1234',
      };
      (accountRepository.createAccount as jasmine.Spy).and.returnValue(of(createdAccount));
  
      useCase.execute(account).subscribe(result => {
        expect(result).toEqual(createdAccount);
        expect(accountRepository.createAccount).toHaveBeenCalledWith(account);
      });
    });
  });
  