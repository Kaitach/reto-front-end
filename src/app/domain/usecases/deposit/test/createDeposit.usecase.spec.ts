import { of } from "rxjs";
import { IDepositModel } from "../../../../../app/domain/models";
import { DepositRepository } from "../../../../../app/domain/repository";
import { CreateDepositUseCase } from "../createDeposit.usecase";

describe('CreateDepositUseCase', () => {
    let useCase: CreateDepositUseCase;
    let depositRepository: DepositRepository;
    const deposit: IDepositModel = { _id:'1', accountId: '456', amount: 100, reason: 'Deposit', userId: '1231243'};
  
    beforeEach(() => {
      depositRepository = jasmine.createSpyObj('depositRepository', ['createDeposit']);
      useCase = new CreateDepositUseCase(depositRepository);
    });
  
    describe('execute', () => {
      it('should call createDeposit with the given deposit and return an Observable of the created deposit', () => {
        (depositRepository.createDeposit as jasmine.Spy).and.returnValue(of(deposit));
  
        useCase.execute(deposit).subscribe(result => {
          expect(result).toBe(deposit);
          expect(depositRepository.createDeposit).toHaveBeenCalledWith(deposit);
        });
      });
    });
  });