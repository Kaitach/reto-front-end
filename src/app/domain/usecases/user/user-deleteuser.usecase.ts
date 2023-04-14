import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserRepository } from '../../repository/user.repository';

export class DeleteUserByIdUseCase implements UseCase<string, boolean> {
  constructor(private userrepository: UserRepository) {}

  execute(id: string): Observable<boolean> {
    return this.userrepository.deleteUserById(id);
  }
}
