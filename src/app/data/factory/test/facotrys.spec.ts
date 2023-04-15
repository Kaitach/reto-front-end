import { AccountRepository, CreateAccountUseCase, CreateDepositUseCase, CreateTransferUseCase, CreateUserUseCase, DeleteAccountByIdUseCase, DeleteDepositByIdUseCase, DeleteUserByIdUseCase, DepositRepository, GetAccountByIdUseCase, GetAllDepositByUserIdUseCase, GetAllUsersUseCase, GetDepositByIdUseCase, GetUserByEmailUseCase, GetUserByIdUseCase, IAccountModel, IDepositModel, TransferModel, TransferRepository, UpdateAccountUseCase, UpdateDepositUseCase, UpdateUserUseCase, UserLoginUseCase, UserModel, UserRepository } from 'src/app/domain';
import { DeleteAccountByIdUseCaseFactory, GetAccountByIdUseCaseFactory, UpdateAccountUseCaseFactory, createAccountUseCaseFactory } from '../accountFactory';
import { Observable, of } from 'rxjs';
import { DeleteDepositByIdUseCaseFactory, GetAllDepositByUserIdUseCaseFactory, GetDepositByIdUseCaseFactory, UpdateDepositUseCaseFactory, CreateDepositUseCaseFactory } from '../depositFactory';
import { createTransferUseCaseFactory } from '../transferFactory';
import { createUserUseCaseFactory, deleteUserByIdUseCaseFactory, getAllUsersUseCaseFactory, getUserByEmailUseCaseFactory, getUserByIdUseCaseFactory, updateUserUseCaseFactory, userLoginUseCaseFactory } from '../userfactory';

export class MockAccountRepository implements AccountRepository {
 
    
    createAccount(account: IAccountModel): Observable<IAccountModel> {
        return of()
    };

   updateAccount(id: string, account: IAccountModel): Observable<IAccountModel> {
    return of()
   };
   getAccountById(id: string): Observable<IAccountModel> {
    return of()
   }
   deleteAccountById(id: string): Observable<boolean> {

    return of(true)
   }


   
  }



  describe('DeleteAccountByIdUseCaseFactory', () => {
    it('should create a DeleteAccountByIdUseCase instance', () => {
      const accountRepository = new MockAccountRepository();
      const deleteAccountByIdUseCase = DeleteAccountByIdUseCaseFactory(accountRepository);
      expect(deleteAccountByIdUseCase).toBeInstanceOf(DeleteAccountByIdUseCase);
    });
})
  describe('Account Use Case Factories', () => {
    let accountRepository: AccountRepository;
 
    beforeEach(() => {
       accountRepository = new MockAccountRepository();
    });
 
    it('should create a GetAccountByIdUseCase instance', () => {
       const getAccountByIdUseCase = GetAccountByIdUseCaseFactory(accountRepository);
       expect(getAccountByIdUseCase).toBeInstanceOf(GetAccountByIdUseCase);
    });
 
    it('should create an UpdateAccountUseCase instance', () => {
       const updateAccountUseCase = UpdateAccountUseCaseFactory(accountRepository);
       expect(updateAccountUseCase).toBeInstanceOf(UpdateAccountUseCase);
    });
 
    it('should create a CreateAccountUseCase instance', () => {
       const createAccountUseCase = createAccountUseCaseFactory(accountRepository);
       expect(createAccountUseCase).toBeInstanceOf(CreateAccountUseCase);
    });
 });

 export class MockDepositRepository implements DepositRepository {
    createDeposit(deposit: IDepositModel): Observable<IDepositModel> {
      return of();
    }
  
    updateDeposit(id: string, deposit: IDepositModel): Observable<IDepositModel> {
      return of();
    }
  
    getDepositById(id: string): Observable<IDepositModel> {
      return of();
    }
  
    getAllDepositByUserId(userId: string): Observable<IDepositModel[]> {
      return of([]);
    }
  
    deleteDepositById(id: string): Observable<boolean> {
      return of(true);
    }
  }
  
  describe('DepositUseCaseFactory', () => {
    let depositRepository: DepositRepository;
    
    beforeEach(() => {
      depositRepository = new MockDepositRepository();
    });
  
    it('should create a DeleteDepositByIdUseCase instance', () => {
      const deleteDepositByIdUseCase = DeleteDepositByIdUseCaseFactory(depositRepository);
      expect(deleteDepositByIdUseCase).toBeInstanceOf(DeleteDepositByIdUseCase);
    });
  
    it('should create a GetAllDepositByUserIdUseCase instance', () => {
      const getAllDepositByUserIdUseCase = GetAllDepositByUserIdUseCaseFactory(depositRepository);
      expect(getAllDepositByUserIdUseCase).toBeInstanceOf(GetAllDepositByUserIdUseCase);
    });
  
    it('should create a GetDepositByIdUseCase instance', () => {
      const getDepositByIdUseCase = GetDepositByIdUseCaseFactory(depositRepository);
      expect(getDepositByIdUseCase).toBeInstanceOf(GetDepositByIdUseCase);
    });
  
    it('should create a UpdateDepositUseCase instance', () => {
      const updateDepositUseCase = UpdateDepositUseCaseFactory(depositRepository);
      expect(updateDepositUseCase).toBeInstanceOf(UpdateDepositUseCase);
    });
  
    it('should create a CreateDepositUseCase instance', () => {
      const createDepositUseCase = CreateDepositUseCaseFactory(depositRepository);
      expect(createDepositUseCase).toBeInstanceOf(CreateDepositUseCase);
    });
  });


  export class MockUserRepository implements UserRepository {
     createUser(user: UserModel): Observable<UserModel>{
        return of()
     }
   updateUser(id: string, user: UserModel): Observable<UserModel>{
    return of()
   }
   getUserById(id: string): Observable<UserModel>{
    return of()
   }
   deleteUserById(id: string): Observable<boolean>{
    return of()
   }
   getAllUsers(): Observable<UserModel[]>{
    return of()
   }
   getUserByEmail(email: string): Observable<UserModel>{
    return of()
   }
   login(email: string, password: string): Observable<string>{
    return of()
   }
  }

  describe('User Use Case Factories', () => {
    let userRepository: UserRepository;
   
    
    it('should create a DeleteUserByIdUseCase instance', () => {
      const deleteUserByIdUseCase = deleteUserByIdUseCaseFactory(userRepository);
      expect(deleteUserByIdUseCase).toBeInstanceOf(DeleteUserByIdUseCase);
    });
  
    it('should create a GetAllUsersUseCase instance', () => {
      const getAllUsersUseCase = getAllUsersUseCaseFactory(userRepository);
      expect(getAllUsersUseCase).toBeInstanceOf(GetAllUsersUseCase);
    });
  
    it('should create a GetUserByIdUseCase instance', () => {
      const getUserByIdUseCase = getUserByIdUseCaseFactory(userRepository);
      expect(getUserByIdUseCase).toBeInstanceOf(GetUserByIdUseCase);
    });
  
    it('should create a GetUserByEmailUseCase instance', () => {
      const getUserByEmailUseCase = getUserByEmailUseCaseFactory(userRepository);
      expect(getUserByEmailUseCase).toBeInstanceOf(GetUserByEmailUseCase);
    });
  
    it('should create a UserLoginUseCase instance', () => {
      const userLoginUseCase = userLoginUseCaseFactory(userRepository);
      expect(userLoginUseCase).toBeInstanceOf(UserLoginUseCase);
    });
  
    it('should create an UpdateUserUseCase instance', () => {
      const updateUserUseCase = updateUserUseCaseFactory(userRepository);
      expect(updateUserUseCase).toBeInstanceOf(UpdateUserUseCase);
    });
  
    it('should create a CreateUserUseCase instance', () => {
      const createUserUseCase = createUserUseCaseFactory(userRepository);
      expect(createUserUseCase).toBeInstanceOf(CreateUserUseCase);
    });
  });
  
  
  export class MockTransferRepository implements TransferRepository {

    createTransfer(transfer: TransferModel): Observable<TransferModel>{   
            return of()
    }
}
  describe('CreateTransferUseCaseFactory', () => {
    let TransferRepository: TransferRepository
    it('should create a CreateTransferUseCase instance', () => {
      const createTransferUseCase = createTransferUseCaseFactory(TransferRepository);
      expect(createTransferUseCase).toBeInstanceOf(CreateTransferUseCase);
    });
  });