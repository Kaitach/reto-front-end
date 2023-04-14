import { Observable, map } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';
import jwtDecode from 'jwt-decode';
import { UserEntity } from 'src/app/data';

export class UserLoginUseCase implements UseCase<{ email: string; password: string }, string> {
    constructor(private userRepository: UserRepository) { }
    execute(params: { email: string; password: string }): Observable<any> {
        return this.userRepository.login(params.email, params.password).pipe(
          map((response: any) => response.token)
        );
      }
    
      }
      
      
      
      
      
      
