import { LoginGoogleUseCase } from "src/app/domain/usecases/user/userGoogleLogin.usecase";
import { UserRepository, UserLoginUseCase, DeleteUserByIdUseCase, GetUserByIdUseCase, GetAllUsersUseCase, GetUserByEmailUseCase, UpdateUserUseCase, CreateUserUseCase, TransferRepository, CreateTransferUseCase } from "../../../app/domain";
import { UserImplementationRepository } from "../repository/user-implementation.repository";

export const createTransferUseCaseFactory = (transferRepository: TransferRepository) =>
  new CreateTransferUseCase(transferRepository);



   

  export const transferUseCaseProviders = {
      

    createUser: {
      provide: CreateTransferUseCase,
      useFactory: createTransferUseCaseFactory,
      deps: [TransferRepository],
    },
  };
  
  
