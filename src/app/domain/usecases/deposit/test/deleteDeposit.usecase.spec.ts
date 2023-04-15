import { of } from "rxjs";
import { DepositRepository } from "../../../../../app/domain/repository";
import { DeleteDepositByIdUseCase } from "../deleteDeposit.usecase";

describe('DeleteDepositByIdUseCase', () => {
    let useCase: DeleteDepositByIdUseCase;
    let depositRepository: DepositRepository;
    const depositId = '123';
  
    beforeEach(() => {
      depositRepository = jasmine.createSpyObj('depositRepository', ['deleteDepositById']);
      useCase = new DeleteDepositByIdUseCase(depositRepository);
    });
  
    describe('execute', () => {
      it('should call deleteDepositById with the given id and return an Observable of true', () => {
        (depositRepository.deleteDepositById as jasmine.Spy).and.returnValue(of(true));
  
        useCase.execute(depositId).subscribe(result => {
          expect(result).toBeTrue();
          expect(depositRepository.deleteDepositById).toHaveBeenCalledWith(depositId);
        });
      });
    });
  });