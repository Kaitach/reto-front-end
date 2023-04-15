import { of, throwError } from "rxjs";
import { UserModel } from "../../../../../app/domain/models";
import { UserRepository } from "../../../../../app/domain/repository";
import { GetAllUsersUseCase } from "../user-getall.usecase";

describe('GetAllUsersUseCase', () => {
    let repository: UserRepository;
    let useCase: GetAllUsersUseCase;
  
    beforeEach(() => {
      repository = jasmine.createSpyObj<UserRepository>('UserRepository', ['getAllUsers']);
      useCase = new GetAllUsersUseCase(repository);
    });
  
    it('should get all users successfully', (done) => {
      const users: UserModel[] = [
        { id: '1', name: 'User1', email: 'user1@example.com', password: 'password1', document: '1234567890', Account: [] },
        { id: '2', name: 'User2', email: 'user2@example.com', password: 'password2', document: '0987654321', Account: [] }
      ];
      (repository.getAllUsers as jasmine.Spy).and.returnValue(of(users));
  
      useCase.execute().subscribe({
        next: (result) => {
          expect(result).toEqual(users);
          expect(repository.getAllUsers).toHaveBeenCalled();
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail getting all users', (done) => {
      const error = new Error('Something went wrong');
      (repository.getAllUsers as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute().subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.getAllUsers).toHaveBeenCalled();
          done();
        },
      });
    });
  });