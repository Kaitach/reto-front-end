import { of } from "rxjs";
import { IDepositModel } from "../../../../../app/domain/models";
import { DepositRepository } from "../../../../../app/domain/repository";
import { GetAllDepositByUserIdUseCase } from "../getAllDepositByUser";

describe('GetAllDepositByUserIdUseCase', () => {
    let useCase: GetAllDepositByUserIdUseCase;
    let depositRepository: DepositRepository;
    const userId = '123';
    const deposits: IDepositModel[] = [{_id: '1', accountId: '23', amount: 0, reason: 'test', userId:'23' }, {_id: '1', accountId: '23', amount: 0, reason: 'test', userId:'23'}];
  
    beforeEach(() => {
      depositRepository = jasmine.createSpyObj('depositRepository', ['getAllDepositByUserId']);
      useCase = new GetAllDepositByUserIdUseCase(depositRepository);
    });
  
    describe('execute', () => {
      it('should call getAllDepositByUserId with the given userId and return an Observable of the deposits', () => {
        (depositRepository.getAllDepositByUserId as jasmine.Spy).and.returnValue(of(deposits));
  
        useCase.execute(userId).subscribe(result => {
          expect(result).toEqual(deposits);
          expect(depositRepository.getAllDepositByUserId).toHaveBeenCalledWith(userId);
        });
      });
    });
  });