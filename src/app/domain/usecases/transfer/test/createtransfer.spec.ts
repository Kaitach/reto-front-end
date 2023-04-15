import { of, throwError } from "rxjs";
import { TransferModel } from "src/app/domain/models";
import { TransferRepository } from "src/app/domain/repository";
import { CreateTransferUseCase } from "../createTransfer.usecase";

describe('CreateTransferUseCase', () => {
    let repository: TransferRepository;
    let useCase: CreateTransferUseCase;
    const transfer: TransferModel = {
      id: 'transfer',
      receiverAccountId: '2',
      senderAccountId: '3',
      amount: 100
    };
  
    beforeEach(() => {
      repository = jasmine.createSpyObj('TransferRepository', ['createTransfer']);
      useCase = new CreateTransferUseCase(repository);
    });
  
    it('should create a transfer successfully', (done) => {
      const createdTransfer: TransferModel = {
        ...transfer,
        id: '2'
      };
      (repository.createTransfer as jasmine.Spy).and.returnValue(of(createdTransfer));
  
      useCase.execute(transfer).subscribe({
        next: (result) => {
          expect(result).toEqual(createdTransfer);
          expect(repository.createTransfer).toHaveBeenCalledWith(transfer);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail to create a transfer', (done) => {
      const error = new Error('Failed to create transfer');
      (repository.createTransfer as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute(transfer).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.createTransfer).toHaveBeenCalledWith(transfer);
          done();
        },
      });
    });
  });