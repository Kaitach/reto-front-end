import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountUseCaseProviders } from 'src/app/data/factory/accountFactory';
import { UserRepository, AccountRepository, IAccountModel, UserModel } from 'src/app/domain';
import { CommonModule } from '@angular/common'
import { AlertsService } from '../../shared';
import { BehaviorSubject, map } from 'rxjs';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  factory = userUseCaseProviders;

  factoryAccount = AccountUseCaseProviders
  accountList: IAccountModel[] = [];

  user: UserModel = {
    id: '',
    email: '',
    name: '',
    Account: [],
    document: '',
    password: ''
  };
  accountListSubject = new BehaviorSubject<IAccountModel[]>(this.accountList);

  constructor(    private router: Router, public AlertsService: AlertsService,
    private formBuilder: FormBuilder, private userRepository: UserRepository, private accountRepository:AccountRepository  ) {}


    ngOnInit() {

      this.accountListSubject.subscribe((accountList) => {
        localStorage.setItem('accountList', JSON.stringify(accountList));
      });
      const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString);
      }
      const accountListStorage = localStorage.getItem('accountList');
      if (accountListStorage) {
        this.accountList = JSON.parse(accountListStorage);}

      this.getUserAccounts()
    }


  getUserAccounts(){
    this.user.Account.map(accountId => {
      return this.factoryAccount.getAccountById.useFactory(this.accountRepository)
        .execute(accountId)
        .pipe(map(account => {
          this.accountList.push(account);
          this.accountListSubject.next(this.accountList);
        }));
    }).forEach(observable => observable.subscribe());
    localStorage.setItem('accountList', JSON.stringify(this.accountList))
  }

  
  async deleteAccount(id:string){
    const deleteAccount = this.AlertsService.alertError()

    if(await deleteAccount == true) {
    this.factoryAccount.deleteAccount.useFactory(this.accountRepository).execute(id).subscribe()
   
    this.updateAccountsUser()
    this.updateAccountList()
    this.accountListSubject.subscribe((accountList) => {
      localStorage.setItem('accountList', JSON.stringify(accountList));
    });
    this.router.navigate(['/user/profile']);

  }

  }

  updateAccountsUser() {

    this.user.Account = this.accountList
      .map(account => account.id)
      .filter(id => id !== undefined) as string[];

  }
  
  
updateAccountList() {
  this.factory.updateUser
    .useFactory(this.userRepository)
    .execute({
      id: this.user.id,
      user: this.user,
    })
    .subscribe((data) => {
    });
}
  
updateAccount(){
  
  const account:IAccountModel = {
    amount: this.amount,
    id: this.id,
    type: this.formEdit.value.type || '',
    userID: this.user.id,
  }
  this.factoryAccount.UpdateAccount.useFactory(this.accountRepository).execute(this.id, account).subscribe()
  this.AlertsService.alertOk()

}


formEdit = this.formBuilder.group({
  type: [ 'debit', Validators.required],

    
  });

id!:string 
amount!: number

abrirModal(id: string, amount: number ) {
  this.id = id,
  this.amount = amount
  const modal = document.getElementById('popup-modale');
  modal?.classList.add('block');
  modal?.classList.remove('hidden');
}


closeModal(){
const modal = document.getElementById('popup-modale');
modal?.classList.remove('block');
modal?.classList.add('hidden');
}

}
