import { of, throwError } from "rxjs";
import { IDepositModel } from "../../../../../app/domain/models";
import { DepositRepository } from "../../../../../app/domain/repository";
import { GetDepositByIdUseCase } from "../getDeposit.usecase";

describe('GetDepositByIdUseCase', () => {
    let repository: DepositRepository;
    let useCase: GetDepositByIdUseCase;
    const id = '123';
  
    beforeEach(() => {
      repository = jasmine.createSpyObj<DepositRepository>('DepositRepository', ['getDepositById']);
      useCase = new GetDepositByIdUseCase(repository);
    });
  
    it('should get deposit by id successfully', (done) => {
      const deposit = { _id: '123', accountId: '23', amount: 0, reason: 'test', userId:'23'} as IDepositModel;
      (repository.getDepositById as jasmine.Spy).and.returnValue(of(deposit));;
  
      useCase.execute(id).subscribe({
        next: (result) => {
          expect(result).toBe(deposit);
          expect(repository.getDepositById).toHaveBeenCalledWith(id);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail getting deposit by id', (done) => {
      const error = new Error('Something went wrong');
      (repository.getDepositById as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute(id).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.getDepositById).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
});
