import { of, throwError } from "rxjs";
import { UserModel } from "../../../../../app/domain/models";
import { UserRepository } from "../../../../../app/domain/repository";
import { UpdateUserUseCase } from "../user-update.usecase";

describe('UpdateUserUseCase', () => {
    let repository: UserRepository;
    let useCase: UpdateUserUseCase;
    const mockUser: UserModel = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
      document: 1234567890,
      Account: []
    };
  
    beforeEach(() => {
      repository = {
        updateUser: jasmine.createSpy('updateUser').and.returnValue(of(mockUser))
      } as unknown as UserRepository;
      useCase = new UpdateUserUseCase(repository);
    });
  
    it('should update user successfully', (done) => {
      const updatedUser = {
        ...mockUser,
        name: 'Jane Doe'
      };
  
      (repository.updateUser as jasmine.Spy).and.returnValue(of(updatedUser));
  
      useCase.execute({ id: mockUser.id, user: updatedUser }).subscribe({
        next: (result) => {
          expect(result).toEqual(updatedUser);
          expect(repository.updateUser).toHaveBeenCalledWith(mockUser.id, updatedUser);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail updating user', (done) => {
      const error = new Error('Something went wrong');
      (repository.updateUser as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute({ id: mockUser.id, user: mockUser }).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.updateUser).toHaveBeenCalledWith(mockUser.id, mockUser);
          done();
        },
      });
    });
  });