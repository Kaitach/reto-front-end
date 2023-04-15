import { of, throwError } from "rxjs";
import { UserModel } from "../../../../../app/domain/models";
import { UserRepository } from "../../../../../app/domain/repository";
import { GetUserByIdUseCase } from "../user-getbyid.usecase";

describe('GetUserByIdUseCase', () => {
    let repository: UserRepository;
    let useCase: GetUserByIdUseCase;
    const id = '1';
    const user: UserModel = { Account: [], document: 123, email: 'test@example.com', password:'12', name: 'test', id: '1'};
  
    beforeEach(() => {
      repository = jasmine.createSpyObj<UserRepository>('UserRepository', ['getUserById']);
      useCase = new GetUserByIdUseCase(repository);
    });
  
    it('should get user by id successfully', (done) => {
      (repository.getUserById as jasmine.Spy).and.returnValue(of(user));
  
      useCase.execute(id).subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          expect(repository.getUserById).toHaveBeenCalledWith(id);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail getting user by id', (done) => {
      const error = new Error('Something went wrong');
      (repository.getUserById as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute(id).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.getUserById).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
  });