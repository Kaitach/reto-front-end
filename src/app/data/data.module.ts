import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { UserRepository, UserLoginUseCase, AccountRepository, DepositRepository, TransferRepository } from "../domain";
import { UserImplementationRepository } from "./repository/user-implementation.repository";
import { userUseCaseProviders } from "./factory/userfactory";
import { AccountUseCaseProviders } from "./factory/accountFactory";
import { AccountImplementationRepository } from "./repository/account.implentation.reposity";
import { depositUseCaseProviders } from "./factory/depositFactory";
import { DepositImplementationRepository } from "./repository/deposit.implemntation.repositoy";
import { transferUseCaseProviders } from "./factory/transferFactory";
import { TransferImplementationRepository } from "./repository/transfer.implementation.repository";


@NgModule({
    providers: [
        UserImplementationRepository,
        ...Object.values(userUseCaseProviders),
        { provide: UserRepository, useClass: UserImplementationRepository },
        AccountImplementationRepository,
        ...Object.values(AccountUseCaseProviders),
        { provide: AccountRepository, useClass: AccountImplementationRepository },
        ...Object.values(depositUseCaseProviders),
        DepositImplementationRepository,
        { provide: DepositRepository, useClass: DepositImplementationRepository },
        ...Object.values(transferUseCaseProviders),
        TransferImplementationRepository,
        { provide: TransferRepository, useClass: TransferImplementationRepository },



    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    
})
export class DataModule { }