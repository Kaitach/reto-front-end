import { of, throwError } from "rxjs";
import { UserModel } from "../../../../../app/domain/models";
import { UserRepository } from "../../../../../app/domain/repository";
import { GetUserByEmailUseCase } from "../user-getuserByEmail";

describe('GetUserByEmailUseCase', () => {
    let repository: UserRepository;
    let useCase: GetUserByEmailUseCase;
    const email = 'test@example.com';
    
   
    beforeEach(() => {
      repository = jasmine.createSpyObj<UserRepository>('UserRepository', ['getUserByEmail']);
      useCase = new GetUserByEmailUseCase(repository);
    });
    
    it('should get user by email successfully', (done) => {
      const user = { Account: [], document: 123, email: 'test@example.com', password:'12', name: 'test', id: '1'} as UserModel;
      (repository.getUserByEmail as jasmine.Spy).and.returnValue(of(user));
    
      useCase.execute(email).subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          expect(repository.getUserByEmail).toHaveBeenCalledWith(email);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
    
    it('should fail getting user by email', (done) => {
      const error = new Error('Something went wrong');
      (repository.getUserByEmail as jasmine.Spy).and.returnValue(throwError(error));
    
      useCase.execute(email).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.getUserByEmail).toHaveBeenCalledWith(email);
          done();
        },
      });
    });
    });
    
    
    
    