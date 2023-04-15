import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IDepositModel } from "../../../../app/domain";
import { DepositImplementationRepository } from "../deposit.implemntation.repositoy";
import { DepositImplementationRepositoryMapper } from "../mappers/deposit.mapper";

describe('DepositImplementationRepository', () => {
    let service: DepositImplementationRepository;
    let httpMock: HttpTestingController;
    const mockDeposit: IDepositModel = {
      _id: '12' as string,
      userId: 'mock-user-id',
      amount: 100,
      accountId: 'mock-account-id',
      reason: 'mock-reason'
    };
    const mockDeposits: IDepositModel[] = [
      mockDeposit
    ];
    const mockDepositMapper = new DepositImplementationRepositoryMapper();
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          DepositImplementationRepository
        ]
      });
      service = TestBed.inject(DepositImplementationRepository);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should create deposit successfully', (done) => {
      service.createDeposit(mockDeposit).subscribe((result) => {
        expect(result).toEqual(mockDeposit);
        done();
      });
      const req = httpMock.expectOne('https://banco-backend.onrender.com/deposit');
      expect(req.request.method).toEqual('POST');
      req.flush(mockDeposit);
    });
  
    it('should update deposit successfully', (done) => {
      const mockUpdatedDeposit: IDepositModel = {
        ...mockDeposit,
        amount: 200
      };
      spyOn(mockDepositMapper, 'mapTo').and.returnValue(mockUpdatedDeposit);
      spyOn(mockDepositMapper, 'mapFrom').and.returnValue(mockUpdatedDeposit);
      if(mockDeposit._id !== undefined)

      service.updateDeposit(mockDeposit._id, mockUpdatedDeposit).subscribe((result) => {
        expect(result).toEqual(mockUpdatedDeposit);
        done();
      });
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/deposit/${mockDeposit._id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(mockUpdatedDeposit);
      req.flush(mockUpdatedDeposit);
    });
  
    it('should get deposit by id successfully', (done) => {
        if(mockDeposit._id !== undefined)

      service.getDepositById(mockDeposit._id).subscribe((result) => {
        expect(result).toEqual(mockDeposit);
        done();
      });
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/deposit/${mockDeposit._id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockDeposit);
    });
  
    it('should delete deposit by id successfully', (done) => {
        if(mockDeposit._id !== undefined)
      service.deleteDepositById(mockDeposit._id).subscribe((result) => {
        expect(result).toBeTrue();
        done();
      });
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/deposit/${mockDeposit._id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(true);
    });
  
    it('should get all deposits by user id successfully', (done) => {
      service.getAllDepositByUserId(mockDeposit.userId).subscribe((result) => {
        expect(result).toEqual(mockDeposits);
        done();
      });
      const req = httpMock.expectOne(`https://banco-backend.onrender.com/deposit/all/${mockDeposit.userId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockDeposits);
    }); })