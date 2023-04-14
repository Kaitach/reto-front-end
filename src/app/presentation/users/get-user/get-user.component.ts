import { Component } from '@angular/core';
import { GetAllUsersUseCase, UserRepository } from '../../../domain';
import { UserEntity } from 'src/app/data/repository/entities/user.entity';
import { getAllUsersUseCaseFactory, userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { UserImplementationRepository } from 'src/app/data/repository/user-implementation.repository';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent {
  factory = userUseCaseProviders;

  constructor(private userRepository: UserRepository ) {}

  users?: UserEntity[];
  get() {
this.factory.getAllUsers.useFactory(this.userRepository).execute().subscribe((user) => {
      this.users = user
    });
  }
}
