import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IAccountModel } from "../../../../app/domain";
import { AccountImplementationRepository } from "../account.implentation.reposity";
import { IAccountEntity } from "../entities";

describe('AccountImplementationRepository', () => {
    let repository: AccountImplementationRepository;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AccountImplementationRepository],
      });
  
      repository = TestBed.inject(AccountImplementationRepository);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    describe('createAccount', () => {
      it('should return an Observable of IAccountModel', (done) => {
        const account: IAccountModel = { id: '1', amount: 0, type: 'lol'    };
        const accountEntity: IAccountEntity = { id: '1', amount: 0, type: 'lol'   };
        repository.createAccount(account).subscribe((result) => {
          expect(result).toEqual(account);
          done();
        });
  
        const req = httpMock.expectOne('https://banco-backend.onrender.com/account');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(accountEntity);
  
        req.flush(accountEntity);
      });
    });
  
    describe('updateAccount', () => {
      it('should return an Observable of IAccountModel', (done) => {
        const account: IAccountModel = { id: '1', amount: 0, type: 'lol'   };
        const accountEntity: IAccountEntity = { id: '1', amount: 0, type: 'lol' };
        repository.updateAccount('1', account).subscribe((result) => {
          expect(result).toEqual(account);
          done();
        });
  
        const req = httpMock.expectOne('https://banco-backend.onrender.com/account/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(accountEntity);
  
        req.flush(accountEntity);
      });
    });
  
    describe('getAccountById', () => {
      it('should return an Observable of IAccountModel', (done) => {
        const account: IAccountModel = {id: '1', amount: 0, type: 'lol'  };
        const accountEntity: IAccountEntity = { id: '1', amount: 0, type: 'lol' };
        repository.getAccountById('1').subscribe((result) => {
          expect(result).toEqual(account);
          done();
        });
  
        const req = httpMock.expectOne('https://banco-backend.onrender.com/account/1');
        expect(req.request.method).toBe('GET');
  
        req.flush(accountEntity);
      });
    });
  
    describe('deleteAccountById', () => {
      it('should return an Observable of boolean', (done) => {
        repository.deleteAccountById('1').subscribe((result) => {
          expect(result).toBeTrue();
          done();
        });
  
        const req = httpMock.expectOne('https://banco-backend.onrender.com/account/1');
        expect(req.request.method).toBe('DELETE');
  
        req.flush(true);
      });
    });
  });