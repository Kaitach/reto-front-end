import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { TransferModel } from "src/app/domain";
import { TransferImplementationRepository } from "../transfer.implementation.repository";

describe('TransferImplementationRepository', () => {
    let repository: TransferImplementationRepository;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TransferImplementationRepository],
      });
      repository = TestBed.inject(TransferImplementationRepository);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    describe('createTransfer', () => {
      it('should create a transfer', () => {
        const transfer: TransferModel = {
          id: '1',
          amount: 100,
          receiverAccountId: '1',
          senderAccountId: '2',
         
        };
  
        repository.createTransfer(transfer).subscribe((response) => {
          expect(response).toEqual(transfer);
        });
  
        const req = httpMock.expectOne('https://banco-backend.onrender.com/transfer/');
        expect(req.request.method).toEqual('POST');
        req.flush(transfer);
      });
    });
  });