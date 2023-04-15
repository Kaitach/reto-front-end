import { of } from "rxjs";
import { IDepositModel } from "../../../../../app/domain/models";
import { DepositRepository } from "../../../../../app/domain/repository";
import { UpdateDepositUseCase } from "../updateDeposit.usecase";

describe('UpdateDepositUseCase', () => {
    let depositRepository: jasmine.SpyObj<DepositRepository>;
    let updateDepositUseCase: UpdateDepositUseCase;
  
    beforeEach(() => {
      depositRepository = jasmine.createSpyObj('DepositRepository', [
        'updateDeposit',
      ]);
      updateDepositUseCase = new UpdateDepositUseCase(depositRepository);
    });
  
    it('should update deposit successfully', () => {
      const id = '123';
      const deposit: IDepositModel = {
        _id: '123',
        userId: '456',
        amount: 100,
        accountId: '123',
        reason: 'Deposit'
      };
      const updatedDeposit: IDepositModel = {
        ...deposit,
        amount: 200,
      };
      depositRepository.updateDeposit.and.returnValue(of(updatedDeposit));
  
      let result: IDepositModel | undefined;
      updateDepositUseCase.execute(id, deposit).subscribe((data) => {
        result = data;
      });
  
      expect(result).toEqual(updatedDeposit);
      expect(depositRepository.updateDeposit).toHaveBeenCalledWith(id, deposit);
    });
  });