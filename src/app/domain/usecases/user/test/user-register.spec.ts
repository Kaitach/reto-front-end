import { of, throwError } from "rxjs";
import { UserModel } from "../../../../../app/domain/models";
import { UserRepository } from "../../../../../app/domain/repository";
import { CreateUserUseCase } from "../user-register.usecase";

describe('CreateUserUseCase', () => {
    let repository: UserRepository;
    let useCase: CreateUserUseCase;
    const user: UserModel = {
      id: '1',
      name: 'Test',
      email: 'test@test.com',
      password: 'test123',
      document: 123456789,
      Account: []
    };
  
    beforeEach(() => {
      repository = jasmine.createSpyObj<UserRepository>('UserRepository', ['createUser']);
      useCase = new CreateUserUseCase(repository);
    });
  
    it('should create user successfully', (done) => {
      (repository.createUser as jasmine.Spy).and.returnValue(of(user));
  
      useCase.execute(user).subscribe({
        next: (result) => {
          expect(result).toEqual(user);
          expect(repository.createUser).toHaveBeenCalledWith(user);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail creating user', (done) => {
      const error = new Error('Something went wrong');
      (repository.createUser as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute(user).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.createUser).toHaveBeenCalledWith(user);
          done();
        },
      });
    });
  })