import { of } from "rxjs";
import { UseCase } from "../../../../../app/domain/base";
import { UserRepository } from "../../../../../app/domain/repository";
import { UserLoginUseCase } from "../user-login.usecase";

describe('UserLoginUseCase', () => {
    let userRepository: UserRepository;
    let useCase: UseCase<{ email: string; password: string }, string>;
  
    beforeEach(() => {
      userRepository = {
        login: jasmine.createSpy('login').and.returnValue(of({ token: 'some_token' })),
      } as unknown as UserRepository;
  
      useCase = new UserLoginUseCase(userRepository);
    });
  
    it('should return the auth token when credentials are correct', (done) => {
      const credentials = { email: 'test@test.com', password: 'test_password' };
  
      useCase.execute(credentials).subscribe((token) => {
        expect(token).toBe('some_token');
        expect(userRepository.login).toHaveBeenCalledWith('test@test.com', 'test_password');
        done();
      }, done.fail);
    });
  });