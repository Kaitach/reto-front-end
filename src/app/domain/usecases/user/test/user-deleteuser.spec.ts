import { of, throwError } from "rxjs";
import { UserRepository } from "../../../../../app/domain/repository";
import { DeleteUserByIdUseCase } from "../user-deleteuser.usecase";


describe('DeleteUserByIdUseCase', () => {
    let repository: UserRepository;
    let useCase: DeleteUserByIdUseCase;
    const id = '123';
  
    beforeEach(() => {
      repository = jasmine.createSpyObj<UserRepository>('UserRepository', ['deleteUserById']);
      useCase = new DeleteUserByIdUseCase(repository);
    });
  
    it('should delete user by id successfully', (done) => {
      (repository.deleteUserById as jasmine.Spy).and.returnValue(of(true));
  
      useCase.execute(id).subscribe({
        next: (result) => {
          expect(result).toBeTrue();
          expect(repository.deleteUserById).toHaveBeenCalledWith(id);
          done();
        },
        error: (err) => done.fail(err),
      });
    });
  
    it('should fail deleting user by id', (done) => {
      const error = new Error('Something went wrong');
      (repository.deleteUserById as jasmine.Spy).and.returnValue(throwError(error));
  
      useCase.execute(id).subscribe({
        next: () => done.fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          expect(repository.deleteUserById).toHaveBeenCalledWith(id);
          done();
        },
      });
    });
  });