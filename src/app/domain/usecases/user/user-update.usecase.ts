import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';

export class UpdateUserUseCase implements UseCase<{id: string, user: UserModel}, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(params: {id: string, user: UserModel}): Observable<UserModel> {
    const { id, user } = params;
    return this.userRepository.updateUser(id, user);
  }
}
