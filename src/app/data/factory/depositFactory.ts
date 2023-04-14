import { LoginGoogleUseCase } from "src/app/domain/usecases/user/userGoogleLogin.usecase";
import { UserImplementationRepository } from "../repository/user-implementation.repository";
import { CreateDepositUseCase, DeleteDepositByIdUseCase, DepositRepository, GetAllDepositByUserIdUseCase, GetDepositByIdUseCase, UpdateDepositUseCase } from "src/app/domain";

export const DeleteDepositByIdUseCaseFactory = (DepositRepository: DepositRepository) =>
  new DeleteDepositByIdUseCase(DepositRepository);

export const GetAllDepositByUserIdUseCaseFactory = (DepositRepository: DepositRepository) =>
  new GetAllDepositByUserIdUseCase(DepositRepository);


export const GetDepositByIdUseCaseFactory = (DepositRepository: DepositRepository) =>
  new GetDepositByIdUseCase(DepositRepository);

export const UpdateDepositUseCaseFactory = (DepositRepository: DepositRepository) =>
  new UpdateDepositUseCase(DepositRepository);


export const CreateDepositUseCaseFactory = (DepositRepository: DepositRepository) =>
  new CreateDepositUseCase(DepositRepository);



   

  export const depositUseCaseProviders = {
      
    CreateDeposit: {
      provide: CreateDepositUseCase,
      useFactory: CreateDepositUseCaseFactory,
      deps: [DepositRepository],
    },
    deleteDeposit: {
      provide: DeleteDepositByIdUseCase,
      useFactory: DeleteDepositByIdUseCaseFactory,
      deps: [DepositRepository],
    },
    getDepositById: {
      provide: GetDepositByIdUseCase,
      useFactory: GetDepositByIdUseCaseFactory,
      deps: [DepositRepository],
    },
    UpdateDeposit: {
      provide: UpdateDepositUseCase,
      useFactory: UpdateDepositUseCaseFactory,
      deps: [DepositRepository],
    },
    getByUser: {
      provide: GetAllDepositByUserIdUseCase,
      useFactory: GetAllDepositByUserIdUseCaseFactory,
      deps: [DepositRepository],
 
  },
  
  
  }