import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';

export class CreateUserUseCase implements UseCase<UserModel, UserModel> {
  constructor(private UserRepository: UserRepository) {}

  execute(user: UserModel): Observable<UserModel> {


    return this.UserRepository.createUser(user);
  }
}
