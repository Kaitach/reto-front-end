import { DeleteAccountByIdUseCase, GetAccountByIdUseCase, UpdateAccountUseCase, CreateAccountUseCase, AccountRepository } from "src/app/domain";

export const DeleteAccountByIdUseCaseFactory = (AccountRepository: AccountRepository) =>
  new DeleteAccountByIdUseCase(AccountRepository);

export const GetAccountByIdUseCaseFactory = (AccountRepository: AccountRepository) =>
  new GetAccountByIdUseCase(AccountRepository);

export const UpdateAccountUseCaseFactory = (AccountRepository: AccountRepository) =>
  new UpdateAccountUseCase(AccountRepository);

;

export const createAccountUseCaseFactory = (AccountRepository: AccountRepository) =>
  new CreateAccountUseCase(AccountRepository);



   

  export const AccountUseCaseProviders = {
      
    createAccount: {
      provide: CreateAccountUseCase,
      useFactory: createAccountUseCaseFactory,
      deps: [AccountRepository],
    },
    deleteAccount: {
      provide: DeleteAccountByIdUseCase,
      useFactory: DeleteAccountByIdUseCaseFactory,
      deps: [AccountRepository],
    },
    getAccountById: {
      provide: GetAccountByIdUseCase,
      useFactory: GetAccountByIdUseCaseFactory,
      deps: [AccountRepository],
    },
    UpdateAccount: {
      provide: UpdateAccountUseCase,
      useFactory: UpdateAccountUseCaseFactory,
      deps: [AccountRepository],
    }
  };
  
  
