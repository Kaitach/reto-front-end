import { LoginGoogleUseCase } from "src/app/domain/usecases/user/userGoogleLogin.usecase";
import { UserRepository, UserLoginUseCase, DeleteUserByIdUseCase, GetUserByIdUseCase, GetAllUsersUseCase, GetUserByEmailUseCase, UpdateUserUseCase, CreateUserUseCase } from "../../../app/domain";
import { UserImplementationRepository } from "../repository/user-implementation.repository";

export const deleteUserByIdUseCaseFactory = (userRepository: UserRepository) =>
  new DeleteUserByIdUseCase(userRepository);

export const getAllUsersUseCaseFactory = (userRepository: UserRepository) =>
  new GetAllUsersUseCase(userRepository);

export const getUserByIdUseCaseFactory = (userRepository: UserRepository) =>
  new GetUserByIdUseCase(userRepository);

export const getUserByEmailUseCaseFactory = (userRepository: UserRepository) =>
  new GetUserByEmailUseCase(userRepository);

export const userLoginUseCaseFactory = (userRepository: UserRepository) =>
  new UserLoginUseCase(userRepository);

export const updateUserUseCaseFactory = (userRepository: UserRepository) =>
  new UpdateUserUseCase(userRepository);

export const createUserUseCaseFactory = (userRepository: UserRepository) =>
  new CreateUserUseCase(userRepository);



   

  export const userUseCaseProviders = {
      
    userLogin: {
      provide: UserLoginUseCase,
      useFactory: userLoginUseCaseFactory,
      deps: [UserRepository],
    },
    deleteUser: {
      provide: DeleteUserByIdUseCase,
      useFactory: deleteUserByIdUseCaseFactory,
      deps: [UserRepository],
    },
    getUserById: {
      provide: GetUserByIdUseCase,
      useFactory: getUserByIdUseCaseFactory,
      deps: [UserRepository],
    },
    getAllUsers: {
      provide: GetAllUsersUseCase,
      useFactory: getAllUsersUseCaseFactory,
      deps: [UserRepository],
    },
    getUserByEmail: {
      provide: GetUserByEmailUseCase,
      useFactory: getUserByEmailUseCaseFactory,
      deps: [UserRepository],
    },
    updateUser: {
      provide: UpdateUserUseCase,
      useFactory: updateUserUseCaseFactory,
      deps: [UserRepository],
    },
    createUser: {
      provide: CreateUserUseCase,
      useFactory: createUserUseCaseFactory,
      deps: [UserRepository],
    },
  };
  
  
