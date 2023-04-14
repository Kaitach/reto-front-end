import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';

export class GetUserByIdUseCase implements UseCase<string, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(id: string): Observable<UserModel> {
    return this.userRepository.getUserById(id);
  }
}
